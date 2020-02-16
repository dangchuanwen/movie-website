const Koa = require("koa");
const router = require("./router");

const app = new Koa();

app.use(router.routes());
app.listen(3001, () => {
  console.log("The serve start at port 3001.");
});