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
    <!-- accept=".xls,.xlsx" 上传文件类型 -->
    <el-upload class="upload-demo" drag multiple action="" :http-request="uploadRequest" :file-list="data.fileList" :on-change="methods.handleChange" :on-remove="methods.handleRemove" :on-preview="methods.handleStart">
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
  fileList: [
    {
      name: "food.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
    {
      name: "food2.jpeg",
      url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
    },
  ], // 上传文件列表
});

/**
 * @description: 文件上传默认方法
 * @param {*} content
 */
const uploadRequest = (content) => {
  let url = "/public/upload/extFileUpload";
  var para = new FormData();
  para.append("file", content.file);
  para.append("extFileName", content.file.name);
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
      if (!res.data.errCode) {
        data.extFileList[data.extFileList.length - 1].url =
          proxy.util.convertImgUrl(res.data.url);
        data.extFileList[data.extFileList.length - 1].id = res.data.id;
        data.extFileList[data.extFileList.length - 1].status = "ready";
      } else {
        content.onError("文件上传失败");
      }
    })
    .catch((res) => {
      content.onError("文件上传失败");
      page.uploadLoading = false;
    });
};

const methods = reactive({
  // 上传文件
  handleChange(uploadFile) {
    // // 格式转换，得到后台需要的参数
    // var para = new FormData();
    // para.append("extFileName", uploadFile.name);
    // para.append("file", uploadFile.raw);
    // console.log(para);
    // proxy.$axios.post("/public/upload/extFileUpload", para).then((res) => {
    //   console.log(res);
    // });
  },

  // 图片转base64方法
  // handleChange(uploadFile) {
  //   console.log(uploadFile);
  //   var reader = new FileReader();
  //   reader.readAsDataURL(uploadFile.raw);
  //   reader.onload = () => {
  //     console.log(reader.result);
  //   };
  //   reader.onerror = function (error) {
  //     console.log("Error: ", error);
  //   };
  // },

  // 删除文件
  handleRemove(file) {
    console.log(file);
  },

  // 选择文件
  handleStart(file) {
    // 预览文件（兼容火狐，safari浏览器等多个浏览器）
    const tempPage = window.open("_blank"); // 先打开一个空页面
    tempPage.location = file.url; //目标的页面地址
  },
});
</script>

<style lang='scss'>
</style>