<script setup lang="ts">
import { getCurrentInstance, nextTick, onBeforeUnmount, onMounted, reactive, ref, shallowRef } from 'vue'
import EmptyData from './EmptyData.vue'

const mapData = new Map([
  ['序号', 'index'],
  ['姓名', 'name'],
  ['证件号码', 'idCard'],
  ['有效期', 'certInvalidDate'],
  ['资格证号', 'certNo'],
  ['手机号', 'phone']
])

const instance = getCurrentInstance()

type AutoReqScrollType = {
  type: string;
}


const alterList = ref([])
const valueList = ref([])

const props = defineProps<AutoReqScrollType>()

switch (props.type) {
  case 'staff_deliver.cert_alarm':
    alterList.value = Array.from(mapData.keys()).slice(0, 6)
    valueList.value = Array.from(mapData.values()).slice(0, 6)
    break
  default:
    alterList.value = []
    valueList.value = []
}

let y = 0
const scrollSpeed = 0.5

const list = shallowRef({
  total: 0,
  rows: []
})

const page = reactive({
  current: 1,
  size: 10
})

let animate
const scrollWrapper = ref(null)


const scroll = () => {
  animate = requestAnimationFrame(scroll)
  nextTick(() => {
    if (!scrollWrapper.value) {
      return
    }
    y += scrollSpeed
    if (scrollWrapper.value.scrollHeight - scrollWrapper.value.offsetHeight <= y) {
      y = 0
    } else {
      scrollWrapper.value.scrollTop = y
    }
  })
}

const loadMore = async () => {
  if (list.value.rows.length < list.value.total) {
    page.current += 1
    await getList()
    instance.proxy.$forceUpdate()
  }
}

onMounted(() => {
  scroll()
  scrollWrapper.value?.addEventListener('scroll', async (e) => {
    y = scrollWrapper.value.scrollTop
    if (scrollWrapper.value.scrollHeight - scrollWrapper.value.offsetHeight - 10 <= scrollWrapper.value.scrollTop) {
      await loadMore()

    }
  })


})

const stop = () => {
  if (animate) {
    cancelAnimationFrame(animate)
  }
}

onBeforeUnmount(() => {
  if (animate) {
    cancelAnimationFrame(animate)
  }
})

</script>

<template>
  <div id="autoScroll" v-if="list.rows.length">
    <div class="header f-b">
      <div v-for="item in alterList" :key="item" class="subtitle">
        {{ item }}
      </div>
    </div>
    <div class="scrollBox">
      <div ref="scrollWrapper" class="scroll" @mouseover="stop" @mouseleave="scroll">
        <div>
          <div
            v-for="(item,index) in list.rows"
            :key="index"
            class="content f-b"
            :style="{backgroundColor:index%2==0?'rgba(10, 38, 57,.8)':'rgba(13, 47, 69,.3)'}">
            <div v-for="(i,j) in item" :key="j" class="context">
              {{ i }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else id="empty">
    <empty-data/>
  </div>
</template>

<style scoped lang="less">
#empty {
  width: 100%;
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;

}

#autoScroll {
  width: 100%;
  height: 25vw;

  .header {
    color: #0397c9;
    border-bottom: 1px solid #ffffff;
    padding-bottom: 8px;

    .subtitle {
      text-align: center;
      flex: 1;
      font-size: 22px;
    }
  }

  .scroll {
    overflow-y: scroll;
    position: relative;
    height: 400px;

    .content {
      color: #ffffff;
      font-size: 18px;
      height: 60px;
      box-sizing: border-box;
      padding: 16px 0;
      display: flex;
      justify-content: center;
      align-items: center;

      .context {
        flex: 1;
        text-align: center;
      }
    }
  }
}

::-webkit-scrollbar {
  display: none;
}
</style>
