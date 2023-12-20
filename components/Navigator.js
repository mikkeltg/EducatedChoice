import { GestureHandlerRootView } from 'react-native-gesture-handler';
import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
//import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from "@expo/vector-icons"; // You may need to install this package
import ProfileScreen from "./screens/ProfileScreen";
import ChatScreen from "./screens/ChatScreen";
import Educations from "./screens/Educations";
import Favorites from "./screens/Favorites";
import HomeScreen from "./screens/HomeScreen"; // mangler at blive færdig
import EducationInformationScreen from "./screens/EducationInfoScreen"; // mangler at blive færdig
import { SafeAreaView } from 'react-native';


const Tab = createBottomTabNavigator();

function Navigator() {
  return (
    <NavigationContainer>
    <GestureHandlerRootView style={{ flex: 1 }}>
  

      <Tab.Navigator
        initialRouteName="Profiloplysninger"
        tabBarOptions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'gray'

        }}
      >
        <Tab.Screen
          name="Profiloplysninger"
          component={ProfileScreen}
          options={{
            tabBarLabel: "Profil",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="person" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Opdag uddannelser"
          component={Educations}
          options={{
            tabBarLabel: "Opdag",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="school" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Mine favorituddannelser"
          component={Favorites}
          options={{
            tabBarLabel: "Favoritter",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite" color={color} size={size} />
            ),
          }}
        />
       
        <Tab.Screen
          name="Uddannelsesdetaljer"
          component={EducationInformationScreen}
          options={{
            tabBarLabel: "Uddannelse",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="info" color={color} size={size} />
            ),
            tabBarButton: () => {
              return null;
          }}}
        />

        <Tab.Screen
          name="Spørg UddannelsesGPT"
          component={ChatScreen}
          options={{
            tabBarLabel: "Chat",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="question-answer" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
    </NavigationContainer>
  );
}



  
  // return (

  //   <NavigationContainer>
  //     <Drawer.Navigator initialRouteName="Profiloplysninger">
  //       <Drawer.Screen name="Profiloplysninger" component={ProfileScreen} />
  //       <Drawer.Screen name="Opdag uddannelser" component={Educations} />
  //       <Drawer.Screen name="Mine favorituddannelser" component={Favorites}/>
  //       <Drawer.Screen name="Uddannelsesdetaljer" component={EducationInformationScreen} options={{
  //                 drawerItemStyle: { display: 'none' } // Skjul detaljeside
  //       }}/>
  //       <Drawer.Screen name="Spørg UddannelsesGPT" component={ChatScreen} />
        
  //     </Drawer.Navigator>
  //   </NavigationContainer>
  // );



  export default Navigator;

//How to Navigator:
//Importere  komponente overst
//Sæt den ind i Drawer.Navigator: <Drawer.Screen name="TITEL PÅ SIDEN" component={SELVE NAVNET PÅ KOMPONENTEN} />
//husk at eksportere komponent i komponenten.js filen
