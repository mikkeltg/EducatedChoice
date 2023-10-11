import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Pressable } from "react-native";
import { getFirestore, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import GlobalStyles from "../../GlobalStyles";

const LocationPreference = () => {
    //Hente Firebase Authentication og den aktive bruger
    const auth = getAuth();
    const user = auth.currentUser;

    //Oprette en state variabel til at håndtere inputfelterne (lokation)
    const [location, setLocation] = useState("");

  useEffect(() => {
    if (!user) return; // Exit early if user is undefined

    // Check hvis 'location' field findes i user document og hvis ikke oprettes den
    const checkLocationField = async () => {
        //Check om 'user' er defineret (logget ind)
        if (user) {
      const db = getFirestore();

      // Reference til user document i Firestore
      const userDocRef = doc(db, "users", user.uid);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (!userDocSnapshot.exists() || !userDocSnapshot.data().location) {
          // Create 'location' field i Firestore hvis den ikke allerede eksisterer (med empty string som default value)
          await setDoc(userDocRef, { location: "" }, { merge: true });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    }
    };

    // Kald checkLocationField() funktionen for at tjekke om 'location' field findes og opret den hvis den ikke findes
    checkLocationField();
  }, [user]); // Kør kun useEffect() når 'user' ændres

  // Funktion til at opdatere 'location' field i Firestore
  const handleLocationUpdate = async () => {
    try {
    // Opdatere 'location' field i Firestore med den indtastede lokation
      await updateDoc(doc(getFirestore(), "users", user.uid), {
        location,
      });

    // Reset input feltet
      setLocation("");
      
      console.log("Location updated in Firestore");
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  return (
    <View>
      <Text style={GlobalStyles.header}>Opdatér Præferencer</Text>
        <Text style={GlobalStyles.text}>Hvilken by vil du gerne studere i?</Text>
      <TextInput
        placeholder="By"
        value={location}
        onChangeText={(loc) => setLocation(loc)}
        style={GlobalStyles.inputField}
      />
      <Pressable onPress={handleLocationUpdate} style={GlobalStyles.button}>
        <Text style={GlobalStyles.buttonText}>Opdatér Præferencer</Text>
      </Pressable>
    </View>
  );
};

export default LocationPreference;
