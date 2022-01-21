import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import background from '../../assets/background.jpg';
import Scoreboard from '../components/Scoreboard';
import OptionButton from '../components/Buttons/OptionButton';
import Cross from '../components/Cross';
import {copyArray, emptyBoard, checkWinner} from '../utils/index';
import {Game} from '../models';
import {Auth, DataStore} from 'aws-amplify';

const Games = ({route}) => {
  const [board, setBoard] = useState([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);

  const {gameMode, difficulty, player1Name, player2Name, playerType} =
    route.params;
  const [winner, setWinner] = useState('');
  const [scores, setScores] = useState([0, 0]);
  const [currentTurn, setCurrentTurn] = useState('X');
  const [gameOver, setGameOver] = useState(false);
  const [currentGame, setCurrentGame] = useState(null);
  const [userData, setUserData] = useState(null);
  const [onlinePlayer1Name, setOnlinePlayer1Name] = useState('');
  const [onlinePlayer2Name, setOnlinePlayer2Name] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    if (gameMode === 'Online' && userData) {
      if (playerType === 'X') {
        createNewOnlineGame();
      }
      if (playerType === 'O') {
        searchOnlineGame();
      }
    } else {
      deleteOnlineGame();
    }
  }, [gameMode, userData]);

  useEffect(() => {
    Auth.currentAuthenticatedUser().then(setUserData);
  }, []);

  useEffect(() => {
    updateGame();
  }, [currentTurn]);

  useEffect(() => {
    updateNames();
  }, [currentGame?.playerO]);

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
  }, [board]);

  {
    /** Subscribe to DataStore changes */
  }

  useEffect(() => {
    if (!currentGame) {
      return;
    }
    const subscription = DataStore.observe(Game, currentGame.id).subscribe(
      game => {
        const newGame = game.element;
        if (game.opType === 'UPDATE') {
          setCurrentGame(newGame);
          if (newGame.board) {
            setBoard(JSON.parse(newGame.board));
          }
          if (newGame.currentPlayer) {
            setCurrentTurn(game.element.currentPlayer);
          }
        }
      },
    );
    return () => {
      subscription.unsubscribe();
    };
  }, [currentGame]);

  {
    /** Enable the user to make a move but only if it's their turn  */
  }

  const onPress = (rowIndex, cellIndex) => {
    if (currentGame?.currentPlayer !== playerType && gameMode === 'Online') {
      return;
    }
    if (board[rowIndex][cellIndex] !== '' || gameOver) {
      return;
    }

    setBoard(currentBoard => {
      const newBoard = [...currentBoard];
      newBoard[rowIndex][cellIndex] = currentTurn;
      return newBoard;
    });

    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');
  };

  const resetGame = () => {
    setBoard([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    setWinner('');
    setGameOver(false);
  };

  const resetScores = () => {
    setScores([0, 0]);
  };

  const checkDraw = () => {
    if (!board.some(cell => cell.some(row => row === ''))) {
      setWinner('Draw');
      addScore('Draw');
    }
  };;

  const botTurn = () => {
   const possibleMoves = [];

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        if  (cell === '') {
          possibleMoves.push({row: rowIndex, col: columnIndex});
        }
      });
    });

    let currentBotMove;

    possibleMoves.forEach(possibleMove => {
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

    if (!currentBotMove) {
      currentBotMove =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
    }
    if (currentBotMove) {
      onPress(currentBotMove.row, currentBotMove.col);
    }
  };;

  const addScore = winner => {
    switch (winner) {
      case 'X':
        setScores(prevScores => {
          const newScores = [...prevScores];
          newScores[0]++;
          return newScores;
        });
        break;
      case 'O':
        setScores(prevScores => {
          const newScores = [...prevScores];
          newScores[1]++;
          return newScores;
        });
        break;
    }
  };

  {
    /** Update changes to the game and save them to DataStore  */
  }

  const updateGame = () => {
    if (!currentGame) {
      return;
    }
    if (
      currentGame.board !== JSON.stringify(board) ||
      currentGame.currentPlayer !== currentTurn
    ) {
      DataStore.save(
        Game.copyOf(currentGame, c => {
          c.currentPlayer = currentTurn;
          c.board = JSON.stringify(board);
          if  (playerType === 'X') {
            c.player1Name = userData.username;
          }
          if  (playerType === 'O') {
            c.player2Name = userData.username;
          }
        }),
      );;
    }
  };;

  const deleteOnlineGame = async () => {
    if (!currentGame || currentGame.playerO) {
      setCurrentGame(null);
      return;
    }
    const todelete = await DataStore.query(Game, currentGame.id);
    DataStore.delete(todelete);
    setCurrentGame(null);
  };

  const searchOnlineGame = async () => {
    const games = await getAvailableOnlineGames();
    if (games.length > 0) {
      joinGame(games[Math.floor(Math.random() * games.length)]);
      return;
    }
  };

  const joinGame = async game => {
    const updatedGame = await DataStore.save(
      Game.copyOf(game, updatedGame => {
        updatedGame.playerO = userData.username;
      }),
    );;
    setCurrentGame(updatedGame);
  };

  const getAvailableOnlineGames = async () => {
    const game = await DataStore.query(Game, c => c.playerO('eq', ''));
    return game;
  };;

  const createNewOnlineGame = async () => {
    const newBoard = JSON.stringify(emptyBoard);

    const newGame = new Game({
      playerX: userData.username,
      playerO: '',
      board: newBoard,
      currentPlayer: currentTurn.toUpperCase(),
    });

    const createdGame = await DataStore.save(newGame);
    setCurrentGame(createdGame);
  };

  const updateNames = () => {
    if (currentGame && !onlinePlayer1Name) {
      setOnlinePlayer1Name(currentGame.playerX);
    }
    if (currentGame && !onlinePlayer2Name) {
      setOnlinePlayer2Name(currentGame.playerO);
    }
  };;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={background}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.buttonContainer}>
          <OptionButton title="Back" onPress={() => navigation.goBack()} />
          <OptionButton
            title="New game"
            onPress={resetGame}
          />
          <OptionButton title="Reset scores" onPress={resetScores} />
        </View>
        <View style={styles.winnerMessage}>
          <Text
            style={[
              styles.winnerMessageText,
              {color: winner ? 'white' : 'transparent'},
            ]}>
            {winner === 'Draw' ? (
              'Tie'
            ) : (
              <Text style={{color: winner === 'X' ? 'blue' : 'green'}}>
                {winner}
                <Text style={{color: winner ? 'white' : 'transparent'}}>
                  {' '}
                  wins
                </Text>
              </Text>
            )}
          </Text>
          {!onlinePlayer2Name && currentGame && (
            <Text style={styles.waitingMessage}>
              Waiting for Player 2 to join..{' '}
            </Text>
          )}
        </View>
        <View style={styles.board}>
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((item, cellIndex) => (
                <Pressable
                  key={cellIndex}
                  style={styles.cell}
                  onPress={() => onPress(rowIndex, cellIndex)}>
                  {item === 'O' && (
                    <View style={styles.circleContainer}>
                      <View style={styles.circle} />
                    </View>
                  )}
                  {item === 'X' && <Cross />}
                </Pressable>
              ))}
            </View>
          ))}
        </View>
        <View style={styles.scoreContainer}>
          <Scoreboard
            scores={scores}
            winner={winner}
            currentTurn={currentTurn}
            player1Name={onlinePlayer1Name ? onlinePlayer1Name : player1Name}
            player2Name={onlinePlayer2Name ? onlinePlayer2Name : player2Name}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
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
    top: 5,
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
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
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  waitingMessage: {
    fontSize: 30,
    color: 'white',
    fontStyle: 'italic',
    padding: 10,
  },
  winnerMessage: {
    paddingTop: 20,
  },
  winnerMessageText: {
    fontSize: 45,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
});

export default Games;
