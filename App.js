import React from 'react';
import {Text, View} from 'react-native';



import DrawerNavigator from "./components/DrawerNavigator.js";



const HelloWorldApp = () => {
  
  return (
    
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Hello World</Text>
  </View>
    
  );
};
export default HelloWorldApp;