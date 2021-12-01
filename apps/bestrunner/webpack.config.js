const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js'); // require the main @nrwl/react/plugins/webpack configuration function.

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const jsLoaders = () => {
  const laoders = [
    {
      loader: 'babel-loader',
    },
  ];

  if (isDev) {
    laoders.push('eslint-loader');
  }

  return laoders;
};

const plugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd,
      },
    }),
    new CleanWebpackPlugin(),
  ];

  return base;
};

module.exports = (config, context) => {
  nrwlConfig(config);

  return {
    ...config
  }

  // return {
  //   ...config,
  //   context: path.resolve(__dirname, 'src'),
  //   mode: 'development',
  //   entry: {
  //     main: ['@babel/polyfill', './main.tsx'],
  //   },
  //   output: {
  //     path: path.resolve(__dirname, '../../dist/apps/bestrunner'),
  //     filename: 'bundle.js',
  //   },
  //   resolve: {
  //     extensions: ['.js', '.jsx', '.ts', '.tsx'],
  //   },
  //   devServer: {
  //     port: 3000,
  //     hot: isDev,
  //   },
  //   plugins: plugins(),
  //   module: {
  //     rules: [
  //       {
  //         test: /\.js$/,
  //         exclude: /node_modules/,
  //         use: jsLoaders(),
  //       },
  //       {
  //         test: /\.jsx$/,
  //         exclude: /node_modules/,
  //         use: {
  //           loader: 'babel-loader',
  //           options: {
  //             presets: ['@babel/preset-env', '@babel/preset-react'],
  //           },
  //         },
  //       },
  //       {
  //         test: /\.tsx?$/,
  //         use: 'ts-loader',
  //         exclude: /node_modules/,
  //       },
  //       {
  //         test: /\.css$/,
  //         use: ['style-loader', 'css-loader'],
  //       },
  //     ],
  //   },
  // };
};
