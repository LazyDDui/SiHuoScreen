<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useResize } from '../../composables/commonUseFn/useResize'

let myChart:EChartsType

let c

type BatteryProps = {
  map:any;
  title:string;
}

const battery = ref<HTMLDivElement>(null)
const props = defineProps<BatteryProps>()

const resize = useResize

const payload = {
  id: '',
  data: {
    title: [props.title],
    unit: ['次'],
    x: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    data1: [20, 80, 100, 40, 34, 90, 60, 20, 80, 100, 40, 34],
  },
};


watch(()=>props.map,(value)=>{

},{})




const initEChart = () => {
  const unit = payload.data.unit || [];
  const x = payload.data.x || [];
  const data1 = payload.data.data1 || [];
  const title = payload.data.title || [];

  const option = {
    backgroundColor: 'transparent',
    grid: {
      top: 35,
      left: 15,
      right: 15,
      bottom: 10,
      // 是否包含文本
      containLabel: true,
    },
    tooltip: {
      // 触发类型  经过轴触发axis  经过轴触发item
      trigger: 'axis',
      backgroundColor: 'rgba(9, 30, 60, 0.6)',
      extraCssText: 'box-shadow: 0 0 8px rgba(0, 128, 255, 0.27) inset;',
      borderWidth: 0,
      confine: false,
      appendToBody: true,
      textStyle: {
        color: '#fff',
        fontSize: 10,
      },
      // 轴触发提示才有效
      axisPointer: {
        type: 'shadow',
      },
      shadowStyle: {
        color: 'rgba(157, 168, 245, 0.1)',
      },

      formatter: (data) => {
        let tip = '<h5 class="echarts-tip-h5">' + data[0].name + '</h5>';
        data.forEach((item) => {
          const unit = '';
          if (item.seriesType === 'bar') {
            tip += '<div class="echarts-tip-div">';
            tip += '<div class="left">' + item.marker + item.seriesName + '：</div>';
            tip += '<div class="right">' + item.value + unit + '</div>';
            tip += '</div>';
          }
        });
        return tip;
      },
    },
    xAxis: {
      data: x,
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#4176a3',
          width: '0.5', //坐标线的宽度
        },
      },
      axisLabel: {
        textStyle: {
          color: '#fff', //底部文字颜色
          fontSize: 12,
        },
      },
    },
    yAxis: [
      {
        name: '单位: ' + unit[0],
        nameTextStyle: {
          align: 'left',
          fontSize: 11,
          color: '#4176a3',
        },
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgba(65, 118, 163, 0.3)',
            width: 1,
            type: 'solid',
          },
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'transparent', //左边框颜色
          },
        },
        axisLabel: {
          show: true,
          fontSize: 12,
          textStyle: {
            color: '#ADD6FF', //左文字颜色
          },
        },
      },
    ],
    series: [
      {
        name: title[0],
        type: 'bar',
        barWidth: 30,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(21,136,209,0.1)',
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(21,136,209,1)', //渐变1
            },
            {
              offset: 1,
              color: 'rgba(21,136,209,1)', //渐变2
            },
          ]),
        },
        data: data1,
        z: 0,
        zlevel: 0,
      },
      {
        type: 'pictorialBar',
        barWidth: 30,
        itemStyle: {
          color: 'rgba(0,63,119,1)', //数据的间隔颜色
        },
        symbolRepeat: 'fixed',
        symbolMargin: 3,
        symbol: 'rect',
        symbolSize: [30, 4],
        symbolPosition: 'end',
        symbolOffset: [0, 0],
        data: data1,
        z: 1,
        zlevel: 0,
      },
      {
        type: 'pictorialBar',
        barWidth: 30,
        itemStyle: {
          color: 'transparent', //数据的间隔颜色
        },
        // symbolRepeat: 'fixed',
        symbolMargin: 3,
        symbol: 'rect',
        symbolSize: [30, 4],
        // symbolPosition: 'start',
        // symbolOffset: [0, 0],
        data: data1,
        z: 1,
        zlevel: 0,
        label: {
          show: true,
          position: 'top',
          fontSize: 14,
          color: '#fff', //柱状顶部文字颜色
          formatter: function (params) {
            return params.data + unit[0];
          },
        },
      },
    ],
  };


  myChart = echarts.init(battery.value)
  myChart.setOption(option)
  c = resize({chart:myChart})
  c.aR()
}

onMounted(()=>{
  payload.data.x = Object.keys(props.map)
  payload.data.data1 = Object.values(props.map)
  initEChart()
})

onBeforeUnmount(()=>{
  myChart?.dispose()
  c?.dR()
})


</script>

<template>
  <div id="battery" ref="battery"></div>
</template>

<style scoped lang="less">
#battery {
  width: 100%;
  height: 25vw;
}
</style>