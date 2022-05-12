<template>
  <div>
    <div id="main" style="width: 960px;height:300px;"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import * as echarts from "echarts";
defineOptions({ name: "QuestionStatistics" });

const props = defineProps({
  /**
   * 接收数组
   */
  charsData: {
    type: Number,
    default: 123,
  },
});

const { proxy } = getCurrentInstance();
onMounted(() => {
  const chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom, "dark");
  var option;
  option = {
    // 图例
    legend: {
      itemHeight: 16, // 图例高度、宽度
      itemWidth: 16,
      data: ["累积平均分", "最近三次平均分"], // 图例名称
      itemGap: 100, // 图例两个之间的距离
      textStyle: {
        color: "#fff", // 图例文字颜色
        fontSize: "16", // 图例字体大小
        padding: [0, 0, 0, 15], // 图例文字编辑
        height: "16", // 图例文字高度
      },
    },
    // X轴
    xAxis: {
      name:'（分）',
      data: ["0-20", "21-40", "41-60", "61-80", "81-100"], // 横坐标内容
      // 横坐标线条
      axisLine: {
        show: false,
      },
      // 横坐标刻度
      axisTick: {
        show: false,
      },
      // 横坐标字体颜色、大小
      axisLabel: {
        color: "#fff",
        fontSize: "16px",
      },
    },
    // Y轴
    yAxis: {
      // 纵坐标
      name: "（ 人 ）",
      splitLine: {
        lineStyle: {
          color: "#064F5B", //线条颜色
          type: "dashed", //线条样式，默认是实现，dashed是虚线
        },
      },
      nameTextStyle: {
        color: "#fff",
        fontSize: "16px",
        padding: [0, 26, 0, 0],
      },
      axisLabel: {
        color: "#fff",
        fontSize: "16px",
      },
    },
    series: [
      {
        name: "累积平均分",
        type: "bar",
        data: [23, 24, 18, 25, 27],
        barWidth: "40px",
        itemStyle: {
          color: "#2CC0E4",
        },
      },
      {
        name: "最近三次平均分",
        type: "bar",
        data: [26, 24, 18, 22, 23],
        barWidth: "40px",
        itemStyle: {
          color: "#FFCC33",
        },
      },
    ],
    backgroundStyle: {
      color: "#fff",
    },
  };
  option && myChart.setOption(option);
});
</script>
<style scoped lang='sass'>
</style>