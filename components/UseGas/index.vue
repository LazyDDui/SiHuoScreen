<script setup lang="ts">
import { getStaticPath } from '../../composables/utils'

type GasProps = {
  url:string;
  desc:string;
  count:number;
}

const props = defineProps<GasProps>()
</script>

<template>
  <div class="useGas">
    <div class="bg">
      <img alt="bg-img" class="bg-img" :src="getStaticPath('/lpg/street/diwen4.png')"/>
      <img class="info-img" alt="info" :src="url"/>
    </div>
    <img class="bottom" alt="bottom" :src="getStaticPath('/lpg/street/dizuo.png')"/>
    <div class="desc shine-b">{{desc}}</div>
    <div class="count shine-b">{{count}}</div>
    <slot></slot>
  </div>
</template>

<style scoped lang="less">
@keyframes move {
  0% {
    transform: translateY(-10px);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(-0px);
  }
  75% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(-10px);
  }
}
.useGas {
  display: inline-block;
  text-align: center;
  width: 140px;
  animation-name: move;
  animation-fill-mode: both;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  position: relative;
  animation-timing-function: linear;
  .count {
    font-size: 20px;
    font-weight: 600;
  }
  .bg {
    position: relative;
    display: inline-block;
    transform: translateY(30px);
    .bg-img {
      width: 80px;
      height: 80px;
    }
    .info-img {
      top: 50%;
      left: 50%;
      transform: translate(-50%,calc(-50% - 6px));
      position: absolute;
      height: 50px;
    }
  }
  .bottom {
    height: 60px;
  }
  .desc {
    font-size: 14px;
    white-space: nowrap;
  }
}
</style>