import { View, Text } from 'react-native'
import React from 'react'
import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { WifiContext } from '../utils/WifiContext';
import { sendValveCommand } from '../utils/wifiService';
// import Background from '../components/Background';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import RNPickerSelect from 'react-native-picker-select';
const screenWidth = Dimensions.get('window').width;

export default function ValvePosition() {

    const setValvePosition = () => {
        const percentageValue = parseInt(selectedPercentage, 10);
        const steps = (percentageValue / 100) * 4000; // Calculate steps based on percentage
        sendValveCommand('set_valve_position', steps);  // Pass both command and value
      };

  return (
    <View>
        
    </View>
  )
}