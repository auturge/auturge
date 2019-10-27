const path = require("path");

// Karma configuration
// Generated on Mon Sep 09 2019 20:16:27 GMT-0700 (Pacific Daylight Time)

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: ".",

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine", "karma-typescript"],

        // list of files / patterns to load in the browser
        files: ["src/**/*.ts", "tests/**/*.ts"],

        // list of files / patterns to exclude
        exclude: ["node_modules", "**/*.d.ts"],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "**/*.ts": ["karma-typescript"]
        },

        plugins: [
            "karma-typescript",
            "karma-chrome-launcher",
            "karma-jasmine",
            "karma-spec-reporter",
            "karma-coverage-istanbul-reporter"
        ],

        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json"
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', "coverage-istanbul"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["spec"],

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // PhantomJS, ChromeHeadless
        browsers: ["ChromeHeadless"],

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        // concurrency: Infinity,

        // any of these options are valid: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-api/lib/config.js#L33-L39
        coverageIstanbulReporter: {
            // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
            reports: ["html"],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: path.join(__dirname, "coverage"),

            // Omit files with no statements, no functions and no branches from the report
            skipFilesWithNoCoverage: true,

            // Most reporters accept additional config options. You can pass these through the `report-config` option
            "report-config": {
                // all options available at: https://github.com/istanbuljs/istanbuljs/blob/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib/html/index.js#L135-L137
                html: {
                    // outputs the report in ./coverage/html
                    subdir: "html"
                }
            },

            verbose: false // output config used by istanbul for debugging
        }
    });
};
