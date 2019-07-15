// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import Vant from 'vant';
import 'vant/lib/index.css';
import $ from 'jquery';
import './assets/jQueryRotate.js'
Vue.use(Vant);
import 'lib-flexible/flexible.js'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
