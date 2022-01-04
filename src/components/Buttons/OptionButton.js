import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';


const OptionButton = ({ title, onPress, secondStyle }) => (
  <Pressable style={[styles.button, secondStyle]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </Pressable>
)

const styles = StyleSheet.create({
    buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },  
  button: {
    backgroundColor: '#1c313a', 
    padding: 5, 
    borderRadius: 10,
    width: 105,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
});

export default OptionButton;