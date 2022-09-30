// 子组件
<template>
  <div class="w-[300px] border-[2px] m-[10px] p-[10px] h-[180px]">
    <el-button @click="$emit('close',1)">关闭</el-button>
    <el-button @click="$emit('close',2)">关闭</el-button>
    <el-button @click="confirmSelect">关闭</el-button>
  </div>
</template>

<script setup>
defineOptions({ name: "drawer-info" });

// 这里可以执行一些默认事件
const emit = defineEmits(["close"]);
const confirmSelect = () => {
  emit("close", 3);
};
</script>

// 父组件
<template>
  <div>
    <drawer-info @close="aa"></drawer-info>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
onMounted(() => {});
const aa = (value) => {
  console.log("关闭弹窗", value);
};
</script>