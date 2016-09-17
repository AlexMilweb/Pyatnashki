const viewCounter = (selector, number) => {
	const addStep = number + 1;

	selector.innerHTML = addStep;
	return addStep;
};

export default viewCounter;
