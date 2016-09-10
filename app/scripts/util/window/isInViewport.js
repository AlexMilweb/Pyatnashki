const isInViewport = (el, offset = 0) => {
	const rect = el.getBoundingClientRect();
	return (
		rect.top >= 0 &&
		rect.left >= 0 &&
		rect.bottom <= (window.innerHeight + offset) &&
		rect.right <= window.innerWidth
	);
};

export default isInViewport;
