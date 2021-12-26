import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  background: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  board: {
    width: '85%',
    aspectRatio: 1,
    position: 'absolute',
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 'auto',
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    top: 5
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  },  
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: 'green',

  },
  circleContainer: {
    height: 65,
    width: 65,
    justifyContent: 'center',
  },
  crossContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'pink',
    height: 65,
    width: 65
  },
  cross: {
    width: 10,
    left: 32.5,
    borderRadius: 10,
    margin: 10,
    height: 70,
    backgroundColor: 'blue',
    transform: [
      {
        rotate: '45deg'
      }
    ]
  },
  gameModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: -27
  },
  gameModeButton: {
    padding: 5,
    height: 40,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },  
  header: {
    width: '100%',
    marginBottom: 'auto',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    flex: 1,
  },
  headerText: {
    fontSize: 25,
    color: 'white'
  },
  headerScores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newGameButton: {
    backgroundColor: '#1c313a', 
    padding: 5, 
    borderRadius: 10,
    width: 105,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5
  },
  reverseCross: {
    transform: [
      {
        rotate: '-45deg'
      }
    ]
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  scoreboard: {
    width: '70%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }, 
  winnerMessage: {
    paddingTop: 20
  },
  winnerMessageText: {
    fontSize: 45, 
    fontStyle: 'italic',
    fontWeight: 'bold'
  },  
});