module.exports = {
    mode: "production",
    entry: "./src/jquery.fcs.js",
    output: {
        path: __dirname + "/dist",
        filename: "jquery.fcs.min.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            [
                                "@babel/preset-env", {
                                    useBuiltIns: "usage",
                                    corejs: 3
                                }
                            ]
                        ]
                    }
                }
            }
        ]
    }
};