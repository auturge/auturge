const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const merge = require("webpack-merge");
const path = require("path");

//==========================================================================================

const LIBRARY_NAME = "testing";
const AUTURGE_ROOT = path.resolve(__dirname, "../../..");
const PACKAGE_ROOT = path.resolve(__dirname, "../");
const webpackBase = path.resolve(AUTURGE_ROOT, "./conf/webpack.config.base.js");

// Specify where webpack should start the bundling process
const entryPath = path.resolve(PACKAGE_ROOT, "./src/index.ts");

// Specify where webpack should place the built bundles
const bundlePath = path.resolve(
    AUTURGE_ROOT,
    `./built/${LIBRARY_NAME}/bundles`
);

const testsPath = path.resolve(PACKAGE_ROOT, "./tests");

// specify the tsConfig project file to use
const tsConfig = path.resolve(PACKAGE_ROOT, "./tsconfig.json");

//==========================================================================================

// identify paths
// const PROJECT_ROOT = path.resolve(__dirname, '../');
var PATHS = {
    entryPoint: entryPath,
    bundles: bundlePath,
    tsConfig: tsConfig,
    tests: testsPath
};

let entry = {};
entry[`${LIBRARY_NAME}.umd`] = [PATHS.entryPoint];
entry[`${LIBRARY_NAME}.umd.min`] = [PATHS.entryPoint];

// import the base webpack config
const baseInfo = require(webpackBase);

let config = merge(baseInfo, {
    // These are the entry point of our library. We tell webpack to use
    // the name we assign later, when creating the bundle. We also use
    // the name to filter the second entry point for applying code
    // minification via UglifyJS
    entry: entry,

    // The output defines how and where we want the bundles. The special
    // value `[name]` in `filename` tell Webpack to use the name we defined
    // above.
    // We target a UMD and name it scatter. When including the bundle in the
    // browser
    // it will be accessible at `window.scatter`
    output: {
        path: PATHS.bundles,
        filename: "[name].js",
        libraryTarget: "umd",
        library: LIBRARY_NAME,
        umdNamedDefine: true
    },

    module: {
        // Webpack doesn't understand TypeScript files and a loader is needed.
        // `node_modules` folder is excluded in order to prevent problems with
        // the library dependencies, as well as `__tests__` folders that
        // contain the tests for the library
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                    // we don't want any declaration file in the bundles
                    // folder since it wouldn't be of any use and the source
                    // map already include everything for debugging
                    declaration: false,
                    configFileName: PATHS.tsConfig
                },
                exclude: [/node_modules/]
            }
        ]
    },

    resolve: {
        plugins: [new TsconfigPathsPlugin({ configFile: PATHS.tsConfig })]
    }
});

function describePackJob() {
    const showConfig = false;
    const isWatch = process.env.WATCH === "true";
    const NODE_ENV = "production";
    if (isWatch) {
        return;
    }
    console.log(" ");
    console.log(
        "===================================================================================================="
    );
    console.log(`==    PACKAGING  ${LIBRARY_NAME.toUpperCase()}`);
    console.log(
        "===================================================================================================="
    );
    console.log(" ");
    console.log(`        NODE_ENV: [${NODE_ENV}]`);
    console.log(`    PROJECT_ROOT: [${AUTURGE_ROOT}]`);
    console.log(`    PACKAGE_ROOT: [${PACKAGE_ROOT}]`);
    console.log(`       entryPath: [${PATHS.entryPoint}]`);
    console.log(`        tsConfig: [${PATHS.tsConfig}]`);
    console.log(`    BUNDLES PATH: [${PATHS.bundles}]`);
    console.log(" ");
    if (showConfig) {
        console.log("config");
        console.log(config);
        console.log(" ");
    }
}
describePackJob();

// Exports
module.exports = config;
