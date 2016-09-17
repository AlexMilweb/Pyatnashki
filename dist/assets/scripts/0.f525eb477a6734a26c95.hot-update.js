webpackHotUpdate(0,{

/***/ 6:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _bindEvent = __webpack_require__(7);
	
	var _bindEvent2 = _interopRequireDefault(_bindEvent);
	
	var _forEach = __webpack_require__(10);
	
	var _forEach2 = _interopRequireDefault(_forEach);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Объект с классами и идентификаторами
	// Утилиты
	var selectors = {
		area: '.js-area',
		startGame: '.js-start-game',
		itemArea: '.js-item',
		counter: '.js-counter',
		empty: 'area__item_empty',
		activeItem: 'area__item_active'
	};
	
	// Селекторы
	var allItemArea = document.querySelectorAll(selectors.itemArea);
	var area = document.querySelector(selectors.area);
	
	// functions
	var random = function random(min, max) {
		return Math.round(min - 0.5 + Math.random() * (max - min + 1));
	};
	
	var createRandomArr = function createRandomArr(number) {
		var arr = [];
		var randInt = void 0;
	
		for (var i = 1; i <= number; i++) {
	
			do {
				randInt = random(1, number);
			} while (arr.indexOf(randInt) !== -1);
	
			arr.push(randInt);
		}
		return arr;
	};
	
	/*
	---- matrixGen ----
	row - количество строк матрицы;
	col - количество столбцов матрицы;
	option:
		undefined - вернет пустую матрицу;
		'validate' - вернет заполненную матрицу с числовыми значениями по порядку в сооответствии с количеством ячеек, последняя будет 'empty';
		Array - передать одномерный массив, для преобразования в матрицу;
	*/
	var matrixGen = function matrixGen(row, col, option) {
		var arrMain = [];
		var numberCells = row * col;
	
		for (var i = 0; i <= col - 1; i++) {
			var rowArr = [];
	
			for (var j = 1; j <= row; j++) {
	
				if (option === 'validate' && j + i * row !== numberCells) {
					rowArr.push(j + i * row);
				} else if (option === undefined) {
					rowArr.push('');
				} else if (j + i * row !== numberCells) {
					rowArr.push(option[j + i * row - 1]);
				} else {
					rowArr.push('empty');
				}
			}
	
			arrMain.push(rowArr);
		}
		return arrMain;
	};
	
	// getValuesAroundEmpty - возвращает массив из доступных для перемещения пятнашек
	var getValuesAroundEmpty = function getValuesAroundEmpty(matrix) {
		var row = void 0;
		var col = void 0;
		var matrixWidth = void 0;
		var arr = [];
	
		matrix.forEach(function (rowMatrix, i) {
			var emptyId = rowMatrix.indexOf('empty');
			if (emptyId !== -1) {
				row = i;
				col = emptyId;
			}
			matrixWidth = rowMatrix.length;
		});
	
		if (col !== 0) {
			arr.push(matrix[row][col - 1]);
		}
		if (row !== 0) {
			arr.push(matrix[row - 1][col]);
		}
		if (col !== matrixWidth - 1) {
			arr.push(matrix[row][col + 1]);
		}
		if (row !== matrixWidth - 1) {
			arr.push(matrix[row + 1][col]);
		}
		return arr;
	};
	
	// Замена значения target элемента на empty, а empty на target;
	var replaceTargetOnEmpty = function replaceTargetOnEmpty(target, matrix) {
		var val = Number(target.getAttribute('data-val'));
		var row = void 0;
		var col = void 0;
	
		matrix.forEach(function (item, i) {
			if (item.indexOf('empty') !== -1) {
				row = i;
				col = item.indexOf('empty');
			}
		});
	
		matrix.forEach(function (item, i) {
			if (item.indexOf(val) !== -1) {
				matrix[i][item.indexOf(val)] = 'empty';
				matrix[row][col] = val;
				return;
			}
		});
	};
	
	var itemMove = function itemMove(target) {
		var val = Number(target.getAttribute('data-val'));
		var emptyItem = document.querySelector('[data-val="empty"]');
	
		target.setAttribute('data-val', 'empty');
		target.innerHTML = '';
		target.classList.add(selectors.empty);
	
		emptyItem.setAttribute('data-val', val);
		emptyItem.innerHTML = val;
		emptyItem.classList.remove(selectors.empty);
	};
	
	var removeActiveItems = function removeActiveItems(selectorItem, classActive) {
		var activeItems = document.querySelectorAll(selectorItem);
		(0, _forEach2.default)(activeItems, function (item) {
			item.classList.remove(classActive);
		});
	};
	
	var addActiveItems = function addActiveItems(arrItems, classActive) {
		arrItems.forEach(function (item) {
			var element = document.querySelector('[data-val="' + item + '"]');
			element.classList.add(classActive);
		});
	};
	
	var areaGenerate = function areaGenerate(areaItems, arr) {
		(0, _forEach2.default)(areaItems, function (item, i) {
			item.setAttribute('data-val', arr[i]);
			item.innerHTML = arr[i];
	
			if (i === 15) {
				item.setAttribute('data-val', 'empty');
				item.innerHTML = '';
			}
		});
	};
	
	var resetGameArea = function resetGameArea(emptySelector, selectorItem) {
		removeActiveItems(selectors.itemArea, selectors.activeItem);
		var empty = document.querySelector('.' + selectors.empty);
		var lastItem = document.querySelector(selectorItem + ':last-child');
	
		empty.classList.remove(emptySelector);
		lastItem.classList.add(emptySelector);
	};
	
	var globalState = {
		matrix: [],
		counter: 0
	};
	
	var gameProcessEvent = function gameProcessEvent(item) {
		var target = item.target;
	
		replaceTargetOnEmpty(target, globalState.matrix);
		itemMove(target);
		removeActiveItems(selectors.itemArea, selectors.activeItem);
	
		var items = getValuesAroundEmpty(globalState.matrix);
		addActiveItems(items, selectors.activeItem);
	
		globalState.counter += 1;
		console.log(globalState.counter);
	};
	
	var gameProcess = function gameProcess(matrix) {
		var activeItems = getValuesAroundEmpty(matrix);
		addActiveItems(activeItems, selectors.activeItem);
		globalState.counter = 0;
	
		area.removeEventListener('click', gameProcessEvent);
		area.addEventListener('click', gameProcessEvent);
	};
	
	// Запуск игровой логики при клике на кнопку "Start Game"
	var startLogic = function startLogic() {
		var areaArr = createRandomArr(15);
		var matrix = matrixGen(4, 4, areaArr);
		areaGenerate(allItemArea, areaArr);
		resetGameArea(selectors.empty, selectors.itemArea);
		gameProcess(matrix);
	
		globalState.matrix = matrix;
	};
	
	// События
	var onClickStartGame = function onClickStartGame() {
		return (0, _bindEvent2.default)(selectors.startGame, 'click', startLogic);
	};
	
	// Инициализация событий
	onClickStartGame();

/***/ }

})
//# sourceMappingURL=0.f525eb477a6734a26c95.hot-update.js.map