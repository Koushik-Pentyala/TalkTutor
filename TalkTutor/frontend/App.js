import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './components/LoginPage';
import Login from './components/Login';
import Account from './components/AccountPage';
import SpeechGenerator from './components/SpeechGeneratorPage';
import SpeechCorrector from './components/SpeechCorrectorPage';

import AppNavigator from './AppNavigator';
import LandingPage from './LandingPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage" header="none">
        <Stack.Screen name="SpeechGenerator" component={SpeechGenerator} options={{ headerShown: false }} />
        <Stack.Screen name="SpeechCorrector" component={SpeechCorrector} options={{ headerShown: false }}/>
        <Stack.Screen name="AppNavigator" component={AppNavigator} options={{ headerShown: false }}/>
        <Stack.Screen name="LandingPage" component={LandingPage} options={{ headerShown: false }}/>
        <Stack.Screen name="Account" component={Account} options={{ headerShown: false }}/>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;