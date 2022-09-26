<template>
  <!-- 打印弹窗 -->
  <el-dialog v-model="dialogVisible" width="760px">
    <div id="printSheet" class="bg-[#FFF]">
      <div class="text-[20px] text-center text-[#252931]">
        {{props.title}}
      </div>
      <div class="flex justify-between mt-[20px]">
        <div v-if="data.amountApply?.amountType==3">
          <span>申请部门：</span>
          <span>{{data.amountApply?.deptName}}</span>
        </div>
        <div v-if="data.amountApply?.amountType==2">
          <span>采购部门：</span>
          <span>{{data.amountApply?.purchaseDeptName}}</span>
        </div>
        <div>
          <span>申请人：</span>
          <span>{{data.amountApply?.applicant}}</span>
        </div>
        <div>
          <span>申请时间：</span>
          <span>{{proxy.util.formatDate(data.amountApply?.createTime, "yyyy-MM-dd hh:mm")}}</span>
        </div>
      </div>

      <div class="mt-[5px]">
        <table class="w-[100%]">

          <!-- 付款信息 -->
          <template v-if="props.amountApplyId">
            <tr class="h-[44px] bg-[#F7F7F7]">
              <td class="text-center font-semibold" colspan="4">付款信息</td>
            </tr>
            <tr class="h-[44px]">
              <td class="text-center font-semibold" colspan="1">付款用途</td>
              <td class="pl-[16px]" colspan="3">{{data.amountApply?.applyName}}</td>
            </tr>
            <tr class="h-[72px]">
              <td class="text-center font-semibold" colspan="1">申请付款金额</td>
              <td class="pl-[16px]" colspan="3">
                <div>人民币（大写）{{proxy.util.moneyTransferRMB(data.amountApply?.amount)}}</div>
                <div>人民币（小写）¥{{proxy.util.formatMoney(data.amountApply?.amount,true)}}</div>
              </td>
            </tr>
            <tr class="h-[44px]" v-if="data.amountApply?.amountType==1">
              <td class="text-center font-semibold" colspan="1">申请付款日期</td>
              <td class="pl-[16px]" colspan="3">{{data.amountApply?.applyDate}}</td>
            </tr>
            <tr class="h-[44px]">
              <td class="text-center font-semibold" colspan="1">付款方式</td>
              <td class="pl-[16px]" colspan="3">
                <div class="flex">
                  <div class="flex items-center">
                    <span>贷记凭证转账</span>
                    <div class="h-[12px] w-[12px] border-[#606266] ml-[4px]" :class="data.amountApply?.applyTarget?.payType==1?'border-[6px]':'border-[1px]'"></div>
                  </div>
                  <div class="flex items-center ml-[18px]">
                    <span>支票</span>
                    <div class="h-[12px] w-[12px]  border-[#606266] ml-[4px]" :class="data.amountApply?.applyTarget?.payType==2?'border-[6px]':'border-[1px]'"></div>
                  </div>
                  <div class="flex items-center ml-[18px]">
                    <span>其它</span>
                    <div class="h-[12px] w-[12px]  border-[#606266] ml-[4px]" :class="data.amountApply?.applyTarget?.payType==3?'border-[6px]':'border-[1px]'"></div>
                  </div>
                  <div class="flex items-center ml-[18px]">
                    <span>报销</span>
                    <div class="h-[12px] w-[12px]  border-[#606266] ml-[4px]" :class="data.amountApply?.applyTarget?.payType==4?'border-[6px]':'border-[1px]'"></div>
                  </div>
                </div>
              </td>
            </tr>
            <tr class="h-[44px]" v-if="data.amountApply?.amountType==3">
              <td class="text-center font-semibold" colspan="1">付款类别</td>
              <td class="pl-[16px]" colspan="3">{{storeData.dictData.pay_category.find(v=>v.dictValue==data.amountApply?.category)?.dictLabel}}</td>
            </tr>
            <tr class="h-[44px]" v-if="data.amountApply?.applyTarget?.payType==1">
              <td class="text-center font-extrabold">合同相对方</td>
              <td class="pl-[16px]" colspan="3">{{data.amountApply?.applyTarget?.supplierName}}</td>
            </tr>
            <tr class="h-[44px]" v-if="data.amountApply?.applyTarget?.payType==4">
              <td class="text-center font-extrabold">收款方</td>
              <td class="pl-[16px]" colspan="3">{{data.amountApply?.applyTarget?.expertName}}</td>
            </tr>
            <tr class="h-[44px]" v-if="data.amountApply?.applyTarget?.payType==1 || data.amountApply?.applyTarget?.payType==4">
              <td class="text-center font-semibold">开户银行</td>
              <td class="pl-[16px]">{{data.amountApply?.applyTarget?.bankName}}</td>
              <td class="text-center font-semibold">银行账号</td>
              <td class="pl-[16px]">{{proxy.util.formatBank(data.amountApply?.applyTarget?.bankCardNumber)}}</td>
            </tr>
          </template>

          <!-- 合同信息 -->
          <template v-if="props.contractId">
            <tr class="h-[44px] bg-[#F7F7F7]">
              <td class="text-center font-semibold" colspan="4">合同信息</td>
            </tr>
            <tr class="h-[44px]">
              <td class="text-center font-semibold">合同名称</td>
              <td class="pl-[16px]" colspan="3">{{data.contract?.contractName}}</td>
            </tr>
            <tr class="h-[44px]">
              <td class="text-center font-semibold">合同编号</td>
              <td class="pl-[16px]">FT00125</td>
              <td class="text-center font-semibold">合同期限</td>
              <td class="pl-[16px]">{{proxy.util.analysisPeriod(data.contract?.contractPeriod)}}</td>
            </tr>
          </template>

          <!-- 项目信息 -->
          <template v-if="props.projectId">
            <tr class="h-[44px] bg-[#F7F7F7]">
              <td class="text-center font-semibold" colspan="4">项目信息</td>
            </tr>
            <tr class="h-[44px]">
              <td class="text-center font-semibold">所属项目</td>
              <td class="pl-[16px]" colspan="3">{{data.project?.projectName}}</td>
            </tr>
            <tr class="h-[44px]">
              <td class="text-center font-semibold">项目负责人</td>
              <td class="pl-[16px]" colspan="1">{{data.project?.chargePerson || '-'}}</td>
              <td class="text-center font-semibold">项目所属部门</td>
              <td class="pl-[16px]" colspan="1">{{data.project?.deptName || '-'}}</td>
            </tr>
          </template>

          <!-- 付款审批 -->
          <tr class="h-[44px] bg-[#F7F7F7]">
            <td class="text-center font-semibold" colspan="4">付款审批</td>
          </tr>
          <tr class="h-[72px]">
            <td class="text-center font-semibold" colspan="1">申请部门审批</td>
            <td class="px-[16px]" colspan="3">
              <div class="flex justify-between">
                <span>主管 夏家：通过</span>
                <span>2022-9-5 15:22:25</span>
              </div>
              <div class="flex justify-between">
                <span>主管 夏家：通过</span>
                <span>2022-9-5 15:22:25</span>
              </div>
            </td>
          </tr>
          <tr class="h-[44px]">
            <td class="text-center font-semibold" colspan="1">项目负责人审批</td>
            <td class="px-[16px]" colspan="3">
              <div class="flex justify-between">
                <span>主管 夏家：通过</span>
                <span>2022-9-5 15:22:25</span>
              </div>
            </td>
          </tr>

        </table>
      </div>

    </div>
    <template #footer>
      <span class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">关闭</el-button> -->
        <el-button type="primary" v-print="printObj">打印</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, onMounted, getCurrentInstance, reactive } from "vue";
