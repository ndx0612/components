<template>
  <div>
    <el-button @click="dialog = true">打开弹窗</el-button>

    <!-- 人员弹窗 -->
    <gl-dialog :title="roleForm.type=='add'?'新增人员':'编辑人员'" v-model="dialog" @close="dialog = false" @closed="reset" @opened="clearValidate">
      <div class="px-[60px]">
        <el-form ref="ruleFormRef" :model="roleForm" label-width="90px">
          <el-form-item label="姓名：" prop="nickName">
            <el-input v-model="roleForm.nickName" placeholder="请输入姓名" />
          </el-form-item>
          <el-form-item label="教职工号：" prop="userName">
            <el-input v-model="roleForm.userName" placeholder="请输入教职工号" />
          </el-form-item>
          <el-form-item label="手机号：" prop="phonenumber">
            <el-input v-model="roleForm.phonenumber" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="部门：">
            <select-dept v-model="roleForm.deptId" multiple placeholder="请选择部门"></select-dept>
          </el-form-item>
          <el-form-item label="角色：">
            <select-role v-model="roleForm.roleId" multiple placeholder="请选择角色" :disabledOptions="true"></select-role>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="roleForm.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <el-button @click="dialog = false">取 消</el-button>
        <el-button type="primary" class="ml-20px" @click="submit(ruleFormRef)">确定</el-button>
      </template>
    </gl-dialog>

  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
let router = useRouter();
const { proxy } = getCurrentInstance();
const { query } = router.currentRoute.value;
onMounted(() => {});

let roleForm = reactive({
  type: "add", // 弹窗类型：add为新增,edit为修改
  nickName: "", // 姓名
  userName: "", // 教职工号
  phonenumber: "", // 手机号
  status: 1,
  deptId: [], // 部门ID
  roleId: [], // 角色ID
});

const dialog = ref(false);

// 1）关闭-关闭弹窗
// 2）关闭后-重置所有值dialogClosed
// 2）添加-打开弹窗
// 3）添加后-清空验证dialogOpened

/**
 * @description: 重置对象所有值
 */
const reset = () => {
  console.log("已关闭");
};

/**
 * @description: 重置对象所有值
 */
 const clearValidate = () => {
  console.log("已打开");
};
</script>

<style lang='scss' scoped>
</style>
