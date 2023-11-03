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
import Prereq from "./screens/Prereq";
import FilterEducation from "./screens/FilterEducations";
import FilterEducationType from "./screens/FilterEducationType";
import EducationInformationScreen from "./screens/EducationInfoScreen";

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
        <Drawer.Screen name="Prereq" component={Prereq} />
        <Drawer.Screen name="Filter Uddannelser" component={FilterEducation}/>
        <Drawer.Screen name="Filtrér efter uddannelsestype" component={FilterEducationType} />
        <Drawer.Screen name="Uddannelsesdetaljer" component={EducationInformationScreen} options={{
                  drawerItemStyle: { display: 'none' } // Skjul detaljeside
        }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

//How to Navigator:
//Importere jeres komponente overst
//Sæt den ind i Drawer.Navigator: <Drawer.Screen name="TITEL PÅ SIDEN" component={SELVE NAVNET PÅ KOMPONENTEN} />
//husk at eksportere jeres komponent i komponenten.js filen
