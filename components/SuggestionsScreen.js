// SuggestionsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

// Simuleret data for forslag
const suggestionsData = [
  { id: '1', title: 'Forslag 1' },
  { id: '2', title: 'Forslag 2' },
  { id: '3', title: 'Forslag 3' },
  // Tilføj flere forslag efter behov
];

const SuggestionsScreen = () => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Her kan du hente dine forslag fra en API eller anden datakilde
    // For nuværende bruger vi kun den simulerede data
    setSuggestions(suggestionsData);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Forslag</Text>
      <FlatList
        data={suggestions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.suggestionItem}>
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  suggestionItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default SuggestionsScreen;