module.exports = {
  configureWebpack: {
    performance: false
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
        target: "http://localhost:3000",
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
