import removeActiveItems from './removeActiveItems';
import selectors from '../selectors';

const resetGameArea = (emptySelector, selectorItem) => {
	removeActiveItems(selectors.itemArea, selectors.activeItem);
	const empty = document.querySelector('.' + selectors.empty);
	const lastItem = document.querySelector(selectorItem + ':last-child');

	empty.classList.remove(emptySelector);
	lastItem.classList.add(emptySelector);
};

export default resetGameArea;
