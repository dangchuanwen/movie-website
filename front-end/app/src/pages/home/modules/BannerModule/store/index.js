import types from "./mutations-type";
import request from "@/utils/request";
const state = {
  banner_list: []
};

const mutations = {
  [types.SET_BANNER_LIST](state, new_list) {
    state.banner_list = new_list;
  }
};

const actions = {
  async getBannerList({ commit }) {
    let data = await request({
      method: "get",
      url: "/api/bannerList"
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_BANNER_LIST, data.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
