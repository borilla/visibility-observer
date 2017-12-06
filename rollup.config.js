import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';

const babelOptions = {
	exclude: 'node_modules/**',
	plugins: [ 'external-helpers' ],
};

const uglifyOptions = {
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
};

function getConfig(inputFile, outputFile) {
	const config = {
		name: 'VisibilityObserver',
		input: inputFile,
		output: {
			file: outputFile,
			format: 'umd',
		},
		sourcemap: true,
		plugins: [
			resolve(),
			commonjs(),
			babel(babelOptions),
		],
	};

	if (outputFile.includes('.min.')) {
		config.plugins.push(uglify(uglifyOptions));
	}

	return config;
}

export default [
	getConfig('src/main.js', 'dist/main.js'),
	getConfig('src/main.js', 'dist/main.min.js'),
];
