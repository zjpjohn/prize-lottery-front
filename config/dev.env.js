'use strict'
const merge   = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    ENV_NAME: '"dev"',
    ENV_PAY: '"no"',
    ENV_ADS: '"no"',
    NODE_ENV: '"development"',
    API_ROOT: '"http://localhost:8090"',
})
