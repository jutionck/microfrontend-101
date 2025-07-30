const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

module.exports = {
  entry: './src/main.tsx',
  mode: 'development',
  devServer: {
    port: 3002, // Todo app runs on port 3002
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new ModuleFederationPlugin({
      name: 'todoApp',
      filename: 'remoteEntry.js',
      exposes: {
        './TodoList': './src/components/TodoList',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^19.1.0',
          eager: false,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^19.1.0',
          eager: false,
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
