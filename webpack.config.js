module.exports = {
    context: __dirname,
    entry: {
        javascript: "./scripts/index.js",
        html: "./index.html",
    },
    output: {
        path: __dirname,
        filename: "./scripts/bundle.js"
    },
    module: {
        loaders: [{
            test: /\.html$/,
            loader: "file?name=[name].[ext]",
        }, {
            test: /\.scss$/,
            loader: "style!css!sass"
        }]
    }
};
