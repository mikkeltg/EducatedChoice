
import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//import StackNavigator from "./components/StackNavigator";

import { createNativeStackNavigator } from "@react-navigation/native-stack";


// Import react-navigation components
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Feather} from '@expo/vector-icons';

//Importere Firebase Services
import { getApps, initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import { Card } from "react-native-paper";

//Importere vores componenter fra components mappe
import ProfileScreen from './components/ProfileScreen';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import WelcomeScreen from './components/WelcomeScreen';


import { firebaseConfig } from './FirebaseConfig';

import ProfileScreen from "./components/ProfileScreen";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import SuggestionsScreen from "./components/SuggestionsScreen";
import SettingsScreen from "./components/SettingsScreen";
import NavigationBar from "./components/search_component";
import SearchScreen from "./components/SearchScreen";
import FAQScreen from "./components/FAQScreen";
import AboutUsScreen from "./components/AboutUsScreen";
import MyFavourites from './components/MyFavourites';
import SearchEducation from './components/SearchEducation';


const Stack = createStackNavigator();

// BottomTabNavigator
const Tab = createBottomTabNavigator();

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
}

  // Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
