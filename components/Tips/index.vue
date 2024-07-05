<script setup lang="ts">
type TipsProps = {
  desc:string;
}

const {desc} = defineProps<TipsProps>()
</script>

<template>
  <div class="tips-container" >
    <div class="desc">{{desc}}</div>
  </div>
</template>

<style scoped lang="less">
.tips-container {
  display: flex;
  width: 100%;
  height: 50px;
  background: url('/lpg/street/tips.png') no-repeat;
  background-size: 100%;
  align-items: center;
  //margin-bottom: 10px;
  .desc {
    margin-left: 50px;
    margin-bottom: 10px;
    font-size: 19px;
    font-weight: 500;
  }
}
</style>