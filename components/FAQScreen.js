import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native'; // FlatList er en liste, der kan scrolle
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function FAQScreen() { 
  const [faqs, setFaqs] = useState([]); 
  const db = getFirestore();

  useEffect(() => {
    const fetchData = async () => { // Hent data fra Firestore, firestore regler skal være sat til true for at kunne hente data
      const faqCollection = collection(db, 'oftestilledespørgsmål'); // Hent data fra kollektionen 'oftestilledespørgsmål', hvor jeg har lavet to fields, spørgsmål og svar, dette skal gøres på en anden måde fremover men det virker at hente data heldigvis

      try {
        const querySnapshot = await getDocs(faqCollection); 
        const faqData = [];
        querySnapshot.forEach((doc) => {
          faqData.push({ id: doc.id, ...doc.data() });
        });
        setFaqs(faqData);
      } catch (error) {
        console.error('Fejl ved hentning af data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>Ofte stillede spørgsmål - Denne del af appen, er tiltænkt at hjælpe brugeren således de kan få hjælp med at navigere rundt, hvis der noget de ikke kan finde. Dette skal undersøges vha. spørgeskema, således at brugerne får alle tænkelige spørgsmål besvaret</Text>
      <FlatList
        data={faqs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>Spørgsmål: {item.spørgsmål}</Text>
            <Text>Svar: {item.svar}</Text>
          </View>
        )}
      />
    </View>
  );
}

export default FAQScreen;