<template>
  <div
    class="draggable-box"
    :style="{ left: `${left}px`, top: `${top}px` }"
    @mousedown.prevent="startDrag"
  >
    <div class="top f-b">
      <div class="title">
        <div class="g-w sub">三界监管</div>
        <div class="g-w type">3界</div>
      </div>
      <div class="clearScreen" @click="clearAll">
        <div class="g-w">
          清屏
        </div>
      </div>
    </div>
    <div class="option">
      <div class="optionItem f-b">
        <div class="f-a" style="align-items: center">
          <div>天神</div>
          <el-checkbox v-model="stationCheck" size="small" @change="()=>{}" />
        </div>

        <IconChange :active="options.station" @click="toggle('station')" />
      </div>
      <option-group :active="options.station">
        <div>
        </div>
      </option-group>

      <div class="optionItem f-b">
        <div class="f-a">
          <div>凡人</div>
          <el-checkbox
            v-model="deliveryCheck"
            size="small"
            @change="()=>{}" />
        </div>
        <IconChange :active="options.delivery" @click="toggle('delivery')" />
      </div>
      <option-group :active="options.delivery">
        <div>
          <OItem
            v-for="(item,index) in delivery"
            :key="index"
            :type="Global.dlivery"
            :desc="item.plateNo"
            :active="item.active"
            :other="item.lat?`在线`:`离线`"
            :index="index"
            :disable="!item.lat"
            @change="()=>{}"
          />
        </div>

      </option-group>

      <div class="optionItem f-b">
        <div class="f-a">
          <div>魔族</div>
          <el-checkbox v-model="usrCheck" size="small" @change="()=>{}" />
        </div>
        <IconChange :active="options.user" @click="toggle('user')" />
      </div>
      <option-group :active="options.user">
        <div>

        </div>

      </option-group>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import OItem from './OItem'
import OptionGroup from './OptionGroup'
import IconChange from './IconChange.vue'
import { useGlobal } from '../../store/global'
import { storeToRefs } from 'pinia'
import { Global } from '../../composables/interface'

// 初始化盒子位置
const left = ref(0)
const top = ref(200)


const {
  clearAll
} = useGlobal()
const { stationCheck, delivery, deliveryCheck, usrCheck } = storeToRefs(useGlobal())


const options = reactive({
  station: false,
  delivery: false,
  user: false
})


const toggle = (desc: string) => {
  options[desc] = !options[desc]
}


let isDragging = false

let offsetX = 0
let offsetY = 0

const startDrag = (e) => {
  isDragging = true

  offsetX = e.clientX - left.value
  offsetY = e.clientY - top.value
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', stopDrag)
}

const onMouseMove = (e) => {
  if (!isDragging) return
  left.value = e.clientX - offsetX
  top.value = e.clientY - offsetY
}

const stopDrag = () => {
  isDragging = false
  document.removeEventListener('mousemove', onMouseMove)
  document.removeEventListener('mouseup', stopDrag)
}


onMounted(() => {
  //@ts-ignore
  left.value = parseInt(Number(window.innerWidth) / 1.8)
  document.addEventListener('mouseup', stopDrag)
})

onBeforeUnmount(() => {
  document.removeEventListener('mouseup', stopDrag)
})
</script>

<style lang="less" scoped>
.draggable-box {
  background-color: transparent;
  cursor: move;
  position: fixed;
  z-index: 2000;
  color: skyblue;
  width: 240px;

  .option {
    color: #ffffff;
    font-weight: 500;
    width: 100%;
    background-color: rgba(5, 32, 43, .8);
    font-size: 20px;
    cursor: pointer;

    .optionItem {
      box-sizing: border-box;
      padding: 10px 10px;

      .el-checkbox {
        margin-left: 10px;
      }
    }
  }

  .top {
    width: 100%;
    margin-bottom: 4px;

    .title {
      width: 170px;
      background-color: rgba(30, 183, 206, 0.8);
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 5px 10px;
      height: 40px;
      margin-right: 4px;
      border: 1px solid rgb(204, 255, 255);
      border-radius: 4px;

      .sub {
        font-size: 26px;
        font-weight: 500;
        margin-right: 20px;
        white-space: nowrap;
      }

      .type {
        width: 30%;
        font-size: 16px;
        background-color: rgb(28, 50, 69);
        white-space: nowrap;
        align-self: flex-end;
      }
    }

    .clearScreen {
      cursor: pointer;
      font-size: 20px;
      white-space: nowrap;
      display: flex;
      width: 94px;
      align-items: center;
      justify-content: center;
      background-color: rgba(3, 21, 30, 0.8);
      box-sizing: border-box;
      border-radius: 4px;
      border: rgb(204, 255, 255) 1px solid;
    }

  }
}
</style>