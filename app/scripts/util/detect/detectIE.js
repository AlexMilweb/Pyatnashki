// IE 10-11

const detectIE = () => navigator.userAgent.match(/trident/i);

const markIE = () => {
	const page = document.querySelector('.page');
	if (detectIE()) {
		page.classList.add('ie');
	}
};

export default detectIE;
export {markIE};
