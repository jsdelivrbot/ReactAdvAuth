import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextWebpackPlugin from 'extract-text-webpack-plugin';

const config = {
    devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
    entry: [
        './src/index.js'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader', 'babel-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                loader: 'url-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        port: 8080
    }
};


if (process.env.NODE_ENV === 'development') {
    config.module.rules.push({
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
    });

    config.plugins.push(
        new webpack.NamedModulesPlugin()
    )
}
else {
    config.plugins.push(
        new ExtractTextWebpackPlugin({
            filename: "[name].css"
        })
    );

    config.module.rules.push({
        test: /\.css$/,
        loader: ExtractTextWebpackPlugin.extract('css-loader')
    });
}

export default config;