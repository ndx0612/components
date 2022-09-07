<template>
  <div>
    <ButtonExportXlsx ref="ButtonExportXlsx" buttonText="批量导入" @affirm="affirmFunction" return-all :dialog-title-option="dialogTitleOption" :isAutomatch="true" class="ml-8px" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogTitleOption: [
        { key: "xh", value: "学号", required: true },
        { key: "rxnf", value: "入学年级", required: true },
        { key: "xm", value: "姓名", required: true },
        { key: "xb", value: "性别", required: true },
        { key: "zy", value: "专业", required: true },
        { key: "zyfx", value: "专业方向", required: true },
        { key: "cellphone", value: "电话", required: true },
        { key: "className", value: "班级", required: true },
        { key: "educationType", value: "培养学历类型", required: true },
        { key: "xsdqzt", value: "学生状态", required: true },
      ],
    };
  },
  methods: {
    /**
     * @description: 导入学生
     */
    affirmFunction(result = []) {
      for (let index = 0; index < result.length; index++) {
        const item = result[index];
        // 性别
        if (item.xb == "男") {
          item.xb = 1;
        } else if (item.xb == "女") {
          item.xb = 2;
        } else {
          item.xb = "";
        }
        // 专业
        let zyObj = this.majorList.find((v) => v.zymc == item.zy);
        if (zyObj) {
          item.zyId = zyObj.id;
          let zyfxObj = zyObj.children.find((v) => v.zyfxmc == item.zyfx);
          if (zyfxObj) {
            item.zyfxId = zyfxObj.id;
          } else {
            item.zyfxId = "";
          }
        } else {
          item.zyId = "";
        }
        // 学生状态状态
        let xsztObj = this.gbCodeList.find((v) => v.name == item.xsdqzt);
        if (xsztObj) {
          item.xsdqzt = xsztObj.code;
        } else {
          item.xsdqzt = "";
        }
        if (
          item.cellphone &&
          item.className &&
          item.educationType &&
          item.rxnf &&
          item.xb &&
          item.xh &&
          item.xm &&
          item.xsdqzt &&
          item.zyId &&
          item.zyfxId
        ) {
        } else {
          this.show("第" + (index + 1) + "条导入数据错误，请检查后重新导入");
          break;
        }
      }
    },
  },
};
</script>

<style>
</style>