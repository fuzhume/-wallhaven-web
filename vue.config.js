const CompressionWebpackPlugin = require('compression-webpack-plugin')

const productionGzipExtensions = ['js', 'css']
const isProd = process.env.NODE_ENV === 'production'

const assetsCDN = {
    // webpack build externals
    externals: {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        vuex: 'Vuex',
        axios: 'axios',
        nprogress: 'NProgress',
        'js-cookie': 'Cookies',
        lodash: '_',
    },
    css: [],
    js: [
        '//unpkg.com/vue@2.6.11/dist/vue.min.js',
        '//unpkg.com/ant-design-vue@1.7.2/dist/antd.min.js',
        '//unpkg.com/vue-router@3.3.4/dist/vue-router.min.js',
        '//unpkg.com/vuex@3.4.0/dist/vuex.min.js',
        '//unpkg.com/axios@0.19.2/dist/axios.min.js',
        '//unpkg.com/nprogress@0.2.0/nprogress.js',
        '//unpkg.com/clipboard@2.0.6/dist/clipboard.min.js',
        '//unpkg.com/js-cookie@2.2.1/src/js.cookie.js',
        '//unpkg.com/lodash@4.17.21/lodash.min.js'
    ]
}

module.exports = {
    // 2022年9月30日13:31:58 新增，取消保存时检测
    lintOnSave: false,
    devServer: {
        // proxy: {
        //   '/api': { //此处要与 /services/api.js 中的 API_PROXY_PREFIX 值保持一致
        //     target: process.env.VUE_APP_API_BASE_URL,
        //     changeOrigin: true,
        //     pathRewrite: {
        //       '^/api': ''
        //     }
        //   }
        // }
    },
    configureWebpack: config => {
        // 生产环境下将资源压缩成gzip格式
        if (isProd) {
            // add `CompressionWebpack` plugin to webpack plugins
            config.plugins.push(new CompressionWebpackPlugin({
                algorithm: 'gzip',
                test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8
            }))
        }
        // if prod, add externals
        if (isProd) {
            config.externals = assetsCDN.externals
        }
    },
    chainWebpack: config => {
        // 生产环境下使用CDN
        if (isProd) {
            config.plugin('html')
                .tap(args => {
                    args[0].cdn = assetsCDN
                    return args
                })
        }
    },
    publicPath: process.env.VUE_APP_PUBLIC_PATH,
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false
}
