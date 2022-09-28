<template>
  <div>
    <processSubmit v-model:msg="str"></processSubmit>
    <h1>父组件的值：{{ str }}</h1>
    <el-button @click="aa">父组件打印值</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});

const str = ref("test11");

const aa = () => {
  console.log(str.value);
};
</script>

<style lang='scss' scoped>
</style>
