import types from "./mutations-type.js";

const state = {
  classification_datas: []
};

const mutations = {
  [types.UPDATE_CLASSIFICATION](state, classifications) {
    state.classification_datas = classifications;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
