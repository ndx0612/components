// 进入页面时候，判断线上版本是否和本地(当前)版本一致

const getData = () => {
  var data = localStorage.getItem("LS_nowVersion");
  if (data != null) {
    // 本地存储里面的数据是字符串格式的，但我们需要的是对象格式
    return JSON.parse(data);
  } else {
    return {};
  }
}

// 判断当前版本是否和线上版本一样
const compareVersion = () => {
  let data = methods.getData();
  let nowVersion_id = `nowVersion_${state.baseInfo.courseId}`;
  // 按钮显示条件：1、有线上版本 2、线上版本与本地版本不一样
  // console.log(state.baseInfo);
  if (state.baseInfo?.course?.courseVersion) {
    if (data[nowVersion_id] !== state.baseInfo?.course?.courseVersion) {
      state.showupButton = true;
    }
  }
}

// 跳转到我的课程（更新当前版本）
const toBaseInfo = () => {
  let data = methods.getData();
  let nowVersion_id = `nowVersion_${state.baseInfo.courseId}`;
  console.log(state.baseInfo.course.courseVersion);
  data[nowVersion_id] = state.baseInfo.course.courseVersion;
  console.log(data);
  localStorage.setItem("LS_nowVersion", JSON.stringify(data));
  router.push({
    name: "myCourseDetail",
    query: {
      id: state.baseInfo.courseId,
      version: "edit",
      reviewStatus: 5,
    },
  });
}