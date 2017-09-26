function VerticalVisibilityObserver(window) {
	this._window = window;
	this._viewport = { top: 0, bottom: 0 };
	this._observing = new Map();
	this._handleResize = this._handleResize.bind(this);
	this._handleScroll = this._handleScroll.bind(this);
}

const VerticalVisibilityObserverPrototype = VerticalVisibilityObserver.prototype;

VerticalVisibilityObserverPrototype.observe = function (element, onVisibilityChanged) {
	const info = { top: 0, bottom: 0, isVisible: null, onVisibilityChanged };

	if (this._observing.size === 0) {
		this._updateViewportDimensions();
		this._addListeners();
	}

	this._observing.set(element, info);
	this._updateElementDimensions(info, element);
	this._updateElementVisibilty(info, element);
};

VerticalVisibilityObserverPrototype.unobserve = function (element) {
	this._observing.delete(element);

	if (this._observing.size === 0) {
		this._removeListeners();
	}
};

VerticalVisibilityObserverPrototype._addListeners = function () {
	this._window.addEventListener('load', this._handleResize);
	this._window.addEventListener('resize', this._handleResize);
	this._window.addEventListener('scroll', this._handleScroll);
};

VerticalVisibilityObserverPrototype._removeListeners = function () {
	this._window.removeEventListener('load', this._handleResize);
	this._window.removeEventListener('resize', this._handleResize);
	this._window.removeEventListener('scroll', this._handleScroll);
};

VerticalVisibilityObserverPrototype._updateViewportDimensions = function () {
	const top = this._viewport.top = this._window.scrollY;
	const height = this._window.innerHeight;

	this._viewport.bottom = top + height;
};

VerticalVisibilityObserverPrototype._updateElementDimensions = function (info, element) {
	info.top = element.offsetTop;
	info.bottom = info.top + element.offsetHeight;
};

VerticalVisibilityObserverPrototype._updateElementVisibilty = function (info, element) {
	const viewport = this._viewport;
	const isVisible = info.top < viewport.bottom && info.bottom > viewport.top;

	if (isVisible !== info.isVisible) {
		info.isVisible = isVisible;
		info.onVisibilityChanged(isVisible, element);
	}
};

VerticalVisibilityObserverPrototype._handleResize = function () {
	// group style *reads* before *writes*
	this._updateViewportDimensions();
	this._observing.forEach(this._updateElementDimensions, this);
	this._observing.forEach(this._updateElementVisibilty, this);
};

VerticalVisibilityObserverPrototype._handleScroll = function () {
	this._updateViewportDimensions();
	this._observing.forEach(this._updateElementVisibilty, this);
};

module.exports = VerticalVisibilityObserver;
