import {
    loadRedirectUri,
    loadToken,
    loadUser,
    removeToken,
    removeUser,
    saveRedirectUri,
    saveToken,
    saveUser
} from "../../libs/cache";
import {adminAuth} from "../../api/adm-service";

export default {
    namespaced: true,
    state: {
        token: loadToken(),
        user: loadUser(),
        redirect: loadRedirectUri(),
    },
    getters: {
        token: state => state.token,
        user: state => state.user,
        redirect: state => state.redirect,
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USER: (state, user) => {
            state.user = user;
        },
        SET_REDIRECT: (state, uri) => {
            state.redirect = uri;
        },
        LOGIN_OUT: state => {
            state.token = null;
            removeToken();
            removeUser();
        }
    },
    actions: {
        authLogin({commit}, {
            name,
            password
        }) {
            return new Promise((resolve, reject) => {
                adminAuth({
                    name: name,
                    password: password
                }).then(data => {
                    let {
                            token,
                            name,
                            role
                        } = data;
                    commit('SET_TOKEN', saveToken(token));
                    commit('SET_USER', saveUser({
                        name: name,
                        role: role,
                    }))
                    resolve(data);
                }).catch(error => reject(error));
            });
        },
        loginOut({commit}) {
            commit('LOGIN_OUT');
        },
        setRedirect({commit}, uri) {
            commit('SET_REDIRECT', saveRedirectUri(uri));
        },
    },
};