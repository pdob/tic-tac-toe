import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import Welcome from '../components/Welcome'
import { LinearGradient } from 'expo-linear-gradient';

const Home = () => {

  const navigation = useNavigation();

  const MenuButton = ({ destination, gameMode }) => (
    <Pressable 
      onPress={() => navigation.navigate(destination, {
        gameMode
      })} 
      style={styles.button}
    >
      <Text style={styles.buttonText}>{gameMode}</Text>
    </Pressable>
  )

  return (
    <SafeAreaView style={styles.background}>
      <LinearGradient
        colors={['#29434e', 'grey']}
        style={styles.background}
      >
        <Welcome />
        <View style={styles.buttonContainer}>
          <MenuButton gameMode='Computer' destination='Pregame'/>
          <MenuButton gameMode='Multiplayer' destination='Pregame'/>
          <MenuButton gameMode='Online' destination='Games'/>
          <MenuButton destination='Settings' gameMode='Settings' />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
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
  buttonContainer: {
    alignItems: 'center',
    height: '55%',
    justifyContent: 'space-evenly'
  },
  buttonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
  welcomeContainer: {
    height: '30%',    
  }
});

export default Home;