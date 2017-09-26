const VerticalVisibilityObserver = require('../src/vertical-visibility-observer');
const MockWindow = require('./mocks/mock-window');

describe('vertical-visibility-observer', () => {
	let mockWindow, observer;

	beforeEach(() => {
		mockWindow = new MockWindow();
		observer = new VerticalVisibilityObserver(mockWindow);
	});

	test('is a function', () => {
		expect(VerticalVisibilityObserver).toBeInstanceOf(Function);
	});

	test('creates a new vertical-visibility-observer', () => {
		expect(observer).toBeInstanceOf(VerticalVisibilityObserver);
	});

	test('has an "observe" method', () => {
		expect(observer.observe).toBeInstanceOf(Function);
	});

	test('has an "unobserve" method', () => {
		expect(observer.unobserve).toBeInstanceOf(Function);
	});

	describe('when observing an initially visible element', () => {
		let element, onVisibilityChanged;

		beforeEach(() => {
			element = {
				offsetTop: 100,
				offsetHeight: 200,
			};
			onVisibilityChanged = jest.fn();
			observer.observe(element, onVisibilityChanged);
		});

		test('immediately triggers the callback function associated with the element', () => {
			expect(onVisibilityChanged).toHaveBeenCalledTimes(1);
		});

		test('triggers callback function with "true" (and the element)', () => {
			expect(onVisibilityChanged).lastCalledWith(true, element);
		});

		describe('when scrolling leaves the element fully visible', () => {
			beforeEach(() => {
				mockWindow.helpers.simulateScrollTo(100);
			});

			test('should not trigger the callback function again', () => {
				expect(onVisibilityChanged).toHaveBeenCalledTimes(1);
			});
		});

		describe('when scrolling makes the element partially visible', () => {
			beforeEach(() => {
				mockWindow.helpers.simulateScrollTo(200);
			});

			test('should not trigger the callback function again', () => {
				expect(onVisibilityChanged).toHaveBeenCalledTimes(1);
			});
		});

		describe('when scrolling makes the element no longer visible', () => {
			beforeEach(() => {
				mockWindow.helpers.simulateScrollTo(300);
			});

			test('should trigger the callback function again', () => {
				expect(onVisibilityChanged).toHaveBeenCalledTimes(2);
			});

			test('triggers callback function with "false" (and the element)', () => {
				expect(onVisibilityChanged).lastCalledWith(false, element);
			});
		});
	});

	describe('when observing an element which is initially not visible', () => {
		let element, onVisibilityChanged;

		beforeEach(() => {
			element = {
				offsetTop: 1100,
				offsetHeight: 200,
			};
			onVisibilityChanged = jest.fn();
			observer.observe(element, onVisibilityChanged);
		});

		test('immediately triggers the callback function associated with the element', () => {
			expect(onVisibilityChanged).toHaveBeenCalledTimes(1);
		});

		test('triggers callback function with "false" (and the element)', () => {
			expect(onVisibilityChanged).lastCalledWith(false, element);
		});

		describe('when scrolling leaves the element not visible', () => {
			beforeEach(() => {
				mockWindow.helpers.simulateScrollTo(100);
			});

			test('does not trigger the callback function again', () => {
				expect(onVisibilityChanged).toHaveBeenCalledTimes(1);
			});
		});

		describe('when scrolling makes the element partially visible', () => {
			beforeEach(() => {
				mockWindow.helpers.simulateScrollTo(200);
			});

			test('triggers the callback function again', () => {
				expect(onVisibilityChanged).toHaveBeenCalledTimes(2);
			});

			test('triggers callback function with "true" (and the element)', () => {
				expect(onVisibilityChanged).lastCalledWith(true, element);
			});
		});

		describe('when scrolling makes the element fully visible', () => {
			beforeEach(() => {
				mockWindow.helpers.simulateScrollTo(1000);
			});

			test('should trigger the callback function again', () => {
				expect(onVisibilityChanged).toHaveBeenCalledTimes(2);
			});
		});
	});
});
