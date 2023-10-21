import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AboutUsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Om Os</Text>
      <Text style={styles.text}>
        Velkommen til vores app! Vi er her for at hjælpe dig med at træffe uddannelsesmæssige valg.
        Har du spørgsmål eller brug for hjælp, er du velkommen til at kontakte os.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFD7C7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#40798C',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default AboutUsScreen;
