import React, { useState, useEffect } from "react";
import { View, Text, Button, Pressable, TextInput } from "react-native";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import GlobalStyles from "../../GlobalStyles";

function ProfileScreen() {
  const auth = getAuth();
  const user = auth.currentUser;
  //handleLogout håndterer log ud af en aktiv bruger.
  //Metoden er en prædefineret metode, som firebase stiller tilrådighed  https://firebase.google.com/docs/auth/web/password-auth#next_steps
  //Metoden er et asynkrontkald.
  const [profileInfo, setProfileInfo] = useState(null);
  const [grade, setGrade] = useState(""); //nummer er sat til ingenting og ændres når der tastes på appen. 
  const [newGrade, setNewGrade] = useState(false);
  
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

  useEffect(() => {
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
        <Text>Bruger ikke fundet</Text>
      </View>
    );
  }

  async function saveGrade() { //async function der gemmer snit til databasen
      //tjekker brugeren er logget ind
      if (user) {
        try{
          const db = getFirestore();
          const userRef = doc(db, "users", user.uid); //finder den bruger der er logget ind. 
          let snit = parseFloat(grade.replace(',', '.')) // Laver snit om til tal med korrekt komma
          await updateDoc(userRef, {
              snit: snit//opdaterer snit i databasen med det indtastede snit
            })
          console.log("Snit opdateret");
        } catch (error){
          console.log("Fejl under opdatering af karakter: " + error);
        }
      } else {
          console.error('No user logged in');
      }
  }
  
  useEffect(() => {
    //Hvis grade er et tal, så gemmer den det i databasen og henter brugerens profil oplysninger igen og sætter newGrade til true
    if(!isNaN(parseFloat(grade))){
      saveGrade();
      fetchUserProfile();
      setNewGrade(true);
    } else {
      console.log("Not a number");
    }
  }, [grade]);

 //Hvis newGrade er true, så udskrives en tekst der fortæller at snittet er gemt
  const newGradeText = () => {
    return (
      <Text style={GlobalStyles.textAdvise}>
        <Text style={{fontWeight: "bold"}}>{profileInfo.snit} </Text><Text>er gemt som nyt karaktergennemsnit</Text>
      </Text>
    )
  };

  //I return() udnyttes en prædefineret metode, som firebase stiller til rådighed.
  // Metoden returnerer mailadressen af den aktive bruger.
  // Mailadressen udskrives ved brug af en tekstkomponent.
  return (
    <View style={GlobalStyles.textContainer}>
      {profileInfo && (
        <View>
          <Text style={GlobalStyles.text}>Email: <Text style={{fontWeight: "bold"}}>{profileInfo.email || "Not available"}</Text></Text>
          <Text style={GlobalStyles.text}>Navn: <Text style={{fontWeight: "bold"}}>{profileInfo.name || "Not available"}</Text></Text>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignContent: "center"
          }}>
            
            {/*Her er der lavet en ternary operator, som tjekker om der er et snit i databasen. 
            Hvis der er, så udskrives det, ellers udskrives en tekst der fortæller at der ikke er noget snit i databasen. */}
            <Text style={GlobalStyles.text}>Karaktergennemsnit:</Text>
            <TextInput style={GlobalStyles.numberInput}
                  placeholder={profileInfo.snit.toString() || "Tast snit"}
                  inputMode="text"
                  keyboardType="text"
                  value={grade}
                  onChangeText={setGrade}
              /> 
          </View>
          {newGrade ? newGradeText(): ""}
          {/* Nedenstående fjernet efter feedback */}
          {/* <Text style={GlobalStyles.text}>Ønsket lokation: {profileInfo.location || "Not available"}</Text> */}
        </View>
      )}
     
      

    </View>
  );
}

export default ProfileScreen;
