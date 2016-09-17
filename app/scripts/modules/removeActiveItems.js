import forEach from '../util/array/forEach';

const removeActiveItems = (selectorItem, classActive) => {
	const activeItems = document.querySelectorAll(selectorItem);
	forEach(activeItems, item => {
		item.classList.remove(classActive);
	});
};

export default removeActiveItems;
