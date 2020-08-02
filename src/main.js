import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index'
import ElementUI from 'element-ui';
import ViewUI from 'view-design';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'view-design/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';

import http from './http/http'
Vue.prototype.$http = http;
Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
Vue.use(ViewUI);
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
    if (to.path == '/login') {
        next()
    } else {
        if (!sessionStorage.getItem('token')) {
            next({ path: '/' })
        } else {
            next()
        }
    }
});

new Vue({
    store,
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
