import {forEach} from 'ramda';
import bindEvent from '../../scripts/util/event/bindEvent';

// selectors
const selectors = {
	startGame: '#startGame',
	itemArea: '.area__item'
};

// definition
const startGame = document.querySelector(selectors.startGame);
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

const areaGenerate = (areaItems, numberCells) => {
	const areaArr = createRandomArr(numberCells);

	forEach((item, i) => {
		item.setAttribute('data-val', areaArr[i]);
		item.innerHTML = areaArr[i];
	}, areaItems);
};

const startLogic = () => {
	areaGenerate(allItemArea, 15);
};

// events
const onClickStartGame = () => bindEvent(selectors.startGame, 'click', startLogic);

// init
onClickStartGame();
