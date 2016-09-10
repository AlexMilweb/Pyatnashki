// matches
(() => {
	if (!Element.prototype.matches) {
		Element.prototype.matches = Element.prototype.matchesSelector ||
		Element.prototype.webkitMatchesSelector ||
		Element.prototype.mozMatchesSelector ||
		Element.prototype.msMatchesSelector;
	}
})();

// closest
(e => {
	e.closest = e.closest || function (css) {
		let node = this;
		while (node) {
			if (node.matches(css)) {return node;}
			node = node.parentElement;
		}
		return null;
	};
})(Element.prototype);

// customEvents
(() => {
	const CustomEvent = (event, params) => {
		params = params || {bubbles: false, cancelable: false, detail: undefined}; // eslint-disable-line
		const evt = document.createEvent( 'CustomEvent' );
		evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
		return evt;
	};

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;
})();
