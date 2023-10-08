
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

const Stack = createStackNavigator();
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

const firebaseConfig = {
  apiKey: "AIzaSyBJ5ev4aFTWGFI5kqWXVtMcvhLgylXBL6Q",
  authDomain: "educated-choice.firebaseapp.com",
  projectId: "educated-choice",
  storageBucket: "educated-choice.appspot.com",
  messagingSenderId: "416843846158",
  appId: "1:416843846158:web:20fd7a2ab2428c8017225f",
  measurementId: "G-ELSS69HT2K",
};

const Stack = createStackNavigator();

//BottomTabNavigator
const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { display: 'flex' },
    })}
    >
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchEducation} // Import or create this component
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Login"
        component={LoginForm}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="log-in" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Initialize Firebase

const Stack = createNativeStackNavigator();

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

  // Heri aktiverer vi vores listener i form af onAuthStateChanged, så vi dynamisk observerer om brugeren er aktiv eller ej.
  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);


    return () => {
      unsubscribe();
    };
  }, []);

  const GuestPage = () => {
    return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpForm} />
          <Stack.Screen name="SignIn" component={LoginForm} />
        </Stack.Navigator>
      </NavigationContainer>

    )
  }
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Opret eller Login med din firebase Email
        </Text>

        <Card style={{ padding: 20, margin: 20 }}>
          <SignUpForm />
        </Card>

        <Card style={{ padding: 20, margin: 20 }}>
          <LoginForm />
        </Card>
      </View>
    );
  };

  return ( // Heri returnerer vi vores NavigationContainer, som indeholder vores Stack.Navigator, som indeholder vores Stack.Screen komponenter, her kan navigeres mellem alle vores views
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={GuestPage}
          options={{ title: "Guest Page" }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Suggestions"
          component={SuggestionsScreen}
          options={{ title: "Suggestions" }}
        />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: "Search" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
        <Stack.Screen
          name="FAQ"
          component={FAQScreen}
          options={{ title: "Ofte stillede spørgsmål" }}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={{ title: "Om os" }}
        />

        {/* Tilføjer flere skærme her */}
      </Stack.Navigator>
      <NavigationBar />
  
  return (
    <NavigationContainer>
      {user.loggedIn ? (
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="MyFavourites" component={MyFavourites} />
          <Stack.Screen name="SearchEducation" component={SearchEducation} />
        </Stack.Navigator>
      ) : (
        <BottomTabNavigator /> // Use the BottomTabNavigator for guests
      )}
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}


//   return (
//     <View style={styles.container}>
//       <StatusBar style='auto' />
//       {user.loggedIn ? (
//         renderScreen() // Render the appropriate screen based on currentScreen state
//       ) : (
//         <View style={styles.container}>
//           <Text style={styles.paragraph}>
//             Opret eller Login med din firebase Email
//           </Text>

//           <Card style={{ padding: 20, margin: 20 }}>
//             <SignUpForm />
//           </Card>

//           <Card style={{ padding: 20, margin: 20 }}>
//             <LoginForm />
//           </Card>
//         </View>
//       )}
//     </View>
//   );
// }

//   //Her oprettes gæstekomponentsindhold, der udgøres af sign-up og login siderne
//   const GuestPage = () => {
//     return(
//         <View style={styles.container}>
//           <Text style={styles.paragraph}>
//             Opret eller Login med din firebase Email
//           </Text>
          
//           <Card style={{padding:20, margin: 20}}>
//             <SignUpForm />
//           </Card>
          
//           <Card style={{padding:20, margin: 20}}>
//             <LoginForm />
//           </Card>

//         </View>
//     )
//   }




//   return user.loggedIn ? <ProfileScreen /> : <GuestPage/> ;

// }

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
