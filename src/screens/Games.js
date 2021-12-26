import React, { useState, useEffect } from "react";
import {
  Text,
  StatusBar,
  Dimensions,
  View,
  ImageBackground,
  Pressable,
  SafeAreaView,
  Image
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import background from '../../assets/background.jpg'
import Header from '../components/Header'
import { copyArray, changeDifficulty, emptyBoard } from "../utils/index";
import { checkWinner } from '../utils/appLogic';
import { styles } from "../utils/styles";
import Amplify, { Auth, DataStore } from 'aws-amplify';
import { Game } from "../models";
import config from '../aws-exports'
Amplify.configure({
  ...config,
  Analytics: {
    disabled: true
  }
});
Auth.configure(config);

function Games({ route }) {

  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ]);

  const { mode, difficulty, player1Name, player2Name } = route.params;
  const [winner, setWinner] = useState('');
  const [scores, setScores] = useState([0, 0])
  const [currentTurn, setCurrentTurn] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [gameMode, setGameMode] = useState(mode);
  const [currentGame, setCurrentGame] = useState(null);
  const [userData, setUserData] = useState(null);
  const [onlinePlayerType, setOnlinePlayerType] = useState(null);


  const navigation = useNavigation();

  useEffect(() => {
    if(mode === 'Online' && userData) {
      searchOnlineGame();
    } else {
      deleteOnlineGame();
    }

  }, [gameMode, userData])


  useEffect(() => {
    Auth.currentAuthenticatedUser().then(setUserData);
  }, [])


  useEffect(() => {
    updateGame();
  }, [currentTurn])

  useEffect(() => {

    if (gameOver) {
      return;
    }
    const playerWin = checkWinner(board);
    if (playerWin) {
      setWinner(playerWin);
      setGameOver(true);
      addScore(playerWin);
    } else {
      if (currentTurn === 'O' && gameMode === 'Computer') {
        botTurn();
      }
      checkDraw();
    }
  }, [board])

  useEffect(() => {
    if (!currentGame) {
      return;
    }
    const subscription = DataStore.observe(Game, currentGame.id).subscribe(msg => {
      console.log(msg.model, msg.opType, msg.element);
      const newGame = msg.element;
      if(msg.opType === 'UPDATE') {
        setCurrentGame(newGame);
        if(newGame.board){
          setBoard(JSON.parse(newGame.board));
        }
        if(newGame.currentPlayer) {
          setCurrentTurn(msg.element.currentPlayer);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [currentGame])


  const onPress = (rowIndex, cellIndex) => {
    if(currentGame?.currentPlayer !== onlinePlayerType && gameMode === 'Online') {
      return;
    }
    if (board[rowIndex][cellIndex] !== '' || gameOver) {
      return;
    }
    
    setBoard((currentBoard) => {
      const newBoard = [...currentBoard];
      newBoard[rowIndex][cellIndex] = currentTurn;
      return newBoard;
    })
    
    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');

  }
  

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);
    setWinner('');
    setGameOver(false);
  };

  const resetScores = () => {
    setScores([0, 0]);
  };
  
  const checkDraw = () => {
    if (!board.some((cell) => cell.some((row) => row === ''))) {
      setWinner('Draw');
      addScore('Draw');
    }
  }


  const botTurn = () => {
 
    const possibleMoves = [];

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if(cell === ''){
          possibleMoves.push({row: rowIndex, col: columnIndex});
        }
      })
    });

    let currentBotMove;

    possibleMoves.forEach((possibleMove) => {
      const boardCopy1 = copyArray(board);
      const boardCopy2 = copyArray(board);
      boardCopy1[possibleMove.row][possibleMove.col] = 'X';
      boardCopy2[possibleMove.row][possibleMove.col] = 'O';  

      const hardMove = checkWinner(boardCopy2);
      const mediumMove = checkWinner(boardCopy1);

      if (hardMove) {
        if (difficulty === 'Hard' && !gameOver) {
          currentBotMove = possibleMove;
        }
      } 
      if (mediumMove) {
        if (difficulty === 'Medium' || difficulty === 'Hard') {
          currentBotMove = possibleMove;
        }
      }
    
    });
    
    if(!currentBotMove) {
      currentBotMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }
    if(currentBotMove) {
      onPress(currentBotMove.row, currentBotMove.col);
    }

  }

  const addScore = (winner) => {
    switch(winner) {
      case 'X':
        setScores((prevScores) => {
          const newScores = [...prevScores];
          newScores[0]++;
          return newScores;
        })
        break;
      case 'O':
        setScores((prevScores) => {
          const newScores = [...prevScores];
          newScores[1]++;
          return newScores;
        })
        break;
      case 'Draw':
        setScores((prevScores) => {
          const newScores = [...prevScores];
          newScores[2]++;
          return newScores;
        })
        break;
    }
  }

  const updateGame = () => {
    if (!currentGame) {
      return;
    }
    if (
      currentGame.board !== JSON.stringify(board) ||
      currentGame.currentPlayer !== currentTurn
    ) {
      DataStore.save(Game.copyOf(currentGame, c => {
        c.currentPlayer = currentTurn;
        c.board = JSON.stringify(board);
      }))
    }
  }

  const deleteOnlineGame = async () => {
    if (!currentGame || currentGame.playerO) {
      setCurrentGame(null);
      return;
    } 
    const todelete = await DataStore.query(Game, currentGame.id);
    DataStore.delete(todelete);
    setCurrentGame(null);
  }

  const searchOnlineGame = async () => {

    const games = await getAvailableOnlineGames(); 
    if(games.length > 0) {
      joinGame(games[Math.floor(Math.random() * games.length)])
      return;
    } 
    await createNewOnlineGame();
    
  }

  const joinGame = async (game) => {
    const updatedGame = await DataStore.save(
      Game.copyOf(game, (updatedGame) => {
      updatedGame.playerO = userData.attributes.sub;
    }))
    setCurrentGame(updatedGame);
    setOnlinePlayerType('O');
  }

  const getAvailableOnlineGames = async () => {
    const game = await DataStore.query(Game, c => c.playerO('eq', ''));
    return game;
  }

  const createNewOnlineGame = async () => {

    const newBoard = JSON.stringify(emptyBoard);

    const newGame = new Game({
      playerX: userData.attributes.sub,
      playerO: '',
      board: newBoard,
      currentPlayer: currentTurn.toUpperCase(),
      pointO: 0,
      pointX: 0
    })

    const createdGame = await DataStore.save(newGame);
    setCurrentGame(createdGame);
    setOnlinePlayerType('X');
  }

  const GameButton = ({ title, onPress }) => (
    <Pressable style={styles.newGameButton} onPress={() => onPress()}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  )

  const Cross = () => (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image 
        style={{height: 65, width: 65}}
        source={require('../../assets/icons/cross.png')}
      />
    </View>
  )

  return (

    <SafeAreaView style={styles.container}>
      <ImageBackground source={background} style={styles.background} resizeMode='cover'>
        <View style={styles.buttonContainer}>
          <GameButton 
            title='Back'
            onPress={() => navigation.goBack()}
          />
          <GameButton 
            title='New game'
            onPress={resetGame}
          />
          <GameButton 
            title='Reset scores'
            onPress={resetScores}
          />
        </View>
        <View style={styles.winnerMessage}>
          <Text style={[styles.winnerMessageText,{color: winner ? 'white' : 'transparent'}]}>
            {winner === 'Draw' ? 'Tie' : (
              <Text style={{color: winner === 'X' ? 'blue' : 'green'}}>
                {winner}
                <Text style={{color: winner ? 'white' : 'transparent'}}> wins</Text>
              </Text> 
            )}   
          </Text>
        </View>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, cellIndex) => (
                <Pressable key={cellIndex} style={styles.cell} onPress={() => onPress(rowIndex, cellIndex)}>
                  {item === 'O' && <View style={styles.circleContainer}><View style={styles.circle} /></View> }
                  {item === 'X' && <Cross />}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.scoreContainer}>
          <Header
            scores={scores}
            winner={winner}
            currentTurn={currentTurn}
            player1Name={player1Name}
            player2Name={player2Name}
          />
        </View>
        {currentGame && <Text style={{fontSize: 20}}>{currentGame.id}</Text>}  
      </ImageBackground>
    </SafeAreaView>
  );
}


export default Games;