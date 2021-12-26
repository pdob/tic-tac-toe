import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  View,
  Dimensions,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView
} from 'react-native';
import Welcome from '../components/Welcome';
import MenuButton from '../components/Buttons/MenuButton';
import { useNavigation } from '@react-navigation/core';
import { LinearGradient } from 'expo-linear-gradient';

const SIZE = Dimensions.get('window');


const Settings = ({ route }) => {

  const navigation = useNavigation();
  const difficulties = ['Easy', 'Medium', 'Hard'];
  const gameMode = route.params.gameMode;
  const [difficulty, setDifficulty] = useState('Easy');




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
        <View style={styles.buttonContainer}>
          <MenuButton 
            title='Create new game'
          />
          <MenuButton 
            title='Join random game'
          />
        </View>
     
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
              difficulty
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
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  circleText: {
    color: 'green',
    fontSize: 30,
    paddingLeft: 10,
    fontWeight: 'bold'
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '30%'

  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10
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

export default Settings;