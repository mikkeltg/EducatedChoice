// Denne komponent skal oprette en bruger

import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

import { firebaseConfig } from "../../FirebaseConfig";

import GlobalStyles from "../../GlobalStyles";

// Initialize Firebase og firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Selve komponenten, der skal oprette ny bruger i firebase Authentification og Firestore
function SignUpForm() {
  // Usestates til at gemme brugerinput
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  //Knap til start af funktion nedenfor
  const renderButton = () => {
    return <Button onPress={() => handleSignUp()} title="Create user" />;
  };

  const auth = getAuth();

  // Selve funktionen der opretter bruger
  const handleSignUp = async () => {
    // Brug af Firebase Authentication til at oprette bruger med email and password
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("bruger lavet");
        const user = userCredential.user;
        // Tilføj bruger til Firestore som ny document
        setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
        })
          .then(() => {
            console.log("User information added to Firestore");
          })
          .catch((error) => {
            console.error("Error adding user information to Firestore:", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        setErrorMessage(errorCode);
      });
  };

  return (
    <View style={GlobalStyles.containerL}>
      <TextInput
        placeholder="Navn"
        value={name}
        onChangeText={(name) => setName(name)}
        style={GlobalStyles.inputField}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        style={GlobalStyles.inputField}
      />
      <TextInput
        placeholder="Adgangskode"
        value={password}
        onChangeText={(password) => setPassword(password)}
        secureTextEntry
        style={GlobalStyles.inputField}
      />
      {errorMessage && <Text style={GlobalStyles.error}>Hov, der skete en fejl: {errorMessage}</Text>}
      {renderButton()}
    </View>
  );
}

export default SignUpForm;
