// Denne komponent skal give brugeren valget mellem at logge ind eller at oprette en bruger

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign Up"
        onPress={() => navigation.navigate('SignUp')}
        containerStyle={styles.buttonContainer}
      />
      <Button
        title="Sign In"
        onPress={() => navigation.navigate('SignIn')}
        containerStyle={styles.buttonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    margin: 10,
  },
});

export default WelcomeScreen;
