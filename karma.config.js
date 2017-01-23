/* eslint-disable max-len */

// Karma configuration

const WebpackKarmaWarningsPlugin = require('./webpack-karma-warnings-plugin');
const webpackConfig = require('./webpack.config');

module.exports = function (config) {

	webpackConfig.devtool = 'inline-source-map';
	webpackConfig.entry = {};
	webpackConfig.output = {};
	webpackConfig.plugins = [new WebpackKarmaWarningsPlugin()];

	config.set({
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: './',

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai'],

		// list of files / patterns to load in the browser
		files: [
			'test/webpack.bundle.js',
			{ pattern: 'test/**/*.json', included: false, served: true },
			{ pattern: 'test/**/*.mp3', included: false, served: true },
			{ pattern: 'test/**/*.png', included: false, served: true },
			{ pattern: 'test/**/*.svg', included: false, served: true }
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test/webpack.bundle.js': ['webpack', 'sourcemap']
		},

		webpack: webpackConfig,

		webpackServer: {
			noInfo: true
		},

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha'],

		// web server port
		port: 9998,
		runnerPort: 9999,

		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		captureTimeout: 8500,
		reportSlowerThan: 500
	});
};
