import {forEach, curry} from 'ramda';

const findClsRemove = (element, delClasses) => {
	forEach(item => {
		item.classList.remove(delClasses);
	}, element.querySelectorAll('.' + delClasses));
};

export default curry(findClsRemove);
