import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import StackNavigation from "./navigation/StackNavigation";
import {
  StatusBar,
  ActivityIndicator,
} from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Amplify, { Auth } from 'aws-amplify';
import config from './aws-exports'

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true
  }
});
Auth.configure(config);

function App() {

  const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

  useEffect(() => {
    checkAuthState();
  }, [])

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      console.log('User is signed in');
      setUserLoggedIn('loggedIn');
    } catch (err) {
      console.log('User is not signed in');
      setUserLoggedIn('loggedOut');
    }
  }
 

  return (
    <SafeAreaProvider>
      <StatusBar />
      <NavigationContainer>
        {isUserLoggedIn === 'initializing' && <ActivityIndicator size='large' color='grey' />}
        {isUserLoggedIn !== 'initializing' && <StackNavigation isUserLoggedIn={isUserLoggedIn} />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


export default App;