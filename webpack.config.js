var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var amwWebpack = require('antd-mobile-web/webpack');

var publicPath = '/dist/'; //文件资源引用路径，比如background:url(****);***的地址转换就在publicPath
var path = __dirname + '/dist/'; //__dirname获取当前模块文件所在目录的完整绝对路径

var plugins = [];

if (process.argv.indexOf('-p') > -1) { //生产环境
    plugins.push(new webpack.DefinePlugin({ //编译成生产版本
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    publicPath = 'dist/';  //引用资源文件的路径，
    path = __dirname + '/dist/'; //存放打包好文件的路径
}
plugins.push(new ExtractTextPlugin('[name].css')); //css单独打包

plugins.push(new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
    filename: 'index.html', //生成的html存放路径，相对于 path
    template: './src/template/index.html', //html模板路径
    hash: true    //为静态资源生成hash值
}));

module.exports = {
    entry: {
        app: './src/App', //编译的入口文件
    },
    output: {
        publicPath, //公共资源文件路径
        path, //编译到当前目录
        filename: '[name].js' //编译后的文件名字
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /^node_modules$/,
                loader: 'babel?presets=es2015&compact=false',
            }, 

/*
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader!autoprefixer-loader'
            }, {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: 'style-loader!css-loader!autoprefixer-loader!less-loader'
            }
*/
            {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            }, {
                test: /\.(eot|woff|ttf|woff2|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                loader: 'file-loader?name=[name].[ext]'
            }, {
                test: /\.(png|jpg|gif|svg)$/,
                exclude: /^node_modules$/,
                loader: 'url?limit=10000&name=[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            }, {
                test: /\.jsx$/,
                exclude: /^node_modules$/,
                loaders: ['jsx', 'babel?presets[]=es2015,presets[]=react']
            }
        ],
        rules: [
            amwWebpack.createSvgRule()
        ]
    },
    plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    }
};
