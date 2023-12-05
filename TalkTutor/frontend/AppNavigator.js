import React from 'react';
import { Image, TouchableOpacity, View, Text, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SpeechCorrector from './components/SpeechCorrectorPage';
import SpeechGenerator from './components/SpeechGeneratorPage';
import History from './components/HistoryPage';
import Account from './components/AccountPage'; // Import the Account page

const Tab = createBottomTabNavigator();

const AppNavigator = ({ navigation }) => {
  const renderHeader = () => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: StatusBar.currentHeight + 10,
      }}
    >
      <Image source={require('./assets/logo.png')} style={{ width: 50, height: 50, borderRadius: 25 }} />
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginHorizontal: 10 }}>TalkTutor</Text>
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => {
          navigation.navigate('Account');
        }}
      >
        <Image source={require('./assets/profileIcon.png')} style={{ width: 30, height: 30, borderRadius: 15 }} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: [
          {
            display: 'flex',
            height: 60, // Adjust the height as needed  
          },
          null,
        ],
      }}
    >
      <Tab.Screen
        name="SpeechCorrector"
        component={SpeechCorrector}
        options={{
          header: renderHeader,
        }}
      />
      <Tab.Screen
        name="SpeechGenerator"
        component={SpeechGenerator}
        options={{
          header: renderHeader,
          
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          header: renderHeader,
          tabBarIcon: () => (
            <Image
              source={require('./assets/History.png')}
              style={{ width: 20, height: 20 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
