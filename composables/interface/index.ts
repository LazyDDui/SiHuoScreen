
export enum AbnormalType {
  BLUE,
  GREEN,
  YELLOW
}

export enum SelectSize {
  large,
  medium,
  small,
}

export enum SafeType {
  error,
  info
}

export interface WeatherType {
  humidity: string;
  info: string;
  temperature: number;
  weather: string;
  windDirection: string;
  windPower: string
}

export enum BtdSelectType {
  usr = '用户类型',
  event = '事件状态',
  soical = '所属社区'
}

export type AlarmSearchType = {
  current: number;
  size: number;
  alarmType?: string;
  startDate: number | string;
  endDate: number | string;
  customType?: string;
  isHandle: boolean
}

export type AlarmSearchEntry = {
  desc: string;
  time: string;
  type: string;
  isHandle: boolean;
}

export type AbnormalEntry = {
  alarmCount: number;
  breakCount: number;
  alarmByAlarmType: any;
  breakByAlarmType: any;
}

export type AlarmType = {
  startDate: string;
  endDate: string;
}

export type BottleCountResponse = {
  aCount: number;
  bCount: number;
  cCount: number;
  dCount: number;
}

export type CustomInfoRes = {
  personCount: number;
  xManCount: number;
}

export type DeliveryRes = {
  carOnLine: number;
  carTotal: number;
  deliverOnLine: number;
  deliverTotal: number;
}

export enum Global {
  station,
  dlivery,
  usr
}

export type NumericObject = {
  [key: string]: number
};

export type SafeOptionType = {
  sort: string;
  name: string;
}

export type AlarmMetaDataType = {
  key: string;
  lifeStyle: {
    name: string;
    sort: number;
  };
  name: string;
}

export type PageType = {
  current:number;
  size:number;
}

export type AlarmPageType = {
  alarmType:string
} & PageType


export type Lifestyle = {
  name: string;
  sort: number;
};


export type InfoItem = {
  type: string;
  count: number;
  name: string;
};

export type GroupItem = {
  name: string;
  sort: number;
  info: InfoItem[];
  total: number;
};

