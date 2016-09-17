// getValuesAroundEmpty - возвращает массив из доступных для перемещения пятнашек
const getValuesAroundEmpty = matrix => {
	let row;
	let col;
	let matrixWidth;
	const arr = [];

	matrix.forEach((rowMatrix, i) => {
		const emptyId = rowMatrix.indexOf('empty');
		if (emptyId !== -1) {
			row = i;
			col = emptyId;
		}
		matrixWidth = rowMatrix.length;
	});

	if (col !== 0) {
		arr.push(matrix[row][col - 1]);
	}
	if (row !== 0) {
		arr.push(matrix[row - 1][col]);
	}
	if (col !== matrixWidth - 1) {
		arr.push(matrix[row][col + 1]);
	}
	if (row !== matrixWidth - 1) {
		arr.push(matrix[row + 1][col]);
	}
	return arr;
};

export default getValuesAroundEmpty;
