import path from 'path';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import npmMain from 'mn-npm-main';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import SourceMapDevToolPlugin from 'webpack/lib/SourceMapDevToolPlugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';

// Development: map files
// Production: vendors, min files

const vendors = true;

module.exports = (env, args) => {
    const prod = args.mode === 'production' || process.env.NODE_ENV === 'production';

    // Modules to transpile. Include all npm modules that are in ES6.
    const babelModules = [
        path.resolve(__dirname, './wwwroot/src'),
        path.resolve(__dirname, './node_modules/apexcharts'),
        path.resolve(__dirname, './node_modules/vue-bootstrap-typeahead'),
        path.resolve(__dirname, './node_modules/mn-anytext'),
        path.resolve(__dirname, './node_modules/mn-anytext-vue')
    ];

    const developmentOnlyPlugins = prod ?
        [] :
        [
            new SourceMapDevToolPlugin({
                filename: '[name].js.map'
            })
        ];

    // Slow operations only used in production
    const productionOnlyPlugins = prod ?
        [
            ...vendors ? [
                new CopyWebpackPlugin(
                    npmMain().map(asset => {
                        let subPath = asset.replace(/\//g, '\\')
                            .replace(path.resolve(__dirname, './node_modules'), '.');
                        subPath = subPath.substr(0, subPath.length - path.basename(asset).length - 1);
                        return {
                            from: asset,
                            to: path.resolve(__dirname, './wwwroot/assets/_vendors', subPath)
                        };
                    })
                ),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, './wwwroot/lib_manual'),
                        to: path.resolve(__dirname, './wwwroot/assets/_vendors')
                    }
                ]),
                new CopyWebpackPlugin([
                    {
                        from: path.resolve(__dirname, './wwwroot/lib'),
                        to: path.resolve(__dirname, './wwwroot/assets/_vendors')
                    }
                ])
            ] : [],
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                sourceMap: true
            }),
            new OptimizeCssAssetsPlugin({
                assetNameRegExp: /\.min\.css$/
            })
        ] :
        [];

    return {
        mode: 'development',
        resolve: {
            alias: {
                vue: 'vue/dist/vue.js' // Resolve the issue described here https://github.com/vuejs-templates/webpack/issues/215
            }
        },
        context: path.resolve(__dirname, './wwwroot/src'),
        entry: function () {
            const entries = {
                // Include polyfill before any other application scripts. Only once.
                'site/site': ['@babel/polyfill', './site/site.js'],
                // Building
                'building/features/index/app': './building/features/index/app.js',
                'building/features/new/app': './building/features/new/app.js',
                'building/features/view/app': './building/features/view/app.js',
                'building/projects/index/app': './building/projects/index/app.js',
                'building/projects/new/app': './building/projects/new/app.js',
                'building/projects/view/app': './building/projects/view/app.js',
                'building/projects/generate/app': './building/projects/generate/app.js',
                'building/modules/new/app': './building/modules/new/app.js',
                'building/modules/view/app': './building/modules/view/app.js',
                'building/items/new/app': './building/items/new/app.js',
                'building/items/view/app': './building/items/view/app.js',
                // Refactoring
                'refactoring/rename/app': './refactoring/rename/app.js'
            };

            if (prod) {
                for (const entry in entries) {
                    entries[entry + '.min'] = entries[entry];
                }
            }

            return entries;
        },
        output: {
            path: path.resolve(__dirname, './wwwroot/assets'),
            publicPath: '/assets/',
            filename: '[name].js'
        },
        devtool: false,
        module: {
            rules: [
                {
                    test: /\.(s*)css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            // Required for resolve-url-loader
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    include: babelModules,
                    use: ['babel-loader']
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[path][name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: 'fonts/[name].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.vue$/,
                    use: ['vue-loader', 'vue-inheritance-loader']
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new VueLoaderPlugin(),
            ...developmentOnlyPlugins,
            ...productionOnlyPlugins
        ]
    };
};