import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';


const SignInUpButton = ({ title, onPress }) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.text}>{title}</Text>
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    width: '90%',
    backgroundColor: '#1c313a',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 0.5,
    bottom: 10
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  }
})

export default SignInUpButton;