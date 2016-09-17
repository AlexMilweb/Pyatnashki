const arrCompare = (matrix, matrixValidate) => {
  for (let i = 0; i <= 3; i++) {
    for (let j = 0; j <= 3; j++) {
      if (matrix[i][j] !== matrixValidate[i][j]) {
        return false;
      }
    }
  }
  return true;
};

export default arrCompare;
