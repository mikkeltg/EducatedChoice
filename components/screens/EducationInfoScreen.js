// Denne komponent skal indhente uddannelsesdetaljer fra Firestore databasen og fremvise dem til brugeren
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
  updateDoc,
  getDoc
} from "firebase/firestore";
import { getAuth, useAuth } from "firebase/auth";
import GlobalStyles from "../../GlobalStyles";
import getUserAverageGrades from "../services/GetUserGrades";

// Selve komponenten, der eksporteres til App.js
function EducationInformationScreen(props) {
  const params = props.route.params; // Argumenterne/parametrene i form af et uddannelsesnavn givet af brugeren i FilterEducationType.js
  const educationName = params.educationName; // Få navn på uddannelse fra navigation route parameters
  const [educationInformation, setEducationInformation] = useState(null); // usestate, hvori de senere indhentede uddannelsesdetaljer gemmes
  


    // Funktion der henter information om den enkelte uddannelse
  const fetchEducationInformation = async () => {
    try {
        console.log("Fetching data for education: ", educationName);
        const db = getFirestore();
        const uddannelserRef = collection(db, "Uddannelser"); // Reference til uddannelser i DB
        const q = query( // Query der henter uddannelsesinformation for den valgte uddannelse
          uddannelserRef,
          where(`Navn`, "==", educationName)
        );
        const querySnapshot = await getDocs(q);

        const newData = []; // Array, hvori uddannelesdetaljer midlertidigt gemmes
        querySnapshot.forEach((doc) => {
          newData.push(doc.data()); 
        });
        setEducationInformation(newData[0]); // indsæt uddannelsesinformation fra midlertidigt array ind i usestate variabel mph. at tilgå disse senere
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
  

  useEffect(() => {
    fetchEducationInformation();
    (async () => {
      const grades = await getUserAverageGrades();
      if (typeof grades == "number") {
        setUserGradeAverage(grades)
      } else{
        console.log("Error getting user grades");
      }
    })();
  }, [educationName]); // Denne useeffect sørger for, at der bliver fetched nyt info, når brugeren vælger en ny uddannelse
  
  const [currentUserUID, setCurrentUserUID] = useState(null); // usestate, hvori den aktive brugers UID gemmes
  const [userGradeAverage, setUserGradeAverage] = useState(null);  // usestate, hvori den aktive brugers gennemsnitlige karakter gemmes

  

  // Funktion der håndterer, når brugeren trykker på en favoritknap
    const handleFavButtonClick = async (cityName, universityName) => {
      //Make array called Fav if it does not exist with current users UID as a string
      //If it does exist, check if the current users UID is in the array
      //If it is, remove it
      //If it is not, add it
      try{
        const auth = getAuth();
        const userUID = auth.currentUser.uid;
        // Make a copy of the educationInformation to update the state
        const updatedEducationInformation = { ...educationInformation };
    
        // Find the specific university
        const universitiesInCity = updatedEducationInformation["Lokationer"][cityName];
        const universityInfo = universitiesInCity[universityName];
        
        // Toggle the user's UID in and out of the "Fav" array
        if (universityInfo["Fav"] && universityInfo["Fav"].includes(userUID)) {
          // User UID is already in "Fav" array, remove it
          universityInfo["Fav"] = universityInfo["Fav"].filter(uid => uid !== userUID);
        } else {
          // User UID is not in "Fav" array, add it
          universityInfo["Fav"] = [...(universityInfo["Fav"] || []), userUID];
        }

        // Update the state with the modified educationInformation
        setEducationInformation(updatedEducationInformation);
  
        // Update the Firestore database with the modified information
        const db = getFirestore();
        const uddannelserRef = collection(db, "Uddannelser");
        const q = query(uddannelserRef, where("Navn", "==", educationName));
        const querySnapshot = await getDocs(q);
  
        querySnapshot.docs.forEach(async (doc) => {
          await updateDoc(doc.ref, { Lokationer: updatedEducationInformation["Lokationer"] });
        });

      } catch (error) {
        console.error("Error handling Fav button click:", error);
      }
    };

  useEffect(() => {
    const auth = getAuth();
    if (auth.currentUser) {
      setCurrentUserUID(auth.currentUser.uid);
    }
  }, []); 

  //Hvis der af en eller anden grund ikke skulle være muligt at fremfinde den aktive bruger,
  //skal der udprintes en besked om dette igennem en tekstkomponent
  if (!educationInformation) {
    return (
      <View>
        <Text>Not found</Text>
      </View>
    );
  }

  // Nedenstående kode viser brugeren uddannelsesdetaljer indhentet fra funktionen fetchEducationInformation og som er gemt i usestate educationInformation.
  // Der vises hhv. uddannelsesnavnet, beskrivelse, byer, hvori uddannelsen findes, de enkelte uddannelser i disse byer, samt adgangskvotienter for disse universiteter. 
  return (
    
<SafeAreaView>
  {educationInformation && (
    <View>
      <Text style={{ fontSize: 22, marginTop: 20, alignSelf: "center"}}>{educationInformation.Navn}</Text>
      <ScrollView style={{ margin: "5%" }}>
        {educationInformation.Fagområde && <Text style={GlobalStyles.text}>{"📚 Studiets fagområde: " + educationInformation.Fagområde}</Text>}
        {educationInformation.Løn && <Text style={GlobalStyles.text}>{"💸 Gennemsnitlig månedsløn som færdiguddannet: " + educationInformation.Løn}</Text>}
        <Text>{educationInformation.Beskrivelse || "Beskrivelse kunne ikke findes."}</Text>
        <View>
          {educationInformation["Lokationer"] &&
            Object.keys(educationInformation["Lokationer"]).sort().map((cityName, cityIndex) => {
              const areaSpecificEducationInformation = educationInformation["Lokationer"][cityName]; // Få informationer fra den enkelte by
              return (
                <View key={cityIndex} style={{ fontSize: 20, marginTop: 10, marginBottom: 5 }}>
                  <Text style={{ fontSize: 18, textAlign: 'center', marginBottom: 5, color: '#40798C' }}>
                    {cityName || "By kunne ikke findes."}
                  </Text>
                  {Object.keys(areaSpecificEducationInformation).map((universityName, uniIndex) => {
                    const universityInfo = areaSpecificEducationInformation[universityName]; // Få informationer fra det enkelte universitet
                    const isCurrentUserFav = universityInfo["Fav"] && universityInfo["Fav"].includes(currentUserUID); // Tjek om den aktive bruger har universitetet som favorit
                    console.log("University info: ", universityInfo);
                    return (
                      <View key={uniIndex} style={GlobalStyles.documentContainerL}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: "center"}}>
                          <View>
                            <Text>Universitet: {universityName || "Universitet kunne ikke findes."}</Text>
                            <Text>Adgangskvotient: <Text style={userGradeAverage && (universityInfo["Adgangskvotient"] > userGradeAverage ? {color: "red"} : {color: "green"})}>{universityInfo["Adgangskvotient"] || "Adgangskvotient kunne ikke findes."}</Text></Text>
                          </View>
                          {/* Her vises en favoritknap, som brugeren kan trykke på for at tilføje eller fjerne universitetet som favorit */}
                          <TouchableOpacity onPress={() => handleFavButtonClick(cityName, universityName)}>
                            <Text style={{ alignSelf: "center"}}>{isCurrentUserFav ? '❤️' : '🤍'} {universityInfo["Fav"] ? universityInfo["Fav"].length : 0}</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    );
                  })}
                </View>
              );
            })}
        </View>
      </ScrollView>
    </View>
  )}
</SafeAreaView>

);
}

//Eksport af EducationInformationScreen, således denne kan importeres og benyttes i andre komponenter
export default EducationInformationScreen;
