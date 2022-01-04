import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';
import Welcome from '../components/Welcome';
import OptionButton from '../components/Buttons/OptionButton';
import StartBackButtons from '../components/Buttons/StartBackButtons';
import { LinearGradient } from 'expo-linear-gradient';


const Pregame = ({ route, navigation }) => {

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const gameMode = route.params.gameMode;
  const [difficulty, setDifficulty] = useState('Easy');
  const [player1Name, setPlayer1Name] = useState('Player 1');
  const [player2Name, setPlayer2Name] = useState('Player 2');


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
            <OptionButton 
              key={index}
              title={item}
              onPress={() => setDifficulty(item)}
              secondStyle={{backgroundColor: difficulty === item ? 'grey' : '#1c313a'}}
            />
          ))}
        </View>
        } 
        <StartBackButtons 
          difficulty={difficulty}
          gameMode={gameMode}
          player1Name={player1Name}
          player2Name={player2Name}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'black',
    flex: 1
  },
  subHeading: {
    alignItems: 'center',
    paddingBottom: 10
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
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
  }
})

export default Pregame;