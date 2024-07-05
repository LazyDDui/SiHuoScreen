<script setup lang="ts">
type StationCount = {
  count:number;
}
const props = defineProps<StationCount>()
</script>

<template>
  <div class="stationCount">
    <div class="desc">总产量<span class="shine-b count">{{count}}</span></div>
    <div class="wrap"></div>
  </div>
</template>

<style scoped lang="less">
.stationCount {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  height: 50px;
  .desc {
    position: relative;
    display: flex;
    align-items: center;
    z-index: 10;
    .count {
      margin-left: 10px;
      font-size: 18px;
    }
  }
  .wrap{
    width: 200px;
    border-bottom: 10px solid #143c61;
    border-top: 10px solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    opacity: 0.7;
    position: absolute;
    top: 10px;
    box-shadow: 0 10px 0 0 rgba(20, 60, 97, .2);
  }
}


</style>