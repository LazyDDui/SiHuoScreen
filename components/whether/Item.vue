<script setup lang="ts">
import { useMapStore } from '../../store/map'
import { storeToRefs } from 'pinia'
import { getStaticPath } from '../../composables/utils'

type WhetherProps = {
  url:string;
  desc:string;
}

const {url,desc} = defineProps<WhetherProps>()

const {weather} = storeToRefs(useMapStore())

</script>

<template>
  <div class="w-container">
    <div class="whe">
      <img alt="whether" :src="getStaticPath(`/lpg/street`+url)"/>
    </div>
    <div class="desc g-w">{{weather?desc:""}}</div>
  </div>

</template>

<style scoped lang="less">
.w-container {
  display: flex;
  align-items: center;
  margin-right: 60px;
  .desc {
    margin-left: 8px;
    color: #bcd2eb;
    font-size: 14px;
  }
  img {
    width: 25px;
    height: 25px;
  }
}
.whe {
  width: 30px;
  height: 30px;
  border: #bcd2eb 1px solid;
  box-sizing: border-box;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
}
</style>