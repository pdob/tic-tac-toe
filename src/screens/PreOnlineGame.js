import React, {useEffect, useState} from 'react';
import {Alert, View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Welcome from '../components/Welcome';
import MenuButton from '../components/Buttons/MenuButton';
import {LinearGradient} from 'expo-linear-gradient';
import BackButton from '../components/Buttons/BackButton';
import {Game} from '../models';
import {Auth, DataStore} from 'aws-amplify';

const PreOnlineGame = ({route, navigation}) => {
  const gameMode = route.params.gameMode;
  const [isUserLoggedIn, setUserLoggedIn] = useState(null);
  const [availableGames, setAvailableGames] = useState(0);
  const [userName, setUsername] = useState('Player');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthState();
    getAvailableOnlineGames();
  }, []);

  const checkAuthState = async () => {
    try {
      await Auth.currentAuthenticatedUser();
      const userinfo = await Auth.currentUserInfo();
      setUserLoggedIn(true);
      setUsername(userinfo.username);
    } catch (err) {
      console.log('User is not signed in');
      setUserLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableOnlineGames = async () => {
    const game = await DataStore.query(Game, c => c.playerO('eq', ''));
    setAvailableGames(game.length);
  };

  const randomGame = () => {
    if (availableGames < 1) {
      Alert.alert('Sorry, there are no available games.');
      return;
    }
    navigation.navigate('Games', {
      gameMode: 'Online',
      player1Name: 'Player 1',
      player2Name: userName,
      playerType: 'O',
    });
  };

  return (
    <View style={styles.background}>
      <LinearGradient colors={['#29434e', 'grey']} style={styles.background}>
        <Welcome />
        <View style={styles.subHeading}>
          <Text style={styles.headerText}>{gameMode}</Text>
        </View>
        {isUserLoggedIn && loading ? (
          <ActivityIndicator size="large" color="grey" />
        ) : (
          <View style={styles.buttonContainer}>
            <MenuButton
              title="Create new game"
              onPress={() =>
                navigation.navigate('Games', {
                  gameMode: 'Online',
                  player1Name: userName,
                  player2Name: 'Player 2',
                  playerType: 'X',
                })
              }
            />
            <MenuButton title="Join random game" onPress={randomGame} />
          </View>
        )}
        {!isUserLoggedIn && !loading && (
          <View style={styles.buttonContainer}>
            <Text style={[styles.headerText, {fontStyle: 'italic'}]}>
              Sorry, you have to be signed in to play online.
            </Text>
          </View>
        )}
        <BackButton />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  subHeading: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: '30%',
  },
});

export default PreOnlineGame;
