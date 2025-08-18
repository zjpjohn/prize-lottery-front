import axios from "axios";
import qs from 'qs'
import router from "../router";
import {Loading, Message} from "element-ui";
import store from "../store"

const API_BASE_URL     = process.env.API_ROOT;
const URL_FORM_CONTENT = {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'};
const APPLICATION_JSON = {'Content-Type': 'application/json'};

let loading,
    requestingCount = 0;

function showFullLoading() {
    if (requestingCount === 0) {
        startHideLoading();
    }
    requestingCount++;
}

function tryHideLoading() {
    setTimeout(() => {
        requestingCount--;
        if (requestingCount > 0) {
            return;
        }
        if (requestingCount <= 0) {
            requestingCount = 0;
            endLoading();
        }
    }, 250);
}

function startHideLoading() {
    if (loading) {
        return;
    }
    loading = Loading.service({
        target: '#app',
        lock: true,
        text: '加载中',
        background: 'rgba(0,0,0,0.05)'
    })
}

function endLoading() {
    if (loading) {
        loading.close();
        loading = null;
    }
}

//此处单独创建实例，防止其他地方创建实例相互影响
let http = axios.create({
    baseURL: API_BASE_URL,
    timeout: 20000,
    withCredentials: true,
});

http.interceptors.request.use(config => {
    if (store.getters["user/token"]) {
        config.headers['authentication'] = store.getters["user/token"];
    }
    showFullLoading();
    return config;
}, error => {
    return Promise.reject(error);
});

http.interceptors.response.use(response => {
    tryHideLoading();
    if (response.status === 200) {
        let data = response.data;
        //返回数据流
        if (data instanceof ArrayBuffer || data instanceof Blob) {
            return response;
        }
        //响应json数据
        if (data.code === 200) {
            return data.data;
        }
        //响应业务错误
        let message = data.error || data.message;
        if (document.getElementsByClassName('el-message').length === 0) {
            Message.error(message);
        }
        return Promise.reject(new Error(message));
    }
}, error => {
    tryHideLoading();
    let message = error.message || '请求异常';
    if (error.response) {
        let data   = error.response.data;
        let status = error.response.status;
        message    = data ? (data.error || data.message) : error.response.statusText;
        if (document.getElementsByClassName('el-message').length === 0 && status !== 404) {
            Message.error(message);
        }
        //未授权登录处理
        if (status === 401) {
            store.dispatch('user/loginOut').then(() => {
                router.replace({path: '/login'});
            })
        }
    }
    return Promise.reject(new Error(message));
});


export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        http.get(url, {params: params})
            .then(response => resolve(response))
            .catch((error) => reject(error))
    });
}

export function post(url, params = {}) {
    return new Promise((resolve, reject) => {
        http.post(url, qs.stringify(params), {headers: URL_FORM_CONTENT,})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function postJson(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.post(url, JSON.stringify(data), {headers: APPLICATION_JSON})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function put(url, params = {}) {
    return new Promise((resolve, reject) => {
        http.put(url, qs.stringify(params), {headers: URL_FORM_CONTENT})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function putJson(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.put(url, JSON.stringify(data), {headers: APPLICATION_JSON})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function del(url, params = {}) {
    return new Promise((resolve, reject) => {
        http.delete(url, {params: params})
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}

export function delJson(url, data = {}) {
    return new Promise((resolve, reject) => {
        http.delete(url, {
            data: JSON.stringify(data),
            headers: APPLICATION_JSON
        })
            .then(response => resolve(response))
            .catch(error => reject(error));
    });
}
