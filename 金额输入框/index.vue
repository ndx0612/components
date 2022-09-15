<template>
  <input ref="inputRef" type="text" class="currency w-[200px]" placeholder="￥0.00" @blur="transferRMB" />
</template>

<script setup>
import { useCurrencyInput } from "vue-currency-input";
import { watch, reactive } from "vue";
const { inputRef, numberValue, setValue } = useCurrencyInput(props.options);
defineOptions({ name: "currency-input" });
const emit = defineEmits(["transferMoney", "update:modelValue", "change"]);
const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  // currency: 货币代码，此选项是必需的。 --'CNY'
  // hideCurrencySymbolOnFocus: 是否在焦点上隐藏货币符号。组件默认为true 设置默认为false
  // hideGroupingSeparatorOnFocus: 是否在焦点上隐藏分组分隔符。组件默认为true 设置默认为false  ---逗号分割
  // hideNegligibleDecimalDigitsOnFocus: 是否在焦点上隐藏可忽略的十进制数字。组件默认为true 设置默认为false--保留小数位数
  // precision: 2 显示的小数位数。默认为undefined（整数将隐藏小数位）。必须介于 0 和 15 之间，并且只能应用于支持十进制数字的货币。可以传递对象{min, max}以使用精度范围。
  options: {
    type: Object,
    default: () => ({
      currency: "CNY",
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
      hideNegligibleDecimalDigitsOnFocus: false,
      precision: 2,
    }),
  },
});
watch(
  () => props.modelValue, // Vue 2: props.value
  (value) => {
    setValue(value);
  }
);

const transferRMB = () => {
  emit("transferMoney");
};
</script>

<style lang="scss" scoped>
input {
  height: 30px;
  line-height: 30px;
  border: 1px solid #e5e7eb;
  padding: 1px 15px;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
}
input:focus {
  height: 30px;
  line-height: 30px;
  outline: 0;
  border: 1px solid #4f74f4;
  box-shadow: 0 0 0 1px var(--el-select-input-focus-border-color) inset !important;
}
input:disabled {
  color: var(--el-disabled-text-color);
  cursor: not-allowed;
  background-color: var(--el-disabled-bg-color);
  // box-shadow: 0 0 0 1px var(--el-disabled-border-color) inset;
}
</style>  
