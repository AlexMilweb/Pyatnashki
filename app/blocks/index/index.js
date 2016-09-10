import bindEvent from '../../scripts/util/event/bindEvent';
import forEach from '../../scripts/util/array/forEach';

// Объект с классами и идентификаторами
const selectors = {
	startGame: '#startGame',
	itemArea: '.area__item'
};

// Селекторы
const allItemArea = document.querySelectorAll(selectors.itemArea);

// functions
const random = (min, max) => {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

const createRandomArr = number => {
	let arr = [];
	let randInt;

	for (let i = 1; i <= number; i++) {

		do {
			randInt = random(1, number);
		} while (arr.indexOf(randInt) !== -1);

		arr.push(randInt);
	}
	return arr;
};

/*
---- matrixGen ----
row - количество строк матрицы;
col - количество столбцов матрицы;
arr:
	undefined - вернет пустую матрицу;
	'validate' - вернет заполненную матрицу с числовыми значениями по порядку в сооответствии с количеством ячеек, последняя будет 'empty';
	Array - передать одномерный массив, для преобразования в матрицу;
*/
const matrixGen = (row, col, arr) => {
	const arrMain = [];
	const numberCells = row * col;

	for (let i = 0; i <= col - 1; i++) {
		const rowArr = [];

		for (let j = 1; j <= row; j++) {

			if (arr === 'validate' && j + i * row !== numberCells) {
				rowArr.push(j + i * row);
			} else if (arr === undefined) {
				rowArr.push('');
			} else if (j + i * row !== numberCells) {
				rowArr.push(arr[j + i * row - 1]);
			} else {
				rowArr.push('empty');
			}
		}

		arrMain.push(rowArr);
	}
	return arrMain;
};

getValuesAroundEmpty - возвращает массив из доступных для перемещения пятнашек
const getValuesAroundEmpty = matrix => {
};

const areaGenerate = (areaItems, arr) => {
	forEach(areaItems, (item, i) => {
		item.setAttribute('data-val', arr[i]);
		item.innerHTML = arr[i];

		if (i === 15) {
			item.setAttribute('data-val', 'empty');
			item.innerHTML = '';
		}
	});
};

const gameProcess = arrArea => {
	const matrix = matrixGen(4, 4, arrArea);
	const activeItems = getValuesAroundEmpty()
};

// Запуск игровой логики при клике на кнопку "Start Game"
const startLogic = () => {
	let areaArr = createRandomArr(15);
	areaGenerate(allItemArea, areaArr);
	gameProcess(areaArr);
};

// События
const onClickStartGame = () => bindEvent(selectors.startGame, 'click', startLogic);

// Инициализация событий
onClickStartGame();
