import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <Pressable 
      style={styles.startBackButton}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.text}>Back</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  startBackButton: {
    padding: 20,
    marginTop: 'auto'
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
})

export default BackButton;