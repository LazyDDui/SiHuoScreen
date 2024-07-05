import * as ElementPlusIcons from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import { zhCn } from 'element-plus/es/locale'
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin((nuxtApp) => {
  //@ts-ignore
  nuxtApp.vueApp.use(ElementPlus,{locale:zhCn})
  for (const [key, component] of Object.entries(ElementPlusIcons)) {
    nuxtApp.vueApp.component(key, component)
  }
})
