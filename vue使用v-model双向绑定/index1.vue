// 子组件：写法一
<template>
  <div class="w-[300px] border-[2px] m-[10px] p-[10px] h-[180px]">
    <input :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </div>
</template>

<script setup>
defineOptions({ name: "drawer-info" });
defineProps(["modelValue"]);
defineEmits(["update:modelValue"]);
</script>

// 子组件：写法二
<template>
  <div class="w-[300px] border-[2px] m-[10px] p-[10px] h-[180px]">
    <input v-model="value" />
  </div>
</template>

<script setup>
import { computed } from "vue";
defineOptions({ name: "drawer-info" });

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
</script>

// 父组件
<drawer-info v-model="searchText"></drawer-info>