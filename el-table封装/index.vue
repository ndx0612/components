<template>
  <div class="w-full h-full p-[20px]">
    <GlobalTable resUrl="https://mockapi.eolink.com/RWG4jKY7a8d3c66906979840d6feb92494bd48bd8452ec4/sysDictType/page" :parameter="form" ref="dictFormRef">
      <template #header>
        <el-button @click="search">搜索</el-button>
        <el-input v-model="form.dictName" placeholder="字典名称" class="ml-[8px] w-[200px]"/>
      </template>
      <template #table>
        <el-table-column prop="dictId" label="字典编号" width="100" align="center" />
        <el-table-column prop="dictName" label="字典名称" align="center" />
        <el-table-column prop="dictType" label="字典类型" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center" />
      </template>
    </GlobalTable>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
const { proxy } = getCurrentInstance();

// 绑定字典表单ref
const dictFormRef = ref();

const search = () => {
  dictFormRef.value.getTable();
};

// 查询表单
const form = reactive({
  dictName: "", // 字典名称
  status: "", // 状态
});
</script>

<style lang='scss' scoped>
</style>
