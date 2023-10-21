import React, { useEffect, useState } from 'react';
import { View, Text, Pressable} from 'react-native';
import GlobalStyles  from '../../GlobalStyles';
import { getFirestore} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";


//viser hver enkelt udannelse der er hentet fra databasen
function Education ({adgangskvotient, city, universityName, navn}) {

    return (
        <View style= {GlobalStyles.textBox}>
            <Text style={GlobalStyles.text}>Navn: {navn}</Text>
            <Text style={GlobalStyles.text}>By: {city}</Text>
            <Text style={GlobalStyles.text}>Universitet: {universityName}</Text>
            <Text style={GlobalStyles.text}>Adgangskvotient: {adgangskvotient}</Text>
        </View>
    );
    
}

const FilterEducation = () => {

    //Her skal den hente min profils snit fra databasen
    const [mitSnit, setMitSnit] = useState(10); //nummer er sat til ingenting og ændres når der tastes på appen.


    const [extractedData, setExtractedData] = useState([]);
    const [loading, setLoading] = useState(false);
    const extracted = [];

    async function getMyEducations() { //henter uddannelser som brugeren kan søge ind på. 
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
              console.log(extractedData)
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

    async function getAllEducations() { //henter alle uddannelser i databasen som ovenover undtagen den ikke sammenligner brugerens snit med adgangskvotienten
        setLoading(true);
        const db = getFirestore();
        const q = query(collection(db, "Uddannelser"))
        
            const querySnapshot = await getDocs(q);
           
            try {
                
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    const navn = data.Navn;
                    const lokationer = data.Lokationer;
              
                    for (const city in lokationer) {
                      const universityObject = lokationer[city];
                      const universityName = Object.keys(universityObject)[0];
                      const adgangskvotientObject = universityObject[universityName];
                      
                      if (adgangskvotientObject && adgangskvotientObject.Adgangskvotient) {
                        const adgangskvotient = adgangskvotientObject.Adgangskvotient;
                        extracted.push({
                          navn,
                          city,
                          universityName,
                          adgangskvotient
                        });
                      }
                    }
                  });
                  
              setExtractedData(extracted)
                setLoading(false);
              console.log(extractedData)
            } catch (error) {
                console.error("Error extracting data:", error);
                setLoading(false);
            }
}


    return (
        <View>

            <Pressable style={GlobalStyles.button} mode="contained" onPress={getAllEducations}>
                <Text style={GlobalStyles.text}>Hent Alle uddannelser</Text>
            </Pressable>

            <Pressable style={GlobalStyles.button} mode="contained" onPress={getMyEducations}>
                <Text style={GlobalStyles.text}>Hent uddannelser jeg kan komme ind på</Text>
            </Pressable>

            {loading === true ? //hvis der loades skriver den loading ellers kommer data bare frem. 
            <Text>Loading...</Text>
            
            : (
            extractedData.map((education, index) => { //henter hver uddannelse i extractedData og viser dem
                return <Education
                    key={index}
                    adgangskvotient={education.adgangskvotient}
                    city={education.city}
                    universityName={education.universityName}
                    navn={education.navn}
                />
            }))
        }
        </View>
    );

}

export default FilterEducation;