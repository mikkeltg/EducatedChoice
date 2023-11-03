import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { View, Text, Switch, TextInput, StyleSheet } from 'react-native';
import PushNotification from 'react-native-push-notification';

//her er der tilføjet mere funktionalitet, brugeren skal kunne slå notifikationer til og fra, slå darkmode til, taste et brugernavn, indstille skriftstørrelse, samt sprog

const SettingsScreen = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [username, setUsername] = useState('');
  const [fontSize, setFontSize] = useState('medium');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  //her er der brugt picker til at vælge skriftstørrelse og sprog, og der er brugt switch til at slå notifikationer og darkmode til og fra
  return (
    <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
      <Text style={isDarkMode ? styles.darkHeader : styles.lightHeader}>Indstillinger</Text>
      
      <View style={styles.setting}>
        <Text>Tænd for Notifikationer</Text>
        <Switch value={notificationsEnabled} onValueChange={(value) => setNotificationsEnabled(value)} />
      </View>

      <View style={styles.setting}>
        <Text>Brugernavn</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
      </View>

      <View style={styles.setting}>
        <Text>Skrift Størrelse</Text>
        <Picker
          selectedValue={fontSize}
          onValueChange={(itemValue) => setFontSize(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Small" value="small" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Large" value="large" />
        </Picker>
      </View>

      <View style={styles.setting}>
        <Text>Sprogvalg</Text>
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Dansk" value="es" />
        </Picker>
      </View>

      <View style={styles.setting}>
        <Text>Tænd Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleDarkMode} />
      </View>
    </View>
  );
};

////TILFØJET STYLING JF. FEEDBACK

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  lightHeader: {
    fontSize: 30,
    textAlign: 'center',
    color: '#40798C',
    marginBottom: 20,
  },
  darkHeader: {
    fontSize: 30,
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 20,
  },
  setting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    padding: 8,
  },
  picker: {
    flex: 1,
  },
});

export default SettingsScreen;
