<template>
  <!-- v-model="fileList"可能会线上报错 -->
  <el-upload v-model:file-list="fileList" class="upload-demo" multiple action="" :before-upload="onBeforeUpload" :http-request="uploadRequest" :on-remove="handleRemove" :on-preview="handleStart">
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">
        只能上传doc/docx/xlsx/pdf/jpg/png文件，且不超过20M
      </div>
    </template>
  </el-upload>
</template>

<script setup>
import { reactive, getCurrentInstance, ref } from "vue";
import axios from "axios";
defineOptions({ name: "upload-file" });
const { proxy } = getCurrentInstance();

// 文件列表
const fileList = ref([]);

/**
 * @description: 文件上传默认方法
 * @param {*} content
 */
const uploadRequest = (content) => {
  let url = "/file/storage";
  var para = new FormData();
  para.append("file", content.file);
  axios.defaults.timeout = null; // 响应时间
  axios({
    method: "post",
    url,
    data: para,
    onUploadProgress: (progressEvent) => {
      const complete = parseInt(
        ((progressEvent.loaded / progressEvent.total) * 100) | 0,
        10
      );
      content.onProgress({ percent: complete });
    },
  })
    .then((res) => {
      if (res.errCode == 0) {
        if (fileList.value?.length >= 1) {
          fileList.value[fileList.value.length - 1].url = res.data.fileUrl;
          fileList.value[fileList.value.length - 1].fileId = res.data.fileId;
          fileList.value[fileList.value.length - 1].status = "success";
          console.log(fileList.value);
        }
      }
    })
    .catch((res) => {
      content.onError("文件上传失败");
    });
};

// 删除文件
const handleRemove = (file) => {
  console.log(file);
};

// 预览文件（兼容火狐，safari浏览器等多个浏览器）
const handleStart = (file) => {
  const tempPage = window.open("_blank"); // 先打开一个空页面
  tempPage.location = file.url; //目标的页面地址
};

/**
 * @description: 文件上传前
 */
const onBeforeUpload = (file) => {
  const is20M = file.size / 1024 / 1024 < 20;
  // 限制文件上传大小
  if (!is20M) {
    proxy.util.msg({
      message: "上传文件大小不能超过 20MB!!",
      type: "warning",
    });
    return false;
  }
};
</script>

<style lang="scss" scoped>
</style>