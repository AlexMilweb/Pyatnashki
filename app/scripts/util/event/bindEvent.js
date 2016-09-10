import {curry, forEach} from 'ramda';
import addEvent from './addEvent';

const bindEvent = curry((eventElement, event, callback) => {
	if (eventElement !== 'window') {
		forEach(
			addEvent(event, callback),
			document.querySelectorAll(eventElement)
		);
	}else {
		window.addEventListener(event, callback);
	}
});

export default bindEvent;
