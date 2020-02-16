import types from "./mutations-type";
import request from "@/utils/request";

const state = {
  hot_list: []
};

const mutations = {
  [types.SET_HOT_LIST](state, new_list) {
    state.hot_list = new_list;
  }
};

const actions = {
  async getHotList({ commit }) {
    let data = await request({
      method: "get",
      url: "/api/hotList"
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_HOT_LIST, data.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
