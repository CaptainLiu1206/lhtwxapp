var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // baseURL: '"http://192.168.207.17:8082"'
  baseURL: '"http://118.190.206.166:8082"'
})
