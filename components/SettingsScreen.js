// SettingsScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';
import { signOut } from 'firebase/auth';


const SettingsScreen = ({user, auth, navigation }) => { // Opret SettingsScreen komponenten
  const handleLogout = async () => { // Funktion til at logge ud
    try {
      await signOut(auth); // Log ud af Firebase
    } catch (error) {
      console.error('Fejl ved log ud:', error);
    }
  };

  const navigateToFAQ = () => { //knap til at navigere til FAQ
    navigation.navigate('FAQ'); // Naviger til FAQ-skærmen, med ofte stillede spørgsmål og svar
  };
  
  const navigateToAboutUs = () => { //knap til at navigere til Om os
    navigation.navigate('AboutUs'); // Naviger til Om os-skærmen
  };
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Indstillinger - her skal det være muligt for en bruger at finde svar på spørgsmål, logge ud, læse om os, samt foretage andre funktionaliteter, såsom at slå notifikationer til og fra, ændre deres oplysninger, mm.</Text>
      {user && user.email ? ( // Hvis der er en bruger logget ind, vises brugerens email
        <Text>Bruger: {user.email}</Text> // Hvis der ikke er en bruger logget ind, vises teksten "Ikke logget ind"
      ) : (
        <Text>Bruger: Ikke logget ind</Text>
      )}
      <Button title="Log ud" onPress={handleLogout} /> 
      <Button title="Ofte stillede spørgsmål" onPress={navigateToFAQ} />
      <Button title="Om os" onPress={navigateToAboutUs} />
    </View>
  ); 
};

export default SettingsScreen; // Eksporter SettingsScreen, så den kan bruges i App.js