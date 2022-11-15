<template>
  <div class="h-full text-right text-[#FFFFFFFF] font-bold bg_img p-[15px]">
    <div class="text-[22px]">{{data.lowest +"/"+ data.highest}}</div>
    <div>{{data.weather}}</div>
    <!-- <iframe width="200" height="55" frameborder="0" scrolling="no" hspace="1" src="https://i.tianqi.com/?c=code&a=getcode&id=94&icon=1"></iframe> -->
    <!-- <iframe width="285" height="85" frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&a=getcode&id=35&site=34&icon=1"></iframe> -->
    <!-- <iframe width="200" scrolling="no" height="55" frameborder="0" allowtransparency="true" src="https://i.tianqi.com?c=code&id=94&color=%23FFFFFF&icon=1&site=16"></iframe> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import axios from "axios";
defineOptions({ name: "card-weather" });
const { proxy } = getCurrentInstance();
onMounted(() => {
  getWeather();
});

// 获取天气
const getWeather = () => {
  // proxy.$axios
  //   .get("https://apis.tianapi.com/tianqi/index", {
  //     key: "c498f8d96e8d9ad2368513957311caf3",
  //     city: "合肥",
  //     type: "1",
  //   })
  //   .then((res) => {
  //     if (res.code == "200") {
  //       data.weather = res.result.weather;
  //       data.lowest = res.result.lowest;
  //       data.highest = res.result.highest;
  //       console.log(data);
  //     }
  //   });

  jsonp("http://weather.cma.cn/api/weather/view", {
    callBack: "res1",
    // 超时处理
    timeout: 3000,
  })
    // 请求成功
    .then((res) => {
      console.log("jsonp->", res);
    })
    // 请求失败
    .catch((err) => {
      console.log("network err!");
    });
};

function jsonp(url, options) {
  // 超时处理
  const { timeout } = options;
  return new Promise((resolve, reject) => {
    // 防止函数名冲突
    let funcName = `jsonp${Date.now()}`;
    let time = null,
      scriptNode;
    // 定义callback
    window[funcName] = function (data) {
      if (timeout) clearTimeout(time);
      resolve(data);
      // 很重要的性能优化点
      // 清除本次请求产生的回调函数和script标签
      delete window[funcName];
      document.body.removeChild(scriptNode);
    };
    // 创建script标签
    scriptNode = document.createElement("script");
    // 给script标签添加src属性
    scriptNode.src = `${url}?callback=${funcName}`;
    // 发出请求
    document.body.appendChild(scriptNode);
    time = setTimeout(() => {
      reject("network err, timeout");
    }, timeout);
    // 失败
    scriptNode.onerror = function (err) {
      reject(err);
    };
  });
}

const data = reactive({
  weather: "",
  lowest: "",
  highest: "",
});

// 获取当前ip
// http://pv.sohu.com/cityjson?ie=utf-8
// https://www.taobao.com/help/getip.php

// 天气接口文档
// https://www.tianqi.com/plugin/

</script>
<style scoped lang='scss'>
.bg_img {
  background-size: 100%;
  background-image: url("@/assets/images/weather2.png");
}
</style>