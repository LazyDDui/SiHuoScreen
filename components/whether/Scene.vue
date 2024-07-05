<script setup lang="ts">
import { useMapStore } from '../../store/map'
import { storeToRefs } from 'pinia'
// import { defineAsyncComponent } from 'vue'
import Weather from './Item'

const { weather } = storeToRefs(useMapStore())

// const Weather = defineAsyncComponent(async () => {
//   return import('./Item.vue')
// })


</script>

<template>
  <div class="whether" >
    <Weather url="/tianqi.png" :desc="weather?.weather"></Weather>
    <Weather url="/fengxiang.png" :desc="`风力:`+weather?.windPower"></Weather>
    <Weather url="/wendu.png" :desc="weather?.temperature+`℃`"></Weather>
    <Weather url="/jiangshui.png" :desc="`湿度:`+weather?.humidity"></Weather>
  </div>
</template>

<style scoped lang="less">
.whether {
  position: absolute;
  right: 0;
  height: 3vh;
  top: 2vh;
  z-index: 5;
  display: flex;
  align-items: center;
}
</style>