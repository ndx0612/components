<template>
  <div class="w-[300px]">
    <input :value="modelValue" placeholder="Please input" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
defineOptions({ name: "process-submit" });

let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;

const props = defineProps([
  "modelValue", // 接收父组件使用 v-model 传进来的值，必须用 modelValue 这个名字来接收
]);

onMounted(() => {});
</script>

<style lang='scss' scoped>
</style>
