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

export default replaceTargetOnEmpty;
