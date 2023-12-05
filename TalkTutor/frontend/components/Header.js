import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';

const HeaderComponent = ({ title, onProfilePress }) => {
  return (
    <View style={styles.header}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      {/* Logo at Top Left */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Title at Top Middle */}
      <Text style={styles.title}>{title}</Text>

      {/* Profile Icon at Top Right */}
      <TouchableOpacity onPress={onProfilePress}>
        <Image source={require('../assets/profileIcon.png')} style={styles.profileIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10, // Adjust the padding as needed
    backgroundColor: '#fff', // Background color set to white
  },
  logo: {
    width: 30,
    height: 30,
    borderRadius: 15, // Make the image round
    resizeMode: 'cover',
  },
  title: {
    flex: 1, // Allow title to take remaining space
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileIcon: {
    width: 30,
    height: 30,
    borderRadius: 15, // Make the image round
    resizeMode: 'cover',
  },
});

export default HeaderComponent;
