<script setup lang="ts">
import { onMounted, ref } from 'vue'
import lottie from 'lottie-web'

defineOptions({
  name:"SiHuoLottie"
})

type LottieProps = {
  path: string;
}

const props = defineProps<LottieProps>()
const lottieBox = ref(null)

onMounted(() => {
  if (lottieBox.value) {
    lottie.loadAnimation({
      container: lottieBox.value,
      renderer: 'svg',
      loop: true, // 循环播放，默认：true
      autoplay: true, // 自动播放 ，默认true
      path: props.path
    })
  }
})
</script>

<template>
  <div ref="lottieBox"></div>
</template>

<style scoped lang="less">

</style>