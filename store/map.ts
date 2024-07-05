import { defineStore } from 'pinia'
import { ref, shallowRef } from 'vue'
import { WeatherType } from '../composables/interface'

export const useMapStore = defineStore('map', () => {
  const scale = ref(1)
  const weather = ref<WeatherType>()
  const aMap = shallowRef()


  const setAmap = (amap: any) => {
    aMap.value = amap
  }

  const setScale = (num: number) => {
    scale.value = num
  }

  const setWeather = (w:any) => {
    weather.value = w
  }


  return { setScale, scale, aMap, setAmap, weather, setWeather }
})
