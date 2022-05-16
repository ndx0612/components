<template>
  <div>
    <div class="choose-person m-[30px]">
      <span class="choose-text">添加维护人：</span>
      <el-select v-model="data.region" placeholder="添加维护人" @close="ManageData.handleClose(index)" closable>
        <el-option v-for="item in data.computedTeacherList" :key="item.id" :label="item.name" :value="item.id" :disabled="data.maintainerList.some((v) => v.id == item.id)" />
      </el-select>
      <el-button type="primary" class="ml-[8px]" @click="methods.addRegion">添加</el-button>
    </div>
    <div class="flex">
      <div class="w-[110px]"></div>
      <el-tag v-for="(tag,index) in data.maintainerList" :key="index" closable @close="methods.delRegion(index)">{{ tag.name }}</el-tag>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, onMounted, defineComponent } from "vue";
const data = reactive({
  region: "", // 当前选中的维护人
  maintainerList: [
    {
      id: 1004,
      name: "李六",
    },
  ], // 已经添加的维护人列表
  computedTeacherList: [
    {
      id: 1001,
      name: "张三",
    },
    {
      id: 1002,
      name: "李四",
    },
    {
      id: 1003,
      name: "王五",
    },
    {
      id: 1004,
      name: "李六",
    },
  ], // 下拉全部列表
});

const methods = reactive({
  // 添加维护人
  addRegion() {
    console.log(data.region);
    if (data.region) {
      data.computedTeacherList.forEach((item) => {
        if (item.id == data.region) {
          data.maintainerList.push(item);
          data.region = "";
        }
      });
    }
  },
  // 删除维护人
  delRegion(value) {
    data.maintainerList.splice(value, 1);
  },
});
</script>
<style lang='scss'>
.choose-person {
  display: flex;
  align-items: center;
  .choose-text {
    width: 110px;
  }
}
</style>