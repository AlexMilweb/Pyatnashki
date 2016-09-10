const checkKey = (e, key = 27) => {
	const code = e.keyCode;
	return (key === code);
};

export default checkKey;
