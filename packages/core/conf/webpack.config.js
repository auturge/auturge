const { CheckerPlugin } = require("awesome-typescript-loader");
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

//==========================================================================================

const PROJECT_ROOT = path.resolve(__dirname, "../");
const SRC_PATH = path.resolve(PROJECT_ROOT, "./src");

// Specify where webpack should place the built items
const BUILD_PATH = path.resolve(PROJECT_ROOT, "./built");
const BUNDLE_PATH = path.resolve(BUILD_PATH, `./bundles`);

// Specify where the tests are to be found
const TEST_PATH = path.resolve(PROJECT_ROOT, "./test");

// specify the tsConfig project file to use
const TS_CONFIG_PATH = path.resolve(PROJECT_ROOT, "./src/tsconfig.json");

// Specify where webpack should start the bundling process
const entryPath = path.resolve(SRC_PATH, "./index.ts");

//==========================================================================================

// Get the package.json
const PACKAGE_JSON_PATH = path.resolve(PROJECT_ROOT, "./package.json");
const pkg = require(PACKAGE_JSON_PATH);

// Specify the library name
var LIBRARY_NAME = "";
// if it has a / or \ in the package name, then strip it down to the last part after the / or \
if (pkg.name.includes("/")) {
    let parts = pkg.name.split("/");
    LIBRARY_NAME = parts[parts.length - 1];
} else if (pkg.name.includes("\\")) {
    let parts = pkg.name.split("\\");
    LIBRARY_NAME = parts[parts.length - 1];
} else {
    LIBRARY_NAME = pkg.name;
}

// identify paths
var PATHS = {
    entryPoint: entryPath,
    bundles: BUNDLE_PATH,
    tsConfig: TS_CONFIG_PATH,
    tests: TEST_PATH
};

let entry = {};
entry[`${LIBRARY_NAME}.umd`] = [PATHS.entryPoint];
entry[`${LIBRARY_NAME}.umd.min`] = [PATHS.entryPoint];

let config = {
    // Activate source maps for the bundles in order to preserve the original
    // source when the user debugs the application
    // devtool: "source-map",

    // These are the entry point of our library. We tell webpack to use
    // the name we assign later, when creating the bundle. We also use
    // the name to filter the second entry point for applying code
    // minification via UglifyJS
    entry: entry,

    // Tell webpack not to bundle the following things, if it sees them
    externals: {
        electron: "electron",
        child_process: "child_process",
        crypto: "crypto",
        events: "events",
        fs: "fs",
        http: "http",
        https: "https",
        assert: "assert",
        dns: "dns",
        minimist: "minimist",
        net: "net",
        os: "os",
        path: "path",
        querystring: "querystring",
        readline: "readline",
        repl: "repl",
        stream: "stream",
        string_decoder: "string_decoder",
        url: "url",
        util: "util",
        zlib: "zlib",
        lodash: {
            commonjs: "lodash",
            amd: "lodash",
            root: "_" // indicates global variable
        }
    },

    mode: "production",

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

    optimization: {
        minimize: true,
        minimizer: [
            // Apply minification only on the second bundle by
            // using a RegEx on the name, which must end with `.min.js`
            // NB: Remember to activate sourceMaps in TerserPlugin
            // since they are disabled by default!
            new TerserPlugin({
                include: /\.min\.js$/,
                parallel: true,
                sourceMap: true,
                terserOptions: {
                    ecma: 8,
                    warnings: false,
                    output: { comments: false, beautify: false },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false
                }
            })
        ],
        noEmitOnErrors: true
    },

    // The output defines how and where we want the bundles. The special
    // value `[name]` in `filename` tell Webpack to use the name we defined
    // above.
    // We target a UMD and name it after the library. When including the bundle in the
    // browser
    // it will be accessible at `window.<LIBRARY_NAME>`
    output: {
        path: PATHS.bundles,
        filename: "[name].js",
        libraryTarget: "umd",
        library: LIBRARY_NAME,
        umdNamedDefine: true
    },

    plugins: [new CheckerPlugin()],

    resolve: {
        // Add resolve for `tsx` and `ts` files, otherwise Webpack would
        // only look for common JavaScript file extension (.js)
        extensions: [".ts", ".tsx", ".js", ".jsx"],

        plugins: [new TsconfigPathsPlugin({ configFile: PATHS.tsConfig })]
    }
};

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
    console.log(`    PROJECT_ROOT: [${PROJECT_ROOT}]`);
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
