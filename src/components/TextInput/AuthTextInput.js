import React from 'react';
import { View, TextInput, Image, StyleSheet, Text } from 'react-native';


const AuthTextInput = ({ placeholder, icon, title, ...otherProps }) => (

  <View style={styles.inputContainer}>
    {title && <Text style={styles.text}>{title}</Text>}
    <TextInput 
      style={styles.textInput}
      placeholder={placeholder}
      {...otherProps}
    />
    <Image
      style={styles.icon}
      source={icon} 
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  icon: {
    width: 25,
    height: 25, 
    bottom: 39,
    left: 5
  },
  inputContainer: {
    width: '90%',
  }, 
  textInput: {
    backgroundColor: 'white',
    width: '100%',
    height: 50,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.6,
    paddingLeft: 35,
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
})

export default AuthTextInput;