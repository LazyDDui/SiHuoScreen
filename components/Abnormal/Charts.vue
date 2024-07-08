<script setup lang="ts">
import { AbnormalType } from '../../composables/interface'
import { useV } from '../../composables/commonUseFn/useV'
import HoverChart from './HoverChart.vue'
import { ref } from 'vue'
import { getStaticPath } from '../../composables/utils'


type AbnormalChartsProps = {
  desc: string;
  count: number;
  type: AbnormalType;
  percent: number;
}
const props = defineProps<AbnormalChartsProps>()

const h = 80

const { toV } = useV()

const showCount = ref(false)

const getColor = (): string => {
  switch (props.type) {
    case AbnormalType.BLUE:
      return `linear-gradient(to bottom, #01bcf9, #0a799e)`
    case AbnormalType.GREEN:
      return `linear-gradient(to bottom, #31d7d8, #088d86)`
    default:
      return `linear-gradient(to bottom, #ffe7a8, #a78829)`
  }
}

const getBottomColor = (): string => {
  switch (props.type) {
    case AbnormalType.BLUE:
      return `#0a799e`
    case AbnormalType.GREEN:
      return `#088d86`
    default:
      return `#a78829`
  }
}



</script>

<template>
  <div class="container" @mouseenter.stop="showCount = true" @mouseleave="showCount=false">
    <div v-if="percent!=0" class="cube-box" :style="{height:toV(h*percent),bottom:toV(-h*percent*0.04)}">
      <div class="cube1 cube"></div>
      <div class="cube2 cube"></div>
      <div class="cube3 cube"></div>
      <div class="cube4 cube"></div>
      <div class="cube5 cube"></div>
      <div class="cube6 cube"></div>
    </div>
    <div class="circle">
      <img alt="c1" class="c c1" :src="getStaticPath('/lpg/street/tuoyuan1.png')" />
      <img alt="c2" class="c c2" :src="getStaticPath('/lpg/street/tuoyuan2.png')" />
      <img alt="c3" class="c c3" :src="getStaticPath('/lpg/street/tuoyuan3.png')" />
      <img alt="c4" class="c c4" :src="getStaticPath('/lpg/street/tuoyuan4.png')" />
    </div>
    <div class="desc">{{ desc }}</div>
    <transition>
      <HoverChart
        v-if="showCount"
        :count="count"
        :color="getBottomColor()"
        :style="{transform:`translateX(-50%)`,zIndex:600,position:`absolute`,top:toV(35),left:'60%'}" />
    </transition>
  </div>

</template>

<style scoped lang="less">
.container {
  transform: translateX(-15px);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  justify-content: flex-end;
  cursor: pointer;
  height: 180px;

  &:hover .cube-box {
    transform: rotateX(-30deg) rotateY(45deg) scale(1.1);
  }

  .circle {
    position: relative;
    left: -38px;
    top: -20px;

    .c {
      position: absolute;
      transition: 1s;
      transform: scale(1);
      transform-origin: 50% 50%;
    }

    .c1 {
      width: 100px;
    }

    .c2 {
      width: 90px;
      left: 5px;
      top: 2.5px;
    }

    .c4 {
      width: 80px;
      left: 10px;
      top: 5px;
    }

    .c3 {
      width: 100px;
      top: -12px;
      left: 0;
    }
  }

  &:hover .c {
    transform: scale(1.1);
  }

  .desc {
    margin-left: 20px;
    margin-top: 14px;
    font-size: 18px;
    color: #cde7ff;
    width: 60px;
    white-space: nowrap;
    text-align: center;
  }
}

.cube-box {
  transform-style: preserve-3d;
  width: 30px;
  position: relative;
  transform: rotateX(-30deg) rotateY(45deg) scale(1);
  transition: 1s;
  z-index: 200;

  .cube1 {
    width: 100%;
    height: 100%;
    background: v-bind(getColor());
  }

  .cube2 {
    width: 100%;
    height: 100%;
    background: v-bind(getColor());
    transform-origin: left top;
    transform: rotateY(-90deg);
  }

  .cube3 {
    width: 100%;
    height: 100%;
    background: v-bind(getColor());
    transform-origin: right top;
    transform: rotateY(90deg);
  }

  .cube4 {
    width: 100%;
    height: 100%;
    background: v-bind(getColor());
    transform-origin: right top;
    transform: translateZ(30px);
  }

  .cube5 {
    width: 100%;
    padding-top: 100%;
    background: v-bind(getColor());
    transform-origin: left top;
    transform: rotateX(90deg);
  }

  .cube6 {
    width: 100%;
    padding-top: 100%;
    background: v-bind(getBottomColor());
    top: inherit;
    bottom: 0;
    transform-origin: left bottom;
    transform: rotateX(-90deg);
  }
}

.cube {
  position: absolute;
  // 添加伪元素以增强阴影效果
  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1; // 确保阴影在立方体下方
    box-shadow: 0 4px 10px 20px rgba(0, 0, 0, 0, 0.1), // 轻微阴影
    0 8px 15px 30px rgba(0, 0, 0, 0, 0.15), // 较深阴影，模拟渐变效果
    0 12px 20px 40px rgba(0, 0, 0, 0, 0.2); // 更深阴影；
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>