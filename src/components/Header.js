import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';


const Header = ({ scores, player1Name = 'Player 1', player2Name = 'Player 2', currentTurn }) => (
  <View style={styles.header}>
    <View style={styles.playerScore}>
      <Text style={[styles.crossText, {fontSize: currentTurn === 'X' ? 60 : 40}]}>X</Text>
      <Text style={styles.headerText}>{player1Name}:</Text>
      <Text style={styles.scoreText}>{scores[0]}</Text>
    </View>
    <View style={styles.playerScore}>
      <Text style={[styles.circleText, {fontSize: currentTurn === 'O' ? 60 : 40}]}>O</Text>
      <Text style={styles.headerText}>{player2Name}:</Text>
      <Text style={styles.scoreText}>{scores[1]}</Text>
    </View>
  </View>
);


const styles = StyleSheet.create({
  header: {
    width: '100%',
    marginBottom: 'auto',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center'
  },
  crossText: {
    color: 'blue',
    fontSize: 30,
    paddingRight: 10,
    fontWeight: 'bold'
  },
  circleText: {
    color: 'green',
    fontSize: 30,
    paddingRight: 10,
    fontWeight: 'bold'
  },
  headerText: {
    fontSize: 25,
    color: '#e9ecef',
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  playerScore: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  scoreText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    paddingLeft: 5
  },
});

export default Header;