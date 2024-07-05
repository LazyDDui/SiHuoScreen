<script setup lang="ts">
import { computed, ref } from 'vue'
import { BtdSelectType } from '../../composables/interface'
import { event, usr } from '../../composables/interface/mapData'
import { DictType } from '../../composables/interface/dict'

type BtdSelectProps = {
  type: BtdSelectType
}


const props = defineProps<BtdSelectProps>()

const emit = defineEmits(['change'])


const value = ref('')

const options = (): DictType[] => {
  switch (props.type) {
    case BtdSelectType.usr:
      return usr
    case BtdSelectType.event:
      return event
    default:
      return []
  }
}

const label = computed(()=>{
  const fl = options().find(item => item.dictValue === value.value)
  return fl?fl.dictLabel:"请选择"
})



</script>

<template>
  <div class="btd-select">
    <el-select
      v-model="value"
      size="small"
      style="opacity: 0;display: inline-block;position:absolute;left: 0;top: 0"
      @change="emit('change',$event)"
    >
      <el-option
        v-for="item in options()"
        :key="item"
        :label="item.dictLabel"
        :value="item.dictValue"
      />
    </el-select>
    <div class="btd-select-desc g-w">{{ type }}</div>
    <div class="btd-select-item">
      <div class="date">{{ label }}</div>
      <span v-if="focus" class="iconfont">&#xe638;</span>
      <span v-else class="iconfont">&#xe637;</span>
    </div>
  </div>
</template>

<style lang="less" >
.btd-select {
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 8px;

  .btd-select-desc {
    font-size: 12px;
    white-space: nowrap;
    margin-right: 4px;
  }

  .btd-select-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 12px;
    background: url("/lpg/street/date.png") no-repeat;
    width: 124.85px;
    height: 17.6px;
    background-size: 100%;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
  }
}

.el-popper.is-pure.is-light.el-select__popper {
  background-color: rgb(5, 57, 70, .8) !important;
  border: none;
}

.el-select-dropdown__item.hover {
  background: #4acead;
}

.el-select-dropdown__item.selected.hover {
  background: #4acead !important;
}
</style>