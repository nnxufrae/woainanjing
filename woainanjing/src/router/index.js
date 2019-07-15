import Vue from 'vue'
import Router from 'vue-router'
import mainpage from '../view/main/index'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainpage',
      component: mainpage
    }
  ]
})
