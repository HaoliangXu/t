var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/react.js');

config = {
    entry: ['webpack/hot/dev-server', './src/main.js'],
    resolve: {
      /*alias: {
        'react': pathToReact
      }*/
    },
    output: {
        path: 'build',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css' },
            {test: /\.jsx?$/, loader: 'babel'}
        ],
        noParse: '[node_modules]'
    }
};

module.exports = config;
