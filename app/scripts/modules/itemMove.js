const itemMove = (target, selectorEmpty) => {
	const val = Number(target.getAttribute('data-val'));
	const emptyItem = document.querySelector('[data-val="empty"]');

	target.setAttribute('data-val', 'empty');
	target.innerHTML = '';
	target.classList.add(selectorEmpty);

	emptyItem.setAttribute('data-val', val);
	emptyItem.innerHTML = val;
	emptyItem.classList.remove(selectorEmpty);
};

export default itemMove;
