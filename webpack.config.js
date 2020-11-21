//plugin para trabajar con Html
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
//const  = require('copy-webpack-plugin');

//Archivo de configuracion para webpack
module.exports = {

    //seleccionamos el modo con el que vamos a trabajar nuestro proyecto
    mode:'development',
    optimization:{
        minimizer:[ new OptimizeCssAssetPlugin()]
    },
    //modulos
    module:{
        //en este apartado especificamos las reglas con las que vamos a trabajar
        rules: [
            {
                test:/\.css$/,
                //aqui excluimos el archivo styles por que este sera tratado independiente en el archivo anterior
                exclude: /styles\.css$/,
                use:[
                    //aqui especificamos los modulos que se encargaran de trabajar los archivos de css 
                    'style-loader',
                    'css-loader'
                ]
            },{
                test:/styles\.css$/,
                use:[
                    //aqui especificamos los modulos que se encargaran de trabajar los archivos de css el que nos generara el archivo css global
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                //seleccionamos los archivos con los que vamos a estar trabajando en este caso seleccionamos a travez de una expresion regular los archivos con extension h tml
                test:/\.html$/i,
                use:[
                    {
                        //seleccionamos el paquete con el que se va a trabajar
                        loader: 'html-loader',
                        options:{
                            attributes:false,
                            minimize:false
                        }, 
                    }
                ]
            },
            {
                test:/\.(png|svg|jpg|gif)$/,
                use:[{
                    loader:'file-loader',
                    options:{
                        esModule:false
                    }
                }]
            }
        ]
    },
    //especificamos los plugins con los que se va a trabajar
    plugins:[
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            //contentHas nos permite evitar que el navegador almacene en el cache el archivo css
            filename:`[name].css`,
            ignoreOrder:false
        }),
        new CopyPlugin
        ({
            patterns:[
                {from:'src/assets', to:'assets/'}
            ]
        })
    ]
}