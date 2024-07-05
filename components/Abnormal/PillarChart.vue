<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'
import { useResize } from '../../composables/commonUseFn/useResize'

let myChart: EChartsType

let c

type PillarChartProps = {
  map: any;
}

const pillar = ref<HTMLDivElement>(null)

const props = defineProps<PillarChartProps>()

const resize = useResize


const option = {
  backgroundColor: 'transparent',
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,.6)',
    borderColor: 'rgba(147, 235, 248, 0)',
    textStyle: {
      color: '#FFF'
    }
    // axisPointer: {
    // 	type: "shadow",
    // 	label: {
    // 		show: true,
    // 	},
    // },
  },
  grid: {
    left: '10%',
    top: '18%',
    right: '5%',
    bottom: '25%'
  },
  legend: {
    top: '4%',
    left: '75%',
    'itemWidth': 13,
    'itemHeight': 13,
    itemStyle: {
      color: '#18A4FF'
    },
    'icon': 'rect',
    'padding': 0,
    textStyle: {
      'color': '#c0c3cd',
      fontSize: 13,
      'padding': [2, 0, 0, 0]
    }
  },
  xAxis: {
    data: Object.keys(props.map),

    axisLine: {
      show: true, //隐藏X轴轴线
      lineStyle: {
        color: '#163a5f',
        width: 2
      }
    },
    axisTick: {
      show: false, //隐藏X轴刻度
      alignWithLabel: true
    },
    axisLabel: {
      show: true,
      textStyle: {
        color: '#BDD8FB', //X轴文字颜色
        fontSize: 12
      },
      interval: 0,
      formatter: function(value) {
        let ret = '' //拼接加\n返回的类目项
        const maxLength = 4 //每项显示文字个数
        const valLength = value.length  //X轴类目项的文字个数
        const rowN = Math.ceil(valLength / maxLength) //类目项需要换行的行数
        if (rowN > 1) {
          //如果类目项的文字大于5,
          for (let i = 0; i < rowN; i++) {
            let temp = '' //每次截取的字符串
            const start = i * maxLength  //开始截取的位置
            const end = start + maxLength  //结束截取的位置
            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
            temp = value.substring(start, end) + '\n'
            ret += temp //凭借最终的字符串
          }
          return ret
        } else {
          return value
        }
      }
    }
  },
  yAxis: [
    {
      type: 'value',
      // name: "单位：ml",
      nameTextStyle: {
        color: '#BDD8FB',
        fontSize: 12
      },

      splitLine: {
        show: false,
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          type: 'dashed' // dotted 虚线
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: '#163a5f',
          width: 1
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: '#BDD8FB',
          fontSize: 12
        }
      }
    },
    {
      type: 'value',
      name: '',
      nameTextStyle: {
        color: '#BDD8FB',
        fontSize: 12
      },
      splitLine: {
        show: false,
        lineStyle: {
          width: 1,
          color: '#CED2DB'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false, //隐藏X轴轴线
        lineStyle: {
          color: '#163a5f',
          width: 2
        }
      },
      axisLabel: {
        show: false,
        textStyle: {
          color: '#797A7F',
          fontSize: 12
        }
      }
    }
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barWidth: 15,
      itemStyle: {

        color: {
          type: 'linear',
          x: 0,  //右
          y: 0,  //下
          x2: 0,  //左
          y2: 1,  //上
          colorStops: [
            {
              offset: 0.1,
              color: '#13D5FC' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#2059B8' // 100% 处的颜色
            }
          ]
        },
        barBorderRadius: [20, 20, 0, 0]
      },
      label: {
        show: true,
        position: 'top',
        distance: 0,
        color: '#1ACDDC',
        formatter: '{c}'
      },
      data: Object.values(props.map)
    },
    {
      // name: '背景',
      type: 'bar',
      barWidth: '15px',
      xAxisIndex: 0,
      yAxisIndex: 1,
      barGap: '-100%',
      data: Object.keys(props.map).map(() => 100), //背景阴影长度
      itemStyle: {
        normal: {
          color: 'rgba(255,255,255,0.03)',
          barBorderRadius: [0, 0, 0, 0]
        }
      },
      tooltip: {
        show: false
      },
      zlevel: 9
    }
  ]
}

const initEChart = () => {
  myChart = echarts.init(pillar.value)
  myChart.setOption(option)
  c = resize({ chart: myChart })
  c.aR()
}

onMounted(() => {
  initEChart()
})

onBeforeUnmount(() => {
  myChart?.dispose()
  c?.dR()
})

</script>

<template>
  <div id="pillar" ref="pillar"></div>
</template>

<style scoped lang="less">
#pillar {
  width: 100%;
  height: 25vw;
}
</style>