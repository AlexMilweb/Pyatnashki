// Утилиты
import bindEvent from '../../scripts/util/event/bindEvent';
import forEach from '../../scripts/util/array/forEach';

// Объект с классами и идентификаторами
const selectors = {
	startGame: '#startGame',
	itemArea: '.area__item',
	empty: 'area__item_empty',
	activeItem: 'area__item_active'
};

// Селекторы
const allItemArea = document.querySelectorAll(selectors.itemArea);

// functions
const random = (min, max) => {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};

const createRandomArr = number => {
	const arr = [];
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

// getValuesAroundEmpty - возвращает массив из доступных для перемещения пятнашек
const getValuesAroundEmpty = matrix => {
	let row;
	let col;
	let matrixWidth;
	let arr = [];

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

// addEventForActiveItems - получает массив пятнашек доступных для перемещения и вешает на них callback;
const addEventItems = (colectionItems, callback) => {
	forEach(colectionItems, item => {
		item.addEventListener('click', callback);
	});
};

// Замена значения target элемента на empty, а empty на target;
const replaceTargetOnEmpty = (target, matrix) => {
	const val = Number(target.getAttribute('data-val'));
	let row;
	let col;

	matrix.forEach((item, i) => {
		if (item.indexOf('empty') !== -1) {
			row = i;
			col = item.indexOf('empty')
		}
	});

	matrix.forEach((item, i) => {
		if (item.indexOf(val) !== -1) {
			matrix[i][item.indexOf(val)] = 'empty';
			matrix[row][col] = val;
			return;
		}
	});
};

const itemMove = target => {
	const val = Number(target.getAttribute('data-val'));
	const emptyItem = document.querySelector('[data-val="empty"]');

	target.setAttribute('data-val', 'empty');
	target.innerHTML = '';
	target.classList.add(selectors.empty);

	emptyItem.setAttribute('data-val', val);
	emptyItem.innerHTML = val;
	emptyItem.classList.remove(selectors.empty);
};

const removeActiveItems = (selectorItem, classActive) => {
	const activeItems = document.querySelectorAll(selectorItem);
	forEach(activeItems, item => {
		item.classList.remove(classActive);
	});
};

const addActiveItems = (arrItems, classActive) => {
	arrItems.forEach(item => {
		const element = document.querySelector('[data-val="' + item + '"]');
		element.classList.add(classActive);
	});
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

const resetGameArea = (emptySelector, selectorItem) => {
	removeActiveItems(selectors.itemArea, selectors.activeItem);
	const empty = document.querySelector('.' + selectors.empty);
	const lastItem = document.querySelector(selectorItem + ':last-child');

	empty.classList.remove(emptySelector);
	lastItem.classList.add(emptySelector);
};

const gameProcess = (matrix, colectionItems) => {
	const activeItems = getValuesAroundEmpty(matrix);
	addActiveItems(activeItems, selectors.activeItem);

	addEventItems(colectionItems, item => {
		const target = item.currentTarget;

		replaceTargetOnEmpty(target, matrix);
		itemMove(target);
		removeActiveItems(selectors.itemArea, selectors.activeItem);

		const items = getValuesAroundEmpty(matrix);
		addActiveItems(items, selectors.activeItem);

	});
	console.log(colectionItems)
};

// Запуск игровой логики при клике на кнопку "Start Game"
const startLogic = () => {
	const areaArr = createRandomArr(15);
	const matrix = matrixGen(4, 4, areaArr);
	areaGenerate(allItemArea, areaArr);
	resetGameArea(selectors.empty, selectors.itemArea);
	gameProcess(matrix, allItemArea);
};

// События
const onClickStartGame = () => bindEvent(selectors.startGame, 'click', startLogic);

// Инициализация событий
onClickStartGame();
