import * as path from 'path'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import { Configuration } from 'webpack'

export default {
    output: {
        publicPath: '/',
        path: path.join(__dirname, '../dist'),
        filename: 'static/js/[name].js',
        chunkFilename: 'static/js/[name].js'
    },
    devtool: 'cheap-module-source-map',
    devServer: {
        port: 3344
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
            inject: true
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [path.join(__dirname, '.awcache/*.*')]
        })
    ],
    mode: 'development'
} as Configuration
