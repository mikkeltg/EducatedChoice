import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function NavigationBar() {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToSearch = () => {
    navigation.navigate('Search');
  };

  const navigateToSuggestions = () => {
    navigation.navigate('Suggestions');
  };

  const navigateToSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navbarItem} onPress={navigateToProfile}>
        <Ionicons name="person" size={24} color="black" />
        <Text style={styles.navbarText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarItem} onPress={navigateToSearch}>
        <Ionicons name="search" size={24} color="black" />
        <Text style={styles.navbarText}>Search</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarItem} onPress={navigateToSuggestions}>
        <Ionicons name="notifications" size={24} color="black" />
        <Text style={styles.navbarText}>Suggestions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navbarItem} onPress={navigateToSettings}>
        <Ionicons name="settings" size={24} color="black" />
        <Text style={styles.navbarText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#C9E4CA',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navbarItem: {
    alignItems: 'center',
  },
  navbarText: {
    color: 'black',
  },
});

export default NavigationBar;