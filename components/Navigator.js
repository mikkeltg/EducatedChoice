import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "./screens/ProfileScreen";
import EducationInformationScreen from "./screens/EducationInfoScreen";
import Favorites from "./screens/Favorites";
import SearchEducation from "./screens/SearchEducation";
import ChatScreen from "./screens/ChatScreen";
import Educations from "./screens/Educations";
import HomeScreen from "./screens/HomeScreen"; // mangler at blive færdig


const Drawer = createDrawerNavigator();

function Navigator() {
  
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Profiloplysninger">
      {/* <Drawer.Screen name="Hjem" component={HomeScreen} /> */}
        <Drawer.Screen name="Profiloplysninger" component={ProfileScreen} />
        {/* <Drawer.Screen name="Mine lokationspræferencer" component={Favorites} /> */}
        <Drawer.Screen name="Opdag uddannelser" component={Educations} />
        <Drawer.Screen name="Mine favorituddannelser" component={Favorites}/>
        <Drawer.Screen name="Uddannelsesdetaljer" component={EducationInformationScreen} options={{
                  drawerItemStyle: { display: 'none' } // Skjul detaljeside
        }}/>
        <Drawer.Screen name="Søg efter uddannelser" component={SearchEducation} />
        <Drawer.Screen name="Spørg UddannelsesGPT" component={ChatScreen} />
        
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;

//How to Navigator:
//Importere jeres komponente overst
//Sæt den ind i Drawer.Navigator: <Drawer.Screen name="TITEL PÅ SIDEN" component={SELVE NAVNET PÅ KOMPONENTEN} />
//husk at eksportere jeres komponent i komponenten.js filen
