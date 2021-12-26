import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from "./navigation/StackNavigation";
import {
  Text,
  StatusBar,
  View,
  ImageBackground,
  Pressable,
  Alert,
  SafeAreaView
} from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Amplify, { Auth, DataStore } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native'
import config from './aws-exports'
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);
LogBox.ignoreLogs(['Possible Unhandled Promise Rejection']);
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true
  }
});
Auth.configure(config);

function App() {

 

  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default withAuthenticator(App);