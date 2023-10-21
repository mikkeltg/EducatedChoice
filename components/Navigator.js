import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./screens/ProfileScreen";
import FilterLocation from "./screens/FilterLocation";
import FeedbackForm from "./screens/FeedbackForm";
import FeedbackList from "./screens/FeedbackList";
import SettingsScreen from "./screens/SettingsScreen";
import AboutUsScreen from "./screens/AboutUsScreen";
import FAQScreen from "./screens/FAQScreen";

const Drawer = createDrawerNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Filter" component={FilterLocation} />
        <Drawer.Screen name="Anmeldelser" component={FeedbackForm} />
        <Drawer.Screen name="Anmeldelses Oversigt" component={FeedbackList} />
        <Drawer.Screen name="Indstillinger" component={SettingsScreen} />
        <Drawer.Screen name="Om Os" component={AboutUsScreen} />
        <Drawer.Screen name="Ofte Stillede Spørgsmål" component={FAQScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

//How to Navigator:
//Importere jeres komponente overst
//Sæt den ind i Drawer.Navigator: <Drawer.Screen name="TITEL PÅ SIDEN" component={SELVE NAVNET PÅ KOMPONENTEN} />
//husk at eksportere jeres komponent i komponenten.js filen
