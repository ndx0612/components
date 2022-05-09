<template>
  <div>
    <el-button type="primary" @click="methods.handleChange">点击事件触发</el-button>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, onMounted } from "vue";
const { proxy } = getCurrentInstance();
import { useRouter } from "vue-router";
const router = useRouter();

onMounted(() => {
  const { query } = router.currentRoute.value;
  console.log(query); // 当前页面参数
  sendRequest.getCourseDetail();
});

const data = reactive({
  fileList: [],
});

// 点击click事件
const methods = reactive({
  // 上传文件
  handleChange() {
    console.log("点击了按钮");
  },
  // 点击跳转页面
  goToOther() {
    router.push({
      path: "/giveLessons/attendClass",
      query: {
        courseId: courseForm.curCourseId,
        sectionId: row.id,
      },
    });
  },
});

// 格式数据
const format = reactive({});

// 发送请求获取数据
const sendRequest = reactive({
  // 获取维护人下拉列表
  getCourseDetail() {
    proxy.$axios
      .post("/public/allTeachers", {})
      .then((res) => {
        if (res.errCode == 0) {
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
</script>

<style lang='scss'>
</style>