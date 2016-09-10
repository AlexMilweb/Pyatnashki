const lg = '(max-width: 1024px)';
const xs = '(max-width: 767px)';

const isViewport = mq => {
	return window.matchMedia(mq).matches;
};

export default isViewport;
export {lg, xs};
