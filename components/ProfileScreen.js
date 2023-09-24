import React, { useState } from 'react'; // Added useState
import { View, Text, Button, StyleSheet } from 'react-native';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
// Import the NavigationBar component
import NavigationBar from './NavigationBar';

function ProfileScreen() {
  const [isUserMode, setIsUserMode] = useState(false); // Added state for user mode
  const auth = getAuth();

  // handleLogout håndterer log ud af en aktiv bruger.
  // Metoden er en prædefineret metode, som firebase stiller til rådighed.  https://firebase.google.com/docs/auth/web/password-auth#next_steps
  // Metoden er et asynkront kald.
  const handleLogOut = async () => {
    await signOut(auth).then(() => {
      // Log ud lykkedes.
    }).catch((error) => {
      // Der opstod en fejl.
    });
  };

  // Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger,
  // skal der udprintes en besked om dette igennem en tekstkomponent
  if (!isUserMode) { // Use isUserMode state to toggle between user and development mode
    return (
      <View style={styles.container}>
        <Text>Development Mode: Not logged in</Text>
        <Button onPress={() => setIsUserMode(true)} title="Switch to User Mode" />
      </View>
    );
  }

  // If you are in user mode, the following code will execute
  const user = auth.currentUser;

  //I return() udnyttes en prædefineret metode, som firebase stiller til rådighed.
  // Metoden returnerer mailadressen af den aktive bruger.
  // Mailadressen udskrives ved brug af en tekstkomponent.
  return (
    <View style={styles.container}>
      <Text>Current user: {user ? user.email : 'Not found'}</Text> {/* Check if user is available */}
      <Button onPress={() => handleLogOut()} title="Log out" />

      {/* Include the NavigationBar component at the bottom of the screen */}
      <NavigationBar />
    </View>
  );
}

// Lokal styling til brug i ProfileScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: '5%',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});

//Eksport af ProfileScreen, således denne kan importeres og benyttes i andre komponenter
export default ProfileScreen;
