import React, { useEffect, useState } from 'react';
import { View, Text, Pressable} from 'react-native';
import GlobalStyles  from '../../GlobalStyles.js';
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ScrollView } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import Table from './Table.js'

//viser hver enkelt udannelse der er hentet fra databasen
function Education ({adgangskvotient, city, universityName, navn, addEducationToCompare}) {
  const [checked, setChecked] = useState(false);
  
    function toggleChecked({navn, universityName, adgangskvotient}) {
      setChecked(!checked); //sætter checked til det modsatte af hvad det er
  
      addEducationToCompare({navn, universityName, adgangskvotient, checked}) //tilføjer uddannelsen til listen over uddannelser der skal sammenlignes
    }


    return (
        <View style= {GlobalStyles.textBox}>
            <Text style={GlobalStyles.text}>Navn: {navn}</Text>
            <Text style={GlobalStyles.text}>By: {city}</Text>
            <Text style={GlobalStyles.text}>Universitet: {universityName}</Text>
            <Text style={GlobalStyles.text}>Adgangskvotient: {adgangskvotient}</Text>
            <CheckBox
              title="Sammenlign"
              checked={checked}
              onPress={() => toggleChecked({navn, universityName, adgangskvotient})}
            />
          </View>
            );
    
}


const FilterEducation = () => {
  const [educations, setEducations] = useState([])

    useEffect(() => {
      setEducations([])
    }, []);

    //Her skal den hente min profils snit fra databasen
    const [mitSnit, setMitSnit] = useState(10); //nummer er sat til ingenting og ændres når der tastes på appen.


    const [extractedData, setExtractedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const extracted = [];

    async function getMyEducations() { //henter uddannelser som brugeren kan søge ind på. 
      setEducations([])  
      setCompare(false)
      setLoading(true);
        const auth = getAuth(); 
        const user = auth.currentUser;

        if (user) {
            const db = getFirestore();
            const userDocRef = doc(db, "users", user.uid); //finder den bruger der er logget ind.
    
            try {
              const docSnap = await getDoc(userDocRef); //henter brugerens data fra databasen
              if (docSnap.exists()) {
                setMitSnit(docSnap.data().snit) //sætter mitSnit til at være brugerens snit
                const db = getFirestore();
        const q = query(collection(db, "Uddannelser")) //finder alle uddannelser i databasen
        
            const querySnapshot = await getDocs(q); //henter alle uddannelser i databasen
                
            try {
                
                querySnapshot.forEach((doc) => { //tager hver uddannelse og finder navn og lokation. 
                    const data = doc.data();
                    const navn = data.Navn;
                    const lokationer = data.Lokationer;
              
                    for (const city in lokationer) { //tager hver lokation og finder universitetets navn og adgangskvotient.
                      const universityObject = lokationer[city];
                      const universityName = Object.keys(universityObject)[0];
                      const adgangskvotientObject = universityObject[universityName];
                      
                      if (adgangskvotientObject && adgangskvotientObject.Adgangskvotient) { //tjekker om der er en adgangskvotient
                        const adgangskvotient = adgangskvotientObject.Adgangskvotient; //sætter adgangskvotient til at være adgangskvotienten for uddannelsen
                        if (adgangskvotient < mitSnit || adgangskvotient === 'AO') { //tjekker om brugerens snit er højere end adgangskvotienten
                        extracted.push({ //tilføjer uddannelsen til listen over uddannelser brugeren kan søge ind på
                          navn,
                          city,
                          universityName,
                          adgangskvotient
                        });
                    }
                      }
                    }
                  });
                  
              setExtractedData(extracted) //sætter extractedData til at være listen over uddannelser brugeren kan søge ind på når forloopet er færdigt
                setLoading(false);
             
            } catch (error) {
                console.error("Error extracting data:", error);
                setLoading(false);
            }
              } else {
                console.log("Profile not found in Firestore");
              }
            } catch (error) {
              console.error("Error fetching user profile:", error);
            }
          }
        
        
     }
    
  //henter alle uddannelser i databasen som brugeren har "favourited", altså dem hvor brugerens UID er i "Fav" arrayet
    async function getAllEducations() { 
      setEducations([])  
      setCompare(false)
      setLoading(true);

      try {
        const auth = getAuth();
        const userUID = auth.currentUser ? auth.currentUser.uid : null;

        if (!userUID) {
          //handle the case where the user is not authenticated
          console.error("User not authenticated.");
          setLoading(false);
          return;
      }

        const db = getFirestore();
        const q = query(collection(db, "Uddannelser"))
        
            const querySnapshot = await getDocs(q);

            const extracted = [];
              // Extract the data from each document
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const navn = data.Navn;
                    const lokationer = data.Lokationer;
                    // Extract the data from each location
                    for (const city in lokationer) {
                      const universityObject = lokationer[city];
                      const universityName = Object.keys(universityObject)[0];
                      const adgangskvotientObject = universityObject[universityName];
                      
        // Tjek om brugerens UID er med i "Fav" array
        if (adgangskvotientObject && adgangskvotientObject.Fav && adgangskvotientObject.Fav.includes(userUID)) {
          if (adgangskvotientObject.Adgangskvotient) {
            const adgangskvotient = adgangskvotientObject.Adgangskvotient;
            // Add the extracted data to the array
            extracted.push({
              navn,
              city,
              universityName,
              adgangskvotient
            });
          }
        }
      }
    });
              // Update the state with the extracted data
              setExtractedData(extracted)
                setLoading(false);
            // Handle errors
            } catch (error) {
                console.error("Error extracting data:", error);
                setLoading(false);
            }
}
  
  const [compare, setCompare] = useState(false) //sætter compare til false som standard

  function compareEducations () {
    setExtractedData([]) //sætter extractedData til ingenting
    setCompare(true) //sætter compare til true så tabellen vises
    

  }



