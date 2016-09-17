import random from './random';

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

export default createRandomArr;
