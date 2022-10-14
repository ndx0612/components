<template>
  <div>
    <div>
      <fc-designer ref="designer" height='600px' />
    </div>
    <div>
      <el-button @click="printJSON">打印JSON</el-button>
      <el-button @click="dataSho">数据回显</el-button>
    </div>
    <div>
      <!-- 生成表单 -->
      <form-create v-model="data.fapi" :rule="data.rule" :option="data.option" @submit="onSubmit"></form-create>
    </div>
  </div>
</template>

<script setup>
// 自定义表单设计http://designer.form-create.com/guide/start_v3.html#%E5%BC%95%E5%85%A5
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
onMounted(() => {});

const designer = ref();

const data = reactive({
  rule: [],
  option: {},
  fapi: null,
});

/**
 * @description: 打印表单(保存)
 */
function printJSON() {
  console.log(designer.value.getRule());
  console.log(designer.value.getOption());
  data.rule = designer.value.getRule();
  data.option = designer.value.getOption();
}

/**
 * @description: 自定义表单回显
 */
function dataSho() {
  designer.value.setRule(data.rule);
  designer.value.setOption(data.option);
}

/**
 * @description: 自定义表单回显
 */
function onSubmit() {}
</script>

<style lang='scss' scoped>
</style>