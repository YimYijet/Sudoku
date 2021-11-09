import * as path from 'path'
import * as MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
    entry: {
        index: path.join(__dirname, '../src/index.tsx')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
            '@': path.join(__dirname, '..', 'src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(ts(x?)|js(x?))$/,
                use: ['babel-loader', 'ts-loader'],
                include: path.join(__dirname, '../src'),
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                type: 'asset/inline',
                generator: {
                    filename: 'images/[hash][ext][query]',        // 小于8k图片转换为base64格式
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 8192
                    }
                }
            },
            {
                test: /\.(eot|tff|woff|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    }
}