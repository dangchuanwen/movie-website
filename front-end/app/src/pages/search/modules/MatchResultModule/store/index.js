import types from "./mutations-type";
import request from "@/utils/request";
const state = {
  match_result_list: []
};

const mutations = {
  [types.SET_MATCH_RESULT](state, new_list) {
    state.match_result_list = new_list;
  }
};

const actions = {
  async getSearchMatchResult({ commit } /* key_word */) {
    const res = await request({
      method: "get",
      url: "/api/searchMatchResult"
    });
    if (res && res.data && res.data.datas) {
      commit(types.SET_MATCH_RESULT, res.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
