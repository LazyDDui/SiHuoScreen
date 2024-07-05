<script setup lang="ts">
import { ref } from 'vue'
import { Delivery, StationType, useGlobal, Usr } from '../../store/global'
import { Global } from '../../composables/interface'
import BtdIcon from './BtdIcon.vue'
import { storeToRefs } from 'pinia'

type OItemProps = {
  desc: string;
  other?: number | string;
  active: boolean;
  type: Global;
  index: number;
  disable?: boolean | null;
}

const { changeGlobal } = useGlobal()
const { stations, delivery, usr } = storeToRefs(useGlobal())

const getModel = (): StationType[] | Delivery[] | Usr[] => {
  switch (props.type) {
    case Global.station:
      return stations.value
    case Global.dlivery:
      return delivery.value
    default:
      return usr.value
  }
}

const props = defineProps<OItemProps>()
const emit = defineEmits(['change'])

const checked = ref(props.active)


const handleChange = (active: boolean) => {
  checked.value = active
  changeGlobal(props.desc, active, getModel())
  emit('change')
}


</script>

<template>
  <div class="oItem f-b">
    <div class="left" :data-desc="desc+` `+(other?other:``)">
      <BtdIcon v-if="type===Global.station" i="&#xe79b;" />
      <BtdIcon v-else-if="type===Global.dlivery" i="&#xe650;" />
      <BtdIcon v-else i="&#xe625;" />
      <div class="g-w name">{{ desc }} {{ other }}</div>
    </div>
    <el-checkbox
      v-model="getModel()[index].active"
      :disabled="disable"
      size="small"
      @change="handleChange($event)" />
  </div>
</template>

<style scoped lang="less">
.oItem {
  font-size: 14px;
  align-items: center;
  box-sizing: border-box;
  padding: 4px 10px;
  height: 40px;

  .left {
    display: flex;
    width: calc(100% - 26px);
    position: relative;

    &:hover::after {
      content: attr(data-desc);
      display: block;
      color: #ffffff;
      background: transparent;
      position: absolute;
      left: 26px;
    }

    .name {
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }

    span {
      margin-right: 10px;
    }
  }

  .el-checkbox {
    width: 20px;
  }
}
</style>