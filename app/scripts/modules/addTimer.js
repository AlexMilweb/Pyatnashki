import globalState from '../globalState';

const addTimer = selector => {
	const timerId = setInterval(() => {
		const timeArr = globalState.time.split(':');
		const min = Number(timeArr[0]);
		const sec = Number(timeArr[1]);

		if (sec !== 59) {
			timeArr[1] = sec + 1;
		} else {
			timeArr[1] = 0;
			timeArr[0] = min + 1;
			if (timeArr[0] < 10) {
				timeArr[0] = '0' + timeArr[0];
			}
		}

		if (timeArr[1] < 10) {
			timeArr[1] = '0' + timeArr[1];
		}
		const timeStr = timeArr.join(':');
		selector.innerHTML = timeStr;
		globalState.time = timeStr;
	}, 1000);
	return timerId;
};

export default addTimer;
