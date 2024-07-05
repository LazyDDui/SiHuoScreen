import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo('/god')
  }
  // 判断登陆
  if (process.client) {
    // 在客户端中判断userPermissions中有没有对应的路由,有则跳转,无则重定向到404
    // 获取
  }
})
