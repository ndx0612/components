<template>
  <!-- 自适应高度 -->
  <!-- 1、父级设置高度100% -->
  <!-- 2、calc计算其它元素高度 -->
  <div class="h-[100%] p-[20px]">
    <div class="h-[100px] bg-[#ddd]"></div>
    <div class="box">
      <div class="h-[50px] w-[100%] text">课程信息</div>
      <div class="item">
        <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<style lang='scss'>
.text {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: #eee;
}

.box {
  width: 500px;
  border: solid 2px #f00;
  height: calc(100% - 100px);
  .item {
    overflow-y: auto;
    height: calc(100% - 50px);
    &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: rgba(0, 0, 0, 0.2);
      }
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 5px;
    }
    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
    }
  }
}
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>