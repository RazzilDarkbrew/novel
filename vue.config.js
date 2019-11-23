const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
    productionSourceMap: false,
    runtimeCompiler: true,
    publicPath: './',
    lintOnSave: undefined,
    configureWebpack: config => {
        const plugins = [
            purgecss({
                content: ['./components/*.vue', './views/*.vue', './*.vue'],
                whitelist: ['html', 'body'],
                whitelistPatternsChildren: [/^token/, /^pre/, /^code/]
            })
        ];
        if (process.env.NODE_ENV === 'product') {
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            warnings: false,
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ['console.log'] //移除console
                        }
                    },
                    sourceMap: false,
                    parallel: true
                })
            );
            config.plugins = [...config.plugins, ...plugins];
        }
    },

    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            var externals = {
                vue: 'Vue',
                axios: 'axios',
                'vue-router': 'VueRouter',
                vuex: 'Vuex'
            };
            config.externals(externals);
            const cdn = {
                js: [
                    // vue
                    '//cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.min.js',
                    // vue-router
                    '//cdn.jsdelivr.net/npm/vue-router@3.0.6/dist/vue-router.min.js',
                    // axios
                    '//cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js'
                ]
            };
            config.plugin('html').tap(args => {
                args[0].cdn = cdn;
                return args;
            });

            config
            .plugin('compression')
            .use(CompressionPlugin, {
                asset: '[path].gz[query]',
                algorithm: 'gzip',
                test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
                threshold: 10240,
                minRatio: 0.8,
                cache: true
            })
            .tap(args => {});
        }
        const imagesRule = config.module.rule('images');
        imagesRule
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
            mozjpeg: {
                progressive: true,
                quality: 65
            },
            // optipng.enabled: false will disable optipng
            optipng: {
                enabled: false
            },
            pngquant: {
                quality: '65-90',
                speed: 4
            },
            gifsicle: {
                interlaced: false
            },
            // the webp option will enable WEBP
            webp: {
                quality: 75
            }
        })
        .end();
    }
};

