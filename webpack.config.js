const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env, options) => {
    const devMode = options.mode !== "production";

    return {
        entry: { main: "./src/index.js" },
        output: {
            path: path.resolve(__dirname, "dist"),
            filename: devMode ? "[name].js" : "[name].[hash].js",
            chunkFilename: devMode ? "[name].chunk.js" : "[name].chunk.[hash].js",
            publicPath: "/",
        },
        watch: devMode,
        devtool: "cheap-module-source-map",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader",
                            options: { minimize: true },
                        },
                    ],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    // exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "typings-for-css-modules-loader",
                            options: {
                                sourceMap: true,
                                modules: true,
                                namedExport: true,
                                camelCase: true,
                                localIdentName: "[local]___[hash:base64:5]",
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: { sourceMap: true },
                        },
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]",
                            outputPath: "fonts/",
                        },
                    }],
                },
            ],
        },

        devServer: {
            // contentBase: path.join(__dirname, 'dist'),
            compress: true,
            historyApiFallback: true,
            hot: true,
            // contentBase: 'src/',
            // publicPath: 'public/',
            // inline: true,
            host: "0.0.0.0",
            port: 1212,
        },

        plugins: [
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                filename: "./index.html",
            }),
            new MiniCssExtractPlugin({
                filename: devMode ? "[name].css" : "[name].[hash].css",
                chunkFilename: devMode ? "[id].css" : "[id].[hash].css",
            }),
            new webpack.HotModuleReplacementPlugin(),
            new CleanWebpackPlugin(["dist"]),
            // new CopyWebpackPlugin([
            //     {
            //         from: "./src/favicon.ico",
            //         to: "./favicon.ico",
            //     },
            // ])
        ],
    };
};