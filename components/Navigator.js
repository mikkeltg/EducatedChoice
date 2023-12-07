import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./screens/ProfileScreen";

import Prereq from "./screens/Prereq";
import FilterEducation from "./screens/FilterEducations";

import EducationInformationScreen from "./screens/EducationInfoScreen";

import LocationPreference from "./screens/LocationPreference";
import SearchEducation from "./screens/SearchEducation";
import ChatScreen from "./screens/ChatScreen";
import Educations from "./screens/Educations";


const Drawer = createDrawerNavigator();

function Navigator() {
  
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Opdater karaktergennemsnit" component={Prereq} />
        <Drawer.Screen name="Mine lokationspræferencer" component={LocationPreference} />
        <Drawer.Screen name="Uddannelser" component={Educations} />
        <Drawer.Screen name="Favoritter" component={FilterEducation}/>
        <Drawer.Screen name="Uddannelsesdetaljer" component={EducationInformationScreen} options={{
                  drawerItemStyle: { display: 'none' } // Skjul detaljeside
        }}/>
        <Drawer.Screen name="Søg efter uddannelser" component={SearchEducation} />
        

        <Drawer.Screen name="Chat" component={ChatScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

//How to Navigator:
//Importere jeres komponente overst
//Sæt den ind i Drawer.Navigator: <Drawer.Screen name="TITEL PÅ SIDEN" component={SELVE NAVNET PÅ KOMPONENTEN} />
//husk at eksportere jeres komponent i komponenten.js filen
