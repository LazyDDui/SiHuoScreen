<script setup lang="ts">
type GasUserProps = {
  count:number;
}

const props = defineProps<GasUserProps>()
</script>

<template>
  <div class="gasCenter">
    <div class="outer">
      <img class="gasL" alt="left" src="/lpg/street/zongshudiwenL.png"/>
      <img class="gasR" alt="right" src="/lpg/street/zongshudiwen.png"/>
    </div>
    <img class="gasC" alt="center" src="/lpg/street/zongshu.png"/>
    <div class="desc shine">{{count}}</div>
  </div>
</template>

<style scoped lang="less">
@keyframes rot {
  0% {
    transform: rotate(0);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.gasCenter {
  display: flex;
  position: relative;
  height: 180px;
  .gasL,.gasR {
    width: 120px;
    height: 200px;
    position: absolute;
  }
  .outer {
    position: absolute;
    top: -10px;
    animation-name: rot;
    transform-origin: 90px 100px;
    animation-duration: 20s;
    animation-iteration-count: infinite;
  }
  .gasL {
    left: -30px;
  }
  .gasR {
    right: -210px;
  }
  .gasC {
    width: 180px;
    height: 180px;
  }
  .desc {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-size: 20px;
    font-weight: 500;
  }
}
</style>