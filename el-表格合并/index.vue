<template>
  <el-table :data="tableData" border :span-method="objectSpanMethod">
    <el-table-column prop="bumen" label="部门" wfa_idth="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" wfa_idth="180">
    </el-table-column>
    <el-table-column prop="address" label="地址">
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      // 假设这部分为服务端数据
      oldData: [
        {
          fa_id: 1,
          bumen: "销售部",
          children: [
            {
              son_id: 11,
              bumen: "销售部",
              name: "⼦集11-王⼩虎",
              address: "上海市普陀区⾦沙江路 1519 弄",
            },
          ],
        },
        {
          fa_id: 2,
          bumen: "服务部",
          children: [
            {
              son_id: 21,
              bumen: "服务部",
              name: "⼦集22-王⼩虎",
              address: "上海市普陀区⾦沙江路 1519 弄",
            },
          ],
        },
        {
          fa_id: 3,
          bumen: "⼈事部",
          children: [
            {
              son_id: 31,
              bumen: "⼈事部",
              name: "⼦集31-王⼩虎3",
              address: "上海市普陀区⾦沙江路 1519 弄",
            },
            {
              son_id: 32,
              bumen: "⼈事部",
              name: "⼦集32-王⼩虎3",
              address: "上海市普陀区⾦沙江路 1519 弄",
            },
            {
              son_id: 33,
              bumen: "⼈事部",
              name: "⼦集33-王⼩虎3",
              address: "上海市普陀区⾦沙江路 1519 弄",
            },
          ],
        },
      ],
    };
  },
  created() {
    // 转换树形结构的数据，⽤来⽅便拆分合并单元格
    this.tableData = [];
    this.oldData.forEach((i) => {
      // 如果有子部门
      if (i.children) {
        i.children.forEach((j) => {
          j.courseId = i.fa_id;
        });
      }
      if (i.children) {
        this.tableData.push(...i.children);
      } else {
        this.tableData.push(i);
      }
    });
    console.log(this.tableData);
    console.log(this.oldData);
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        console.log(row);
        const parent = this.oldData.find((i) => i.fa_id === row.courseId);
        if (row.son_id === parent.children[0].son_id) {
          return {
            rowspan: parent.children.length,
            colspan: 1,
          };
        } else if (row.son_id !== parent.children[0].son_id) {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
  },
};
</script>