import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from "react-native"; // Tilføj "TouchableOpacity" her
import { Picker } from '@react-native-picker/picker'; //anvendes til dropdown menu
import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";

//import * as ImagePicker from 'expo-image-picker'; // gør det muligt at vælge et billede fra telefonens galleri

function FeedbackForm() { //anmeldelsesformular til uddannelser
  const [selectedUddannelse, setSelectedUddannelse] = useState(""); //opretter en state til den valgte uddannelse så den kan koble sig til den valgte uddannelse i dropdown menuen
  const [feedback, setFeedback] = useState(""); //opretter en state til anmeldelsen af uddannelsen så den kan gemmes i databasen
  const [uddannelser, setUddannelser] = useState([]); //opretter en state til uddannelserne så de kan hentes fra databasen
  const auth = getAuth(); //hent brugerens id fra firebase authentication så vi kan gemme det i databasen sammen med anmeldelsen

  useEffect(() => { //hent uddannelser fra databasen
    const db = getFirestore(); //
    const uddannelserCollection = collection(db, "Uddannelser");

    getDocs(uddannelserCollection).then((querySnapshot) => { //hent uddannelser fra databasen og vis dem i dropdown menu
      const uddannelserArray = []; //opret et array til uddannelserne fra databasen 
      querySnapshot.forEach((doc) => { //for hver uddannelse i databasen skal der gøres følgende: 
        uddannelserArray.push(doc.data().Navn); //tilføj uddannelsens navn til arrayet og vis det i dropdown menuen 
      });
      setUddannelser(uddannelserArray);
    });
  }, );

  const submitFeedback = async () => { //når brugeren trykker på "Indsend anmeldelse" skal anmeldelsen gemmes i databasen
    if (selectedUddannelse && feedback) { //hvis der er valgt en uddannelse og skrevet en anmeldelse, skal anmeldelsen gemmes i databasen
      const db = getFirestore();
      const feedbackCollection = collection(db, "Feedback"); //opret en collection i databasen til anmeldelser og gem den i "feedbackCollection"

      try {
        await addDoc(feedbackCollection, { //tilføj en ny anmeldelse til databasen med følgende informationer
          userId: auth.currentUser.uid, //gem brugerens id fra firebase authentication
          uddannelse: selectedUddannelse,//gem den valgte uddannelse fra dropdown menuen
          feedback: feedback, //gem anmeldelsen af uddannelsen
        });
        setSelectedUddannelse("");
        setFeedback(""); //når anmeldelsen er gemt i databasen skal dropdown menuen og tekstfeltet nulstilles
        console.log("Feedback submitted successfully!"); //vis besked i konsollen om at anmeldelsen er gemt i databasen
      } catch (error) {
        console.error("Error submitting feedback:", error);
      }
    }
  };

  // const [selectedImage, setSelectedImage] = useState(null); //opret en state til det valgte billede så det kan gemmes i databasen

  /*const selectImage = async () => { //async funktion til at vælge et billede fra telefonens galleri
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync(); //spørg om tilladelse til at få adgang til billedbiblioteket
     
    if (permissionResult.granted === false) { //hvis tilladelse ikke gives, vises en besked om at tilladelse er påkrævet
      alert('Tilladelse til adgang til billedbiblioteket er påkrævet.'); //vis besked om at tilladelse er påkrævet
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(); //vælg et billede fra telefonens galleri

    if (!result.cancelled) { //hvis billedet ikke annulleres, gemmes billedet i "selectedImage"
      // `result.uri` indeholder stien til det valgte billede
      setSelectedImage({ uri: result.uri }); //gem billedet i "selectedImage"
    }
  };

  const renderSelectedImage = () => { 
    if (selectedImage) { //hvis der er valgt et billede, vises det valgte billede
      return <Image source={selectedImage} style={styles.selectedImage} />; 
    }
    return null;
  }; */

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Vælg Uddannelse</Text>
      <Picker
        selectedValue={selectedUddannelse}
        onValueChange={(itemValue, itemIndex) => setSelectedUddannelse(itemValue)} //når der vælges en uddannelse, skal den gemmes i "selectedUddannelse"
        style={styles.picker}
      >
        {uddannelser.map((uddannelse, index) => ( //hent uddannelserne fra databasen og vis dem i dropdown menuen
          <Picker.Item key={index} label={uddannelse} value={uddannelse} /> 
        ))}
      </Picker>
      <Text style={styles.label}>Indtast anmeldelse</Text> 
      <TextInput
        style={styles.input}
        placeholder="Indtast din anmeldelse af uddannelsen her"
        value={feedback}
        onChangeText={(text) => setFeedback(text)} //når der skrives i tekstfeltet, skal det gemmes i "feedback"
      />
      <Button title="Indsend anmeldelse" onPress={submitFeedback} color="#CFD7C7" style={styles.button} /> 
      <Text style={styles.label}>Vedhæft billede (valgfrit)</Text> 
      <TouchableOpacity onPress={selectImage} style={styles.imagePickerButton}>
        <Text style={styles.imagePickerText}>Vælg billede</Text>
      </TouchableOpacity>
      {renderSelectedImage()}
    </View>
  );
}
//TILFØJET STYLING JF. FEEDBACK
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 10,
    color: '#40798C', // Update the color here
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 16,
    padding: 8,
  },
  button: {
    backgroundColor: '#CFD7C7',
  },
  imagePickerButton: {
    backgroundColor: '#CFD7C7',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    fontSize: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 10,
  },
});

export default FeedbackForm;
