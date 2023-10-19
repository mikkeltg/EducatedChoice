import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  FlatList,
  Pressable,
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


function EducationInformationScreen(props) {
  const params = props.route.params;
  const educationName = params.educationName; // Få navn på uddannelse fra navigation route parameters
  console.log("Education name from params: ", educationName);
  const [educationInformation, setEducationInformation] = useState(null);


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

        const newData = [];
        querySnapshot.forEach((doc) => {
          newData.push(doc.data());
        });
        setEducationInformation(newData[0]); // indsæt uddannelsesinformation ind i usestate mph. at vise dette til brugeren
        
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

  //I return() udnyttes en prædefineret metode, som firebase stiller til rådighed.
  // Metoden returnerer mailadressen af den aktive bruger.
  // Mailadressen udskrives ved brug af en tekstkomponent.
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
              <Text>Beskrivelse: {educationInformation.Beskrivelse || "Beskrivelse kunne ikke findes."}</Text>
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
                        const universityInfo = areaSpecificEducationInformation[universityName];
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

//Eksport af Loginform, således denne kan importeres og benyttes i andre komponenter
export default EducationInformationScreen;
