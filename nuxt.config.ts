import { loadEnv } from 'vite'
import { defineNuxtConfig } from 'nuxt/config'

const envScript = process.env.npm_lifecycle_script?.split(' ') || 'dev'
const envName = envScript[envScript.length - 1] // 通过启动命令区分环境
const envData = loadEnv(envName, 'env')


console.log('当前环境：', envData)

export default defineNuxtConfig({
  devtools: { enabled: false },
  runtimeConfig: {
    apiKey: '', // Default to an empty string, automatically set at runtime using process.env.NUXT_API_KEY
    public: {
      baseURL: envData.VITE_BASE_URL, // Exposed to the frontend as well.
      static: envData.VITE_STATIC,
      ...envData
    }
  },
  routeRules: {
    // 登陆页构建时预渲
    // '/login': { prerender: true },
    // 针对路径进行接口转发
    '/lpgadmin/**': {
      proxy: `${envData.VITE_BASE_URL}/**`
    }
  },
  modules: [
    '@element-plus/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@formkit/auto-animate/nuxt'
  ],
  css: [
    '@/assets/css/main.css',
    'element-plus/dist/index.css',
    '@/assets/css/iconFont.css',
    'vue3-scroll-number/css',
    // 'vue3-openlayers/styles.css'
  ],
  components: {
    global: true,
    dirs: ['~/components']
  },
  experimental: {
    payloadExtraction: false   //启用此选项时（默认情况下）提取使用nuxt generate生成的页面的有效负载
  },
  app: {
    baseURL: envData.VITE_STATIC,
    head: {
      charset: 'UTF-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'sihuo',
      meta: [{ name: 'sihuo', content: 'sihuo' }],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: envData.VITE_STATIC + 'lpg/images/icon.jpg'
        }
      ]
    }
  },
  build: {
    transpile: ['three','d3']
  },
  vite: {
    envDir: '~/env' // 指定env文件夹
  },
  plugins: [
    {
      src: '~/plugins/cookie'
    },
    {
      src: '~/plugins/aMap',
      ssr: false,
      mode: 'client'
    },
    {
      src: '~/plugins/openlayers',
      ssr: false,
      mode: 'client'
    },
    {
      src: '~/plugins/iconfont'
    }
  ],
  // 本地代理跨域
  nitro: {
    // 客户端渲染时
    devProxy: {
      '/api': {
        target: envData.VITE_BASE_URL, // 这里是接口地址
        changeOrigin: true,
        prependPath: true,
      }
    }
  },
  devServer: {
    host: '0,0,0,0',
    port: 3333
  },
  postcss: {
    plugins: {
      // 这个工具可以实现自动添加CSS3前缀
      autoprefixer: {
        overrideBrowserslist: ['last 5 version', '>1%', 'ie >=8']
      },
      'postcss-px-to-viewport-8-plugin': {
        unitToConvert: 'px', // 要转化的单位
        viewportWidth: 1920, // UI设计稿的宽度
        unitPrecision: 6, // 转换后的精度，即小数点位数
        propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
        fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
        selectorBlackList: [], // 指定不转换为视窗单位的类名,例如van-（vantUI组件），
        minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
        mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
        replace: true, // 是否转换后直接更换属性值
        exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配，最好不要排除node_modules 文件，排除后在项目中会发现字体不能跟随页面放大
        landscape: false // 是否处理横屏情况
      }
    }
  }
})