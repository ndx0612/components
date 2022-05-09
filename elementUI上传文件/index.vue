<template>
  <div>
    <!-- drag：拖动上传 -->
    <!-- multiple：多文件上传 -->
    <!-- action：上传url(必填) -->
    <!-- http-request：覆盖默认上传行为 -->
    <!-- file-list：上传文件列表 -->
    <!-- :on-change：上传文件时候触发 -->
    <!-- :on-remove：点击删除触发 -->
    <!-- :on-preview：点击文件触发 -->
    <el-upload class="upload-demo" drag multiple action="" :http-request="()=>{}" :file-list="data.fileList" :on-change="methods.handleChange" :on-remove="methods.handleRemove" :on-preview="methods.handleStart">
      <el-icon class="el-icon--upload">
        <upload-filled />
      </el-icon>
      <div class="el-upload__text">
        将文件拖动此处，或<em>点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png 文件大小不大于500kb
        </div>
      </template>
    </el-upload>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance } from "vue";
const { proxy } = getCurrentInstance();

const data = reactive({
  fileList: [], // 上传文件列表
});

const methods = reactive({
  // 上传文件
  handleChange(uploadFile) {
    // 格式转换，得到后台需要的参数
    var para = new FormData();
    para.append("extFileName", uploadFile.name);
    para.append("file", uploadFile.raw);
    console.log(para);
    proxy.$axios.post("/public/upload/extFileUpload", para).then((res) => {
      console.log(res);
    });
  },

  // 删除文件
  handleRemove(file) {
    console.log(file);
  },

  // 预览文件
  handleStart(file) {
    console.log(file);
  },
});
</script>

<style lang='scss'>
</style>