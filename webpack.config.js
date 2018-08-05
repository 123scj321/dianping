var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, "app/index.jsx"),
    output: {
        path:__dirname + '/build',
        filename:'bundle.js'
    },
    resolve: {
        extensions: ['.js','.jsx']
    },

    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: [
                    {
                        loader: "babel-loader",
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.(png|gif|jpg|jpeg|bmp|ico)$/i,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 5000
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            limit: 5000
                        }
                    }
                ]

            }
        ]
    },


    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [
                    require("autoprefixer")({ browsers:["last 3 version"] })
                ],
                // eslint: {
                //     configFile: '.eslintrc' // Rules for eslint
                // },

            }
        }),

        new OpenBrowserPlugin({
            url:'http://localhost:8080'
        }),

        new HtmlWebpackPlugin({
            template:__dirname + '/app/index.tmpl.html'
        }),


        new webpack.HotModuleReplacementPlugin(),

        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == "dev") || "false"))
        })
    ],

    devServer: {
        proxy: {
            // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
            // koa 代码在 ./mock 目录中，启动命令为 npm run mock
            '/api': {
                target: 'http://127.0.0.1:3000',
                secure: false
            }
        },
        historyApiFallback: true,
        inline: true,
        hot: true,
        host: "127.0.0.1",
        port: 8080,
        disableHostCheck: true,
    },
    performance: {
        hints: false
    }
};