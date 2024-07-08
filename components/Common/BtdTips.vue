<script setup lang="ts">
import { SelectSize } from '../../composables/interface'
import { useV } from '../../composables/commonUseFn/useV'
import { onMounted, ref } from 'vue'
import { getStaticPath } from '../../composables/utils'

type AbnormalTipProps = {
  desc:string;
  active:boolean;
  size?:SelectSize
}
const sizeMap = new Map([
  [SelectSize.large,"80_20.5_10"],
  [SelectSize.small,"50_16.4_8"]
])

const props = defineProps<AbnormalTipProps>()
const show = ref()
const {toV} = useV()
const size = props.size?props.size:SelectSize.large
const sizeM = sizeMap.get(size).split("_")
const width = Number(sizeM[0])
const height = Number(sizeM[1])
const fontSize = Number(sizeM[2])
const emit = defineEmits(['change'])
const handleChange = () => {
  emit("change",props.desc)
}

onMounted(()=>{
  show.value = true
})

</script>

<template>
  <div v-if="show" class="abnormal" :style="{width:toV(width),height:toV(height),fontSize:toV(fontSize)}" @click="handleChange">
    <transition>
      <img v-if="active" :src="getStaticPath('/lpg/street/selected.png')" alt="select"/>
    </transition>
    <transition>
      <img v-if="!active" :src="getStaticPath('/lpg/street/noSelected.png')" alt="noSelect"/>
    </transition>
    {{desc}}
  </div>
</template>

<style scoped lang="less">
.abnormal {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 20px;
  position: relative;
  img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -10;
    width: v-bind(toV(width));
    height: v-bind(toV(height));
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>