var webpack = require('webpack');
var path = require('path');

var libraryName = 'Library';

module.exports = function(env) {
  var mode = env.mode;
  var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

  var plugins = [];
  var outputFile = null;

  if (mode === 'build') {
    plugins.push(new UglifyJsPlugin({
      sourceMap: true,
      beautify: false,
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true,
        screw_ie8: false
      },
      mangle: {
        except: [],
        screw_ie8: false,
        keep_fnames: true
      }
    }));
    outputFile = libraryName + '.min.js';
  } else {
    outputFile = libraryName + '.js';
  }

  return {
    entry: __dirname + '/src/index.js',
    devtool: 'source-map',
    output: {
      path: __dirname + '/lib',
      filename: outputFile,
      library: libraryName,
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module: {
      rules: [{
        test: /(\.jsx|\.js)$/,
        use: [{
          loader: 'babel-loader'
        }, {
          loader: 'eslint-loader'
        }],
        exclude: /(node_modules|bower_components)/
      }]
    },
    resolve: {
      modules: [
        path.resolve(__dirname, './src'),
        'node_modules'
      ],
      extensions: ['.js', '.jsx']
    },
    plugins: plugins
  };
};

