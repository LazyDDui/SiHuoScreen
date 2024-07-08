<script setup lang="ts">
import { onMounted, ref } from 'vue'
import lottie from 'lottie-web'
import { getStaticPath } from '../../composables/utils'

const lottieBox = ref(null)

onMounted(() => {
  if (lottieBox.value) {
    const animation = lottie.loadAnimation({
      container: lottieBox.value,
      renderer: 'svg',
      loop: true, // 循环播放，默认：true
      autoplay: true, // 自动播放 ，默认true
      path: getStaticPath('/lpg/lottieJson/emptyAnimation.json')
      // path: 'https://labs.nearpod.com/bodymovin/demo/markus/halloween/markus.json',//网络路径
      // animationData:  '/dafeng/lpg/lottieJson/emptyAnimation.json',//本地路径，优先级更高
    })
    console.log(lottie)
  }
})

</script>

<template>
  <div id="empty">
    <div ref="lottieBox" class="lottie"></div>
    <div class="word">{{ '暂无数据' }}</div>
  </div>
</template>

<style scoped lang="less">
#empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  .lottie {
    width: 500px;
  }
  .word {
    font-size: 30px;
    font-weight: 500;
  }
}

</style>