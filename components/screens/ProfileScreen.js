import React, { useState, useEffect } from "react";
import { View, Text, Button, Pressable } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import GlobalStyles from "../../GlobalStyles";

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
        const userDocRef = doc(db, "users", user.uid);

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

  const checkForUpdates = async () => {
    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    try {
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setProfileInfo(docSnap.data());
      } else {
        console.log("Profile not found in Firestore");
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
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
   // <View style={GlobalStyles.backgroundColor}>
    <View style={GlobalStyles.textContainer}>
      {profileInfo && (
        <View>
          <Text style={GlobalStyles.header}>Profile information</Text>
          <Text style={GlobalStyles.profileTextStyle}>Email: {profileInfo.email || "Not available"}</Text>
          <Text style={GlobalStyles.profileTextStyle}>Name: {profileInfo.name || "Not available"}</Text>
          <Text style={GlobalStyles.profileTextStyle}>Snit: {profileInfo.snit || "Not available"}</Text>
          <Text style={GlobalStyles.profileTextStyle}>Ønsket lokation: {profileInfo.location || "Not available"}</Text>
        </View>
      )}
      <Pressable style={GlobalStyles.button} onPress={() => checkForUpdates()}>
      <Text style={GlobalStyles.buttonText}>{title='Opdatér'}</Text>
      </Pressable>

      <Pressable style={GlobalStyles.button} onPress={() => handleLogOut()}>
      <Text style={GlobalStyles.buttonText}>{title='Log ud'}</Text>
      </Pressable>

    </View>
    //</View>
  );
}

export default ProfileScreen;
