// AboutUsScreen.js

import React from 'react';
import { View, Text } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Om os - her skal der skrives om os der har udviklet appen, hvordan vi har undersøgt behovet for denne app-løsning, samt give app'en noget integritet, da vi alle selv har været studerende og kunne ønsker at hjælpe andre unge med at finde deres rigtige uddannelse</Text>
      {/* Der skal tilføjes "Om os" indhold her */}
    </View>
  );
};

export default AboutUsScreen;