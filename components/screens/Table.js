import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import GlobalStyles from '../../GlobalStyles';

const Table = ({ data }) => {
  return (
    <View style={GlobalStyles.table}>
      <View style={GlobalStyles.header}>
        <Text style={GlobalStyles.headerText}>Uddannelse</Text>
        <Text style={GlobalStyles.headerText}>Snit</Text>
        <Text style={GlobalStyles.headerText}>Universitet</Text>

      </View>
      {data.map((row, index) => ( //henter hver uddannelse i data og viser dem
        <View key={index} style={GlobalStyles.row}>
          <Text style={GlobalStyles.cell}>{row.navn}</Text>
          <Text style={GlobalStyles.cell}>{row.adgangskvotient}</Text>
          <Text style={GlobalStyles.cell}>{row.universityName}</Text>

        </View>
      ))}
    </View>
  );
};



export default Table;
