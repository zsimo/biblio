"use strict";

/**
 * to enable babel.
 * 1. use babel-loader for .js files
 * 2. do not exclude node_modules
 * 3. use babel-loader for .svelte files
 */

var path = require("path");
var {URL} = require("url");
var fs = require("fs");
var config = require(path.resolve(__dirname, "server", "config"));
var webpack = require("webpack");

var HtmlWebpackPlugin = require('html-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

if (config.LIVE_RELOAD_PORT) {
    var HandmadeLiveReload = require("handmade-livereload-webpack-plugin")({
        port: config.LIVE_RELOAD_PORT,
        host: new URL(config.APPLICATION_URL).origin
    });
}


var webRootPath = path.resolve(__dirname);
var pagesPath = path.resolve(webRootPath, "client", "pages");

const HANDMADE_LIVE_RELOAD = "handmade_live_reload";
const PAGES = fs.readdirSync(pagesPath, {
    withFileTypes: true,
}).filter(function (dirent) {
    return dirent.isDirectory();
}).map(function (dirent) {
    return dirent.name;
});

var jsEntries = {};
PAGES.forEach(function (page) {
    jsEntries[page] = [
        path.resolve(pagesPath, page, "index.js"),
        path.resolve(webRootPath, "client", "style", "index.sass")
    ];
});

module.exports = function (env = {}) {

    const IS_PROD = process.env.NODE_ENV === 'production' ? true : false;
    const MODE = IS_PROD ? "production" : "development";
    const DEV_TOOL = IS_PROD ? "source-map" : "eval";

    var publicPath = path.resolve(__dirname, 'public');
    var jsPath = path.resolve(publicPath, 'compiled');
    var srcPath = path.resolve(__dirname, 'client');


    var HtmlWebpackPluginCollection = PAGES.map(function (page) {

        var chunks = [page];
        if (!IS_PROD) {
            chunks.push(HANDMADE_LIVE_RELOAD);
        }

        var option = {
            template:`${srcPath}/templates/index.html`,
            chunks: chunks,
            filename: `${publicPath}/${page}/index.html`,
            // respect the array order
            chunksSortMode: "manual"
        };

        if (page === "index") {
            option.filename = `${publicPath}/index.html`;
        }

        return new HtmlWebpackPlugin(option);
    });


    var devPlugins = [
        // new CleanWebpackPlugin()
    ];


    if (config.LIVE_RELOAD_PORT) {
        devPlugins.push(
            new webpack.DefinePlugin({
                APPLICATION_URL: JSON.stringify(`${config.APPLICATION_URL}`),
                LIVE_RELOAD_PORT: JSON.stringify(`${config.LIVE_RELOAD_PORT}`),
            })
        );
    }

    var optimization = {};
    if (IS_PROD) {
        optimization.minimize = true;
        optimization.minimizer = [new TerserPlugin({
            terserOptions: {
                output: {
                    comments: false
                },
                compress: {
                    drop_console: true
                },
                safari10: true
            },
            sourceMap: true,
            extractComments: false
        })]
    } else {
        if (HandmadeLiveReload) {
            jsEntries[HANDMADE_LIVE_RELOAD] = path.resolve(HandmadeLiveReload.path_to_client);
            devPlugins.push(new HandmadeLiveReload.plugin());
        }
    }


  console.log(env);

    return {
        mode: MODE,
        entry: jsEntries,
        devtool: DEV_TOOL,
        output: {
          path: jsPath,
          filename: '[name]_[chunkhash].js'
        },
        optimization: optimization,
        module: {
          rules: [
            {
              test: /\.css$/,
                use: [
                    "style-loader",
                    "!css-loader"
                ]

            },
            {
              test: /\.sass$/,
              use: [
                  MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'
              ]
            },
            {
              test: /\.(png|svg|jpg|gif)$/,
              loader: 'file-loader',
              options: {
                  name: '[name]_[contenthash].[ext]',
                  // use commonjs with out need to get the .default value
                  esModule: false,
                  publicPath: "compiled"
              }
            }
          ]
        },

        resolve: {
          modules: ['node_modules', webRootPath]
        },


        plugins: [
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name]_[contenthash].css"
            })
        ].concat(HtmlWebpackPluginCollection, devPlugins)
    };

};