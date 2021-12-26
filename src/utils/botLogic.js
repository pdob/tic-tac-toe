export const botTurn = (board, copyArray, checkWinner, difficulty, onPress) => {
 
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
    boardCopy1[possibleMove.row][possibleMove.col] = 'x';
    boardCopy2[possibleMove.row][possibleMove.col] = 'o';  

    const hardMove = checkWinner(boardCopy2);
    const mediumMove = checkWinner(boardCopy1);

    if (hardMove) {
      if (difficulty === 'Hard') {
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