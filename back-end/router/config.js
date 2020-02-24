const { bannerList, hotRecommendList, hotList, programWallDatas } = require("../control/modules/Display");
const { classification, programTypes } = require("../control/modules/Fixed");
const { login, watchHistory } = require("../control/modules/User");
const { searchRecommend, searchProgram } = require("../control/modules/Function");

const config = {
  ["/api/bannerList"]: {
    method: "get",
    handle: bannerList
  },
  ["/api/hotRecommendList"]: {
    method: "get",
    handle: hotRecommendList
  },
  ["/api/hotList"]: {
    method: "get",
    handle: hotList
  },
  ["/api/classificationDatas"]: {
    method: "get",
    handle: classification
  },
  ["/api/programTypesList"]: {
    method: "get",
    handle: programTypes
  },
  ["/api/login"]: {
    method: "get",
    handle: login
  },
  ["/api/watchHistoryList"]: {
    method: "get",
    handle: watchHistory
  },
  ["/api/movieWallDatas"]: {
    method: "get",
    handle: programWallDatas
  },
  ["/api/recommendList"]: {
    method: "get",
    handle: searchRecommend
  },
  ["/api/searchMatchResult"]: {
    method: "get",
    handle: searchProgram
  }
};

module.exports = config;
