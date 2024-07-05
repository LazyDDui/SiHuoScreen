<script setup lang="ts">
type IconChangeProps = {
  active:boolean;
}
const props = defineProps<IconChangeProps>()
</script>

<template>
  <div>
    <span v-if="active" class="iconfont" >&#xe637;</span>
    <span v-else class="iconfont">&#xe636;</span>
  </div>
</template>

<style scoped lang="less">

</style>