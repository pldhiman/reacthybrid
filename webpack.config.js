const HtmlWebpackPlugin = require('html-webpack-plugin');
const minifyConfig={
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  }
  
const meta={
'viewport': 'width=device-width, initial-scale=1',
'description': 'Prepare online for the toughest medical entrance exams. Get online mock tests, exam updates, tips and video lectures only at PrepLadder. Sign Up for the preparations',
'keywords' : 'fmge,prepladder videos,prepladder faculty,prepladder notes,prepladder reviews,prepladder 2019,prepladder 2020,prepladder offer,prepladder app for laptop,prepladder fmge,aiims mock prepladder,prepladder apk'
}
  
function entryPaths(arr) {
    let routesObj={}
    arr.forEach(route=>{
      routesObj[`static/js/${route}`]=`./src/${route}.js`
    })
    return routesObj;
  }
  
  function htmlWebpackRoutes(arr) {
    return arr.map(route=>
        new HtmlWebpackPlugin({
          // meta,
          template: `./public/${route}.html`,
          inject: true,
          minify:minifyConfig,
          chunks: [`static/js/${route}`],
          filename: `${route}.html`
        })
    )
  }

  module.exports={
    entryPaths,
    htmlWebpackRoutes
  }

