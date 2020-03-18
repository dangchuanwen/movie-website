const Response = require("../Response");

async function searchRecommend(ctx) {
  const searchNote = require("../../model/tables/search_note");
  const datas = await searchNote.getMostSearchNames();
  ctx.body = Response(datas);
}

async function searchProgram(ctx) {
  const { key_word } = ctx.query;
  const PROGRAM = require("../../model/tables/program");
  const datas = await PROGRAM.searchProgram(key_word);
  ctx.body = Response(datas);
}


async function tvPlayProgramInfo(ctx) {
  let token = ctx.cookies.get("token");
  if (!token) {
    token = "dd";
  }
  const { id, plot } = ctx.query;
  const PROGRAM = require("../../model/tables/program");
  const datas = await PROGRAM.getOnePlotProgramInfo({id, plot, token});

  ctx.body = Response(datas);
}

async function searchResult(ctx) {
  const { key_word, last_id, num } = ctx.query;
  const PROGRAM = require("../../model/tables/program");
  const datas = await PROGRAM.getSearchResult({ key_word, last_id, num });
  ctx.body = Response(datas);
}

module.exports = {
  searchRecommend,
  searchProgram,
  tvPlayProgramInfo,
  searchResult
};
