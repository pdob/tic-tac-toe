import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet
} from 'react-native';
import Welcome from '../components/Welcome'
import { LinearGradient } from 'expo-linear-gradient';

const Home = ({ navigation }) => {


  const MenuButton = ({ destination, title }) => (
    <Pressable 
      onPress={() => navigation.navigate(destination, {
        gameMode: title
      })} 
      style={styles.button}
    >
      <Text style={styles.buttonText}>{title}</Text>
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
          <MenuButton title='Computer' destination='Pregame'/>
          <MenuButton title='Multiplayer' destination='Pregame'/>
          <MenuButton title='Online' destination='PreOnlineGame'/>
          <MenuButton title='Settings' destination='Settings'/>
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
});

export default Home;