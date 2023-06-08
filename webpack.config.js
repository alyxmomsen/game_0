
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    entry:{
        main:'./src/index.js' ,
    } , 
    output: {
        filename:'[name].[contenthash].js' ,
        path:path.resolve(__dirname , 'dist') ,
        clean:true ,
    } , 
    module: {
        rules: [
          {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader'],
          },
        ],
      },
    mode:'production' , 
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/template.html' , 
            inject:'body' ,
        })
    ]


}