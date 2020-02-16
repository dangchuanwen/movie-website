// 模块 store
import search_module from "../modules/SearchModule/store";
import recommend_module from "../modules/RecommendModule/store";
import match_result_module from "../modules/MatchResultModule/store";
const state = {};

const mutations = {};

const actions = {};

const modules = {
  search_module,
  recommend_module,
  match_result_module
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules
};
