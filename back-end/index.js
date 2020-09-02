const Koa = require("koa");
const router = require("./router");
const serve = require('koa-static');

const app = new Koa();
app.use(serve(__dirname + '/dist'));
app.use(router.routes());
app.listen(3001, () => {
  console.log("The serve start at port 3001.s");
});