import { defineStore } from 'pinia'
import { ref } from 'vue'

export type StationType = {
  name: string;
  active: boolean;
  id: string;
}

export type PointsType = {
  id: string;
  lat: number;
  lng: number;
  name: string;
  style?: number;
  type?: string;
}

export type Delivery = {
  id: string;
  plateNo: string;
  active: boolean;
  lat: number;
  lng: number;
  name: string;
  plateColor: string;
}

export type Usr = {
  id: string;
  active: boolean;
  count: number;
  desc: string;
}

export type MoveMarker = {
  name: string;
  marker: any;
  id: string;
  lat: number;
  lng: number;
}

export const combineData = (delivery: Delivery[], moveMarker: MoveMarker[]): MoveMarker[] => {
  // 创建一个空数组用于存放结果
  const combinedData: MoveMarker[] = []

  // 遍历delivery数组
  delivery.forEach(deliveryItem => {
    // 在moveMarker数组中查找与当前deliveryItem.id匹配的项
    const match = moveMarker.find(moveMarkerItem => moveMarkerItem.id === deliveryItem.id)

    // 如果找到了匹配项，则组合数据并推入结果数组
    if (match) {
      combinedData.push({
        name: match.name,
        marker: match.marker,
        lat: deliveryItem.lat,
        lng: deliveryItem.lng,
        id: deliveryItem.id
      })
    }
  })

  return combinedData
}


export const useGlobal = defineStore('global', () => {
  const stationCheck = ref<boolean>(false)

  const deliveryCheck = ref<boolean>(false)

  const delivery = ref<Delivery[]>([])

  const usrCheck = ref(false)


  const getSelected = (data: StationType[] | Delivery[] | Usr[]): string[] => {
    //@ts-ignore
    return data.reduce((accumulator, currentItem) => {
      if (currentItem.active) {
        accumulator.push(currentItem.id)
      }
      return accumulator
    }, [])
  }


  const changeGlobal = (name: string, active: boolean, model: StationType[] | Delivery[] | Usr[]) => {
    model.forEach((item) => {
      if (item.name === name) {
        item.active = active
      }
    })
  }

  const checkAllStations = (active: boolean) => {
    stationCheck.value = active
  }

  const checkAllDelivery = (active: boolean) => {
    deliveryCheck.value = active
    delivery.value.forEach((item) => {
      if (item.lat && item.lng) {
        item.active = active
      }
    })
  }

  const checkAllUsr = (active: boolean) => {
    usrCheck.value = active
  }

  const clearAll = () => {
    checkAllStations(false)
    checkAllDelivery(false)
    checkAllUsr(false)
  }

  return {
    stationCheck,
    deliveryCheck,
    usrCheck,
    delivery,
    changeGlobal,
    checkAllStations,
    checkAllDelivery,
    checkAllUsr,
    getSelected,
    clearAll
  }
})
