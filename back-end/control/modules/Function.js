const Response = require("../Response");
const searchNote = require("../../model/tables/search_note");
const program = require("../../model/tables/program");

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
async function programInfo(ctx) {
  const { id, type } = ctx.query;
  const datas = await program.getProgramInfo(id, type);
  ctx.body = Response(datas);
}

module.exports = {
  searchRecommend,
  searchProgram,
  programInfo
}