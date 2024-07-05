<script setup lang="ts">
import { ScrollNumber } from 'vue3-scroll-number'
import { onBeforeUnmount, onMounted, ref } from 'vue'

type HoverChart = {
  color: string;
  count: number;
}

let timer

const h = 30
const props = defineProps<HoverChart>()

const initCount = ref(props.count?props.count - 8:0)
if(initCount.value>100){
  initCount.value = props.count - 80
}
if(initCount.value<0){
  initCount.value = props.count
}
const auto = ref(0)


const resize = (e) => {
  auto.value = e.currentTarget.innerWidth / 1920 * h
}


onMounted(() => {
  auto.value = window.innerWidth / 1920 * h
  window.addEventListener('resize', resize)
  timer = setInterval(() => {
    if (initCount.value < props.count) {
      initCount.value++
    } else {
      clearInterval(timer)
    }
  }, 10)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resize)
  clearInterval(timer)
})
</script>

<template>
  <div>
    <ScrollNumber
      :color="color"
      :h="auto"
      :number='initCount' />
  </div>
</template>

<style scoped lang="less">

</style>