import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const SearchEducation = () => {
  const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState('ungdomsuddannelse');
  const [educationPlace, setEducationPlace] = useState('');
  const [area, setArea] = useState('');

  const [isTypeDropdownVisible, setIsTypeDropdownVisible] = useState(false);
  const educationTypes = ['ungdomsuddannelse', 'videregående uddannelse'];

  const handleSearch = () => {
    // Handle the search logic here based on the selectedType, educationPlace, and area
    // You can implement the search functionality here or call a function to handle it
  };

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToMyFavourites = () => {
    navigation.navigate('MyFavourites');
  };

  const renderEducationTypeItem = ({ item }) => (
    <TouchableOpacity
      style={{ padding: 10 }}
      onPress={() => {
        setSelectedType(item);
        setIsTypeDropdownVisible(false);
      }}
    >
      <Text>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Søg efter uddannelser</Text>
      <Text style={{ fontSize: 16, marginBottom: 20 }}>Kommende funktion: søgning, ikke funktionelt lige nu</Text>

      <View style={{ backgroundColor: 'lightyellow', padding: 10, marginBottom: 20 }}>
        <TextInput
          placeholder="Uddannelsessted"
          style={{ marginBottom: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
          value={educationPlace}
          onChangeText={setEducationPlace}
        />

        <TextInput
          placeholder="Område"
          style={{ marginBottom: 10, paddingHorizontal: 10, borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
          value={area}
          onChangeText={setArea}
        />

        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
          onPress={() => setIsTypeDropdownVisible(true)}
        >
          <Text style={{ paddingHorizontal: 10, paddingVertical: 8 }}>{selectedType}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isTypeDropdownVisible}
          onRequestClose={() => setIsTypeDropdownVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: 'white', width: 200, borderRadius: 5 }}>
              <FlatList
                data={educationTypes}
                renderItem={renderEducationTypeItem}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </Modal>
      </View>

      <TouchableOpacity
        style={{ backgroundColor: 'lightyellow', padding: 10, borderRadius: 5 }}
        onPress={handleSearch}
      >
        <Text>Søg</Text>
      </TouchableOpacity>

      {/* Bottom navigation bar */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
        <TouchableOpacity onPress={navigateToProfile} style={{ marginHorizontal: 20 }}>
          <Feather name="user" size={24} color="blue" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SearchEducation;
