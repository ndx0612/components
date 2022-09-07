<template>
  <div>
    <div>
      采购付款列表
    </div>
    <el-button @click="aa">按钮</el-button>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});
const sortArr = (arr = [], orders = []) => {
  arr.sort((a, b) => {
    let result;
    let over = false;
    orders.forEach((v) => {
      if (!over) {
        if (a[v.column] != b[v.column]) {
          if (v.asc) result = a[v.column] - b[v.column];
          else result = b[v.column] - a[v.column];
          over = true;
        }
      }
    });
    return result;
  });
};

const aa = () => {
  const obj1 = [
    {
      name: "a",
      age: 65,
      class: 1,
    },
    {
      name: "b",
      age: 18,
      class: 3,
    },
    {
      name: "c",
      age: 26,
      class: 1,
    },
    {
      name: "d",
      age: 50,
      class: 3,
    },
    {
      name: "e",
      age: 70,
      class: 2,
    },
    {
      name: "f",
      age: 60,
      class: 3,
    },
  ];
  const obj2 = [
    {
      column: "class",
      asc: true,
    },
    {
      column: "age",
      asc: true,
    },
  ];
  sortArr(obj1, obj2)
  console.log(obj1);
};
</script>

<style lang='scss' scoped>
</style>
