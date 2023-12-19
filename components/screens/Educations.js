// Denne komponent skal indhente alle uddannelser fra Firestore databasen og fremvise dem til brugeren.
// Komponenten skal yderligere kunne filtrere, dsv. lave en query til databasen ud fra brugerens valg

// Nødvendige pakker hentes
import React, { useState, useEffect } from "react";
import {
    SafeAreaView,
    View,
    Text,
    Button,
    Modal,
    TouchableOpacity,
    FlatList,
    Pressable,
    ScrollView,
    TextInput
} from "react-native";
import {
    getFirestore,
    doc,
    getDoc,
    collection,
    query,
    getDocs,
    where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import GlobalStyles from "../../GlobalStyles";
import fetchUserGrades from "../services/GetUserGrades"


// Selve komponenten, der eksporteres til App.js
function FilterEducationType({ navigation }) {

  // De nuværende uddannelsestypemuligheder, som brugeren kan filtrere efter
  const educationTypes = ["Bachelor", "Kandidat", "Erhvervskandidat", "Professionsbachelor"];
  // De nuværende lokationer, som brugeren kan filtrere efter
  const locations = ["København", "Aalborg", "Odense", "Aarhus", "Roskilde"];
  
  const [data, setData] = useState([]); // Gemmer uddannelser, der stemmer overens med filter og er hentet fra databasen
  const [filteredEducations, setfilteredEducations] = useState([]); // Gemmer uddannelser, der stemmer overens med filter og er hentet fra databasen
  const [selectedAverage, setSelectedAverage] = useState(13); // Gemmer brugerens valg af adgangskvotient/gennemsnit 
  const [userAverage, setUserAverage] = useState(); // Gemmer brugerens valg af adgangskvotient/gennemsnit 
  const [selectedEducationType, setSelectedEducationType] = useState(""); // Gemmer brugerens valg af uddannelsestype 
  const [isModalVisible, setModalVisible] = useState(false); // Viser/gemmer dropdown bar til filtreringsmuligheder
  const [selectedLocation, setSelectedLocation] = useState(); 
  const [selectedMinStartWage, setSelectedMinStartWage] = useState(0);
  const [searchName, setSearchName] = useState(""); // Gemmer brugerens valg af uddannelsestype 
  const [filteredEducationsWithNameSearch, setFilteredEducationsWithNameSearch] = useState([]); // Gemmer brugerens valg af uddannelsestype 
  const [finalEducations, setFinalEducations] = useState([]); // Den endelige lister af uddannelser, der vises til brugeren 

  
  const getEligbleEducations = () => {
    const eligibleEducations = [];
    for (let i = 0; i < data.length; i++) {   
      let educationEligibility = true; 
      switch (true) { // Led efter parameter, der ikke stemmer overens med filter på type og løn
        case selectedMinStartWage > data[i]["Løn"]:
          educationEligibility = false;
          continue;
        case selectedEducationType.length > 0 && !data[i][selectedEducationType]:
          educationEligibility = false;
          continue;
      };

      const entryReqGrades = [];
      let eligbleCity = false
      for (let city in data[i]["Lokationer"]){
        data[i]["Lokationer"][city.trim()] = data[i]["Lokationer"][city];
        city = city.trim(); // fjern evt. ekstra mellemrum
        if (typeof selectedLocation != "undefined" && selectedLocation != city) {
        } else {
          eligbleCity = true;
          
          for (const university in data[i]["Lokationer"][city]){
            if (data[i]["Lokationer"][city][university]["Adgangskvotient"] == "AO") {
              data[i]["Lokationer"][city][university]["Adgangskvotient"] = 0;
            }
            entryReqGrades.push(data[i]["Lokationer"][city][university]["Adgangskvotient"])
          }
          }
      }
      entryReqGrades.sort((a, b) => a - b); // Sorter med laveste først
      if (selectedAverage < entryReqGrades[0] || !eligbleCity) {
        educationEligibility = false;
      }
      if(educationEligibility){
        eligibleEducations.push(data[i]);
      };
    };
    return eligibleEducations;
  };

  // UseEffect der indhenter uddannelsesdata fra databasen efter brugeren har taget et valg vedrørende uddannelsestype 
  useEffect(() => {
    const fetchData = async () => { // Selve funktionen der indhenter uddannelsesdate fra databasen
      try {
        console.log("Fetching data for education type:", selectedEducationType);
        if (data.length < 1) {
          const db = getFirestore();
          const uddannelserRef = collection(db, "Uddannelser");
          const querySnapshot = await getDocs(uddannelserRef);

          const newData = [];
          querySnapshot.forEach((doc) => {
            newData.push(doc.data());
          });

          console.log("Fetched data:", newData);
          setData(newData);
          setfilteredEducations(newData);
        }
        const grades = await fetchUserGrades();      
        setUserAverage(grades);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

// Funktion til at filtrere uddannelser efter uddannelsesnavn, hvis brugeren søger efter dette
useEffect(()=>{
    if (searchName == "") {
      setFilteredEducationsWithNameSearch([]);
    } else {
      const educationNameMatches = filteredEducations.filter(educationObject =>
        educationObject["Navn"].toLowerCase().includes(searchName.toLowerCase())
      );
      setFilteredEducationsWithNameSearch(educationNameMatches);
    }
}, [searchName, filteredEducations])
// Useeffect der sætter den endelige liste med uddannelser til enten at være uddannelser, der kun lever op til filtre, eller om de også skal leve op til søgning på navn 
useEffect(()=>{
    if (searchName.length > 0) {
      setFinalEducations(filteredEducationsWithNameSearch);
    } else {
      setFinalEducations(filteredEducations)
    };
}, [filteredEducations, filteredEducationsWithNameSearch])

  // Funktion der sætter filter på adgangskvotient lig med brugerens eget gennemsnit 
const useUsersOwnAverage = async () => { 
  const grades = await fetchUserGrades();      
  setSelectedAverage(grades);
  setUserAverage(grades);
};

  // Funktion der enten viser eller skjuler dropdown muligheder (filter) ved tryk på dropdown baren
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  // Nedenstående kode viser filtreringsbaren til brugeren samt en liste over de uddannelser, som lever op til den valgte filtrering
  return (
    <SafeAreaView style={GlobalStyles.containerL}>
      <View style={{flexDirection: "row", justifyContent: "space-evenly", marginTop: 10}}>
        <TouchableOpacity
            onPress={toggleModal}
            style={GlobalStyles.dropdownContainer}
        >
        <Text style={GlobalStyles.dropdownInput}>Vælg filtre</Text>
        <Text style={GlobalStyles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {/* Nedenstående gør det muligt at nulstille filter */}
      <Pressable onPress={() => {
        setSelectedAverage(13);
        setSelectedMinStartWage(0);
        setSelectedEducationType("");
        setSelectedLocation();
        setfilteredEducations(data)
      }}> 
        <Text style={GlobalStyles.text}>Nulstil filtre</Text>
      </Pressable>
      </View>
        {/* Dropdown filter bar, der foldes ud, når brugeren trykker */}
        <Modal visible={isModalVisible} animationType="slide">
            <SafeAreaView style={GlobalStyles.container}>
            <Text style={GlobalStyles.headerL}>Vælg filtre</Text>
            <View style={GlobalStyles.modalContainerL}>
                <Text style={GlobalStyles.modalTitle}>Adgangskvotient</Text>
                <View style={GlobalStyles.modalContainerLHorizontal}>
                    <TextInput  
                        style={GlobalStyles.numberInput}
                        onChangeText={setSelectedAverage}
                        value={selectedAverage}
                        placeholder="Indsæt tal"
                        keyboardType="numeric"
                    />
                <View style={GlobalStyles.containerGap}>
                    {selectedAverage != userAverage ? (
                        <Pressable style={GlobalStyles.smallButton} onPress={useUsersOwnAverage}>
                        <Text style={GlobalStyles.text}>Brug mit karaktergennemsnit som filter</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={GlobalStyles.smallButton} onPress={() => setSelectedAverage(13)}>
                        <Text style={GlobalStyles.text}>Fjern filter på adgangskvotient</Text>
                        </Pressable>
                    )}
                </View>
            </View>

                {selectedAverage!=13?<Text style={GlobalStyles.text}>Kun agangskvotient på <Text style={[{fontWeight:"bold"}]}>{selectedAverage}</Text> eller mindre</Text>:null} 
            </View>
            <View style={GlobalStyles.modalContainerL}>
                <Text style={GlobalStyles.modalTitle}>Startløn</Text>
                <View style={GlobalStyles.modalContainerLHorizontal}>
                    <TextInput  
                        style={GlobalStyles.numberInput}
                        onChangeText={setSelectedMinStartWage}
                        value={selectedMinStartWage}
                        placeholder="Indsæt minimum startløn"
                        keyboardType="numeric"
                    />
                <View style={GlobalStyles.containerGap}>
                        <Pressable style={GlobalStyles.smallButton} onPress={() => setSelectedMinStartWage(0)}>
                        <Text style={GlobalStyles.text}>Fjern filter på startløn</Text>
                        </Pressable>
                </View>
            </View>
                {selectedMinStartWage>0?<Text style={GlobalStyles.text}>Filter på startløn er sat til: <Text style={[{fontWeight:"bold"}]}>{selectedMinStartWage}</Text></Text>:null} 
            </View>
            <View style={GlobalStyles.modalContainerL}>
                <Text style={GlobalStyles.modalTitle}>Uddannelsestype</Text>
                <FlatList
                    data={educationTypes}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={GlobalStyles.locationItemL}
                            onPress={() => setSelectedEducationType(item)}
                        >
                            <Text style={[GlobalStyles.locationItemTextL, { fontWeight: selectedEducationType == item ? 'bold' : 'normal' }]}>{item}</Text>
                        </TouchableOpacity>
                        )}
                    keyExtractor={(item) => item}
                    extraData={selectedEducationType}
                />
            </View>
            <View style={GlobalStyles.modalContainerL}>
                <Text style={GlobalStyles.modalTitle}>Byer</Text>
                <FlatList
                    data={locations}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={GlobalStyles.locationItemL}
                            onPress={() => setSelectedLocation(item)}
                        >
                            <Text style={[GlobalStyles.locationItemTextL, { fontWeight: selectedLocation == item ? 'bold' : 'normal' }]}>{item}</Text>
                        </TouchableOpacity>
                        )}
                    keyExtractor={(item) => item}
                    extraData={selectedEducationType}
                />
            </View>
           
             <Pressable style={GlobalStyles.button} onPress={() => {
                setfilteredEducations(getEligbleEducations());
                toggleModal();
              }}> 
                <Text>Vælg filtre</Text>
            </Pressable>
        </SafeAreaView>
    </Modal>
    {/* search bar for educations */}
    <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10, paddingLeft: 10, backgroundColor: "white" }}
        placeholder="Søg på uddannelsesnavn..."
        value={searchName}
        onChangeText={setSearchName}
      />
    <Text style={[GlobalStyles.textL]}>
    Viser uddannelser for følgende filtre: {searchName} {String(selectedEducationType)} {selectedAverage != 13 ? selectedAverage: ""} {selectedLocation} {selectedMinStartWage > 0 ? selectedMinStartWage: ""}
    </Text>
    <ScrollView>
    {/* Her vises de enkelte uddannelser */}
    {finalEducations.sort().map((document, index) => (
        <View key={index} style={GlobalStyles.documentContainerL}>
            <Text style={GlobalStyles.headerL}>{document.Navn}</Text>
            <Button
              onPress={() => navigation.navigate("Uddannelsesdetaljer", {educationName: document.Navn})}
              title="Læs mere"
            >
            </Button>
        </View>
    ))}
    </ScrollView>
    </SafeAreaView>
  );
}

// Eksport af komponenten
export default FilterEducationType;