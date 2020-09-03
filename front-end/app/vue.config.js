//const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const webpack_prod = require("./webpack.prod");
module.exports = {
  publicPath: "./",
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      webpack_prod(config);
    }
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          require("postcss-px2rem")({
            remUnit: 37.5
          })
        ]
      }
    }
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            const name = req.path.split("/api/")[1];
            const result = require(`./mock/${name}`);
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
          return null;
        }
      }
    }
  }
};
