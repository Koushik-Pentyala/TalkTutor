import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const TopBar = ({ navigation, title }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.logoContainer}
        onPress={() => {
          // Add logic to navigate to the home or main screen
          navigation.navigate('Home'); // Replace 'Home' with the actual screen name
        }}
      >
        <Image source={require('../assets/icon.png')} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.profileIconContainer}
        onPress={() => {
          // Add logic to navigate to the profile screen or show a modal
          navigation.navigate('Profile'); // Replace 'Profile' with the actual screen name
        }}
      >
        <Image source={require('../assets/icon.png')} style={styles.profileIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: '#3498db', // Change the background color as needed
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
  },
  title: {
    fontSize: 18,
    color: '#fff', // Change the text color as needed
    fontWeight: 'bold',
  },
  profileIconContainer: {},
  profileIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
});

export default TopBar;
