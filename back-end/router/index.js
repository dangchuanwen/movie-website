const KoaRouter = require("koa-router");

const config = require("./config");

const router = KoaRouter();

for (let api in config) {
  const { method, handle } = config[api];
  router[method](api, handle);
}

module.exports = router;

