import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Linking } from 'react-native';

const LandingPage = ({ navigation }) => {
  const handleButtonClick = (option) => {
    if (option === 'Speech Generation') {
      console.log('Handle action for Speech Generation');
      navigation.navigate('SpeechGenerator');
    } else if (option === 'Speech Correction') {
      console.log('Redirecting to Speech Correction Page');
      navigation.navigate('SpeechCorrector');
    }
  };

  const renderImage = (option) => {
    if (option === 'Speech Generation') {
      return require('./assets/SpeechGeneration.png');
    } else if (option === 'Speech Correction') {
      return require('./assets/SpeechCorrection.png');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.box}
        onPress={() => handleButtonClick('Speech Correction')}
      >
        <Image
          source={renderImage('Speech Correction')}
          style={styles.icon}
        />
        <Text style={styles.text}>Speech Correction</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={() => handleButtonClick('Speech Generation')}
      >
        <Image
          source={renderImage('Speech Generation')}
          style={styles.icon}
        />
        <Text style={styles.text}>Speech Generation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  box: {
    borderWidth: 2,
    borderColor: '#c8e1ff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 10, // Add margin top to separate text from the icon
  },
});

export default LandingPage;
