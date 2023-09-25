// Denne komponent skal oprette en bruger

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";


import { firebaseConfig } from '../FirebaseConfig';

// Initialize Firebase og firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

  
// Selve komponenten, der skal oprette ny bruger i firebase Authentification og Firestore
function SignUpForm() {
  // Usestates til at gemme brugerinput  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState(null)

  //Knap til start af funktion nedenfor
  const renderButton = () => {
    return <Button onPress={() => handleSignUp()} title="Create user" />;
    };

    const auth = getAuth()

    // Selve funktionen der opretter bruger
    const handleSignUp = async() => {
        // Brug af Firebase Authentication til at oprette bruger med email and password
        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("bruger lavet");
            const user = userCredential.user;
            // Tilføj bruger til Firestore som ny document
            setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email
            })
            .then(() => {
            console.log('User information added to Firestore');
            })
            .catch((error) => {
            console.error('Error adding user information to Firestore:', error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage)
            // ..
        });
    }


  return (
    <View>
    <Text style={styles.header}>Sign up</Text>
    <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(name) => setName(name)}
        style={styles.inputField}
    />
    <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={styles.inputField}
    />
    <TextInput
        placeholder="password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        style={styles.inputField}
    />
    {errorMessage && (
        <Text style={styles.error}>Error: {errorMessage}</Text>
    )}
    {renderButton()}
    </View>
  );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
        width: 300
    },
    header: {
        fontSize: 40,
    },
});

export default SignUpForm;
