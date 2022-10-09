// 子组件
<template>
  <div class="w-[300px] border-[2px] m-[10px] p-[10px]">
    <h1>normalizedSize的值：{{ normalizedSize }}</h1>
    <h1>子组件的值：{{ props.msg }}</h1>
  </div>
</template>

<script setup>
// 3、父传子（单向数据流）
// 注释：在组件内无法修改父组件的值，仅仅接收参数用来展示
import { ref, defineProps, defineEmits, computed } from "vue";
defineOptions({ name: "my-component" });
const props = defineProps({
  msg: {
    typeof: [String, Number],
    default: "",
  },
});

// 子组件接收值，数据需要经过复杂运算computed，简单运算直接使用props.msg
const normalizedSize = computed(() => {
  if (props.msg < 4) {
    return "小于4";
  } else {
    return "ZY_" + props.msg;
  }
});
</script>

// 父组件
<template>
  <div>
    <my-component :msg="str"></my-component>
    <h1>父组件的值：{{ str }}</h1>
    <el-button @click="aa">父组件按钮</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});
const str = ref(0);

const aa = () => {
  str.value++;
};
</script>
