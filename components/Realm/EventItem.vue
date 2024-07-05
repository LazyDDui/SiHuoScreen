<script setup lang="ts">
import { SafeType } from '../../composables/interface'

type EventItemProps = {
  isHandle: SafeType;
  title: string;
  desc: string;
}


const props = defineProps<EventItemProps>()
const error = props.isHandle === SafeType.error

const bg = `url('/lpg/street/${error ? 'redCircle.png' : 'blueCircle.png'}') no-repeat`

const theme = error ? '#f94748' : 'rgb(0, 168, 224)'

</script>

<template>
  <div class="eventItem f-b">
    <div class="sub">
      <div class="title g-w">{{ title }}</div>
      <div class="desc">{{ desc }}</div>
    </div>
    <div class="status">
      {{ isHandle == SafeType.error ? '平凡' : '已飞升' }}
    </div>
  </div>
</template>

<style scoped lang="less">
.eventItem {
  margin-top: 4px;
  padding: 4px 10px;
  box-sizing: border-box;
  background-color: rgba(21, 69, 122, 0.7);
  border: rgb(10, 34, 61) 1px solid;
  display: flex;
  border-radius: 5px;

  .sub {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 18px;

    .title {
      font-size: 20px;
    }

    .desc {
      color: v-bind(theme);
      margin-top: 4px;
      white-space: nowrap;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
  }

  .status {
    font-size: 12px;
    color: v-bind(theme);
    transform: rotate(30deg);
    border: 1px solid v-bind(theme);;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background: v-bind(bg);
    background-size: 50px;
    background-position: 5px 5px;
  }
}
</style>