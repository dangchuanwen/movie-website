// 模块 store
import request from "@/utils/request";
import types from "./mutation-types";
const state = {
  last_id: 0,
  num: 10,
  isLoading: false,
  isHasMore: true,
  search_result: []
};

const mutations = {
  [types.SET_SEARCH_RESULT_LIST](state, new_list) {
    state.isLoading = false;
    state.search_result = new_list;
    // 更新下 last_id
    state.last_id = new_list.length > 0 ? new_list[new_list.length - 1].id : 0;
  }
};

const actions = {
  async requestDatas({ state }, key_word) {
    state.isLoading = true;
    const { last_id, num } = state;
    const data = await request({
      method: "get",
      url: "/api/searchResult",
      params: {
        key_word,
        last_id,
        num
      }
    });
    if (data && data.data && data.data.datas) {
      return data.data.datas;
    } else {
      state.isHasMore = false;
      return [];
    }
  },
  async getMoreSearchResultList({ state, commit, dispatch }, key_word) {
    let datas = await dispatch("requestDatas", key_word);
    commit(types.SET_SEARCH_RESULT_LIST, [...state.search_result, ...datas]);
  },
  async getSearchResultList({ commit, dispatch }, key_word) {
    let datas = await dispatch("requestDatas", key_word);
    commit(types.SET_SEARCH_RESULT_LIST, datas);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
