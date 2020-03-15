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
  const { id, belong } = ctx.query;
  const datas = await program.getProgramInfo(id, belong);
  ctx.body = Response(datas);
}

async function tvPlayProgramInfo(ctx) {
  const { belong, name, plot  } = ctx.query;
  const PROGRAM = require("../../model/tables/program");
  const datas = await PROGRAM.getOnePlotProgramInfo(belong, name, plot);
  ctx.body = Response(datas);
}

async function searchResult(ctx) {
  ctx.body = "搜索结果";
}

module.exports = {
  searchRecommend,
  searchProgram,
  programInfo,
  tvPlayProgramInfo,
  searchResult
}