const Response = require("../Response");

async function bannerList(ctx) {
  const BANNER_LIST = require("../../model/tables/banner_list");
  const datas = await BANNER_LIST.getBannerList();
  ctx.body = Response(datas);
}
async function hotRecommendList(ctx) {
  const HOT_RECOMMEND = require("../../model/tables/hot_recommend");
  const datas = await HOT_RECOMMEND.getHotRecommend();
  ctx.body = Response(datas);
}
async function hotList(ctx) {
  const HOT_LIST = require("../../model/tables/hot_list");
  const datas = await HOT_LIST.getHotList();
  ctx.body = Response(datas);
}
async function programWallDatas(ctx) {
  const token = ctx.cookies.get("token");
  const {
    program_type,
    program_classification,
    publish_year,
    publish_area,
    last_id,
    num
  } = ctx.query;
  const PROGRAM = require("../../model/tables/program");
  const datas = await PROGRAM.getProgramWallDatas({
    program_type,
    program_classification,
    release_year: publish_year,
    publish_area,
    last_id,
    num,
    token
  });
  ctx.body = Response(datas);
}

module.exports = {
  bannerList,
  hotRecommendList,
  hotList,
  programWallDatas
};
