module.exports = {
    //entry: './src/main.js',
    entry: ['webpack/hot/dev-server', './src/main.js'],
    output: {
        path: 'build',
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};
