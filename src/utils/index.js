export const copyArray = (arr) => {
  const newArray = arr.map(arr => arr.slice());
  return newArray;
}



export const changeDifficulty = (difficulty, setDifficulty) => {
  switch(difficulty) {
    case 'Easy':
      setDifficulty('Medium');
      break;
    case 'Medium':
      setDifficulty('Hard');
      break;
    case 'Hard':
      setDifficulty('Easy');
      break;
  }
}

export const emptyBoard = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];