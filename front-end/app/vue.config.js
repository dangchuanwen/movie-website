const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
module.exports = {
  publicPath: "./",
  configureWebpack: {
    optimization: {
      splitChunks: {
        cacheGroups: {
          swiper: {
            chunks: "initial",
            test: /(swiper|better-scroll)/,
            priority: 1
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: "vue",
            entry: {
              path: "https://cdn.jsdelivr.net/npm/vue@2.6.10",
              type: "js"
            },
            global: "Vue"
          },
          {
            module: "vue-router",
            entry: "https://unpkg.com/vue-router@3.1.5/dist/vue-router.min.js",
            global: "VueRouter"
          },
          {
            module: "vuex",
            entry: "https://unpkg.com/vuex@3.1.2/dist/vuex.min.js",
            global: "Vuex"
          }
        ]
      })
    ]
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
