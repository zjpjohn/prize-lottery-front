import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/main.css'
import './assets/fonts/iconfont.css'
import './assets/fonts/xiaozhi.css'
import animated from 'animate.css'

import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from "vue-axios";
import Qs from 'qs'
import ElementUI from 'element-ui'
import router from './router'
import store from "./store";
import draggable from "vuedraggable";
import VueAnimateNumber from "vue-animate-number";
import Permission from "./components/Permission.vue";
import VeLine from 'v-charts/lib/line.common'
import VeBar from 'v-charts/lib/bar.common'
import VeHistogram from 'v-charts/lib/histogram.common'

Vue.config.productionTip = false
Vue.use(animated)
Vue.use(VueAxios, axios)
Vue.use(ElementUI, {size: 'medium'})
Vue.use(VueAnimateNumber)

Vue.component(VeLine.name, VeLine)
Vue.component(VeBar.name, VeBar)
Vue.component(VeHistogram.name, VeHistogram)

Vue.component(Permission.name, Permission)
Vue.component(draggable.name, draggable)

Vue.prototype.qs = Qs

let EventBus            = new Vue();
Vue.prototype.$EventBus = EventBus;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
