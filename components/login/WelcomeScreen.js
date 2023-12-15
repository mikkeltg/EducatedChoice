// Denne komponent skal give brugeren valget mellem at logge ind eller at oprette en bruger

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import GlobalStyles from '../../GlobalStyles';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={GlobalStyles.container}>
      <Button
        title="Opret ny bruger"
        onPress={() => navigation.navigate('Opret ny bruger')}
        containerStyle={GlobalStyles.buttonContainer}
      />
      <Button
        title="Log ind"
        onPress={() => navigation.navigate('Log ind')}
        containerStyle={GlobalStyles.buttonContainer}
      />
    </View>
  );
};

export default WelcomeScreen;
