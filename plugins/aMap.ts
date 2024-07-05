import { defineNuxtPlugin } from 'nuxt/app'
import AMapLoader from '@amap/amap-jsapi-loader'
import { useMapStore } from '../store/map'

export default defineNuxtPlugin(async () => {
  const { setAmap, setWeather } = useMapStore()
  if (process.client) {
    //高德地图，需要使用开启即可
    return
    //@ts-ignore
    if (window) {
      // eslint-disable-next-line import/no-named-as-default-member
        AMapLoader.load({
        key:"你的key",
        version: '2.0',
        plugins: ['AMap.DistrictSearch', 'Map3D', 'AMap.Object3DLayer', 'AMap.Driving', 'AMap.Geocoder', 'AMap.MarkerCluster', 'AMap.TileLayer', 'AMap.Weather', 'AMap.MassMarks']
      }).then((AMap) => {
        setAmap(AMap)
        const weather = new AMap.Weather()
        //执行实时天气信息查询
        weather.getLive('成都市', (err, data) => {
          console.error(err, data)
          if (data.info === 'OK') {
            setWeather(data)
          }
        })
      }).catch(() => {
        setAmap(false)
      })
    }
  }
})