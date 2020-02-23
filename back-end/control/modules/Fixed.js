const Response = require("../Response");
const classificationDatas = require("../datas/classification");
const programTypesDatas = require("../datas/programTypes");

async function classification(ctx) {
  const { key } = ctx.query;
  ctx.body = Response(classificationDatas);
}
async function programTypes(ctx) {
  ctx.body = Response(programTypesDatas);
}

module.exports = {
  classification,
  programTypes
}