// Утилиты
import './polyfills';
import bindEvent from './util/event/bindEvent';

// Модули
import globalState from './globalState';
import selectors from './selectors';
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

// Селекторы
const allItemArea = document.querySelectorAll(selectors.itemArea);
const area = document.querySelector(selectors.area);
const counter = document.querySelector(selectors.counter);
const timer = document.querySelector(selectors.timer);

// Функции
const gameProcessEvent = item => {
	const target = item.target;

	replaceTargetOnEmpty(target, globalState.matrix);
	itemMove(target, selectors.empty);
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
