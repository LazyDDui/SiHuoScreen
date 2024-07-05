<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { format } from '../../composables/utils/format'

type BtdPickerProps = {
  timeStamp:string;
}

const props = defineProps<BtdPickerProps>()
const time = ref<any>(new Date(props.timeStamp).getTime())
const focus = ref(false)

const emit = defineEmits(['confirm'])

const date = computed(()=> {
    return  format(time.value,"yyyy-MM-dd")
})

const w = watch(()=>props.timeStamp,(value)=>{
  time.value = new Date(Number(value)).getTime()
})

const handleChange = () => {
  emit("confirm",time)
}

onBeforeUnmount(()=>{
  w()
})

</script>

<template>
  <div class="btdPicker">
    <div class="pick">
      <div class="date">{{date}}</div>
      <span v-if="focus" class="iconfont">&#xe638;</span>
      <span v-else class="iconfont">&#xe637;</span>
    </div>

    <el-date-picker
      v-model="time"
      type="date"
      placeholder="请选择时间"
      size="small"
      style="display: inline-block;opacity: 0;position: absolute;width: 100%;height:100%;top: 0;left: 0"
      @change="handleChange"
      @focus="focus=true"
      @blur="focus=false"
    />
  </div>
</template>

<style lang="less">
.btdPicker {
  display: inline-block;
  cursor: pointer;
  position: relative;
  .pick {
    cursor: pointer;
    font-size: 14px;
    background: url("/lpg/street/date.png") no-repeat;
    width: 136.2px;
    height: 19.2px;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .date {
      margin-right: 10px;
      font-weight: 500;
    }
  }

}


.el-popper.is-pure.is-light.el-picker__popper {
  background-color: rgb(5, 57, 70,.8) !important;
  border:none;
}

.el-picker-panel__body {
  background-color: rgb(5, 57, 70,.8) !important;
}

.el-popper__arrow::before {
  background-color: rgb(5, 57, 70,.8) !important;
}

.el-input__wrapper {
  cursor: pointer !important;
}

</style>