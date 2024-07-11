<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, shallowRef, toRaw } from 'vue'
import Tips from '../../components/Tips'
import StationCount from '../../components/StationCount'
import StationItem from '../../components/StationCount/Item'
import ThreeShape from '../../components/StationCount/threeShape'
import Delivery from '../../components/Delivery'
import UseGas from '../../components/UseGas'
import CasCenter from '../../components/UseGas/GasCenter'
import CountUp from '../../components/CountUp'
import BtdTips from '../../components/Common/BtdTips'
import Charts from '../../components/Abnormal/Charts'
import {
  AbnormalEntry,
  AbnormalType,
  AlarmSearchEntry,
  AlarmSearchType, BottleCountResponse,
  BtdSelectType, CustomInfoRes, DeliveryRes,
  SelectSize
} from '../../composables/interface'
import BtdPicker from '../../components/Common/BtdPicker'
import BtdSelect from '../../components/Common/BtdSelect'
import Search from '../../components/Realm/Search'
import Global from '../../components/Common/Global'
import BtdDialog from '../../components/Common/BtdDialog'
import BatteryChart from '../../components/Abnormal/BatteryChart'
import PillarChart from '../../components/Abnormal/PillarChart'
import Scene from '../../components/whether/Scene'
import {
  deepCopy,
  format,
  getMonthTimestamps,
  getWeekTimestamps,
  isEmpty,
  mergeAndSumObjects,
  sum
} from '../../composables/utils/format'
import AlarmScroll from '../../components/Realm/AlarmScroll'
import EmptyData from '../../components/Common/EmptyData'
import { useSeoMeta } from 'nuxt/app'
import SiChuanMap from '../../components/SiChuanMap/index'
import GasCount from '../../components/UseGas/CasCount'
import Realm from '../../components/Realm/index'
import { useAutoAnimate } from '@formkit/auto-animate/vue'
import { getStaticPath } from '../../composables/utils'
import SiHuoLottie from '../../components/Common/SiHuoLottie.vue'

useSeoMeta({
  title: 'SIHUO',
  ogTitle: '大屏可视化',
  keywords: '666',
  description: '一个开源可视化模板'
})

let autoAnimateTimer: NodeJS.Timer

const deepData = [
  {
    desc: '今日',
    active: true,
    type: '0'
  },
  {
    desc: '本周',
    active: false,
    type: '1'
  },
  {
    desc: '本月',
    active: false,
    type: '2'
  }
]

const abnormal = ref(deepCopy(deepData))
const abnormalData = ref<AbnormalEntry>({
  alarmCount: 100,
  breakCount: 20,
  alarmByAlarmType: {},
  breakByAlarmType: {}
})


const plist = [
  {
    url: '/chukuliang.png',
    desc: 'a产量',
    count: 20
  },
  {
    url: '/chukuliang.png',
    desc: 'b产量',
    count: 60
  },
  {
    url: '/fanhui.png',
    desc: 'c产量',
    count: 300
  },
  {
    url: '/fanhui.png',
    desc: 'd产量',
    count: 90
  }
]
const select = ref('')
const produce = ref(plist)
const [autoAnimate] = useAutoAnimate()

onMounted(() => {
  autoAnimateTimer = setInterval(() => {
    const obj = produce.value.shift()
    produce.value.push(obj)
  }, 2000)
})

onBeforeUnmount(() => {
  clearInterval(autoAnimateTimer as any)
})


const totalCount = computed(() => sum(produce.value.map((item) => item.count)))

const customInfo = ref<CustomInfoRes>({
  personCount: 1300,
  xManCount: 5
})

const delivery = ref<DeliveryRes>({
  carOnLine: 10,
  carTotal: 20,
  deliverOnLine: 5,
  deliverTotal: 20
})


const abnormalTotal = computed(() => {
  return abnormalData.value.alarmCount + abnormalData.value.breakCount
})

const alarmCount = computed(() => {
  if (!abnormalTotal.value) {
    return 0
  }
  return abnormalData.value.alarmCount / abnormalTotal.value
})

