const getCoords = el => {
	const box = el.getBoundingClientRect();
	const pageY = pageYOffset;
	const pageX = pageXOffset;
	return {
		top: box.top + pageY,
		left: box.left + pageX
	};
};

export default getCoords;
