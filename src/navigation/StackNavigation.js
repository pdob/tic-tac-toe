import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Games from '../screens/Games';
import Settings from '../screens/Settings';
import Pregame from '../screens/Pregame';
import PreOnlineGame from '../screens/PreOnlineGame';
import AuthStackNavigation from './AuthStackNavigation';

const Stack = createNativeStackNavigator();

const StackNavigation = ({ isUserLoggedIn }) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={
      isUserLoggedIn === 'loggedIn' ? 'Home' : 'Root'
      }
    >
      <Stack.Screen name='Root' component={AuthStackNavigation} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Games' component={Games} />
      <Stack.Screen name='Settings' component={Settings} />
      <Stack.Screen name='Pregame' component={Pregame} />
      <Stack.Screen name='PreOnlineGame' component={PreOnlineGame} />
    </Stack.Navigator>
  );
}

export default StackNavigation;