// Denne komponent skal give brugeren valget mellem at logge ind eller at oprette en bruger

import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import GlobalStyles from '../../GlobalStyles';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={GlobalStyles.container}>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        containerStyle={GlobalStyles.buttonContainer}
      />
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')}
        containerStyle={GlobalStyles.buttonContainer}
      />
    </View>
  );
};

export default WelcomeScreen;
