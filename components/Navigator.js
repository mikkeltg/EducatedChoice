import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./screens/ProfileScreen";
import FilterLocation from "./screens/FilterLocation";
import Prereq from "./screens/Prereq";
import FilterEducation from "./screens/FilterEducations";
import FilterEducationType from "./screens/FilterEducationType";
import EducationInformationScreen from "./screens/EducationInfoScreen";
import MyFavourites from "./screens/MyFavourites";
import LocationPreference from "./screens/LocationPreference";
import SearchEducation from "./screens/SearchEducation";

const Drawer = createDrawerNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Welcome">
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Filter" component={FilterLocation} />
        <Drawer.Screen name="Prereq" component={Prereq} />
        <Drawer.Screen name="Filter Uddannelser" component={FilterEducation}/>
        <Drawer.Screen name="Filtrér efter uddannelsestype" component={FilterEducationType} />
        <Drawer.Screen name="Uddannelsesdetaljer" component={EducationInformationScreen} options={{
                  drawerItemStyle: { display: 'none' } // Skjul detaljeside
        }}/>
        <Drawer.Screen name="Mine favoritter" component={MyFavourites} />
        <Drawer.Screen name="Mine lokationspræferencer" component={LocationPreference} />
        <Drawer.Screen name="Søg efter uddannelser" component={SearchEducation} />
        

      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

//How to Navigator:
//Importere jeres komponente overst
//Sæt den ind i Drawer.Navigator: <Drawer.Screen name="TITEL PÅ SIDEN" component={SELVE NAVNET PÅ KOMPONENTEN} />
//husk at eksportere jeres komponent i komponenten.js filen
