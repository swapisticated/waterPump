import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AWMS</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard')}
      >
        <Text style={styles.buttonText}>User End</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Dashboard', { role: 'Admin' })}
      >
        <Text style={styles.buttonText}>Admin End</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
  },
  title: {
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#57635A',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
  },
});

export default HomeScreen;
