import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, } from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";

//DENNE SIDE ER IKKE FÆRDIGLAVET

function MyFavourites() {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    // Initialize Firestore database
    const db = getFirestore();

    // Reference to the "uddannelser" collection
    const educationCollection = collection(db, "uddannelser");

    // Fetch all educations
    const fetchEducations = async () => {
      try {
        const querySnapshot = await getDocs(educationCollection);
        const educationList = [];

        querySnapshot.forEach((doc) => {
          const educationData = doc.data();
          educationList.push({
            id: doc.id, // You can use the document ID as a unique identifier
            name: educationData.Navn, // Replace with the actual field name
            description: educationData.description, // Replace with the actual field name
          });
        });

        setEducations(educationList);
      } catch (error) {
        console.error("Error fetching educations:", error);
      }
    };

    fetchEducations();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mine uddannelser</Text>
      <Text style={styles.text}>Kommende funktionalitet: Her skal man kunne se de uddannelser man har gemt som favoritter. </Text>
      <Text style={styles.text}>Tanken er at man med knappen filtrér skal kunne filtrere på fx område: medicin, samfundsfag etc.</Text>
      <FlatList
        data={educations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.educationItem}>
            <Text style={styles.educationName}>{item.name}</Text>
            <Text style={styles.educationDescription}>{item.description}</Text>
          </View>
        )}
      ></FlatList>

      {/* Button to filter NOT FUNCTIONAL */}
      <TouchableOpacity
        style={styles.myButton}
       // onPress={() => {}
      >
        <Text style={styles.buttonText}>Filtrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  educationItem: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  educationName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  educationDescription: {
    fontSize: 16,
  },
  myButton: {
    backgroundColor: "lightyellow",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
});

export default MyFavourites;
