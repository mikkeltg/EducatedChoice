import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import StackNavigator from "./components/StackNavigator";

//Importere Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from "react-native-paper";

//Importere vores componenter fra components mappe
import ProfileScreen from "./components/screens/ProfileScreen";
import LoginForm from "./components/login/LoginForm";
import SignUpForm from "./components/login/SignUpForm";
import WelcomeScreen from "./components/login/WelcomeScreen";
import Navigator from "./components/Navigator";


import { firebaseConfig } from "./FirebaseConfig";

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({ loggedIn: false });

  // TJek om kører -> Hvis ikke, så start den
  if (getApps().length < 1) {
    initializeApp(firebaseConfig);
  }

  const auth = getAuth();

  function onAuthStateChange(callback) {
    return onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        callback({ loggedIn: true, user: user });
        console.log("You are logged in!");
        // ...
      } else {
        // User is signed out
        // ...
        callback({ loggedIn: false });
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  //Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
  const GuestPage = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Velkommen">
          <Stack.Screen name="Velkommen" component={WelcomeScreen} />
          <Stack.Screen name="Opret ny bruger" component={SignUpForm} />
          <Stack.Screen name="Log ind" component={LoginForm} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  // return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;
  return user.loggedIn ? <Navigator /> : <GuestPage />;
}


