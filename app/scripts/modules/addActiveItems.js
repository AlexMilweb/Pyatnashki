const addActiveItems = (arrItems, classActive) => {
	arrItems.forEach(item => {
		const element = document.querySelector('[data-val="' + item + '"]');
		element.classList.add(classActive);
	});
};

export default addActiveItems;
