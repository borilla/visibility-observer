import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
	name: 'VisibilityObserver',
	input: 'src/main.js',
	output: {
		file: 'dist/main.min.js',
		format: 'umd'
	},
	sourcemap: true,
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			plugins: [ 'external-helpers' ]
		})
	],
};
