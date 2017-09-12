const IntersectionObserverWrapper = require('./intersection-observer-wrapper');
const VerticalVisibilityObserver = require('./vertical-visibility-observer');

module.exports = function (window) {
	if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window) {
		return new IntersectionObserverWrapper(window);
	}

	return new VerticalVisibilityObserver(window);
};
