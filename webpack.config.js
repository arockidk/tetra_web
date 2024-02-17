const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = {
    entry: "./interbuild/main.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
    },
    mode: "development",
    experiments: {
        asyncWebAssembly: true,
    },
    plugins: [
    ],
    
}