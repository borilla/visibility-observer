const defaultProperties = {
	scrollY: 0,
	innerHeight: 1000
};

class MockWindow {
	constructor(properties) {
		// merge supplied properties with defaults
		Object.assign(this, defaultProperties, properties);

		this.helpers = new MockWindowHelpers(this);
	}

	addEventListener(eventName, callback) {
		this.helpers.addEventListener(eventName, callback);
	}

	removeEventListener(eventName, callback) {
		this.helpers.removeEventListener(eventName, callback);
	}
}

class MockWindowHelpers {
	constructor(mockWindow) {
		this._window = mockWindow;
		this._eventListeners = {};
	}

	getEventListeners(eventName) {
		return this._eventListeners[eventName] || (this._eventListeners[eventName] = []);
	}

	addEventListener(eventName, callback) {
		const listeners = this.getEventListeners(eventName);

		listeners.push(callback);
	}

	removeEventListener(eventName, callback) {
		const listeners = this.getEventListeners(eventName);
		const index = listeners.indexOf(callback);

		if (index !== -1) {
			listeners.splice(index, 1);
		}
	}

	triggerEvent(eventName, eventProperties) {
		const listeners = this.getEventListeners(eventName);
		const event = Object.assign({ type: eventName }, eventProperties);

		listeners.forEach(callback => callback(event));
	}

	simulateScrollTo(newScrollY) {
		this._window.scrollY = newScrollY;
		this.triggerEvent('scroll');
	}

	simulateResizeTo(newInnerHeight) {
		this._window.innerHeight = newInnerHeight;
		this.triggerEvent('resize');
	}
}

module.exports = MockWindow;
