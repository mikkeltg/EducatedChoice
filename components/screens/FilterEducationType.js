// Denne komponent skal indhente alle uddannelser fra Firestore databasen og fremvise dem til brugeren.
// Komponenten skal yderligere kunne filtrere, dsv. lave en query til databasen ud fra brugerens valg

// Nødvendige pakker hentes
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
  ScrollView
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import GlobalStyles from "../../GlobalStyles";

// Selve komponenten, der eksporteres til App.js
function FilterEducationType({ navigation }) {
  const [data, setData] = useState([]); // Gemmer uddannelser, der stemmer overens med filter og er hentet fra databasen
  const [SelectedEducationType, setSelectedEducationType] = useState(""); // Gemmer brugerens valg af uddannelsestype 
  const [isModalVisible, setModalVisible] = useState(false); // Viser/gemmer dropdown bar til filtrering af uddannelestype

  // UseEffect der indhenter uddannelsesdata fra databasen efter brugeren har taget et valg vedrørende uddannelsestype 
  useEffect(() => {
    const fetchData = async () => { // Selve funktionen der indhenter uddannelsesdate fra databasen
      try {
        console.log("Fetching data for education type:", SelectedEducationType);
        if (SelectedEducationType) {
          const db = getFirestore();
          const uddannelserRef = collection(db, "Uddannelser");
          const q = query(
            uddannelserRef,
            where(`${SelectedEducationType}`, "==", true)
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
  }, [SelectedEducationType]);

  // Funktion der enten viser eller skjuler dropdown muligheder ved tryk på dropdown baren
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // De nuværende uddannelsestypemuligheder, som brugeren kan filtrere efter
  const locations = ["Bachelor", "Kandidat"];

  // Funktion til at fjerne brugerens filtervalg
  const clearEducationTypeFilter = () => {
    setSelectedEducationType(""); 
  };

  // Nedenstående kode viser filtreringsbaren til brugeren samt en liste over de uddannelser, som lever op til den valgte filtrering
  return (
    <View style={GlobalStyles.containerL}>
      <TouchableOpacity
        onPress={toggleModal}
        style={GlobalStyles.dropdownContainer}
      >
        <Text style={GlobalStyles.dropdownInput}>Vælg en uddannelsestype</Text>
        <Text style={GlobalStyles.dropdownArrow}>▼</Text>
      </TouchableOpacity>
      {/* Dropdown filter bar, der foldes ud, når brugeren trykker */}
      <Modal visible={isModalVisible} animationType="slide">
        <View style={GlobalStyles.modalContainerL}>
          <Text style={GlobalStyles.modalTitleL}>Vælg en uddannelsestype</Text>
          <FlatList
            data={locations}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={GlobalStyles.locationItemL}
                onPress={() => {
                  setSelectedEducationType(item);
                  toggleModal();
                }}
              >
                <Text style={GlobalStyles.locationItemTextL}>{item}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        </View>
      </Modal>
      <Text style={[GlobalStyles.textL, {fontWeight: 'bold'}]}>
      Viser følgende uddannelsestype: {String(SelectedEducationType)}
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
    </View>
  );
}

// Eksport af komponenten
export default FilterEducationType;