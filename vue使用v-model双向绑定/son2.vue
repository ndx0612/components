<template>
  <div class="w-[300px] border-[2px] m-[10px] p-[10px]">
    <h1>子组件的值：{{ value }}</h1>
    <el-input v-model="value" placeholder="" />
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from "vue";
defineOptions({ name: "process-submit" });
const props = defineProps(["msg"]);
const emit = defineEmits(["update:msg"]);

// 封装详情见vue官网:https://cn.vuejs.org/guide/components/events.html#usage-with-v-model
const value = computed({
  get() {
    return props.msg;
  },
  set(value) {
    emit("update:msg", value);
  },
});

</script>

<style lang='scss' scoped>
</style>
