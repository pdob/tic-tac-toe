import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const MenuButton = ({ onPress, title }) => (
  <Pressable 
    onPress={onPress} 
    style={styles.button}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
)

const styles = StyleSheet.create({
  button: {
    width: '80%',
    backgroundColor: '#1c313a',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 0.6
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
})

export default MenuButton;

