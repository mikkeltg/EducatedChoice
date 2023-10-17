import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function FeedbackForm() {
  const [selectedUddannelse, setSelectedUddannelse] = useState("");
  const [feedback, setFeedback] = useState("");
  const [uddannelser, setUddannelser] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    // Hent uddannelser fra Firestore-samlingen "Uddannelser"
    const db = getFirestore();
    const uddannelserCollection = collection(db, "Uddannelser");
    
    getDocs(uddannelserCollection).then((querySnapshot) => {
      const uddannelserArray = [];
      querySnapshot.forEach((doc) => {
        uddannelserArray.push(doc.data().Navn); // Tilpas dette baseret på din Firestore-struktur
      });
      setUddannelser(uddannelserArray);
    });
  }, []);

  const submitFeedback = async () => {
    if (selectedUddannelse && feedback) {
      const db = getFirestore();
      const feedbackCollection = collection(db, "Feedback");

      try {
        await addDoc(feedbackCollection, {
          userId: auth.currentUser.uid,
          uddannelse: selectedUddannelse,
          feedback: feedback,
        });
        setSelectedUddannelse("");
        setFeedback("");
        console.log("Feedback submitted successfully!");
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    }
  };

  return (
    <View>
      <Text>Vælg uddannelse:</Text>
      <Picker
        selectedValue={selectedUddannelse}
        onValueChange={(itemValue, itemIndex) => setSelectedUddannelse(itemValue)}
      >
        {uddannelser.map((uddannelse, index) => (
          <Picker.Item key={index} label={uddannelse} value={uddannelse} />
        ))}
      </Picker>
      <Text>Indtast feedback:</Text>
      <TextInput
        placeholder="Indtast din feedback her"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
      />
      <Button title="Indsend feedback" onPress={submitFeedback} />
    </View>
  );
}

export default FeedbackForm;