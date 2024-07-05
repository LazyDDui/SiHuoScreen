<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import BtdDialog from '../Common/BtdDialog.vue'
import AutoScroll from '../Common/AutoScroll.vue'

defineOptions({
  name:"Realm"
})

type Info = {
  type: string;
  count: number;
  name: string
}
type SafeProps = {
  noRight?: boolean;
  desc: string;
  sort: number;
  info: Info[]
}


const props = defineProps<SafeProps>()

const select = ref<string>('')

const emit = defineEmits(['onHover', 'onLeave'])

watchEffect(()=>{
  console.log(props.info)
})


</script>

<template>
  <div class="safe">
    <div class="safeContainer">
      <div class="count g-w">{{ sort }}</div>
      <div class="desc g-w">{{ desc }}</div>
    </div>
    <img v-if="!noRight" alt="jt" src="/lpg/street/jiantou.png" />

    <div class="words">
      <BtdDialog
        v-for="(item,index) in info"
        :key="index"
        :desc="item.name"
      >
        <div
          class="g-w word"
          @mouseleave="emit('onLeave')"
          @mouseenter="emit('onHover',item.name+' '+item.count)">
          {{ item.name }} 较肝 {{ item.count }}次
        </div>
        <template #body>
          <AutoScroll :type="item.type" />
        </template>
      </BtdDialog>
    </div>

  </div>

</template>

<style scoped lang="less">
.safe {
  position: relative;
  width: 25%;
  padding: 3px;
  box-sizing: border-box;

  .words {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;

    .word {
      width: 120px;
      font-size: 14px;
      line-height: 22px;
      white-space: nowrap;
      overflow-x: hidden;
      overflow-y: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      height: 20px;
      position: relative;
      z-index: 1;
    }

  }


  .safeContainer {
    display: inline-block;
    background: url("/lpg/street/diwen5.png") no-repeat;
    width: 80px;
    height: 102.4px;
    background-size: 100%;
    font-size: 18px;
    position: relative;

    .count {
      position: absolute;
      top: 26px;
      left: 50%;
      font-size: 22px;
      font-weight: 500;
      text-align: center;
      transform: translateX(-50%);
    }

    .desc {
      position: absolute;
      left: 22px;
      top: 68px;
    }
  }

  img {
    position: absolute;
    top: 50px;
    left: 70px;
    height: 34px;
    width: 72px;
    animation-name: right;
    animation-duration: 1.5s;
    animation-iteration-count: infinite;
  }
}

@keyframes right {
  0% {
    transform: translateX(-5px);
    opacity: 0.5;
  }
  50% {
    transform: translateX(5px);
    opacity: 1;
  }
  100% {
    transform: translateX(-5px);
    opacity: 0.5;
  }
}

</style>