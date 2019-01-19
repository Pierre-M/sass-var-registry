"use strict";

const process = require('process');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = config => {
    config.set({
        browsers: ['ChromeHeadless'],
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['spec'],
        preprocessors: {
            'index.js': ['webpack']
        },
        webpack: {
            mode: 'development'
        },
        files: [
            'index.js'
        ]
    });
};
