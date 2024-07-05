<script setup lang="ts">
import { ref } from 'vue'

type BtdScrollType = {
  height?: number;
  hasMore: boolean;
  loading: boolean;
  total?: number;
}

const props = defineProps<BtdScrollType>()
const emit = defineEmits(['more'])
const scrollRef = ref<HTMLSelectElement>(null)


const handleScroll = (e) => {

  const { scrollTop, clientHeight, scrollHeight } = e.target
  if (scrollTop + clientHeight >= scrollHeight - 10) {
    if (props.hasMore) {
      emit('more')
    }

  }
}


</script>

<template>
  <div class="scrollOuter" @scroll="handleScroll">
    <div ref="scrollRef" class="scroll">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="less">
.scrollOuter {
  width: 100%;
  height: 160px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px; /* 设置滚动条宽度 */
  }
}
</style>