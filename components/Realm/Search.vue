<script setup lang="ts">
import { ref } from 'vue'


const emit = defineEmits(['change','search'])
const value = ref("")
const select = ref<HTMLSelectElement>(null)



</script>

<template>
    <div class="btd-search">
      <div class="searchIcon">
        <img alt="search" src="/lpg/street/search.png">
      </div>
      <div class="input">
        <el-select
          ref="select"
          v-model="value"
          size="small"
          filterable
          style="width: 100%;color: #ffffff"
          @change="emit(`change`,$event)"
        >
<!--          <el-option-->
<!--            v-for="item in alarmDict"-->
<!--            :key="item"-->
<!--            :label="item.dictLabel"-->
<!--            :value="item.dictValue"-->
<!--          />-->
        </el-select>
<!--        <input @focus="select.click()" class="input-c" type="text" placeholder="请输入事件名称"/>-->
      </div>
      <div class="btn" @click="emit('search')">
        战力查询榜
      </div>
    </div>
</template>

<style lang="less">
.btd-search {
  display: flex;
  .searchIcon {
    background: url("/lpg/street/search_line.png") no-repeat;
    width: 29.4px;
    height: 29.4px;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
    img {
      width: 20px;
      height: 20px;
    }
  }

  .input {
    position: relative;
    background: url("/lpg/street/longSearch.png") no-repeat;
    width: 421.4px;
    height: 29.4px;
    background-size: 100%;
    display: flex;
    align-items: center;
    .input-c {
      position: absolute;
      z-index: 100;
      width: 90%;
      height: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      box-sizing: border-box;
      padding: 0 10px;
      caret-color: rgba(113, 219, 246, 0.8);
      color: rgba(113, 219, 246, 1);
      font-size: 14px;
    }
  }
  .btn {
    height: 32px;
    width: 101.2px;
    background: url("/lpg/street/seachBg.png") no-repeat;
    background-size: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    padding-bottom: 4px;
    box-sizing: border-box;
    cursor: pointer;
    transition:1s;
    &:hover {
      box-shadow: 0 0 10px 5px rgba(113, 219, 246, 0.8);
    }
  }
}

.el-select {
  background-color: transparent;
  width: 100%;
  span {
    display: none !important;
  }
  .select-trigger {
    background-color: transparent !important;
  }
}
.el-select .el-input{
  background-color: transparent !important;
}
.el-input__wrapper {
  background-color: transparent;
  border: none !important;
  box-shadow: none !important;
}
.el-input__inner {
  color:#ffffff;
}
</style>