const breakCount = computed(() => {
  if (!abnormalTotal.value) {
    return 0
  }
  return abnormalData.value.breakCount / abnormalTotal.value
})


const safe = ref(deepCopy(deepData))


const eventWork = ref([
  {
    desc: '本周',
    active: true
  },
  {
    desc: '本月',
    active: false
  }
])


const change = (desc: string, arr: any) => {
  arr.forEach(item => {
    item.active = item.desc === desc
  })
}

const changeWeekMonth = (desc: string) => {
  eventWork.value.forEach(item => {
    if (desc === '本周') {
      alarmForm.startDate = getWeekTimestamps().start
      alarmForm.endDate = getWeekTimestamps().end
    } else {
      alarmForm.startDate = getMonthTimestamps().start
      alarmForm.endDate = getMonthTimestamps().end
    }
    item.desc === desc ? item.active = true : item.active = false

  })

}


const alarmForm = reactive<AlarmSearchType>({
  current: 1,
  size: 10,
  alarmType: '',
  startDate: getWeekTimestamps().start,
  endDate: getWeekTimestamps().end,
  customType: '',
  isHandle: false
})

const toGray = () => {
  eventWork.value.forEach((item) => {
    item.active = false
  })
}

const changeStartTime = (time: number) => {
  alarmForm.startDate = time
  toGray()
}

const changeEndTime = (time: number) => {
  alarmForm.endDate = time
  toGray()
}

const alarmData = shallowRef<{ total: number; rows: AlarmSearchEntry[]; page: number }>({
  total: 0,
  rows: [],
  page: 1
})

const alarmSearch = async () => {
  const formData = deepCopy({
    ...alarmForm,
    startDate: format(alarmForm.startDate as number, 'yyyy-MM-dd'),
    endDate: format(alarmForm.endDate as number, 'yyyy-MM-dd')
  })

  if (!formData.alarmType) {
    delete formData.alarmType
  }

  if (!formData.customType) {
    delete formData.customType
  }

  const data: any = {
    rows: [
      {
        desc: '渡劫99层,修炼者渡数埋念过最后一次天劫，就能成就仙人位业，飞升仙界',
        isHandle: 1,
        type: '四火'
      },
      {
        desc: '练气99层,修炼者可以分神,拥有更强大的功力',
        isHandle: 0,
        type: '西门吹雪'
      },
      {
        desc: '筑基99层,修炼者开始凝结元婴',
        isHandle: 0,
        type: '独孤求败'
      }
    ],
    total: 3
  }
  alarmData.value = { rows: data.rows.concat(alarmData.value.rows), total: Number(data.total), page: alarmForm.current }

}

const more = async () => {
  ++alarmForm.current
  await alarmSearch()
}

const changeAbnormal = async (e) => {
  change(e, abnormal.value)
}

const changeSafe = async (e) => {
  change(e, safe.value)
}

const usrTotal = computed(() => customInfo.value.personCount + customInfo.value.xManCount)

const alarmBreakTotal = computed(() => mergeAndSumObjects(abnormalData.value.breakByAlarmType, abnormalData.value.alarmByAlarmType))


const evolutionaryProcess = [
  {
    power: 10,
    name: '练气',
    info: [
      {
        name: '炼气初期',
        count: 2
      },
      {
        name: '炼气中期',
        count: 3
      }
    ]
  },
  {
    power: 20,
    name: '筑基',
    info: [
      {
        name: '炼气后期',
        count: 5
      }
    ]
  },
  {
    power: 30,
    name: '元婴',
    info: [
      {
        name: '炼虚合道',
        count: 10
      }
    ]
  },
  {
    power: 100,
    name: '渡劫',
    info: [
      {
        name: '渡劫期',
        count: 50
      },
      {
        name: '大乘期',
        count: 100
      }
    ]
  }
]



</script>

