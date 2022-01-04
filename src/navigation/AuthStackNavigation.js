import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignIn from '../screens/Authentication/SignIn';
import SignUp from '../screens/Authentication/SignUp';
import ConfirmSignUp from '../screens/Authentication/ConfirmSignUp';
import ResetPassword from '../screens/Authentication/ResetPassword';
import ConfirmResetPassword from '../screens/Authentication/ConfirmResetPassword';



const AuthStack = createNativeStackNavigator();

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}} >
      <AuthStack.Screen name='SignIn' component={SignIn} />
      <AuthStack.Screen name='SignUp' component={SignUp} />
      <AuthStack.Screen name='ConfirmSignUp' component={ConfirmSignUp} />
      <AuthStack.Screen name='ResetPassword' component={ResetPassword} />
      <AuthStack.Screen name='ConfirmResetPassword' component={ConfirmResetPassword} />
    </AuthStack.Navigator>
  );
}

export default AuthStackNavigation;