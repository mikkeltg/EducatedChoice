import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

function FeedbackList() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredUddannelse, setFilteredUddannelse] = useState('');
  const [uddannelser, setUddannelser] = useState([]);

  // Function to fetch feedback data based on the selected filter
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
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch "Uddannelse" options from your "Uddannelser" database
    const db = getFirestore();
    const uddannelserCollection = collection(db, 'Uddannelser');

    getDocs(uddannelserCollection).then((querySnapshot) => {
      const uddannelserArray = [];
      querySnapshot.forEach((doc) => {
        uddannelserArray.push(doc.data().Navn); // Replace with the actual field name from your database
      });
      setUddannelser(uddannelserArray);
    });
  }, []);

  // Function to update the filtered "uddannelse" value
  const handleUddannelseChange = (selectedUddannelse) => {
    setFilteredUddannelse(selectedUddannelse);
  };

  return (
    <View>
      <Text>Feedback List</Text>
      <Picker
        selectedValue={filteredUddannelse}
        onValueChange={(itemValue) => handleUddannelseChange(itemValue)}
      >
        <Picker.Item label="Select Uddannelse" value="" />
        {uddannelser.map((uddannelse, index) => (
          <Picker.Item key={index} label={uddannelse} value={uddannelse} />
        ))}
      </Picker>
      <Button
        title="Filter by Uddannelse"
        onPress={() => {
          // Trigger the filter when the button is pressed
          fetchData();
        }}
      />
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={feedbackData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              
              
              <Text>Feedback: {item.feedback}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

export default FeedbackList;
