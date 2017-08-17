
var HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html

var publicPath = '/dist/'; //文件资源引用路径，比如background:url(****);***的地址转换就在publicPath
var path = __dirname + '/dist/'; //__dirname获取当前模块文件所在目录的完整绝对路径
module.exports = {
    entry: {
        a: './js/a', //编译的入口文件
        b: './js/b', //编译的入口文件
    },
    output: {
        path:__dirname+'/js/dist',
        filename: '[name].js' //编译后的文件名字
        // filename: '[name]-[hash].js' //直接文件名中加上hash，和HtmlWebpackPlugin的区别就是仅仅使用HtmlWebpackPlugin并不会改变文件名
        // filename: '[name]-[chunkhash].js' //chunkhash是表示文件有无改动，有改动会更新，无改动不更新，但是hash每次都会更新
    },
    plugins:[
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: '../../index.html', //生成的html存放路径，相对于output.path
            template: './src/template/index.html', //html模板路径
            hash: true    //为静态资源生成hash值，格式是在后面加?hash值
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'], //后缀名自动补全
    }
};
