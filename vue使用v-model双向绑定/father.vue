<template>
  <div>
    <processSubmit v-model:modelValue="text1"></processSubmit>
    <el-button @click="aa">按钮</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});

const text1 = ref("");

const aa = () => {
  console.log(text1.value);
};
</script>

<style lang='scss' scoped>
</style>
