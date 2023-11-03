import React, { useState } from 'react';
import { View, TextInput, Text, Pressable} from 'react-native';
import GlobalStyles  from '../../GlobalStyles';
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

//funktion der gemmer snit til databasen 

const Prereq = () => {
    const [number, setNumber] = useState(0); //nummer er sat til ingenting og ændres når der tastes på appen. 
    const [snitOpdateret, setSnitOpdateret] = useState('')

    async function saveSnit() { //async function der gemmer snit til databasen
        const auth = getAuth(); 
        const user = auth.currentUser;
        
        //tjekker brugeren er logget ind
        if (user) {
            const db = getFirestore();
            const userRef = doc(db, "users", user.uid); //finder den bruger der er logget ind. 
            let snit = parseFloat(number.replace(',', '.'))
            await updateDoc(userRef, {
                snit: snit//opdaterer snit i databasen med det indtastede snit
              })
            .then(() => {
                setSnitOpdateret('Dit snit er gemt! :D');
            })
            .catch((error) => {
                console.error('Error saving snit to database: ', error);
            });
        } else {
            console.error('No user logged in');
        }
    }

    return (
        <View>
            <Text style={GlobalStyles.header}>Indtast dit snit fra STX, HHX, HTX, HF eller EUX her  </Text>
            <TextInput style={GlobalStyles.TextInput}
                placeholder="Enter a number"
                inputMode="decimal"
                value={number}
                onChangeText={setNumber}
            />
            <Pressable style={GlobalStyles.button} mode="contained" onPress={saveSnit}>
            <Text style={GlobalStyles.text}>Du har indtastet: {number}</Text>
            </Pressable>
            <Text style={GlobalStyles.text}>{snitOpdateret}</Text>
        </View>
    );
};

export default Prereq;
