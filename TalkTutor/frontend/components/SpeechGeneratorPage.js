import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView, StatusBar } from 'react-native';
import * as Speech from 'expo-speech';

import HeaderComponent from './Header';

const SpeechGenerationPage = () => {
  const [inputText, setInputText] = useState('');
  const [systemResponse, setSystemResponse] = useState('');
  const [generationHistory, setGenerationHistory] = useState([
    'Generation Item 1',
    'Generation Item 2',
    'Generation Item 3',
    // ... (additional items)
  ]);

  const handleGenerateSpeech = () => {
    const response = `System Response: ${inputText}`;
    setSystemResponse(response);
    setGenerationHistory((prevHistory) => [response, ...prevHistory]);
    setInputText('');
  };

  const handleVoiceRecognition = async () => {
    try {
      const result = await Speech.recognizeAsync();
      if (result.status === 'final') {
        setInputText(result.transcript);
      }
    } catch (error) {
      console.error('Error in voice recognition:', error);
    }
  };

  useEffect(() => {
    const requestSpeechPermissions = async () => {
      const { status } = await Speech.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error('Speech permissions not granted');
      }
    };
  
    requestSpeechPermissions();
  }, []);s

  return (
    <View style={styles.container}>
      <HeaderComponent title="Speech Generation" onProfilePress={() => console.log('Profile pressed')} />
      <View style={styles.firstSection}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter your text here"
            value={inputText}
            onChangeText={(text) => setInputText(text)}
          />
          <TouchableOpacity style={styles.voiceIcon} onPress={handleVoiceRecognition}>
            <Image source={require('../assets/voiceIcon.png')} style={styles.voiceIconImage} />
          </TouchableOpacity>
        </View>
        {/* Move the button inside the inputContainer */}
        <TouchableOpacity style={styles.button} onPress={handleGenerateSpeech}>
          <Text style={styles.buttonText}>Generate Speech</Text>
        </TouchableOpacity>
        {systemResponse ? (
          <View style={styles.responseContainer}>
            <Text style={styles.responseTitle}>System Response:</Text>
            <Text style={styles.responseText}>{systemResponse}</Text>
          </View>
        ) : null}
      </View>
      <View style={styles.secondSection}>
        <ScrollView>
          {generationHistory.map((item, index) => (
            <Text key={index} style={styles.historyItem}>
              {item}
            </Text>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  firstSection: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row', // Align children horizontally
    alignItems: 'center', // Center items vertically
    marginBottom: 12,
  },
  input: {
    flex: 8, // 80% width for the TextInput
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
  },
  voiceIcon: {
    flex: 2, // 20% width for the voice icon
    marginLeft: 10,
  },
  voiceIconImage: {
    width: '100%', // Make the image fill the container
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: -100, // Added marginTop to move the button just below the input container
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  responseContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseText: {
    fontSize: 16,
    marginTop: 8,
  },
  secondSection: {
    flex: 1,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#3498db',
    padding: 16,
  },
  historyItem: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default SpeechGenerationPage;
