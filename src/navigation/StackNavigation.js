import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Games from '../screens/Games';
import Settings from '../screens/Settings';
import SignIn from '../screens/Authentication/SignIn';
import SignUp from '../screens/Authentication/SignUp';
import ConfirmSignUp from '../screens/Authentication/ConfirmSignUp';
import ResetPassword from '../screens/Authentication/ResetPassword';
import ConfirmResetPassword from '../screens/Authentication/ConfirmResetPassword';
import Pregame from '../screens/Pregame';


const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
      <Stack.Screen name='Games' component={Games} options={{headerShown: false}}/>
      <Stack.Screen name='Settings' component={Settings} options={{headerShown: false}}/>
      <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}/>
      <Stack.Screen name='SignUp' component={SignUp} options={{headerShown: false}}/>
      <Stack.Screen name='ConfirmSignUp' component={ConfirmSignUp} options={{headerShown: false}}/>
      <Stack.Screen name='ResetPassword' component={ResetPassword} options={{headerShown: false}}/>
      <Stack.Screen name='ConfirmResetPassword' component={ConfirmResetPassword} options={{headerShown: false}}/>
      <Stack.Screen name='Pregame' component={Pregame} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default StackNavigation;