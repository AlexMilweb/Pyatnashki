// Утилиты
import bindEvent from '../../scripts/util/event/bindEvent';
import forEach from '../../scripts/util/array/forEach';

// Объект с классами и идентификаторами
const selectors = {
	area: '.js-area',
	startGame: '.js-start-game',
	itemArea: '.js-item',
	counter: '.js-counter',
	timer: '.js-timer',
	empty: 'area__item_empty',
	activeItem: 'area__item_active'
};

// Селекторы
const allItemArea = document.querySelectorAll(selectors.itemArea);
const area = document.querySelector(selectors.area);
const counter = document.querySelector(selectors.counter);
const timer = document.querySelector(selectors.timer);

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

// Замена значения target элемента на empty, а empty на target;
const replaceTargetOnEmpty = (target, matrix) => {
	const val = Number(target.getAttribute('data-val'));
	let row;
	let col;

	matrix.forEach((item, i) => {
		if (item.indexOf('empty') !== -1) {
			row = i;
			col = item.indexOf('empty');
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

const globalState = {
	matrix: [],
	counter: 0,
	time: '00:00',
	timeId: undefined
};

const viewCounter = (selector, number) => {
	const addStep = number + 1;

	selector.innerHTML = addStep;
	return addStep;
};

const addTimer = selector => {
	const timerId = setInterval(() => {
		const timeArr = globalState.time.split(':');
		const min = Number(timeArr[0]);
		const sec = Number(timeArr[1]);

		if (sec !== 59) {
			timeArr[1] = sec + 1;
		} else {
			timeArr[1] = 0;
			timeArr[0] = min + 1;
			if (timeArr[0] < 10) {
				timeArr[0] = '0' + timeArr[0];
			}
		}

		if (timeArr[1] < 10) {
			timeArr[1] = '0' + timeArr[1];
		}
		const timeStr = timeArr.join(':');
		selector.innerHTML = timeStr;
		globalState.time = timeStr;
	}, 1000);
	return timerId;
};

const gameProcessEvent = item => {
	const target = item.target;

	replaceTargetOnEmpty(target, globalState.matrix);
	itemMove(target);
	removeActiveItems(selectors.itemArea, selectors.activeItem);

	const items = getValuesAroundEmpty(globalState.matrix);
	addActiveItems(items, selectors.activeItem);

	globalState.counter = viewCounter(counter, globalState.counter);
};

const gameProcess = matrix => {
	const activeItems = getValuesAroundEmpty(matrix);
	addActiveItems(activeItems, selectors.activeItem);

	area.removeEventListener('click', gameProcessEvent);
	area.addEventListener('click', gameProcessEvent);
};

// Запуск игровой логики при клике на кнопку "Start Game"
const startLogic = () => {
	const areaArr = createRandomArr(15);
	const matrix = matrixGen(4, 4, areaArr);

	globalState.counter = 0;
	globalState.time = '00:00';
	globalState.matrix = matrix;

	viewCounter(counter, -1);
	areaGenerate(allItemArea, areaArr);
	resetGameArea(selectors.empty, selectors.itemArea);
	gameProcess(matrix);
	clearInterval(globalState.timeId);

	globalState.timeId = addTimer(timer, globalState.time);
};

// События
const onClickStartGame = () => bindEvent(selectors.startGame, 'click', startLogic);

// Инициализация событий
onClickStartGame();
