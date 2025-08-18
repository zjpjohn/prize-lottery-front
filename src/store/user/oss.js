export default {
    namespaced: true,
    state: {
        policy: null,
    },
    getters: {
        policy: state => state.policy,
    },
    mutations: {
        SET_POLICY: (state, policy) => {
            state.policy = policy;
        },
    },
    actions: {
        policy({commit}, policy) {
            commit('SET_POLICY', policy);
        }
    },
}