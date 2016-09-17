import forEach from '../util/array/forEach';

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

export default areaGenerate;
