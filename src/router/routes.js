/*
 * @Author: kai.yang
 * @LastEditors: kai.yang
 * @Description: 通用路由
 * @Date: 2019-04-09 16:28:12
 * @LastEditTime: 2019-04-11 14:51:50
 */

const routers = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  }
]

export default routers
