// Denne komponent skal indhente uddannelsesdetaljer fra Firestore databasen og fremvise dem til brugeren

// Nødvendige pakker hentes
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView
} from "react-native";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import GlobalStyles from "../../GlobalStyles";

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
  }, [educationName]); // Denne useeffect sørger for, at der bliver fetched nyt info, når brugeren vælger en ny uddannelse
  
  

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
    
    <View>
        {educationInformation && (
          <View>
            <Text style={GlobalStyles.header}>{educationInformation.Navn}</Text>
            <ScrollView style={
                {
                margin:"5%"
                }
              }>
              <Text>{educationInformation.Beskrivelse || "Beskrivelse kunne ikke findes."}</Text>
              <View>
                {educationInformation["Lokationer"] && (Object.keys(educationInformation["Lokationer"]).map((cityName, cityIndex) => {
                  const areaSpecificEducationInformation = educationInformation["Lokationer"][cityName]; // Få informationer fra den enkelte by
                  return (
                    <View key={cityIndex} style={
                      {
                      fontSize: 20,
                      marginTop: 10,
                      marginBottom: 5,
                      }
                    }>
                      <Text style={
                        {
                        fontSize: 18,
                        textAlign: 'center',
                        marginBottom: 5,
                        color: '#40798C',
                        }
                      }>{cityName || "By kunne ikke findes."}</Text>
                      {Object.keys(areaSpecificEducationInformation).map((universityName, uniIndex) => { 
                        const universityInfo = areaSpecificEducationInformation[universityName]; // Få informationer fra det enkelte universitet
                        console.log("University info: ", universityInfo);
                        return (
                          <View key={uniIndex} style={GlobalStyles.documentContainerL}>
                            <Text>Universitet: {universityName || "Universitet kunne ikke findes."}</Text>
                            <Text>Adgangskvotient: {universityInfo["Adgangskvotient"] || "Adgangskvotient kunne ikke findes."}</Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                }))}
            </View>
            </ScrollView>
          </View>
        )}
  </View>
);
}

//Eksport af EducationInformationScreen, således denne kan importeres og benyttes i andre komponenter
export default EducationInformationScreen;
