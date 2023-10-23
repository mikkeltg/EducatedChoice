import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

function FeedbackList() {
  //viser anmeldelser af uddannelser
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true); //viser besked om at der afventes filtrering af anmeldelser
  const [filteredUddannelse, setFilteredUddannelse] = useState(""); //filtrer anmeldelser på uddannelse, ved at vælge uddannelse fra dropdown menu
  const [uddannelser, setUddannelser] = useState([]); //hent uddannelser fra databasen

  const fetchData = async () => {
    //hent anmeldelser fra databasen
    try {
      const db = getFirestore();
      const feedbackCollection = collection(db, "Feedback");
      let feedbackQuery = query(feedbackCollection);

      if (filteredUddannelse) {
        feedbackQuery = query(
          feedbackCollection,
          where("uddannelse", "==", filteredUddannelse)
        ); //filtrer anmeldelser på uddannelse
      }

      const querySnapshot = await getDocs(feedbackQuery);

      const feedbackArray = [];
      querySnapshot.forEach((doc) => {
        //for hver anmeldelse i databasen skal der gøres følgende: 
        const feedbackItem = doc.data();
        feedbackArray.push(feedbackItem); //tilføj anmeldelsen til arrayet og vis den på appen
      });

      setFeedbackData(feedbackArray); //vis anmeldelserne på appen
      setLoading(false); //fjern beskeden om at der afventes filtrering af anmeldelser
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    //hent uddannelser fra databasen
    const db = getFirestore();
    const uddannelserCollection = collection(db, "Uddannelser");

    getDocs(uddannelserCollection).then((querySnapshot) => {
      //hent uddannelser fra databasen og vis dem i dropdown menu
      const uddannelserArray = [];
      querySnapshot.forEach((doc) => { //for hver uddannelse i databasen skal der gøres følgende: push uddannelsens navn til arrayet og vis det i dropdown menuen
        uddannelserArray.push(doc.data().Navn);
      });
      setUddannelser(uddannelserArray);
    });
  }, []);

  const handleUddannelseChange = (selectedUddannelse) => { //brugeren vælger en uddannelse fra dropdown menuen og filtrerer anmeldelser på uddannelse
    setFilteredUddannelse(selectedUddannelse);
  };

  //der er brugt picker til at vælge uddannelse fra dropdown menuen og der er brugt flatlist til at vise anmeldelserne på appen, der kunne overvejes at bruge noget andet end flatlist til at gøre brugeroplevelsen bedre
  //der er brugt en knap til at filtrere anmeldelser på uddannelse, der er skrevet tekst under, der viser at der afventes filtrering af anmeldelser
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Uddannelses Anmeldelser</Text>
      <Picker
        selectedValue={filteredUddannelse}
        onValueChange={(itemValue) => handleUddannelseChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Vælg Uddannelse" value="" />
        {uddannelser.map((uddannelse, index) => (
          <Picker.Item key={index} label={uddannelse} value={uddannelse} />
        ))}
      </Picker>
      <Button
        title="Filtrer på Uddannelse"
        onPress={() => {
          fetchData();
        }}
        style={styles.button}
        color="#CFD7C7"
      />
      {loading ? (
        <Text style={styles.loadingText}>afventer filtrering... </Text> 
      ) : (
        <FlatList
          data={feedbackData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.feedbackText}> - {item.feedback}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}
//TILFØJET STYLING JF. feedback
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 40,
    textAlign: "center",
    marginTop: 10,
    color: "#40798C",
  },
  picker: {
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#CFD7C7",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  feedbackText: {
    fontSize: 18,
  },
});

export default FeedbackList;
