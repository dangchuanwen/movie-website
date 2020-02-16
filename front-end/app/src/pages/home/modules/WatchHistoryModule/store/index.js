import types from "./mutations-type";
import request from "@/utils/request";

const state = {
  watch_history_list: []
};

const mutations = {
  [types.SET_WATCH_HISTORY_LIST](state, new_list) {
    state.watch_history_list = new_list;
  }
};

const actions = {
  async getWatchHistoryList({ commit }) {
    let data = await request({
      method: "get",
      url: "/api/watchHistoryList"
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_WATCH_HISTORY_LIST, data.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