<template>
  <div class="box">
    <div class="header">
      <img alt="topBg" :src="getStaticPath('/lpg/street/topbg.png')" class="topBg" />
      <div class="linear"></div>
      <div class="title">
        <i>修仙可视化数据</i>
        <i>智慧大屏</i>
      </div>
      <Scene />
      <CountUp />
    </div>
    <div class="left">
      <Tips desc="监管"></Tips>
      <station-count :count="totalCount" />
      <div ref="autoAnimate" class="f-a" style="width: 80%;margin: 0 auto">
        <station-item
          v-for="(item) in produce.slice(0,3)"
          :key="item.desc"
          :count="item.count"
          :url="item.url"
          :desc="item.desc" />
      </div>
      <three-shape />
      <Tips desc="人员和车辆管理"></Tips>
      <Delivery
        :count="delivery.deliverOnLine"
        :total="delivery.deliverTotal"
        desc="在线汽车"
        title="车辆"
        :url="getStaticPath('/lpg/street/car.png')"
        :no-url="getStaticPath('/lpg/street/carNo.png')"
        :small-url="getStaticPath('/lpg/street/littleCar.png')"
      />
      <Delivery
        :count="delivery.carOnLine"
        :total="delivery.carTotal"
        desc="在线人员"
        title="人员"
        :url="getStaticPath('/lpg/street/person.png')"
        :no-url="getStaticPath('/lpg/street/personNo.png')"
        :small-url="getStaticPath('/lpg/street/smallPerson.png')" />
      <Tips desc="客户管理"></Tips>
      <div class="f-b lb">
        <UseGas :count="Number(customInfo.personCount)" :url="getStaticPath('/lpg/street/jumin.png')" desc="麻瓜" />
        <CasCenter :count="usrTotal" />
        <UseGas :count="Number(customInfo.xManCount)" :url="getStaticPath('/lpg/street/feijumin.png')" desc="变种人">
          <GasCount />
        </UseGas>
      </div>

    </div>
    <div class="right">
      <Tips desc="变异量"></Tips>
      <div class="f-a" style="width: 100%;">
        <BtdTips
          v-for="item in abnormal"
          :key="item.desc"
          :desc="item.desc"
          :active="item.active"
          @change="changeAbnormal($event)" />
      </div>
      <div class="f-a charts">
        <BtdDialog desc="变异总量">
          <Charts :percent="abnormalTotal==0?0:1" :count="abnormalTotal" desc="阻断.预警" :type="AbnormalType.BLUE" />
          <template #body>
            <empty-data v-if="isEmpty(alarmBreakTotal)" />
            <BatteryChart v-else title="变异重量" :map="alarmBreakTotal" />
          </template>
        </BtdDialog>
        <BtdDialog desc="进化">
          <Charts :percent="breakCount" :count="abnormalData.breakCount" desc="超进化" :type="AbnormalType.GREEN" />
          <template #body>
            <empty-data v-if="abnormalData.breakByAlarmType" />
            <PillarChart v-else :map="abnormalData.breakByAlarmType" />
          </template>
        </BtdDialog>
        <BtdDialog desc="变异">
          <Charts :percent="alarmCount" :count="abnormalData.alarmCount" desc="变异" :type="AbnormalType.YELLOW" />
          <template #body>
            <empty-data v-if="abnormalData.alarmByAlarmType" />
            <BatteryChart v-else title="预警" :map="abnormalData.alarmByAlarmType" />
          </template>
        </BtdDialog>
      </div>
      <Tips desc="进化过程"></Tips>
      <div class="f-a" style="width: 100%;">
        <BtdTips
          v-for="item in safe"
          :key="item.desc"
          :desc="item.desc"
          :active="item.active"
          @change="changeSafe($event)" />
      </div>
      <div class="safeAlarm" style="position: relative">
        <div class="f-a safe">
          <Realm
            v-for="(item,index) in evolutionaryProcess "
            :key="item"
            :no-right="index === 3"
            :sort="item.power"
            :desc="item.name"
            :info="item.info"
            @on-hover="(e)=>select=e"
            @on-leave="select=''"
          />
        </div>
        <transition>
          <div v-if="select" class="show">{{ select }}次</div>
        </transition>
      </div>

      <Tips desc="侠客搜索榜单"></Tips>
      <div class="f-b" style="align-items: center">
        <div style="display: flex">
          <BtdTips
            v-for="item in eventWork"
            :key="item"
            :active="item.active"
            :desc="item.desc"
            :size="SelectSize.small"
            @change="(e)=>changeWeekMonth(e)" />
        </div>
        <BtdPicker :time-stamp="alarmForm.startDate" @confirm="changeStartTime($event)" />
        <BtdPicker :time-stamp="alarmForm.endDate" @confirm="changeEndTime($event)" />
      </div>
      <div class="select" style="align-items: center;display: flex">
        <btd-select :type="BtdSelectType.usr" @change="alarmForm.customType=$event" />
        <btd-select :type="BtdSelectType.event" @change="alarmForm.alarmType=$event" />
      </div>
      <search @change="(e)=>alarmForm.alarmType = e" @search="alarmSearch" />
      <AlarmScroll :data="alarmData" @more="more" />
    </div>
    <SiChuanMap />
    <global />
  </div>
