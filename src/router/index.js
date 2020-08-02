import Vue from 'vue';
import Router from 'vue-router';
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题

Vue.use(Router);

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            redirect: '/login'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {   
                    path: '/userMange',
                    name: 'userMange',
                    component: () => import('../views/userManage/userMange.vue'),
                    meta: { title: '用户管理' }
                },
                {
                    path: '/index',
                    name: 'index',
                    component: () => import('../views/home/index.vue'),
                    meta: { title: '首页' }
                },
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
