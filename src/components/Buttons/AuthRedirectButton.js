import React from 'react';
import { Text, Pressable } from 'react-native';

const AuthRedirectButton = ({ title, onPress }) => (
  <Pressable style={{padding: 10}} onPress={onPress}>
    <Text style={{color: 'white', fontWeight: 'bold'}}>{title}</Text>
  </Pressable>
)

export default AuthRedirectButton;