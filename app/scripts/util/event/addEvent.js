import {curry} from 'ramda';

const addEvent = curry((event, callback, item) => item.addEventListener(event, callback));

export default addEvent;
