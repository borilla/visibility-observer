import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

export default {
	name: 'VisibilityObserver',
	input: 'src/main.js',
	output: {
		file: 'dist/main.min.js',
		format: 'umd',
	},
	sourcemap: true,
	plugins: [
		resolve(),
		commonjs(),
		babel({
			exclude: 'node_modules/**',
			plugins: [ 'external-helpers' ],
		}),
		uglify({
			compress: {
				passes: 2,
			},
			mangle: {
				toplevel: true,
				properties: {
					regex: /^_/,
				},
			},
			toplevel: true,
		}),
	],
};
