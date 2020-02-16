import types from "./mutations-type";
import request from "@/utils/request";

const state = {
  recommend_list: []
};

const mutations = {
  [types.SET_RECOMMEND_LIST](state, new_list) {
    state.recommend_list = new_list;
  }
};

const actions = {
  async getRecommendList({ commit }) {
    const res = await request({
      method: "get",
      url: "/api/recommendlist"
    });
    if (res && res.data && res.data.datas) {
      commit(types.SET_RECOMMEND_LIST, res.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
