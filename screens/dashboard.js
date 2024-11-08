import React, { useContext, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { WifiContext } from '../utils/WifiContext';
import { sendValveCommand } from '../utils/wifiService';
// import Background from '../components/Background';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import RNPickerSelect from 'react-native-picker-select';
const screenWidth = Dimensions.get('window').width;

const Dashboard = ({ navigation }) => {
  const { flowRate, totalLitersUsed, motorStopped } = useContext(WifiContext);
  const [valveOpen, setValveOpen] = useState(false);
  const [threshold, setThreshold] = useState('1');
  const [selectedPercentage, setSelectedPercentage] = useState('50'); // State for selected percentage

 const toggleValve = () => {
  const newStatus = !valveOpen;
  setValveOpen(newStatus);
  const command = newStatus ? 'OPEN_VALVE' : 'CLOSE_VALVE';
  sendValveCommand(command);  // Only pass the command here
};


  const sendThreshold = () => {
    const thresholdValue = parseFloat(threshold);
    if (!isNaN(thresholdValue) && thresholdValue > 0) {
      sendValveCommand({ command: 'set_threshold', value: thresholdValue });
    } else {
      alert('Please enter a valid positive number for the threshold.');
    }
  };

  const setValvePosition = () => {
    const percentageValue = parseInt(selectedPercentage, 10);
    const steps = (percentageValue / 100) * 4000; // Calculate steps based on percentage
    sendValveCommand('set_valve_position', steps);  // Pass both command and value
  };
  
  

  return (
      <View style={styles.container}>
        {/* Valve Position Dropdown Tile */}
        <View style={[styles.tile, styles.fullWidthTile]}>
          <Text style={styles.metric}>Set Valve Position</Text>
          <Picker
            selectedValue={selectedPercentage}
            onValueChange={(itemValue) => setSelectedPercentage(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="0%" value="0" />
            <Picker.Item label="25%" value="25" />
            <Picker.Item label="50%" value="50" />
            <Picker.Item label="75%" value="75" />
            <Picker.Item label="100%" value="100" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={setValvePosition}>
            <Text style={styles.buttonText}>Set Valve Position</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          {/* Threshold Input Tile */}
          <View style={styles.tile}>
            <Text style={styles.metric}> Usage limit (L)</Text>
            <TextInput
              style={styles.input}
              placeholder="Threshold (Liters)"
              placeholderTextColor="#888"
              keyboardType="numeric"
              value={threshold}
              onChangeText={setThreshold}
            />
            <TouchableOpacity style={styles.button} onPress={sendThreshold}>
              <Text style={styles.buttonText}>Set Threshold</Text>
            </TouchableOpacity>
          </View>

          {/* Flow Rate Tile */}
          <View style={styles.tile}>
            <Text style={styles.metric}>Flow Rate</Text>
            <Text style={styles.value}>{flowRate.toFixed(2)} L/m</Text>
          </View>
        </View>

        <View style={styles.row}>
          {/* Total Water Used Tile */}
          <View style={styles.tile}>
            <Text style={styles.metric}>Total Water Used</Text>
            <Text style={styles.value}>{totalLitersUsed.toFixed(2)} L </Text>
          </View>

          {/* Valve Status Tile */}
          <View style={styles.tile}>
            <Text style={styles.metric}>Valve Status</Text>
            <Text style={[styles.value, motorStopped ? styles.stopped : styles.running]}>
              {motorStopped ? 'Closed' : 'Open'}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          {/* Toggle Valve Button Tile */}
          <View style={[styles.tile, styles.fullWidthTile]}>
            <TouchableOpacity style={styles.button} onPress={toggleValve}>
              <Text style={styles.buttonText}>
                {valveOpen ? 'Close Valve' : 'Open Valve'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Navigation to Statistics Tile */}
          <View style={[styles.tile, styles.fullWidthTile]}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Statistics')}>
              <Text style={styles.buttonText}>Statistics</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 30,
    backgroundColor:'#181818'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: screenWidth - 20,
    marginBottom: 10,
  },
  tile: {
    flex: 1,
    backgroundColor: '#252525',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidthTile: {
    width: screenWidth - 40,
  },
  metric: {
    fontSize: 18,
    color: '#AAAAAA',
    marginBottom: 10,
    textAlign: 'center',
  },
  value: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 10,
    color: '#FFF',
    fontSize: 16,
    width: '100%',
    marginBottom: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#57635A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stopped: {
    color: '#E74C3C',
  },
  running: {
    color: '#2ECC71',
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#181818',
    borderRadius: 8,
    marginBottom: 10,
  },
});

export default Dashboard;