</template>

<style scoped lang="less">
.box {
  width: 100%;
  background-color: transparent;
}


.v-enter-active,
.v-leave-active {
  transition: opacity 1.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}


.safeAlarm {
  position: relative;

  .show {
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 30px;
    white-space: nowrap;
    background-color: rgba(0, 153, 153, .8);
    padding: 2px 6px;
    box-sizing: border-box;
    z-index: 200;
    border-radius: 5px;
  }
}

.header {
  height: 14vh;
  width: 100%;
  background-size: 100vw 14vh;
  position: fixed;
  z-index: 500;

  .title {
    width: 100%;
    display: flex;
    box-sizing: border-box;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 8vh;
    color: white;
    position: relative;
    z-index: 2;
    text-shadow: 0 0 5px rgba(255, 255, 255, 0.3), /* 减少模糊距离和提高透明度 */ 0 0 10px rgba(255, 255, 255, 0.7); /* 更改第二层的参数以达到更柔和的发光效果 */

    i {
      font-size: 28px;
      font-weight: 500;
      animation: shadow 3s forwards;
    }
  }

  @keyframes shadow {
    from {
      letter-spacing: -25px;
      filter: blur(10px);
    }
    to {
      letter-spacing: 0;
      filter: blur(0px);
    }
  }

  .topBg {
    width: 100%;
    height: 14vh;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .linear {
    width: 100%;
    height: 10vh;
    position: absolute;
    left: 0;
    top: 0;
    background-image: linear-gradient(to bottom,
    rgba(9, 34, 48, 1) 0%, /* 上部颜色及透明度 */ rgba(3, 37, 55, 0.7) 100% /* 下部颜色及透明度 */);

    &::before {
      content: ""; /* 伪元素必须有内容 */
      position: absolute;
      top: -10px; /* 根据需要调整边缘虚化的范围 */
      left: -10px;
      right: -10px;
      bottom: -20px;
      background-image: inherit; /* 继承父元素的背景图像 */
      filter: blur(10px); /* 调整模糊程度以控制虚化效果 */
      z-index: -1; /* 确保伪元素在主内容之下 */
    }
  }
}

.left {
  width: 30vw;
  height: 92vh;
  background-color: rgba(6, 29, 43, .9);
  position: fixed;
  left: 0;
  top: 8vh;
  z-index: 500;
  color: #ffffff;
  box-sizing: border-box;
  padding: 10px 16px;

  .lb {
    background: url("/lpg/street/diwen3.png") no-repeat;
    width: 100%;
    height: 400px;
    background-size: 100%;
    background-position: 0 80px;
  }
}

.right {
  width: 30vw;
  height: 92vh;
  background-color: rgba(6, 29, 43, .9);
  position: fixed;
  right: 0;
  top: 8vh;
  z-index: 500;
  color: #ffffff;
  box-sizing: border-box;
  padding: 10px 16px;

  .charts {
    display: flex;
    width: 100%;
    align-items: flex-end;
    box-sizing: border-box;
  }

  .select {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .safe {
    margin-bottom: 4px;
  }
}
</style>