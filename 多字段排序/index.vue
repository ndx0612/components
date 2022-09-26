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

const mySort = (a, b) => {
  if (a.grade !== b.grade) {
    return a.grade < b.grade ? -1 : 1;
  } else if (a.class !== b.class) {
    return a.class < b.class ? -1 : 1;
  } else {
    return a.score - b.score;
  }
};

onMounted(() => {
  proxy.$axios
    .post(
      "https://mockapi.eolink.com/RWG4jKY7a8d3c66906979840d6feb92494bd48bd8452ec4/sysDictData/page"
    )
    .then((res) => {
      if (res.errCode == 0) {
        res.data.records.sort(mySort);
        console.log(res.data.records);
      }
    });
});
</script>

<style lang='scss' scoped>
</style>
