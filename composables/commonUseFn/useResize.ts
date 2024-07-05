import type { EChartsType } from 'echarts'

interface ChartResize {
  chart: EChartsType;
}

export const useResize = ({chart}:ChartResize) => {

  const resize = () => {
    chart.resize();
  }

  const aR = () => {
    window.addEventListener("resize",resize)
  }

  const dR = () => {
    window.removeEventListener("resize",resize)
  }



  return {
    aR,
    dR
  }
}