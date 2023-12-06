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


// Selve komponenten, der eksporteres til App.js
function FilterEducationType({ navigation }) {

  // De nuværende uddannelsestypemuligheder, som brugeren kan filtrere efter
  const educationTypes = ["Bachelor", "Kandidat", "Erhvervskandidat", "Professionsbachelor"];
  // De nuværende lokationer, som brugeren kan filtrere efter
  const locations = ["København", "Aalborg", "Odense", "Aarhus", "Roskilde"];
  
  const [data, setData] = useState([]); // Gemmer uddannelser, der stemmer overens med filter og er hentet fra databasen
  const [selectedAverage, setSelectedAverage] = useState(0); // Gemmer brugerens valg af adgangskvotient/gennemsnit 
  const [userAverage, setUserAverage] = useState(); // Gemmer brugerens valg af adgangskvotient/gennemsnit 
  const [selectedEducationType, setSelectedEducationType] = useState(""); // Gemmer brugerens valg af uddannelsestype 
  const [isModalVisible, setModalVisible] = useState(false); // Viser/gemmer dropdown bar til filtreringsmuligheder
  const [selectedLocation, setSelectedLocation] = useState();
  


  // UseEffect der indhenter uddannelsesdata fra databasen efter brugeren har taget et valg vedrørende uddannelsestype 
  useEffect(() => {
    const fetchData = async () => { // Selve funktionen der indhenter uddannelsesdate fra databasen
      try {
        console.log("Fetching data for education type:", selectedEducationType);
        if (selectedEducationType) {
          const db = getFirestore();
          const uddannelserRef = collection(db, "Uddannelser");
          const q = query(
            uddannelserRef,
            where(`${selectedEducationType}`, "==", true)
          );
          const querySnapshot = await getDocs(q);

          const newData = [];
          querySnapshot.forEach((doc) => {
            newData.push(doc.data());
          });

          console.log("Fetched data:", newData);
          setData(newData);
        } else {
          console.log("No location selected. Clearing data.");
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [isModalVisible]);

  // UseEffect der indhenter brugerens gennemsnit, hvis denne har en 
  const fetchUserGrades = async () => { // Selve funktionen der indhenter uddannelsesdate fra databasen
    try {
    console.log("Fetching grade average for user");
        const db = getFirestore();
        const auth = getAuth(); 
        const user = auth.currentUser;
        const userDocRef = doc(db, "users", user.uid); //finder den bruger der er logget ind.
        const docSnap = await getDoc(userDocRef); //henter brugerens data fra databasen
        setUserAverage(docSnap.data().snit);
        console.log(userAverage);
    } catch (error) {
    console.error("Error fetching grade average:", error);
    }
};
useEffect(()=>{
    fetchUserGrades();
}, [])

  // Funktion der sætter filter på adgangskvotient lig med brugerens eget gennemsnit 
const useUsersOwnAverage = async () => { 
        setSelectedAverage(userAverage);
        console.log(selectedAverage);
};

  // Funktion der enten viser eller skjuler dropdown muligheder ved tryk på dropdown baren
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


  // Funktion til at fjerne brugerens filtervalg
  const clearEducationTypeFilter = () => {
    setSelectedEducationType(""); 
  };

  // Nedenstående kode viser filtreringsbaren til brugeren samt en liste over de uddannelser, som lever op til den valgte filtrering
  return (
    <SafeAreaView style={GlobalStyles.containerL}>
      <TouchableOpacity
        onPress={toggleModal}
        style={GlobalStyles.dropdownContainer}
      >
        <Text style={GlobalStyles.dropdownInput}>Vælg filtre</Text>
        <Text style={GlobalStyles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
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
                    {selectedAverage <= 0 ? (
                        <Pressable style={GlobalStyles.smallButton} onPress={useUsersOwnAverage}>
                        <Text style={GlobalStyles.text}>Brug mit karaktergennemsnit som filter</Text>
                        </Pressable>
                    ) : (
                        <Pressable style={GlobalStyles.smallButton} onPress={() => setSelectedAverage(0)}>
                        <Text style={GlobalStyles.text}>Fjern filter på adgangskvotient</Text>
                        </Pressable>
                    )}
                </View>
            </View>
                {selectedAverage>0?<Text style={GlobalStyles.text}>Filter på agangskvotient er sat til: <Text style={[{fontWeight:"bold"}]}>{selectedAverage}</Text></Text>:null} 
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
             <Pressable style={GlobalStyles.button} onPress={toggleModal}> 
                <Text>Vælg filtre</Text>
            </Pressable>
        </SafeAreaView>
      </Modal>
      <Text style={[GlobalStyles.textL, {fontWeight: 'bold'}]}>
      Viser følgende uddannelsestype: {String(selectedEducationType)}
    </Text>
    <ScrollView>
    {/* Her vises de enkelte uddannelser */}
    {data.map((document, index) => (
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
      {/* Nedenstående gør det muligt at nulstille filter */}
      <Pressable style={GlobalStyles.button} onPress={clearEducationTypeFilter}> 
        <Text>Clear Filter</Text>
      </Pressable>
    </SafeAreaView>
  );
}

// Eksport af komponenten
export default FilterEducationType;