const { CheckerPlugin } = require("awesome-typescript-loader");
const TerserPlugin = require("terser-webpack-plugin");

var config = {
    // Add resolve for `tsx` and `ts` files, otherwise Webpack would
    // only look for common JavaScript file extension (.js)
    resolve: { extensions: [".ts", ".tsx", ".js", ".jsx"] },

    // Activate source maps for the bundles in order to preserve the original
    // source when the user debugs the application
    devtool: "source-map",

    mode: "production",

    plugins: [new CheckerPlugin()],

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
    }
};

// Exports
module.exports = config;
