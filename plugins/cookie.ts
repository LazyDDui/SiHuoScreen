import { defineNuxtPlugin, useCookie, useRuntimeConfig } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  const cookie = useCookie('sihuo')
  const runtime = useRuntimeConfig()
  if (runtime.public.VITE_MODE === 'dev') {
    cookie.value = '60b8e9fa-100c-4d15-b760-ecde495c3f10'
  }

})