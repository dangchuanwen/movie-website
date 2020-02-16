import types from "./mutations-type";

const state = {
  key_word: ""
};

const mutations = {
  [types.SET_KEY_WORD](state, new_val) {
    state.key_word = new_val;
  }
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
