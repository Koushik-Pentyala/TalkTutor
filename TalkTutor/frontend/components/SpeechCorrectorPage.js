import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SpeechCorrectionPage = () => {
  const [inputText, setInputText] = useState('');
  const [systemResponse, setSystemResponse] = useState('');

  const handleCorrectSpeech = () => {
    // Replace this with your actual logic to correct speech
    // For now, echoing the input as a simple example
    setSystemResponse(`Corrected Speech: ${inputText}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech Correction</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter speech for correction"
        value={inputText}
        onChangeText={(text) => setInputText(text)}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleCorrectSpeech}>
        <Text style={styles.buttonText}>Correct Speech</Text>
      </TouchableOpacity>
      {systemResponse ? (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Corrected Speech:</Text>
          <Text style={styles.responseText}>{systemResponse}</Text>
        </View>
      ) : null}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    width: '100%',
    minHeight: 100,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
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
});

export default SpeechCorrectionPage;
