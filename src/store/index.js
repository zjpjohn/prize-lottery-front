import Vue from "vue";
import Vuex from 'vuex';
import user from './user/user'
import oss from "./user/oss";

Vue.use(Vuex);
let state = {
    menu: {
        hasSub: false,
        expand: false,
        showText: false,
    },
};

let getters = {
    expand: (state) => state.menu.expand,
    showText: (state) => state.menu.showText,
    hasSub: (state) => state.menu.hasSub,
};

let mutations = {
    SET_EXPAND(state, value) {
        state.menu.expand = value;
    },
    SET_SHOW_TEXT(state, value) {
        state.menu.showText = value;
    },
    SET_HAS_SUB(state, value) {
        state.menu.hasSub = value;
    }
};

let actions = {
    expand({commit}, value) {
        commit('SET_EXPAND', value);
    },
    showText({commit}, value) {
        commit('SET_SHOW_TEXT', value);
    },
    hasSub({commit}, value) {
        commit('SET_HAS_SUB', value);
    },
};

let store = new Vuex.Store({
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions,
    modules: {
        user: user,
        oss: oss,
    }
});

export default store;