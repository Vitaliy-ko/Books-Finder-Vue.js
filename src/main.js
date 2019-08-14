import Vue from 'vue';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Vuelidate from 'vuelidate';
import VueTheMask from 'vue-the-mask'



import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.use(VueTheMask)
Vue.use(Vuelidate);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export const eventEmitter = new Vue();