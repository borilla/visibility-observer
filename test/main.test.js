const mockIntersectionObserverWrapper = function () {};
const mockVerticalVisibilityObserver = function () {};
const VisibilityObserver = require('../src/main');

// mock intersection-observer-wrapper and vertical-visibility-observer
jest.mock('../src/intersection-observer-wrapper', () => mockIntersectionObserverWrapper);
jest.mock('../src/vertical-visibility-observer', () => mockVerticalVisibilityObserver);

describe('visibility-observer', () => {
	let observer, window;

	beforeEach(() => {
		observer = new VisibilityObserver(window);
	});

	describe('when window contains IntersectionObserver and IntersectionObserverEntry', () => {
		beforeAll(() => {
			window = {
				IntersectionObserver: function () {},
				IntersectionObserverEntry: function () {}
			};
		});

		test('should return instance of intersection-observer-wrapper', () => {
			expect(observer).toBeInstanceOf(mockIntersectionObserverWrapper);
		});
	});

	describe('when window doesn\'t contain IntersectionObserver and IntersectionObserverEntry', () => {
		beforeAll(() => {
			window = {};
		});

		test('should return instance of vertical-visibility-observer', () => {
			expect(observer).toBeInstanceOf(mockVerticalVisibilityObserver);
		});
	});
});
