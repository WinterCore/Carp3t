module.exports = {
  entry  : "./src/Index.tsx",
  mode : "development",
  output : {
    filename: "./bundle.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      { test: /\.(t|j)sx?$/, use: { loader: "ts-loader" }, exclude: /node_modules/ },
      { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" }
    ]
  },
  externals: {
    // "react": "React",
    // "react-dom": "ReactDOM",
  },
  // addition - add source-map support
  devtool: "source-map"
}