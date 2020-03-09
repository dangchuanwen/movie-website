// 模块 store
import request from "@/utils/request";
import types from "./mutation-types";
const state = {
  search_result: []
};

const mutations = {
  [types.SET_SEARCH_RESULT_LIST](state, new_list) {
    state.search_result = new_list;
  }
};

const actions = {
  async getSearchResultList({ commit }, key_word) {
    const data = await request({
      method: "get",
      url: "/api/searchResult",
      params: {
        key_word
      }
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_SEARCH_RESULT_LIST, data.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
