import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import SuggestionsScreen from './SuggestionsScreen';
import MyFavourites from './MyFavourites';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="SuggestionsScreen" component={SuggestionsScreen} />
      <Drawer.Screen name="My favorites" component={MyFavourites} />
      </Drawer.Navigator>
    </NavigationContainer>
   
    );
  }

export default DrawerNavigator;
