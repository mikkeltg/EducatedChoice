import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./screens/ProfileScreen";
import FilterLocation from "./screens/FilterLocation";
import Prereq from "./screens/Prereq";
import FilterEducation from "./screens/FilterEducations";

const Drawer = createDrawerNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Filter" component={FilterLocation} />
        <Drawer.Screen name="Prereq" component={Prereq} />
        <Drawer.Screen name="Filter Uddannelser" component={FilterEducation}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

//How to Navigator:
//Importere jeres komponente overst
//Sæt den ind i Drawer.Navigator: <Drawer.Screen name="TITEL PÅ SIDEN" component={SELVE NAVNET PÅ KOMPONENTEN} />
//husk at eksportere jeres komponent i komponenten.js filen
