const IntersectionObserverWrapper = require('./src/intersection-observer-wrapper');
const VerticalVisibilityObserver = require('./src/vertical-visibility-observer');

module.exports = function (window) {
	if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window) {
		return new IntersectionObserverWrapper(window);
	}

	return new VerticalVisibilityObserver(window);
};
