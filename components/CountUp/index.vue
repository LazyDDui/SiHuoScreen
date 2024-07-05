<script setup lang="ts">
import { computed, onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { format, toWeekday } from '../../composables/utils/format'

let dateTimer

const timeStamp = ref(new Date().getTime())

const timeInfo = computed(()=>({
  date:format(timeStamp.value,"yyyy年MM月dd日"),
  weekday:toWeekday(timeStamp.value),
  time:format(timeStamp.value,"HH:mm:ss")
}))

onBeforeMount(()=>{
  dateTimer = setInterval(()=>{
    timeStamp.value = new Date().getTime()
  },1000)
})

onBeforeUnmount(()=>{
  if(dateTimer){
    clearInterval(dateTimer)
  }
})


</script>

<template>
  <div class="timeInfo">
    <div class="g-w">{{timeInfo.date}}</div>
    <div class="g-w">{{timeInfo.weekday}}</div>
    <div class="g-w">{{timeInfo.time}}</div>
  </div>
</template>

<style scoped lang="less">
.timeInfo {
  position: absolute;
  display: flex;
  bottom: 6vh;
  right: 80px;
  width: 10vw;
  white-space: nowrap;
  div {
    margin-right: 10px;
    font-size: 14px;
  }
}
</style>