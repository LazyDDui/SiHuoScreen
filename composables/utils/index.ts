import { useRuntimeConfig } from 'nuxt/app'

export const getStaticPath = (url:string) => {
  const runTime = useRuntimeConfig()
  return runTime.public.static + url
}