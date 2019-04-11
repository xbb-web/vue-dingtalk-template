import Vue from 'vue'
import Router from 'vue-router'
import routesMap from './routes'
import beforeEachHooks from './beforeEachHooks'

Vue.use(Router)

const routerInstance = new Router({
  /*
    @desc: base,应用的基路径;如整个单页应用服务在 /app/ 下，base 就应该设为 "/app/";
    @reference: https://router.vuejs.org/zh-cn/api/options.html#base
  */
  base: '/',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: routesMap
})

Object.values(beforeEachHooks).forEach((hook) => {
  routerInstance.beforeEach(hook)
})

routerInstance.afterEach((route) => {
  // 设置标题
  // utils.setTitle({ title: route.meta.title || '销帮帮CRM' }) // 控制标题文本，空字符串表示显示默认文本
})

export default routerInstance
