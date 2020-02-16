// 引入模块 store
import banner_module from "../modules/BannerModule/store";
import hot_module from "../modules/HotModule/store";
import hot_recommend_module from "../modules/RecommendModule/store";
import watch_history_module from "../modules/WatchHistoryModule/store";
const state = {};

const mutations = {};

const actions = {};

const modules = {
  banner_module,
  hot_module,
  hot_recommend_module,
  watch_history_module
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules
};
