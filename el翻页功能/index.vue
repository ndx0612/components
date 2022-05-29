<template>
  <div>
    <!-- 分页功能 -->
    <div class="flex items-center">
      <span>选择每一页数量：</span>
      <el-pagination :page-sizes="[10, 15, 20]" v-model:currentPage="data.currentPage" v-model:page-size="data.pageSize" layout="sizes, prev, pager, next" :total="data.total" @size-change="methods.handleSizeChange" @current-change="methods.handleCurrentChange" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
const data = reactive({
  pageSize: 20, // 每页数量
  currentPage: 1, // 当前页码
  total: 200, // 总数
});

const methods = reactive({
  handleSizeChange(value) {
    console.log("每一页数量", value);
  },
  handleCurrentChange(value) {
    console.log("当前页码", value);
  },
});
</script>
