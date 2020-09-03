const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
module.exports = config => {
  config.optimization.splitChunks({
    cacheGroups: {
      swiper: {
        chunks: "initial",
        test: /(swiper|better-scroll)/,
        priority: 1
      },
      vendors: {
        name: "chunk-vendors",
        test: /[\\/]node_modules[\\/]/,
        priority: -10,
        chunks: "initial"
      },
      common: {
        name: "chunk-common",
        minChunks: 2,
        priority: -20,
        chunks: "initial",
        reuseExistingChunk: true
      }
    }
  });

  config.plugin("externals").use(HtmlWebpackExternalsPlugin, [
    {
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
    }
  ]);
};
