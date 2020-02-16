import types from "./mutations-type";
import request from "@/utils/request";

const state = {
  hot_recommend_list: []
};

const mutations = {
  [types.SET_HOT_RECOMMEND_LIST](state, new_list) {
    state.hot_recommend_list = new_list;
  }
};

const actions = {
  async getHotRecommendList({ commit }) {
    const data = await request({
      method: "get",
      url: "/api/hotRecommendList"
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_HOT_RECOMMEND_LIST, data.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
