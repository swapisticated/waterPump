// components/Background.js
import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';

const Background = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/admin.jpg')} // Place your image in the assets folder
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>{children}</View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Optional overlay to darken the background
    padding: 20,
  },
});

export default Background;