function addEducationToCompare({navn, universityName, adgangskvotient, checked}) {
  if(checked === false ){ //hvis uddannelsen ikke er valgt til at blive sammenlignet tilføjes den til listen over uddannelser der skal sammenlignes
  setEducations([...educations, {navn, universityName, adgangskvotient}])
  } else { //hvis uddannelsen er valgt til at blive sammenlignet fjernes den fra listen over uddannelser der skal sammenlignes
    const index = educations.findIndex((x) => x.navn === navn); //finder indexet for uddannelsen
    const newEducations = [...educations];
    newEducations.splice(index, 1); //fjerner uddannelsen fra listen
    setEducations(newEducations);
  
  }
  
}

    return (
        <View>
          <ScrollView>
            <Pressable style={GlobalStyles.button} mode="contained" onPress={getAllEducations}>
                <Text style={GlobalStyles.text}>Hent favoritter</Text>
            </Pressable>

            <Pressable style={GlobalStyles.button} mode="contained" onPress={getMyEducations}>
                <Text style={GlobalStyles.text}>Hent uddannelser jeg kan komme ind på</Text>
            </Pressable>

            <Pressable style={GlobalStyles.button} mode="contained" onPress={compareEducations}>
                <Text style={GlobalStyles.text}>Sammenlign valgte uddannelser</Text>
            </Pressable>

            {loading === true ? //hvis der loades skriver den loading ellers kommer data bare frem. 
            <Text>Loading...</Text>
            
            : (
            extractedData.sort().map((education, index) => { //henter hver uddannelse i extractedData og viser dem
                return <Education
                    key={index}
                    adgangskvotient={education.adgangskvotient}
                    city={education.city}
                    universityName={education.universityName}
                    navn={education.navn}
                    addEducationToCompare={addEducationToCompare}
                />
            }))
        }
        {compare ? <Table data={educations} /> : null} 
        {/* hvis compare er true vises tabellen ellers vises den ikke */}
  
     
    
        </ScrollView>
        </View>
    );

}

export default FilterEducation;