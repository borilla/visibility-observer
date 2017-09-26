const IntersectionObserverWrapper = require('../src/intersection-observer-wrapper');

describe('intersection-observer-wrapper', () => {
	let MockIntersectionObserver, mockIntersectionObserver;
	let window, observer;

	beforeEach(() => {
		// constructor creates a new IntersectionObserver, sending it a callback to be invoked
		// when observed elements change visibilty within the viewport
		// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
		MockIntersectionObserver = jest.fn(onIntersectionChanged => {
			mockIntersectionObserver = {
				onIntersectionChanged,
				observe: jest.fn(),
				unobserve: jest.fn(),
			};

			return mockIntersectionObserver;
		});
		window = {
			IntersectionObserver: MockIntersectionObserver,
		};
		observer = new IntersectionObserverWrapper(window);
	});

	test('is a function', () => {
		expect(IntersectionObserverWrapper).toBeInstanceOf(Function);
	});

	test('creates a new intersection-observer-wrapper', () => {
		expect(observer).toBeInstanceOf(IntersectionObserverWrapper);
	});

	test('has an "observe" method', () => {
		expect(observer.observe).toBeInstanceOf(Function);
	});

	test('has an "unobserve" method', () => {
		expect(observer.unobserve).toBeInstanceOf(Function);
	});

	describe('when observing an element', () => {
		let element, onVisibilityChanged;

		beforeEach(() => {
			element = {};
			onVisibilityChanged = jest.fn();
			observer.observe(element, onVisibilityChanged);
		});

		describe('when element becomes (partially or fully) visible in the viewport', () => {
			beforeEach(() => {
				// trigger callback with array of IntersectionObserverEntry
				// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry
				mockIntersectionObserver.onIntersectionChanged([
					{ target: element, intersectionRatio: 0.2 },
				]);
			});

			test('triggers callback function associated with the element', () => {
				expect(onVisibilityChanged).toHaveBeenCalledTimes(1);
			});

			test('triggers callback function with "true" (and the element)', () => {
				expect(onVisibilityChanged).lastCalledWith(true, element);
			});
		});

		describe('when element stops being visible in the viewport', () => {
			beforeEach(() => {
				mockIntersectionObserver.onIntersectionChanged([
					{ target: element, intersectionRatio: 0.0 },
				]);
			});

			test('triggers callback function associated with the element', () => {
				expect(onVisibilityChanged).toHaveBeenCalledTimes(1);
			});

			test('triggers callback function with "false" (and the element)', () => {
				expect(onVisibilityChanged).lastCalledWith(false, element);
			});
		});
	});
});
