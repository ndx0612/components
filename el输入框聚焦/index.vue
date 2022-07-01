<template>
  <div class="w-[300px] m-[20px]">
    <el-input ref="ref_inputRemark" v-show="showInput" v-model="inputText" placeholder="Please input" @blur="editRemark" />
    <span v-if="!showInput" @click="editOpen">{{inputText}}</span>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, nextTick } from "vue";
const { proxy } = getCurrentInstance();

const inputText = ref("点击编辑"); // 输入框内容
const showInput = ref(false); // 输入框编辑打开状态

/**
 * 点击文字，进入编辑状态
 */
const editOpen = () => {
  console.log(inputText.value);
  showInput.value = true;
  const dom = "ref_inputRemark";
  console.log(proxy.$refs[dom]);
  nextTick(() => {
    proxy.$refs[dom].focus();
  });
};

/**
 * 失去焦点退出编辑状态
 */
const editRemark = () => {
  showInput.value = false;
};
</script>
