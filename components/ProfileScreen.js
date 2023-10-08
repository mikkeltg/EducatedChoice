import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
//import react navigation
import { useNavigation } from "@react-navigation/native"; // Import navigation hook
import { Feather } from "@expo/vector-icons";

function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  //handleLogout håndterer log ud af en aktiv bruger.
  //Metoden er en prædefineret metode, som firebase stiller tilrådighed  https://firebase.google.com/docs/auth/web/password-auth#next_steps
  //Metoden er et asynkrontkald.
  const navigation = useNavigation(); // Initialize navigation hook
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

  
    // Button to navigate to MyFavourites screen
    const navigateToMyFavourites = () => {
      navigation.navigate("MyFavourites"); // Use the navigate function to go to MyFavourites screen
    };

    //Button to navigate to SearxhEducation screen
    const navigateToSearchEducation = () => {
      navigation.navigate("SearchEducation"); // Use the navigate function to go to SearchEducation screen
    };

    //Login button
    const navigateToLogin = () => {
      navigation.navigate("LoginForm"); // Use the navigate function to go to Login screen
    };

  //I return() udnyttes en prædefineret metode, som firebase stiller til rådighed.
  // Metoden returnerer mailadressen af den aktive bruger.
  // Mailadressen udskrives ved brug af en tekstkomponent.
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Profil</Text> */}
      
      {/* Her hentes profileinfo fra brugerens profil i firestore, hvis ikke informationen er udfyldt vises "Not Available" */}
      {profileInfo && (
        <View>
          <Text style={styles.text}>Email: {user.email}</Text>
          <Text style={styles.text}>Name: {profileInfo.name}</Text>
          <Text style={styles.text}>Snit: {profileInfo.snit}</Text>
          <Text style={styles.text}>Ønsket lokation: {profileInfo["ønsket lokation"] || "Not available"}</Text>
          <Text style={styles.text}>Ungdomsuddannelse:{" "} {profileInfo.ungdomsuddannelse || "Not available"}</Text>
        </View>
      )}

     {/* Button to navigate to MyFavourites screen
     <TouchableOpacity
        style={styles.myButton}
        onPress={navigateToMyFavourites} // Use the function to navigate
      >
        <Text style={styles.buttonText}>Mine gemte uddannelser</Text>
      </TouchableOpacity>

      {/* Button to navigate to SearchEducation screen */}
      {/* <TouchableOpacity
        style={styles.myButton}
        onPress={navigateToSearchEducation} // Use the function to navigate
      >
        <Text style={styles.buttonText}>Søg efter uddannelser</Text>
      </TouchableOpacity> */}

      {/* Button to navigate to Login screen */}
      {/* <TouchableOpacity
        style={styles.myButton}
        onPress={navigateToLogin} // Use the function to navigate
      >
        <Text style={styles.buttonText}>Login</Text>
      // </TouchableOpacity> */}
      
       {/* Bottom navigation bar */}
       <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={navigateToSearchEducation} style={{ marginHorizontal: 20 }}>
          <Feather name="search" size={24} color="blue" />
          
        </TouchableOpacity>

        <TouchableOpacity onPress={navigateToMyFavourites} style={{ marginHorizontal: 20 }}>
          <Feather name="heart" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    

      {/* Log out button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => handleLogOut()}
      >
        <Text style={styles.logoutText}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    //make text colour pastel green
    color: "green",
   // backgroundColor: "lightgreen",
    padding: 0,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    borderRadius: 5,
  },
  myButton: {
    backgroundColor: "lightyellow",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  logoutButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

//Eksport af ProfileScreen, således denne kan importeres og benyttes i andre komponenter
export default ProfileScreen;
