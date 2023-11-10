import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import GlobalStyles from '../../GlobalStyles';

const SearchEducation = () => {
  const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState('ungdomsuddannelse');
  const [educationPlace, setEducationPlace] = useState('');
  const [area, setArea] = useState('');

  const [isTypeDropdownVisible, setIsTypeDropdownVisible] = useState(false);
  const educationTypes = ['Ungdomsuddannelse', 'Videregående uddannelse'];

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
    <View style={GlobalStyles.container}>
      <Text style={GlobalStyles.header}>Søg efter uddannelser</Text>
      <Text style={GlobalStyles.text}>Kommende funktion: søgning, ikke funktionelt lige nu</Text>
      <Text style={GlobalStyles.text}>Hvilken type uddannelse søger du?</Text>
        <TextInput
          placeholder="Uddannelsessted"
          style={GlobalStyles.inputField}
          value={educationPlace}
          onChangeText={setEducationPlace}
        />

        <TextInput
          placeholder="Område"
          style={GlobalStyles.inputField}
          value={area}
          onChangeText={setArea}
        />

        <TouchableOpacity
          style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5 }}
          onPress={() => setIsTypeDropdownVisible(true)}
        >
          <Text style={GlobalStyles.touchableOpacityStyle}>{selectedType}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={isTypeDropdownVisible}
          onRequestClose={() => setIsTypeDropdownVisible(false)}
        >
          <View style={GlobalStyles.modalStyle}>
            <View style={GlobalStyles.modalContent}>
              <FlatList
                data={educationTypes}
                renderItem={renderEducationTypeItem}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </Modal>


      <Pressable style={GlobalStyles.button} 
      //</View>onPress={() => }
      >
      <Text style={GlobalStyles.buttonText}>{title='Søg'}</Text>
      </Pressable>
    </View>
  );
};

export default SearchEducation;
