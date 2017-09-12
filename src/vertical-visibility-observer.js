function VerticalVisibilityObserver(window) {
	this._window = window;
	this._viewport = { top: 0, bottom: 0 };
	this._observing = new Map();
	this._handleResize = this._handleResize.bind(this);
	this._handleScroll = this._handleScroll.bind(this);
}

VerticalVisibilityObserver.prototype.observe = function (element, onVisibilityChanged) {
	const info = { top: 0, bottom: 0, isVisible: null, onVisibilityChanged };

	if (this._observing.size === 0) {
		this._updateViewport();
		this._addListeners();
	}

	this._observing.set(element, info);
	this._updateElement(info, element);
};

VerticalVisibilityObserver.prototype.unobserve = function (element) {
	this._observing.delete(element);

	if (this._observing.size === 0) {
		this._removeListeners();
	}
};

VerticalVisibilityObserver.prototype._addListeners = function () {
	// TODO: Add load and/or orientationchange events?
	this._window.addEventListener('resize', this._handleResize);
	this._window.addEventListener('scroll', this._handleScroll);
};

VerticalVisibilityObserver.prototype._removeListeners = function () {
	this._window.removeEventListener('resize', this._handleResize);
	this._window.removeEventListener('scroll', this._handleScroll);
};

VerticalVisibilityObserver.prototype._updateViewport = function () {
	const top = this._viewport.top = this._window.scrollY;
	const height = this._window.innerHeight;

	this._viewport.bottom = top + height;
};

VerticalVisibilityObserver.prototype._updateElement = function (info, element) {
	info.top = element.offsetTop;
	info.bottom = info.top + element.offsetHeight;

	this._updateElementVisibilty(info, element);
};

VerticalVisibilityObserver.prototype._updateElementVisibilty = function (info, element) {
	const viewport = this._viewport;
	const isVisible = info.top < viewport.bottom && info.bottom > viewport.top;

	if (isVisible !== info.isVisible) {
		info.isVisible = isVisible;
		info.onVisibilityChanged(isVisible, element);
	}
};

VerticalVisibilityObserver.prototype._handleResize = function () {
	this._updateViewport();
	this._observing.forEach(this._updateElement, this);
};

VerticalVisibilityObserver.prototype._handleScroll = function () {
	this._updateViewport();
	this._observing.forEach(this._updateElementVisibilty, this);
};

module.exports = VerticalVisibilityObserver;