const { proxy } = getCurrentInstance();

// npm i vue3-print-nb

defineOptions({ name: "print-dialog" });

onMounted(() => {});

// 弹窗开关
const dialogVisible = ref(false);

const printFrom = ref({});

onMounted(() => {
  getApplyInfo();
  getProjectInfo();
  getContractInfo();
});

const props = defineProps({
  // 打印单标题
  title: {
    type: String,
    default: "",
  },
  // 合同ID
  contractId: {
    type: [Number, String],
    default: "",
  },
  // 项目ID
  projectId: {
    type: [Number, String],
    default: "",
  },
  // 申请ID
  amountApplyId: {
    type: [Number, String],
    default: "",
  },
  // 是否显示合同详情
  showContractDetails: {
    type: Boolean,
    default: false,
  },
});

// 信息详情
const data = reactive({
  contract: {},
  project: {},
  amountApply: {},
});

watch(
  () => [props.contractId, props.amountApplyId, props.projectId],
  () => {
    data.contract = {};
    data.project = {};
    data.amountApply = {};
    getApplyInfo();
    getProjectInfo();
    getContractInfo();
  }
);

/**
 * @description: 获取付款信息详情
 */
const getApplyInfo = () => {
  if (props.amountApplyId) {
    proxy.$axios.get(`/supAmountApply/${props.amountApplyId}`).then((res) => {
      if (res.errCode == 0) {
        data.amountApply = res?.data || {};
      }
    });
  }
};

/**
 * @description: 获取项目详情
 */
const getProjectInfo = () => {
  if (props.projectId) {
    proxy.$axios.get(`/supProject/${props.projectId}`).then((res) => {
      if (res.errCode == 0) {
        data.project = res?.data || {};
      }
    });
  }
};

/**
 * @description: 获取合同详情
 */
const getContractInfo = () => {
  if (props.contractId) {
    proxy.$axios.get(`/supAmountContract/${props.contractId}`).then((res) => {
      if (res.errCode == 0) {
        data.contract = res?.data || {};
      }
    });
  }
};

let printObj = reactive({
  id: "printSheet", //绑定打印区域id
  popTitle: "", //内容标签
  beforeOpenCallback(vue) {
    console.log("打开之前");
  },
  //调用打印工具成功回调函数
  openCallback(vue) {
    console.log("执行了打印");
  },
  //关闭打印机的回调
  closeCallback(vue) {
    console.log("关闭了打印工具");
  },
});
</script>

<style lang="scss" scoped>
table,
td {
  border: 1px solid #bbb;
}
</style>