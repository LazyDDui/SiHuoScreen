<script setup lang="ts">
import * as echarts from 'echarts'
import type { EChartsType } from 'echarts'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useResize } from '../../composables/commonUseFn/useResize'

let myChart:EChartsType

let c

const foldLine = ref<HTMLDivElement>(null)

const resize = useResize

const bgColor = "#fff";
const color = [
  "#0090FF",
  "#36CE9E",
  "#FFC005",
  "#FF515A",
  "#8B5CFF",
  "#00CA69"
];
const echartData = [{
  name: "2020-10",
  value1: 21
},
  {
    name: "2020-11",
    value1: 27
  },
  {
    name: "2020-12",
    value1: 25
  },
  {
    name: "2021-01",
    value1: 21
  },
  {
    name: "2021-02",
    value1: 29
  },
  {
    name: "2021-03",
    value1: 18
  },
  {
    name: "2021-04",
    value1: 25
  },
  {
    name: "2021-05",
    value1: 27
  }
];

const xAxisData = echartData.map(v => v.name);
const yAxisData2 = echartData.map(v => v.value1);
const hexToRgba = (hex, opacity) => {
  let rgbaColor = "";
  const reg = /^#[\da-f]{6}$/i;
  if (reg.test(hex)) {
    rgbaColor = `rgba(${parseInt("0x" + hex.slice(1, 3))},${parseInt(
      "0x" + hex.slice(3, 5)
    )},${parseInt("0x" + hex.slice(5, 7))},${opacity})`;
  }
  return rgbaColor;
}

const option = {
  backgroundColor: 'rgba(0,0,0,0)',
  color: '#36CE9E',
  legend: {
    right: 10,
    top: 10,
    show:false
  },
  tooltip: {
    trigger: "axis",
    formatter: function(params) {
      let html = '';
      params.forEach(v => {
        html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${color[v.componentIndex]};"></span>
                ${v.name}达标
                <span style="color:${color[v.componentIndex]};font-weight:700;font-size: 18px">${v.value}</span>
                天`;
      })
      return html
    },
    extraCssText: 'background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;',
    axisPointer: {
      type: 'shadow',
      shadowStyle: {
        color: '#ffffff',
        shadowColor: 'rgba(225,225,225,1)',
        shadowBlur: 5
      }
    }
  },
  grid: {
    top: 100,
    containLabel: true
  },
  xAxis: [{
    type: "category",
    boundaryGap: false,
    axisLabel: {
      formatter: '{value}',
      textStyle: {
        color: "#333"
      }
    },
    axisLine: {
      lineStyle: {
        color: "#D9D9D9"
      }
    },
    data: xAxisData
  }],
  yAxis: [{
    type: "value",
    name: '天',
    axisLabel: {
      textStyle: {
        color: "#666"
      }
    },
    nameTextStyle: {
      color: "#666",
      fontSize: 12,
      lineHeight: 40
    },
    splitLine: {
      lineStyle: {
        type: "dashed",
        color: "#E9E9E9"
      }
    },
    axisLine: {
      show: false
    },
    axisTick: {
      show: false
    }
  }],
  series: [
    {
      name: "达标天数",
      type: "line",
      smooth: true,
      // showSymbol: false,
      symbolSize: 8,
      zlevel: 3,
      lineStyle: {
        normal: {
          color: '#36CE9E',
          shadowBlur: 3,
          shadowColor: hexToRgba('#36CE9E', 0.5),
          shadowOffsetY: 8
        }
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [{
              offset: 0,
              color: hexToRgba('#36CE9E', 0.3)
            },
              {
                offset: 1,
                color: hexToRgba('#36CE9E', 0.1)
              }
            ],
            false
          ),
          shadowColor: hexToRgba('#36CE9E', 0.1),
          shadowBlur: 10
        }
      },
      data: yAxisData2
    }]
};

const initEChart = () => {
  myChart = echarts.init(foldLine.value)
  myChart.setOption(option)
  c = resize({chart:myChart})
  c.aR()
}

onMounted(()=>{
  initEChart()
})

onBeforeUnmount(()=>{
  myChart?.dispose()
  c?.dR()
})
</script>

<template>
  <div id="foldLine" ref="foldLine"></div>
</template>

<style scoped lang="less">
#foldLine {
  width: 100%;
  height: 25vw;
}
</style>