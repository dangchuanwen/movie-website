import types from "./mutations-type.js";
import request from "@/utils/request";

const state = {
  classification_datas: []
};

const mutations = {
  [types.SET_CLASSIFICATION](state, new_val) {
    state.classification_datas = new_val;
  }
};

const actions = {
  async getClassificationDatas({ commit }) {
    let data = await request({
      method: "get",
      url: "/api/classificationDatas"
    });
    if (data && data.data && data.data.datas) {
      commit(types.SET_CLASSIFICATION, data.data.datas);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
