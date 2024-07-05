import { NumericObject } from '../interface'

export const format = (timestamp: number, format = 'yyyy-MM-dd HH-mm-ss') => {
  const date = new Date(timestamp)
  const year = date.getFullYear() as any
  const month = ('0' + (date.getMonth() + 1)).slice(-2) // 月份是从0开始的，所以需要+1
  const day = ('0' + date.getDate()).slice(-2)
  const hours = ('0' + date.getHours()).slice(-2)
  const minutes = ('0' + date.getMinutes()).slice(-2)
  const seconds = ('0' + date.getSeconds()).slice(-2)

  return format
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

export const toWeekday = (timestamp: number) => {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const date = new Date(timestamp)
  const weekday = date.getDay() // getDay() 返回的是 0（周日）到 6（周六）的数字
  return days[weekday]
}

export const today = new Date().getTime()

export const getMonthTimestamps = () => {
  const now = new Date()
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const nextMonthFirstDay = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  // @ts-ignore
  const lastDayOfMonth = new Date(nextMonthFirstDay - 1) // 减1毫秒即为上个月的最后一天

  return {
    start: firstDayOfMonth.getTime(),
    end: lastDayOfMonth.getTime()
  }
}

export const getWeekTimestamps = () => {
  const now = new Date()
  const dayOfWeek = now.getDay() // 周日是0，周一是1，...，周六是6
  const firstDayOfWeek = new Date(now)
  firstDayOfWeek.setDate(now.getDate() - dayOfWeek + 1) // 调整日期到本周一
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6) // 本周日

  return {
    start: firstDayOfWeek.getTime(),
    end: lastDayOfWeek.getTime()
  }
}


export const deepCopy = <T>(obj: T, hash: WeakMap<object, any> = new WeakMap()): T => {
  // 对于原始类型，直接返回
  if (obj == null || typeof obj !== 'object') {
    return obj
  }

  // 如果对象已经被拷贝过，则直接返回之前的拷贝
  if (hash.has(obj)) {
    return hash.get(obj) as T
  }

  // 针对不同类型进行特殊处理
  let copy: any

  if (Array.isArray(obj)) {
    copy = [] as any[]
    obj.forEach((item, index) => {
      copy[index] = deepCopy(item, hash)
    })
  } else if (obj instanceof Date) {
    copy = new Date(obj.getTime()) as any
  } else if (obj instanceof RegExp) {
    copy = new RegExp(obj.source, obj.flags) as any
  } else {
    // 对于普通对象
    copy = {} as T
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        (copy as any)[key] = deepCopy((obj as any)[key], hash)
      }
    }
  }

  // 将拷贝的对象存入 hash，以便处理循环引用
  hash.set(obj, copy)

  return copy
}


export const mergeAndSumObjects = (obj1: NumericObject, obj2: NumericObject): NumericObject => {
  const result: NumericObject = {}

  // 遍历第一个对象，将所有键值对添加到结果对象中
  for (const key in obj1) {
    result[key] = (result[key] || 0) + obj1[key]
  }

  // 遍历第二个对象，对于存在的键进行值的累加，对于新键则直接添加
  for (const key in obj2) {
    result[key] = (result[key] || 0) + obj2[key]
  }

  return result
}

const data1 = [
  {
    maker: 'marker',
    lat: 101,
    lng: 56,
    id: 12
  },
  {
    maker: 'lllll',
    lat: 103,
    lng: 50,
    id: 1
  }
]


export const isEmpty = (value:Record<string,any>) => {
  return JSON.stringify(value) === '{}';
}


export const sum = (arr:number[]) => {
  return arr.reduce((total, value)=> {
    return total + value;
  }, 0);
}

