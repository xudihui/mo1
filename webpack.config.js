var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html
var amwWebpack = require('antd-mobile-web/webpack');
var path_ = require('path');
var publicPath = '/dist/'; //文件资源引用路径，比如background:url(****);***的地址转换就在publicPath
var path = __dirname + '/dist/'; //__dirname获取当前模块文件所在目录的完整绝对路径

var plugins = [];

if (process.argv.indexOf('-p') > -1) { //生产环境
    plugins.push(new webpack.DefinePlugin({ //编译成生产版本
        'process.env': {
            NODE_ENV: JSON.stringify('production')
        }
    }));
    //提取公共js
    //plugins.push(new webpack.optimize.CommonsChunkPlugin('common.js'));

    //压缩js
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
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
const svgDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
    // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];
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
            {
                test: /\.scss/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
            },
            {
                test: /\.less/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!less-loader')
            },
            {
                test: /\.css$/,
                exclude: /^node_modules$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader')
            },
            {
                test: /\.(eot|woff|ttf|woff2|gif|svg|appcache)(\?|$)/,
                exclude: /^node_modules$/,
                include: path_.resolve(__dirname, 'src/'), //只对src目录生效
                loader: 'file-loader?name=icon/[name].[ext]' //css文件或者html文件中引用的图片都会打包到icon/目录下面，打包完之后，再把css文件移出来即可
            },{
                test: /\.(png|jpg)$/,
                exclude: /^node_modules$/,
                include: path_.resolve(__dirname, 'src/'),//只对src目录生效
                loader: 'url?limit=20000&name=images/[name].[ext]' //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            },{
                test: /\.svg$/,
                exclude: /^node_modules$/,
                include: svgDirs, //只对ant-mobile模块使用svg雪碧图
                loader: 'svg-sprite-loader',
            },{
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
