<template>
  <div>
    <div class="w-full bg-[#FFF] mt-[20px] tool_box">
      <el-input v-model="aa" class="w-[200px]"></el-input>
      <el-input v-model="aa" class="w-[200px]"></el-input>
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
const aa = ref("");
</script>

<style lang='scss' scoped>
.tool_box {
  > :deep(*) {
    margin: 8px;
  }
}
</style>
