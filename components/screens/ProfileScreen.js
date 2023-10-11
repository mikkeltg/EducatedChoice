import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  //handleLogout håndterer log ud af en aktiv bruger.
  //Metoden er en prædefineret metode, som firebase stiller tilrådighed  https://firebase.google.com/docs/auth/web/password-auth#next_steps
  //Metoden er et asynkrontkald.
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    // Function to fetch additional user profile information
    const fetchUserProfile = async () => {
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid); // Updated collection name to 'users'

        try {
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            setProfileInfo(docSnap.data());
          } else {
            console.log("Profile not found in Firestore");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleLogOut = async () => {
    await signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.error("Error during logout:", error);
      });
  };

  //Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger,
  //skal der udprintes en besked om dette igennem en tekstkomponent
  if (!auth.currentUser) {
    return (
      <View>
        <Text>Not found</Text>
      </View>
    );
  }

  //I return() udnyttes en prædefineret metode, som firebase stiller til rådighed.
  // Metoden returnerer mailadressen af den aktive bruger.
  // Mailadressen udskrives ved brug af en tekstkomponent.
  return (
    <View style={styles.container}>
      <Text>Current user: {user.email}</Text>
      {profileInfo && (
        <View>
          <Text>Name: {profileInfo.navn || "Not available"}</Text>
          <Text>Snit: {profileInfo.snit || "Not available"}</Text>
          <Text>
            Ønsket lokation: {profileInfo["ønsket lokation"] || "Not available"}
          </Text>
          <Text>
            Ungdomsuddannelse:{" "}
            {profileInfo.ungdomsuddannelse || "Not available"}
          </Text>
        </View>
      )}
      <Button onPress={() => handleLogOut()} title="Log out" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: "5%",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
});

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default ProfileScreen;
