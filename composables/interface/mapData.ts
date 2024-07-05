import { DictType } from './dict'
import { Map } from 'vue3-openlayers'

export const usr:DictType[] = [
  {
    dictValue:"0",
    dictLabel:"练气"
  },
  {
    dictValue:"1",
    dictLabel: "凝神"
  },
  {
    dictValue:"2",
    dictLabel: "筑基"
  },
  {
    dictValue:"3",
    dictLabel: "结丹"
  },
  {
    dictValue:"4",
    dictLabel: "元婴"
  },
  {
    dictValue:"5",
    dictLabel: "分神"
  },
  {
    dictValue:"6",
    dictLabel: "大乘"
  },
  {
    dictValue:"7",
    dictLabel: "渡劫"
  }
]

export const event:DictType[] = [
  {
    dictValue:"0",
    dictLabel:"需努力"
  },
  {
    dictValue:"1",
    dictLabel: "已成仙"
  }
]

export type DialogListProps = {
  label:string;
  keys:string
}

export const CarDialogList:DialogListProps[] = [
  {
    label:"序号",
    keys:""
  },
  {
    label:"车牌号",
    keys:""
  },
  {
    label:"车辆颜色",
    keys:""
  },
  {
    label:"车辆类型",
    keys:""
  },
  {
    label:"载重量",
    keys:""
  },
]