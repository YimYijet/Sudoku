import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import baseConfig from './build/webpack.base.conf'
import devConfig from './build/webpack.dev.conf'
import prodConfig from './build/webpack.prod.conf'

import 'webpack-dev-server'

export default (_, argv) => {
    switch (argv.mode) {
        case 'development':
            return merge<Configuration>(baseConfig, devConfig)
        case 'production':
            return merge<Configuration>(baseConfig, prodConfig)
        default:
            throw new Error('Please set mode first!')
    }
}
