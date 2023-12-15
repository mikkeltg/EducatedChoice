// Denne komponent skal logge brugeren ind

import React, { useState} from 'react';
import {
    Button,
    Text,
    View,
    TextInput,
    ActivityIndicator,
} from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import GlobalStyles from '../../GlobalStyles';


function LoginForm() {

    const auth = getAuth();

    // Gemmer brugerdata
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isCompleted, setCompleted] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)

   // Funktion til at håndtere login
    const handleSubmit = async () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log("Bruger logget ind");
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            setErrorMessage(errorCode);
        });
    }

    // Knap der aktiverer login
    const renderButton = () => {
        return <Button onPress={() => handleSubmit()} title="Log ind" />;
    };

    // Selve komponenten med loginfelter og knap returneres
    return (
        <View style={GlobalStyles.containerL}>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(email) => setEmail(email)}
                style={GlobalStyles.inputField}
            />
            <TextInput
                placeholder="Adgangskode"
                value={password}
                onChangeText={(password) => setPassword(password) }
                secureTextEntry
                style={GlobalStyles.inputField}
            />
            {errorMessage && (
                <Text style={GlobalStyles.error}>Hov, der skete en fejl: {errorMessage}</Text>
            )}
            {renderButton()}
        </View>
    );
}


//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default LoginForm