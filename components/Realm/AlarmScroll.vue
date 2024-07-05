<script setup lang="ts">

import EventItem from './EventItem.vue'
import { AlarmSearchEntry, SafeType, ScrollType } from '../../composables/interface'
import BtdScroll from '../Common/BtdScroll.vue'

type AlarmScrollProps = {
  data: { total: number; rows: AlarmSearchEntry[] }
}

defineProps<AlarmScrollProps>()
const emit = defineEmits(['more'])

</script>

<template>
  <BtdScroll :loading="true" :has-more="data.total>data.rows.length" @more="emit('more')">
    <event-item
      v-for="(item,index) in data.rows" :key="index" :title="item.type" :desc="item.desc"
      :is-handle="item.isHandle==1?SafeType.info:SafeType.error" />
  </BtdScroll>
</template>

<style scoped lang="less">
.scroll {

}
</style>