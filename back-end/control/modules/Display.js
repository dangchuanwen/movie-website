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

module.exports = {
  bannerList,
  hotRecommendList,
  hotList
}