import matrixGen from './modules/matrixGen';

const globalState = {
	user: '',
	matrix: [],
	matrixValidate: matrixGen(4, 4, 'validate'),
	counter: 0,
	time: '00:00',
	timeId: undefined
};

export default globalState;
