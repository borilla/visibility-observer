function IntersectionObserverWrapper(window) {
	this._intersectionObserver = new window.IntersectionObserver(this._handleIntersectionChanged.bind(this));
	this._observing = new Map();
}

const IntersectionObserverWrapperPrototype = IntersectionObserverWrapper.prototype;

IntersectionObserverWrapperPrototype.observe = function (element, onVisibilityChanged) {
	this._intersectionObserver.observe(element);
	this._observing.set(element, onVisibilityChanged);
};

IntersectionObserverWrapperPrototype.unobserve = function (element) {
	this._intersectionObserver.unobserve(element);
	this._observing.delete(element);
};

IntersectionObserverWrapperPrototype._handleIntersectionChanged = function (entries) {
	const observing = this._observing;

	entries.forEach(function (entry) {
		const isVisible = entry.intersectionRatio > 0;
		const element = entry.target;
		const onVisibilityChanged = observing.get(element);

		onVisibilityChanged(isVisible, element);
	});
};

module.exports = IntersectionObserverWrapper;
