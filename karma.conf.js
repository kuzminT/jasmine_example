const path = require('path');

module.exports = function(config) {
    config.set({
        basePath: './',
        frameworks: ['jasmine'],
        files: [
            {pattern: 'spec/test_index.js'},
        ],
        exclude: [],
        preprocessors: {
            'spec/test_index.js': ['webpack'],
        },
        webpack: {
            mode: 'development',
            module: {
                rules: [
                    // rules for modules (configure loaders, parser options, etc.)
                    {
                        test: /\.jsx?$/,
                        exclude: [
                            path.resolve(__dirname, "node_modules")
                        ],
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@babel/preset-env']
                            }
                        },
                    },
                ]
            },
        },
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
     /*   customLaunchers: {
            ChromeHeadless: {
                base: 'Chrome',
                flags: [
                    '--no-sandbox',
                    '--headless',
                    '--disable-gpu',
                    '--remote-debugging-port=9222',
                ],
            },
        },*/
    });
};