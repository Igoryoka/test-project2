import Vue from 'vue';
import App from './App.vue';
import store from './store/index.js';
import router from "@/router";
import VueRouter from 'vue-router';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
