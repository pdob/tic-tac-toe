import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  View,
  Dimensions,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet
} from 'react-native';
import Welcome from '../components/Welcome';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

const SIZE = Dimensions.get('window');


const Pregame = ({ route }) => {

  const navigation = useNavigation();
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const gameMode = route.params.gameMode;
  const [difficulty, setDifficulty] = useState('Easy');
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');


  const GameButton = ({ title, onPress, secondStyle }) => (
    <Pressable style={[styles.difficultyButton, secondStyle]} onPress={() => onPress()}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )
  console.log(SIZE);

  return (
    <View style={styles.background}>
      <LinearGradient
        colors={['#29434e', 'grey']}
        style={styles.background}
      >
        <Welcome />
        <View style={styles.subHeading}>
          <Text style={styles.headerText}>{gameMode}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.crossText}>X</Text>
          <Text style={styles.text}>Player 1 name</Text>
          <TextInput 
            style={styles.textInput}
            value={player1Name}
            onChangeText={name => setPlayer1Name(name)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.circleText}>O</Text>
          <Text style={styles.text}>Player 2 name</Text>
          <TextInput 
            style={styles.textInput}
            value={player2Name}
            onChangeText={name => setPlayer2Name(name)}
          />  
        </View>

        {gameMode === 'Computer' && <View style={styles.inputContainer}>
          {difficulties.map((item, index) => (
            <GameButton 
              key={index}
              title={item}
              onPress={() => setDifficulty(item)}
              secondStyle={{backgroundColor: difficulty === item ? 'grey' : '#1c313a'}}
            />
          ))}
        </View>
        } 
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
              mode: gameMode,
              player1Name,
              player2Name
            })}
          >
            <Text style={styles.text}>Start Game</Text>
          </Pressable>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1
  },
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
  subHeading: {
    alignItems: 'center',
    paddingBottom: 10
  },
  header: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },  
  signUp: {
    alignItems: 'center',
    flex: 1,
    top: 30
  },
  crossText: {
    color: 'blue',
    fontSize: 30,
    paddingLeft: 5,
    fontWeight: 'bold'
  },
  circleText: {
    color: 'green',
    fontSize: 30,
    paddingLeft: 5,
    fontWeight: 'bold'
  },
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
  difficultyButton: {
    backgroundColor: '#1c313a', 
    padding: 5, 
    borderRadius: 10,
    width: 105,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },
  icon: {
    width: 25,
    height: 25, 
    bottom: 39,
    left: 5
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5
  }, 
  textInput: {
    backgroundColor: 'white',
    width: 200,
    height: 50,
    borderRadius: 10,
    borderColor: 'grey',
    borderWidth: 0.6,
    paddingLeft: 10,
  },
  text: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold'
  },
  textButtonContainer: {
    justifyContent: 'center',
    width: '90%',
    alignItems: 'center'
  },
  bottomButton: {
    padding: 30,
    alignItems: 'center'
  }
})

export default Pregame;