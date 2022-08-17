<!-- npm i vue3-mindmap -->
<template>
  <div>
    <mindmap class="h-[500px]" v-model="data" :edit="true" :drag="true" :zoom="true" :add-node-btn="true" :ctm="true"></mindmap>
    <el-button @click="aa">按钮</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import mindmap from "vue3-mindmap";
import "vue3-mindmap/dist/style.css";

let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});

const data = ref([
  {
    name: "如何学习D3",
    children: [
      {
        name: "预备知识",
        children: [{ name: "HTML & CSS" }, { name: "JavaScript" }],
      },
      {
        name: "安装",
        children: [{ name: "ES6" }],
      },
    ],
  },
]);

const aa = () => {
  console.log(data.value);
};
</script>

<style lang='scss' scoped>
</style>
