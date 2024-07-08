<script setup lang="ts">

import { getStaticPath } from '../../composables/utils'
</script>

<template>
  <div class="jx">
    <div class="item1">
      <img style="top: 0" :src="getStaticPath('/lpg/street/juxing3.png')" alt="jx1"/>
      <img style="top: 0" :src="getStaticPath('/lpg/street/juxing1.png')" alt="jx2"/>
    </div>
    <div class="item2">
      <img :src="getStaticPath('/lpg/street/juxing2.png')" alt="jx3"/>
      <img :src="getStaticPath('/lpg/street/juxing4.png')" alt="jx4"/>
    </div>
  </div>
</template>

<style scoped lang="less">
.jx {
  width: 460px;
  z-index: -100;
  position: relative;
  transform: translateY(-55px);
  margin: 0 auto;
  margin-bottom: 30px;
  .item1 {
    width: 100%;
    position: relative;
    img {
      position: absolute;
      width: 100%;
    }
  }
  .item2 {
    width: 100%;
    position: relative;
    top: 20px;
    img {
      position: absolute;
      width: 100%;
    }
  }
}
</style>