const path = require("path");

module.exports = {
    mode: "development",
    entry: "./src/client/loader.js",
    output: {
        path: path.join(__dirname, "dist/assets/js"),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                // loader: "babel-loader",  //just one loader
                use: [
                    {
                        loader: 'babel-loader', options: {
                            presets: ["env", "stage-0", "react"]
                        }
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            }
        ]
    },
    devtool: "cheap-module-eval-source-map"
};
