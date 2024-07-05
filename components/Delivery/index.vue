<script setup lang="ts">

import { computed } from 'vue'

type DeliveryProps = {
  url: string;
  smallUrl: string;
  title: string;
  desc: string;
  count: number;
  noUrl: string;
  total: number;
}

const props = defineProps<DeliveryProps>()

const data = computed(() => Math.floor(props.count * 10 / props.total))


</script>

<template>
  <div class="f-b delivery">
    <div class="title" style="display: flex">
      <div class="bg">
        <img class="bigImg" alt="url" :src="url" />
      </div>
      <div style="display: flex;flex-direction: column">
        <div class="tw">{{ title }}</div>
        <div class="tc shine">{{ count }}</div>
      </div>
    </div>
    <div style="width: 70%;">
      <div class="desc">{{ desc }}</div>
      <div class="count">
        <div class="imgItem">
          <img
            v-for="(item,index) in 10"
            :key="item"
            class="smallImg"
            alt="imgItem"
            :src="index<data?smallUrl:noUrl" />
        </div>
        <div class="shine total">{{ count }}/{{ total }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.delivery {
  align-items: center;
  margin-bottom: 20px;

  .title {
    width: 30%;

    .bg {
      width: 56px;
      height: 56px;
      display: flex;
      justify-content: center;
      margin-right: 6px;
      align-items: center;
      background: url("/lpg/street/diwen2.png") no-repeat;
      background-size: 100%;

      .bigImg {
        height: 40px;
      }
    }

    .tw {
      font-size: 18px;
      white-space: nowrap;
    }

    .tc {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .desc {
    font-size: 18px;
    margin-bottom: 6px;
  }

  .count {
    display: flex;
    height: 40px;
    box-sizing: border-box;
    border-radius: 5px;
    border: solid 1px rgb(4, 110, 162);
    padding: 4px;
    background-color: rgba(76, 65, 225, 0.4);
    align-items: center;

    .imgItem {
      display: flex;
      justify-content: space-around;
      width: 100%;

      .smallImg {
        height: 22px;
        margin-right: 4px;
      }
    }

    .total {
      font-weight: 500;
      font-size: 18px;
      margin-left: 8px;
    }
  }
}
</style>