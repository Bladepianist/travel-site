const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");

// Docs if you plan on upload it to "GitHub" else, industry standard is "dist".
const outputFolderName = "docs";

const postCSSPlugins = [
    require("postcss-import"),
    require("postcss-mixins"),
    require("postcss-simple-vars"),
    require("postcss-nested"),
    require("postcss-hexrgba"),
    require("autoprefixer")
];

class RunAfterCompile {
    apply(compiler) {
        compiler.hooks.done.tap("Copy images", function() {
            fse.copySync("./app/assets/images", "./" + outputFolderName + "/assets/images") // Copy every images inside the "dist" folder designated.
        });
    }
}

/* Lesson 16 of "Git a Web Developer Job: Mastering the Modern Workflow" : By default, the css-loader will attempt to handle any images we reference in our CSS (e.g. background images, etc...). While this is great in certain situations, for our usage in this course we want to disable this and we'll manage our image files manually. With this in mind, when you list 'css-loader' in your webpack.config.js file you'll want to add an option to the end of it like this 'css-loader?url=false' instead. */
let cssConfig = {
    test: /\.css$/i,
    use: ["css-loader?url=false", {loader: "postcss-loader", options: {plugins: postCSSPlugins}}]
};

// Return an array with all the files in "app" folder ending with "".html". Multiple hTML files ready.
let pages = fse.readdirSync("./app").filter(function(file) {
    return file.endsWith(".html");
}).map(function(page) { // Let us generate an array based on the array given by "filter"
    return new HtmlWebpackPlugin({
        filename: page,
        template: `./app/${page}` // Current file that we looped to, var in-between backtits (accent grave).
    });
});

// Global code used by both "dev" and "build" configs.
let config = {
    entry: "./app/assets/scripts/App.js",
    plugins: pages,
    module: {
        rules: [
            cssConfig
        ]
    }
};

if (currentTask == "dev") {
    cssConfig.use.unshift("style-loader");

    config.output = {
        filename: "bundled.js",
        path: path.resolve(__dirname, "app")
    };
    config.devServer = {
        before: function(app, server) {
            server._watch("./app/**/*.html")
        },
        contentBase: path.join(__dirname, 'app'),
        hot: true,
        port: 3000,
        host: '0.0.0.0'
    };
    config.mode = "development";
}

if (currentTask == "build") {

    config.module.rules.push({
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ["@babel/preset-env"]
            }
        }
    });
    cssConfig.use.unshift(MiniCssExtractPlugin.loader);
    postCSSPlugins.push(require("cssnano"));

    config.output = {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].js",
        path: path.resolve(__dirname, outputFolderName)
    };
    config.mode = "production";
    config.optimization = {
        splitChunks: {chunks: "all"} // Separates our vendor code (external modules) and our own code. This way, the user download vendor modules only when its updated (this is assuming our own code is updated often).
    };

    // Add on global config.plugins
    config.plugins.push(
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({filename: "styles.[chunkhash].css"}),
        new RunAfterCompile()
    );
}

module.exports = config;