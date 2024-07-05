<script setup lang="ts">
type BtdIconProps = {
  i:string;
}

const props = defineProps<BtdIconProps>()
</script>

<template>
  <span class="iconfont">{{i}}</span>
</template>

<style scoped lang="less">

</style>