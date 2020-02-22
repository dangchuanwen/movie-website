import types from "./mutations-type.js";
import request from "@/utils/request";
import Vue from "vue";

const state = {
  classification_datas: []
};

const mutations = {
  [types.UPDATE_CLASSIFICATION](state, classifications) {
    let { classification_datas } = state;
    let first_child = JSON.parse(JSON.stringify(classification_datas[0]));
    first_child.datas = classifications;
    first_child.key = first_child.key + "1";
    state.classification_datas.splice(0, 1, first_child);
    Vue.nextTick(() => {
      first_child.key = first_child.key.slice(0, first_child.key.length - 1);
    });
  },
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
