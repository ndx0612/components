<template>
  <div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;

const orders = [
  {
    column: "grade",
    asc: true,
  },
  {
    column: "class",
    asc: true,
  },
  {
    column: "score",
    asc: true,
  },
];

const sortArr = (arr = [], orders = []) => {
  arr.sort((a, b) => {
    let result;
    let over = false;
    orders.forEach((v) => {
      if (!over) {
        if (a[v.column] !== b[v.column]) {
          if (v.asc) result = a[v.column] - b[v.column];
          else result = b[v.column] - a[v.column];
          over = true;
        }
      }
    });
    return result;
  });
};

onMounted(() => {
  proxy.$axios
    .post(
      "https://mockapi.eolink.com/RWG4jKY7a8d3c66906979840d6feb92494bd48bd8452ec4/sysDictData/page"
    )
    .then((res) => {
      if (res.errCode == 0) {
        sortArr(res.data.records, orders);
        console.log(res.data.records);
      }
    });
});
</script>

<style lang='scss' scoped>
</style>
