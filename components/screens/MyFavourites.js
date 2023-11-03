import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import GlobalStyles from "../../GlobalStyles";

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
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.header}>Mine uddannelser</Text>
      <Text style={GlobalStyles.text}>
        Kommende funktionalitet: Her skal man kunne se de uddannelser man har
        gemt som favoritter.{" "}
      </Text>
      <Text style={GlobalStyles.text}>
        Tanken er at man med knappen filtrér skal kunne filtrere på fx område:
        medicin, samfundsfag etc.
      </Text>
      {/* <FlatList
        data={educations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={GlobalStyles.educationItem}>
            <Text style={GlobalStyles.educationName}>{item.name}</Text>
            <Text style={GlobalStyles.educationDescription}>{item.description}</Text>
          </View>
        )}
      ></FlatList> */}

      <Pressable style={GlobalStyles.button}
        //</View>onPress={() => }
      >
        <Text style={GlobalStyles.buttonText}>{(title = "Filtrer")}</Text>
      </Pressable>
    </View>
  );
}

export default MyFavourites;
