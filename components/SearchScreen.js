import React from 'react';
import { View, Text } from 'react-native';
import SearchBar from './SearchBar';

const SearchScreen = () => {
  const handleSearch = (searchText) => {
    // Skriv funktion her
  };

  return (
    <View>
      <Text>Søg efter uddannelser her</Text>
      <SearchBar onSearch={handleSearch} />
    </View>
  );
};

export default SearchScreen;
