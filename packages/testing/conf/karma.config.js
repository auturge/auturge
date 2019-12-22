const path = require("path");
const puppeteer = require("puppeteer");
process.env.CHROME_BIN = puppeteer.executablePath();

// Karma configuration

//==========================================================================================

const LIBRARY_NAME = "testing";
const AUTURGE_ROOT = path.resolve(__dirname, "../../..");
const PACKAGE_ROOT = path.resolve(__dirname, "../");

// const webpackBase = path.resolve(AUTURGE_ROOT, "./conf/webpack.config.base.js");

// Specify where the tests should be compiled to, and where coverage results should be stored
const COVERAGE_FOLDER = path.resolve(AUTURGE_ROOT, "./coverage/testing");


//==========================================================================================


module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: PACKAGE_ROOT,

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ["jasmine", "karma-typescript"],

        // list of files / patterns to load in the browser
        files: [
            {
                pattern: "src/**/*.ts",
                watched: false,
                included: true,
                served: true
            },
            {
                pattern: "tests/**/*.ts",
                watched: false,
                included: true,
                served: true
            }
        ],

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
            "karma-coverage-istanbul-reporter",
            "karma-jasmine",
            "karma-spec-reporter",
            "karma-jasmine-html-reporter",
            "karma-summary-reporter"
        ],

        karmaTypescriptConfig: {
            tsconfig: "./conf/tsconfig.test.json",
            compilerOptions: {
                module: "CommonJS"
            },
            exclude: ["node_modules"]
        },

        // test results reporter to use
        // possible values: 'dots', 'progress', "coverage-istanbul"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["spec", "coverage-istanbul"],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        // Chrome, PhantomJS, HeadlessChrome
        browsers: ["Chrome"],

        customLaunchers: {
            HeadlessChrome: {
                base: "ChromeHeadless",
                flags: [
                    "--no-sandbox",
                    "--disable-translate",
                    "--disable-extensions",
                    "--disable-dev-shm-usage"
                ]
            }
        },

        // optionally, configure the reporter
        coverageIstanbulReporter: {
            // reports can be any that are listed here: https://github.com/istanbuljs/istanbuljs/tree/aae256fb8b9a3d19414dcf069c592e88712c32c6/packages/istanbul-reports/lib
            reports: ["html", "text-summary"],

            // base output directory. If you include %browser% in the path it will be replaced with the karma browser name
            dir: COVERAGE_FOLDER,

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

            // thresholds: {
            //     statements: 80,
            //     lines: 80,
            //     branches: 80,
            //     functions: 80
            // }
        },

        concurrency: Infinity,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        mime: {
            "text/x-typescript": ["ts", "tsx"]
        },
        failOnEmptyTestSuite: false
    });
};
