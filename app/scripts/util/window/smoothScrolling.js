const smoothScrolling = () => {
	const body = document.body;
	const hover = 'disable-hover';
	let timer;

	window.addEventListener('scroll', () => {
		clearTimeout(timer);
		if (!body.classList.contains(hover)) {
			body.classList.add(hover);
		}

		timer = setTimeout(() => {
			body.classList.remove(hover);
		}, 100);
	}, false);
};

export default smoothScrolling;
