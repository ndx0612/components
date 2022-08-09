<template>
  <div>
  </div>
</template>

<script setup>
import axios from "axios";
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
const { proxy } = getCurrentInstance();
onMounted(() => {
  getAmountChars();
});

// 方式一：
const getAmountChars = () => {
  axios
    .all([getContractTable(), getShopPayTable()])
    .then((res) => {
      console.log(res);
    });
};

// 方式二
// const getAmountData = async () => {
//   let contract = await getContractTable();
//   let shopPay = await getShopPayTable();
//   let otherPay = await getOtherPayTable();
//   amountData.value = [
//     {
//       value: Math.round(contract / 100) / 100,
//       name: "合同占比",
//     },
//     {
//       value: Math.round(shopPay / 100) / 100,
//       name: "采购付款占比",
//     },
//     {
//       value: Math.round(otherPay / 100) / 100,
//       name: "其它付款占比",
//     },
//   ];
// };

/**
 * @description: 获取合同列表
 */
const getContractTable = () => {
  return new Promise((resolved, rejected) => {
    proxy.$axios
      .get(
        `https://mockapi.eolink.com/RWG4jKY7a8d3c66906979840d6feb92494bd48bd8452ec4/supProject/listSupAmountContract/projectId`
      )
      .then((res) => {
        if (res.errCode == 0) {
          resolved(res.data.length);
        }
      });
  });
};

/**
 * @description: 获取采购付款
 */
const getShopPayTable = () => {
  return new Promise((resolved, rejected) => {
    proxy.$axios
      .get(
        "https://mockapi.eolink.com/RWG4jKY7a8d3c66906979840d6feb92494bd48bd8452ec4/supProject/listSupAmountApply"
      )
      .then((res) => {
        if (res.errCode == 0) {
          resolved(res.data.length);
        }
      });
  });
};
</script>

<style lang='scss' scoped>
</style>
