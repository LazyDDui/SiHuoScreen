<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, ref } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

type BtdDialogProps = {
  desc: string;
}

const runtime = useRuntimeConfig()


const props = defineProps<BtdDialogProps>()
const emit = defineEmits(["onOpen"])
const show = ref(false)
const btnClick = (e: Event) => {
  e.stopPropagation()
  show.value = true
}

const closeDialog = (e: Event) => {
  e.stopPropagation()
  show.value = false
}

onBeforeMount(() => {
  window.addEventListener('click', closeDialog)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', closeDialog)
})

const open = (e:Event) => {
  btnClick(e)
  emit("onOpen")
}



</script>

<template>
  <teleport to="body">
    <transition>
      <div v-if="show" class="btd-dialog" @click.stop="btnClick">
        <div class="header f-b">
          <div class="title">{{ desc }}</div>
          <span class="iconfont closeIcon" @click.stop="closeDialog">&#xe710;</span>
        </div>
        <div class="content">
          <slot name="body" />
        </div>
      </div>
    </transition>
  </teleport>
  <div @click="open">
    <slot />
  </div>
</template>

<style scoped lang="less">
.btd-dialog {
  background: url("/lpg/street/diaglog.png") no-repeat;
  box-sizing: border-box;
  padding: 80px;
  width: 90vw;
  height: 37.5vw;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  z-index: 2500;
  color: #ffffff;

  .header {
    padding-left: 40px;
    padding-top: 4px;

    .closeIcon {
      font-size: 40px;
      cursor: pointer;
      color: #ccc7c7;

      &:hover {
        color: white;
      }
    }

    .title {
      background: url("/lpg/street/titleBg.png") no-repeat;
      width: 368px;
      height: 66px;
      background-size: 100%;
      font-size: 24px;
      font-weight: 500;
      box-sizing: border-box;
      font-style: italic;
      line-height: 50px;
      padding-left: 40px;
    }
  }

  .content {
    margin-top: 30px;
  }

}


.v-enter-active,
.v-leave-active {
  transition: all 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translate(-50%,(-50% - 160px));
}
</style>