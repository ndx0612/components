<template>
  <el-upload class="upload-demo" action='' drag :auto-upload="false" :on-change="uploadChange" :limit="1">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>
</template>

<script setup>
// npm install xlsx --save
import * as XLSX from "xlsx/xlsx.mjs"; // vue3导入方式
// import XLSX from "xlsx"; // vue2导入方式
import util from "@/utils/index";
// 上传文件时候触发
const handleChange = async (uploadFile) => {
  let dataBinary = await util.readFile(uploadFile.raw);
  let workBook = XLSX.read(dataBinary, { type: "binary", cellDates: true });
  let workSheet = workBook.Sheets[workBook.SheetNames[0]];
  const xlsxData = XLSX.utils.sheet_to_json(workSheet);
  console.log(xlsxData);
};

/**
 * 处理文件
 */
const readFile = (file) => {
  return new Promise((resolve) => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (ev) => {
      resolve(ev.target.result);
    };
  });
};
</script>

<style>
</style>