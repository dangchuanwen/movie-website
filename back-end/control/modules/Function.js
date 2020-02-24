const Response = require("../Response");
const searchNote = require("../../model/tables/search_note");

async function searchRecommend(ctx) {
  const datas = await searchNote.getMostSearchNames();
  ctx.body = Response(datas);
}
async function searchProgram(ctx) {
  const { key_word } = ctx.query;
  const PROGRAM = require("../../model/tables/program");
  const datas = await PROGRAM.searchProgram(key_word);
  ctx.body = Response(datas);
}

module.exports = {
  searchRecommend,
  searchProgram
}