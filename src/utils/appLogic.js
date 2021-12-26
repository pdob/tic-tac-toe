export const checkWinner = (board) => {
  //rows

  for (let i = 0; i < 3; i++) {
    const winnerX = board[i].every((cell) => cell === 'X');
    const winnerO = board[i].every((cell) => cell === 'O');

    if(winnerX) {
      return 'X';
    }
    if(winnerO) {
      return 'O';
    }
  }

  //columns

  for (let i = 0; i < 3; i++) {

    let winnerX = true;
    let winnerO = true;

    for (let j = 0; j < 3; j++) {
      if(board[j][i] !== 'X') {
        winnerX = false;
      }
      if(board[j][i] !== 'O') {
        winnerO = false;
      }
    }

    if (winnerX) {
      return 'X';
    }

    if (winnerO) {
      return 'O';
    }
  }

  
  //diagonal

  let winnerODiagLeft = true;
  let winnerODiagRight = true;
  let winnerXDiagLeft = true;
  let winnerXDiagRight= true;

  for (let i = 0; i < 3; i++) {

    if(board[i][i] !== 'X') {
      winnerXDiagLeft = false;
    }
    if(board[i][i] !== 'O') {
      winnerODiagLeft = false;
    }
    if(board[i][2 - i] !== 'X') {
      winnerXDiagRight = false;
    }
    if(board[i][2 - i] !== 'O') {
      winnerODiagRight = false;
    }

  }

  if(winnerXDiagLeft || winnerXDiagRight) {
    return 'X';
  }

  if(winnerODiagLeft || winnerODiagRight) {
    return 'O';
  }

}

export const addScore = (winner, setScores) => {
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

export const checkDraw = (board, setWinner) => {
  if (!board.some((cell) => cell.some((row) => row === ''))) {
    setWinner('Draw');
    addScore('Draw');
  }
}