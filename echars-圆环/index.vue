<template>
  <!-- 默认大小：450 * 280 -->
  <div ref="chartDom" style="width: 450px;height: 280px;"></div>
</template>

<script setup>
import {
  reactive,
  onMounted,
  watch,
  computed,
  ref,
  getCurrentInstance,
} from "vue";

import * as echarts from "echarts/core";
import {
  TooltipComponent,
  LegendComponent,
  TitleComponent,
} from "echarts/components";
import { PieChart } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";

const { proxy } = getCurrentInstance();

defineOptions({ name: "amountProportion" });
const chartDom = ref();

echarts.use([
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
  TitleComponent,
]);

/**
 * @description: 加千分号
 */
const formatAmount = (num = 0) => {
  var c =
    num.toString().indexOf(".") !== -1
      ? num.toLocaleString()
      : num.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
  return c;
};

const props = defineProps({
  // echars数据
  amountData: {
    type: Array,
    default: () => [],
  },
  // 标题
  subtext: {
    type: String,
    default: "",
  },
  // 是否显示图例
  showLegend: {
    type: Boolean,
    default: true,
  },
  // 是否将金额转元换成万元单位
  turnUnit: {
    type: Boolean,
    default: true,
  },
  // 颜色
  color: {
    type: Array,
    default: () => ["#4F74F4", "#2BDE88", " #FFB85F", "#F97D68"],
  },
  // 外圈显示内容:1数据，2占比
  proportion: {
    type: [Number, String],
    default: 1,
  },
});

// 总金额
const sumAmount = ref(0);

watch(
  () => props.amountData,
  () => {
    setChart();
  }
);

var option = reactive({
  // color: ["#4F74F4", "#2BDE88", " #FFB85F", "#F97D68"],
  title: {
    text: computed(() => sumAmount.value),
    subtext: computed(() => props.subtext),
    x: "center",
    y: "center",
  },
  tooltip: {
    trigger: "item",
    // formatter: `{b}金额: {c}({d}%)`,
    formatter: function (params) {
      return (
        params.name +
        "：￥" +
        proxy.util.formatMoney(params.value, true) +
        "（" +
        params.percent +
        "%）"
      );
    },
  },
  legend: {
    // x: "right",
    y: "bottom",
    padding: [0, 8, 0, 0],
    // orient: "vertical",
    selectedMode: false, // 是否允许点击
  },
  series: [
    {
      type: "pie",
      radius: ["45%", "70%"], // 圆环宽度
      data: computed(() => props.amountData),
      selectedMode: "single",
      label: {
        // position: "inner", // 显示在圆环上
        fontSize: 12,
        formatter: function (params) {
          if (props.proportion == 1) {
            if (props.turnUnit) {
              return (params.value / 10000).toFixed(2) + "万";
            } else {
              return proxy.util.formatMoney(params.value);
            }
          } else if (props.proportion == 2) {
            return params.percent + "%";
          } else {
            return "";
          }
        },
      },
      labelLine: {
        // show: false,
      },
    },
  ],
});
const setChart = () => {
  // 隐藏图例
  option.legend.show = props.showLegend;

  // 颜色
  option.color = props.color;

  // 计算总合
  if (props.amountData) {
    sumAmount.value = 0;
    props.amountData.forEach((item) => {
      sumAmount.value += item.value;
    });
    if (props.turnUnit) {
      sumAmount.value = (sumAmount.value / 10000).toFixed(2) + "万";
    } else {
      sumAmount.value = sumAmount.value.toFixed(2);
    }
  }

  let linearBarDom = echarts.getInstanceByDom(chartDom.value);
  if (!linearBarDom) {
    linearBarDom = echarts.init(chartDom.value);
  }
  linearBarDom.setOption(option, true);
};
</script>

<style scoped lang='sass'>
</style>