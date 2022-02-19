const Encore = require('@symfony/webpack-encore')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}


Encore
    // directory where compiled assets will be stored
    .setOutputPath('dist/')
    // public path used by the web server to access the output path
    .setPublicPath('/')
    // only needed for CDN's or sub-directory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './src/app.tsx')
    .splitEntryChunks()
    .disableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction())
    .configureBabel((config) => {
        config.plugins.push('@babel/plugin-proposal-class-properties')
    })
    .configureBabelPresetEnv((config) => {
        // config.useBuiltIns = 'usage';
        config.corejs = 3;
    })
    .enableTypeScriptLoader()
    .enableReactPreset()
    .enableIntegrityHashes(Encore.isProduction())
    .enableSassLoader()
    .addPlugin(new HtmlWebpackPlugin)

    .configureImageRule({ enabled: false })
    .addRule({
        // TODO(teawithsand): set format to webp, 
        test: /\.(jpe?g|png|webp)$/i,
        use: {
            // https://github.com/dazuaz/responsive-loader
            loader: 'responsive-loader',
            options: {
                esModule: true,
                sizes: [60, 480, 960, 1920, 1920000],
                adapter: require('responsive-loader/sharp'),
            }
        }
    })
    ;

const config = Encore.getWebpackConfig();
config.resolve.alias.react = path.resolve('node_modules/react');
module.exports = config;
