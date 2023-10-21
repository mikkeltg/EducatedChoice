import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function FAQScreen() {
  const [faqs, setFaqs] = useState([]);
  const db = getFirestore();
  const [selectedFAQ, setSelectedFAQ] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const faqCollection = collection(db, 'oftestilledespørgsmål');

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
    <View style={styles.container}>
      <Text style={styles.header}>Ofte Stillede Spørgsmål</Text>
      <Text style={styles.description}>
        Disse spørgsmål er de mest stillede spørgsmål omkring uddannelser. Hvis du ikke finder svar på dit spørgsmål, er du velkommen til at kontakte os. 
      </Text>
      <FlatList
        data={faqs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setSelectedFAQ(selectedFAQ === item.id ? null : item.id);
            }}
          >
            <Text style={styles.buttonText}>{item.spørgsmål}</Text>
            {selectedFAQ === item.id && <Text style={styles.answer}>Svar: {item.svar}</Text>}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#40798C',
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    backgroundColor: '#CFD7C7',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQScreen;
