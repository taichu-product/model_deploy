import Vue from 'vue'
import Router from 'vue-router'
import Case1 from '@/components/Case1'
import Case2 from '@/components/Case2'
import Page from '@/components/Page'

Vue.use(Router)

export default new Router({
  //mode:'history',
  routes: [
    {
      path: '/',
      name: 'Page',
      component: Page,
    },
    {
      path: '/case1',
      name: 'Case1',
      component: Case1,
    },
    {
      path: '/case2',
      name: 'Case2',
      component: Case2,
    }
  ]
})
