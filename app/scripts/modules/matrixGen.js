/*
---- matrixGen ----
row - количество строк матрицы;
col - количество столбцов матрицы;
option:
	undefined - вернет пустую матрицу;
	'validate' - вернет заполненную матрицу с числовыми значениями по порядку в сооответствии с количеством ячеек, последняя будет 'empty';
	Array - передать одномерный массив, для преобразования в матрицу;
*/
const matrixGen = (row, col, option) => {
	const arrMain = [];
	const numberCells = row * col;

	for (let i = 0; i <= col - 1; i++) {
		const rowArr = [];

		for (let j = 1; j <= row; j++) {

			if (option === 'validate' && j + i * row !== numberCells) {
				rowArr.push(j + i * row);
			} else if (option === undefined) {
				rowArr.push('');
			} else if (j + i * row !== numberCells) {
				rowArr.push(option[j + i * row - 1]);
			} else {
				rowArr.push('empty');
			}
		}

		arrMain.push(rowArr);
	}
	return arrMain;
};

export default matrixGen;
