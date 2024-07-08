<script setup lang="ts">
import { getStaticPath } from '../../composables/utils'

type StationCountItemProps = {
  url:string;
  desc:string;
  count:number;
}
const props =  defineProps<StationCountItemProps>()


</script>

<template>
  <div class="station-countItem">
    <img alt="station-item" :src="getStaticPath(`/lpg/street`+url)"/>
    <div class="desc">
      {{desc}}
    </div>
    <div class="count shine">
      {{count}}
    </div>
  </div>
</template>

<style scoped lang="less">
.station-countItem {
  box-sizing: border-box;
  padding: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 180px;
  background: url("/lpg/street/rukuliang.png") no-repeat;
  background-size: 100%;
  position: relative;
  img {
    width: 60px;
    position: absolute;
  }
  .desc {
    margin-top: 50px;
    background: url("/lpg/street/diwen.png") no-repeat;
    width: 90px;
    height: 26px;
    font-size: 16px;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .count {
    margin-top: 10px;
    font-size: 20px;
    font-weight: 500;
  }
}
</style>