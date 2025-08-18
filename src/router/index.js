import Vue from 'vue'
import Router from 'vue-router'
import routes from "./routes";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from "../store";

Vue.use(Router)

let originalPush      = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) {
        return originalPush.call(this, location, onResolve, onReject);
    }
    return originalPush.call(this, location).catch(err => err);
}

const router = new Router({
    mode: 'history',
    routes: routes,
});

//配置进度条不显示spinner
NProgress.configure({
    showSpinner: false
});
const LOGIN_PAGE = "login",
      HOME_PAGE  = 'home';

router.beforeEach((to, from, next) => {
    NProgress.start();
    let token = store.getters["user/token"];
    //未登录且跳转到非登陆页面：跳转到登录页面
    if (!token && to.name !== LOGIN_PAGE) {
        next({name: LOGIN_PAGE});
        return;
    }
    //token为空且跳转页面为登录页面:直接跳转
    if (!token && to.name === LOGIN_PAGE) {
        next();
        return;
    }
    //token非空且跳转页面为登录页面:跳转到首页
    if (token && to.name === LOGIN_PAGE) {
        next({name: HOME_PAGE});
        return;
    }
    if (!to.query.t) {
        next({
            ...to,
            query: {
                ...to.query,
                t: Date.now()
            }
        });
        return;
    }
    next();
});
router.afterEach(to => {
    NProgress.done();
    window.scrollTo(0, 0);
});

export default router;