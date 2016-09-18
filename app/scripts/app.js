// Утилиты
import './polyfills';
import bindEvent from './util/event/bindEvent';

// Селекторы и стейт
import globalState from './globalState';
import selectors from './selectors';

// Модули
import createRandomArr from './modules/createRandomArr';
import matrixGen from './modules/matrixGen';
import getValuesAroundEmpty from './modules/getValuesAroundEmpty';
import replaceTargetOnEmpty from './modules/replaceTargetOnEmpty';
import itemMove from './modules/itemMove';
import removeActiveItems from './modules/removeActiveItems';
import addActiveItems from './modules/addActiveItems';
import areaGenerate from './modules/areaGenerate';
import resetGameArea from './modules/resetGameArea';
import viewCounter from './modules/viewCounter';
import addTimer from './modules/addTimer';
import arrCompare from './modules/arrCompare';

// Селекторы
const allItemArea = document.querySelectorAll(selectors.itemArea);
const area = document.querySelector(selectors.area);
const counter = document.querySelector(selectors.counter);
const timer = document.querySelector(selectors.timer);
const cap = document.querySelector(selectors.cap);
const userInput = document.querySelector(selectors.userInput);
const winName = document.querySelector(selectors.winName);
const winTime = document.querySelector(selectors.winTime);
const winStep = document.querySelector(selectors.winStep);

// Функции
const gameProcessEvent = item => {
	const target = item.target;

	replaceTargetOnEmpty(target, globalState.matrix);
	itemMove(target, selectors.empty);
	removeActiveItems(selectors.itemArea, selectors.activeItem);

	const items = getValuesAroundEmpty(globalState.matrix);
	addActiveItems(items, selectors.activeItem);

	globalState.counter = viewCounter(counter, globalState.counter);
	const isWin = arrCompare(globalState.matrix, globalState.matrixValidate);

	if (isWin) {
		clearInterval(globalState.timeId);
		cap.classList.remove(selectors.capOff);
		cap.classList.add(selectors.capWin);

		winName.innerHTML = globalState.user;
		winStep.innerHTML = globalState.counter;
		winTime.innerHTML = globalState.time;
	}
};

const gameProcess = matrix => {
	const activeItems = getValuesAroundEmpty(matrix);
	addActiveItems(activeItems, selectors.activeItem);

	area.removeEventListener('click', gameProcessEvent);
	area.addEventListener('click', gameProcessEvent);
};

const addUser = () => {
	cap.classList.remove(selectors.capWin);
	cap.classList.add(selectors.capUser);
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
	cap.classList.remove(selectors.capUser);
	cap.classList.add(selectors.capOff);
};

const userValidate = () => {
	const val = userInput.value;
	const valLen = val.length;

	if (valLen >= 3 && valLen <= 12) {
		globalState.user = val;
		startLogic();
	} else {
		userInput.classList.add(selectors.inputWrong);
		setTimeout(() => {
			userInput.classList.remove(selectors.inputWrong);
		}, 300);
	}
};

// События
const onClickStartGame = () => bindEvent(selectors.startGame, 'click', addUser);
const onClickUserAdd = () => bindEvent(selectors.userButton, 'click', userValidate);

// Инициализация событий
onClickStartGame();
onClickUserAdd();
