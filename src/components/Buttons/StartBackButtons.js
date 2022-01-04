import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native'; 
import { useNavigation } from '@react-navigation/core';


const StartBackButtons = ({ difficulty, gameMode, player1Name, player2Name }) => {

  const navigation = useNavigation();

  return (
  <View style={styles.startBackContainer}>
    <Pressable 
      style={styles.startBackButton}
      onPress={() => navigation.goBack()}
    >
      <Text style={styles.text}>Back</Text>
    </Pressable>
    <Pressable 
      style={styles.startBackButton}
      onPress={() => navigation.navigate('Games', {
        difficulty,
        gameMode,
        player1Name,
        player2Name
      })}
    >
      <Text style={styles.text}>Start Game</Text>
    </Pressable>
  </View>
)}
const styles = StyleSheet.create({

  startBackContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 5,
    marginTop: 'auto'
  },
  startBackButton: {
    padding: 20
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
});

export default StartBackButtons;

