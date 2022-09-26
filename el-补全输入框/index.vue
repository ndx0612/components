<template>
  <div class="w-[700px]">
    <el-form ref="ruleFormRef" :model="applyForm" label-width="120px">
      <!-- 合同相对方 -->
      <el-form-item label="供货商名称：">
        <el-autocomplete v-if="data.addSupplier" v-model="applyForm.supplierName" :fetch-suggestions="querySearch" placeholder="供应商" @select="handleSelect" class="w-full" clearable @clear="clearSupSupplier" />
        <el-select v-else v-model="applyForm.supplierName" placeholder="供应商" class="w-full" filterable @change="changeSupplier">
          <el-option v-for="item in supSupplierList" :key="item.value" :label="item.value" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="开户银行：">
        <el-input v-model="applyForm.supplierBankName" placeholder="" :disabled="!(data.editBank||data.addSupplier)" />
      </el-form-item>
      <el-form-item label="银行账号：">
        <el-input v-model="applyForm.supplierBankNumber" placeholder="" :disabled="!(data.editBank||data.addSupplier)" />
      </el-form-item>
    </el-form>
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

const applyForm = reactive({
  supplierName: "",
  supplierBankName: "",
  supplierBankNumber: "",
});

const data = reactive({
  addSupplier: true,
  editBank: true,
});

// 供应商列表
const supSupplierList = ref([]);

onMounted(() => {
  proxy.$axios.get("/supSupplier").then((res) => {
    if (res.errCode == 0) {
      supSupplierList.value = res.data || [];
      supSupplierList.value.forEach((item) => {
        item.value = item.supplierName || "";
      });
    }
  });
});

const restaurants = ref([
  { value: "vue", link: "https://github.com/vuejs/vue" },
  { value: "element", link: "https://github.com/ElemeFE/element" },
  { value: "cooking", link: "https://github.com/ElemeFE/cooking" },
  { value: "mint-ui", link: "https://github.com/ElemeFE/mint-ui" },
  { value: "vuex", link: "https://github.com/vuejs/vuex" },
  { value: "vue-router", link: "https://github.com/vuejs/vue-router" },
  { value: "babel", link: "https://github.com/babel/babel" },
]);

const querySearch = (queryString, cb) => {
  const results = queryString
    ? supSupplierList.value.filter(createFilter(queryString))
    : supSupplierList.value;
  cb(results);
};

const createFilter = (queryString) => {
  return (restaurant) => {
    return (
      restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    );
  };
};

const handleSelect = (item) => {
  console.log(item);
  applyForm.supplierBankName = item.bankName || "";
  applyForm.supplierBankNumber = item.bankCardNumber || "";
};

const changeSupplier = (value) => {
  let item = supSupplierList.value.find((v) => v.value == value);
  applyForm.supplierBankName = item.bankName || "";
  applyForm.supplierBankNumber = item.bankCardNumber || "";
};

const aa = () => {
  console.log(applyForm);
};

const clearSupSupplier = () => {
  applyForm.supplierBankName = "";
  applyForm.supplierBankNumber = "";
};
</script>

<style lang='scss' scoped>
</style>
