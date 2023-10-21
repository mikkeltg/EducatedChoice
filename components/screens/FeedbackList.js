import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function FeedbackList() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUddannelse, setFilteredUddannelse] = useState('');
  const [uddannelser, setUddannelser] = useState([]);

  const fetchData = async () => {
    try {
      const db = getFirestore();
      const feedbackCollection = collection(db, 'Feedback');
      let feedbackQuery = query(feedbackCollection);

      if (filteredUddannelse) {
        feedbackQuery = query(feedbackCollection, where('uddannelse', '==', filteredUddannelse));
      }

      const querySnapshot = await getDocs(feedbackQuery);

      const feedbackArray = [];
      querySnapshot.forEach((doc) => {
        const feedbackItem = doc.data();
        feedbackArray.push(feedbackItem);
      });

      setFeedbackData(feedbackArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching feedback:', error);
      setLoading (false);
    }
  };

  useEffect(() => {
    const db = getFirestore();
    const uddannelserCollection = collection(db, 'Uddannelser');

    getDocs(uddannelserCollection).then((querySnapshot) => {
      const uddannelserArray = [];
      querySnapshot.forEach((doc) => {
        uddannelserArray.push(doc.data().Navn);
      });
      setUddannelser(uddannelserArray);
    });
  }, []);

  const handleUddannelseChange = (selectedUddannelse) => {
    setFilteredUddannelse(selectedUddannelse);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Uddannelses Anmeldelser</Text>
      <Picker
        selectedValue={filteredUddannelse}
        onValueChange={(itemValue) => handleUddannelseChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Vælg Uddannelse" value="" />
        {uddannelser.map((uddannelse, index) => (
          <Picker.Item key={index} label={uddannelse} value={uddannelse} />
        ))}
      </Picker>
      <Button
        title="Filtrer på Uddannelse"
        onPress={() => {
          fetchData();
        }}
        style={styles.button}
        color="#CFD7C7"
      />
      {loading ? (
        <Text style={styles.loadingText}>afventer filtrering...</Text>
      ) : (
        <FlatList
          data={feedbackData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.feedbackText}> -  {item.feedback}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 10,
    color: '#40798C',
  },
  picker: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 5,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#CFD7C7',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  feedbackText: {
    fontSize: 18,
  },
});

export default FeedbackList;
