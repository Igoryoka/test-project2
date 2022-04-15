import Vue from "vue";
import VueRouter from 'vue-router';

// import App from "@/App.vue";
import UserInfo from "@/pages/UserInfo.vue";
import UsersList from "@/pages/UsersList.vue";
import UserEdit from "@/pages/UserEdit.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: UsersList },
    { path: '/users', component: UsersList },
    { path: '/user/:id', component: UserInfo },
    { path: '/edit/:id', component: UserEdit },
];

const router = new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes,
})

export default router;