<template>
  <div>
    <el-upload ref="upload" action="" accept=".xls,.xlsx" :auto-upload="false" :file-list="fileList" :on-change="changeFile" multiple :show-file-list="false">
      <el-button type="green">
        {{ buttonText }}
      </el-button>
    </el-upload>

    <!-- 导入信息弹窗 -->
    <el-dialog :visible.sync="importDialogForm.show" width="1080px" append-to-body class="import-dialog" custom-class="cover-dialog" :destroy-on-close="true" :close-on-click-modal="false" @close="importDialogForm.show = false">
      <CoverDialogHeader title-name="导入信息" @close="
          () => {
            importDialogForm.show = false
          }
        ">
      </CoverDialogHeader>
      <div class="import-body pt-20px pl-40px pr-20px pb-40px box-border">
        <div class="import-tips">
          表格第一行为表头信息，其数据不会导入；您可以根据需要指定数据列与所需字段的对应关系，未指定的数据列会自动跳过。
        </div>
        <div class="btn-box">
          <el-button type="blue" class="mr-10px" @click="confirmImport">
            确认导入
          </el-button>

          <el-upload ref="upload" action="" accept=".xls,.xlsx" :auto-upload="false" :file-list="fileList" :on-change="changeFile" multiple :show-file-list="false">
            <el-button type="blue" class="mr-10px">
              重新上传
            </el-button>
          </el-upload>

          <el-button type="white" class="ml-10px" @click="importDialogForm.show = false">
            取消
          </el-button>
        </div>
        <div class="import-table">
          <el-table ref="dataTable" :data="importData" height="100%" border :header-cell-style="{ background: '#FAFAFA' }" :cell-style="cellStyle">
            <el-table-column v-for="(names, index) in dialogTitleList" :key="names.key" min-width="180" :show-overflow-tooltip="true">
              <template #header>
                <div class="table-header">
                  <el-select placeholder="请选择" v-model="names.selectKey" size="medium" clearable @change="tableHeaderChange(index, names.selectKey)">
                    <el-option v-for="(item, index) in tableTitleSelcetOption" :key="index + 'option'" :label="item.value" :value="item.value" :disabled="
                        dialogTitleList.some((d) => d.selectKey == item.value)
                      "></el-option>
                  </el-select>
                  <div class="headText">
                    {{ names.key || '' }}
                  </div>
                </div>
              </template>

              <template slot-scope="scope">
                <div class="">
                  {{ importData[scope.$index][names.key] || '' }}
                </div>
              </template>
            </el-table-column>
            <!-- 空数据时展示内容 -->
            <div slot="empty">
              <div>暂无数据</div>
            </div>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ButtonExportXlsx',
  props: {
    buttonText: {
      type: String,
      default: '批量导入',
    },
    buttonType: {
      type: String,
      default: 'primary',
    },
    dialogTitleOption: {
      type: [Array, Object],
      default: () => [],
    },
    // if true, return raw data; if false, return formatted text
    // 是否处理 excel 中的时间格式; true : 处理excel中的时间; false：直接返回字符串
    timeRaw: {
      type: Boolean,
      default: false,
    },
    returnAll: {
      type: Boolean,
      default: false,
    },
    // 导入合并表头 默认0 导入一行表头 1: 导入两行合并表头
    importHeader: {
      type: Number,
      default: 0,
    },
    // 导入数据是否自动匹配表头
    isAutomatch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fileName: '',
      fileList: [],
      importDialogForm: {
        show: false,
        btnLoading: false,
        keyName: [],
        file: {},
      },
      importData: [],
      keyOptions: [],
      isRule: false,
      index: -1,
      regex: false,
      dialogTitleList: [],
    }
  },
  computed: {
    tableTitleSelcetOption() {
      return this.dialogTitleOption || []
    },
  },
  created() {},
  methods: {
    /**
     * @description: 设置表头数组
     * @param {*}
     * @return {*}
     */
    setDialogTitleList() {
      let data = (this.importData && this.importData[0]) || {}

      let res = Object.keys(data)
        .filter((v) => v != 'errList')
        .map((v) => {
          return {
            key: v,
            selectKey: '',
          }
        })
      this.$set(this, 'dialogTitleList', res)

      if (this.isAutomatch) {
        // 自动匹配上传表头与选项数据
        this.automatchData()
      }
    },
    /**
     * @description: 选择文件
     * @param {file} 文件实例
     * @return {*}
     */
    changeFile(file) {
      this.fileName = file.name || ''
      this.importDialogForm.file = file
      this.setDialogTableData(file)
    },
    /**
     * @description: 设置弹窗的属性
     * @param {file} 文件实例
     * @return {*}
     */
    setDialogTableData(file) {
      const reader = new FileReader()
      const _this = this
      reader.readAsArrayBuffer(file.raw)
      reader.onload = async function () {
        const buffer = reader.result
        const bytes = new Uint8Array(buffer)
        const length = bytes.byteLength
        let binary = ''
        for (let i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        const XLSX = require('xlsx')
        const wb = XLSX.read(binary, {
          type: 'binary',
          cellDates: true,
        })
        const sheet2JSONOpts = {
          raw: _this.timeRaw,
          defval: '', // 设置值为空显示key值
          header: _this.importHeader == 0 ? 0 : 1,
        }
        let outdata = XLSX.utils.sheet_to_json(
          wb.Sheets[wb.SheetNames[0]],
          sheet2JSONOpts
        )

        // 当导入的为合并多行表头
        if (_this.importHeader != 0) {
          outdata = await _this.handleOutdata(outdata)
        }

        const arr = outdata[0]
        if (arr) {
          _this.importData = outdata
          _this.importData = _this.setDate(_this.importData)

          _this.$nextTick(() => {
            _this.$refs.dataTable.doLayout()
            _this.setDialogTitleList()
          })

          _this.importDialogForm.show = true
        } else {
          alert('请勿上传空文件')
        }
      }
    },
    /**
     * @description: 合并多行表头数据处理
     * @param {array} newTable 处理后表格数据
     * @return {*}
     */
    handleOutdata(outdata) {
      // 组合头数据
      let header = JSON.parse(JSON.stringify(outdata[0]))
      for (let i = 0; i < this.importHeader; i++) {
        let assignList = outdata[i + 1]
        if (assignList) {
          for (let s = 0; s < header.length; s++) {
            if (assignList[s]) {
              header[s] = assignList[s]
            }
          }
        }
      }

      // 头数据重复处理
      let newHeader = []
      header.forEach((item, index) => {
        newHeader.push({ name: item, index })
      })
      let repeatData = []
      newHeader.forEach((item) => {
        let filterList = newHeader.filter((obj) => {
          return item.name == obj.name
        })
        if (filterList.length > 1) {
          let flag = repeatData.some((someData) => {
            return (
              filterList[0].name == someData[0].name &&
              filterList[1].name == someData[1].name
            )
          })
          if (!flag) {
            repeatData.push(filterList)
          }
        }
      })
      repeatData.forEach((item) => {
        item.forEach((obj, i) => {
          obj.name = obj.name + (i + 1)

          header[obj.index] = obj.name
        })
      })

      outdata.splice(0, this.importHeader + 1)

      let newTable = []
      outdata.forEach((item) => {
        let tableItem = {}
        item.forEach((obj, i) => {
          tableItem[header[i]] = obj || ''
        })
        newTable.push(tableItem)
      })

      return newTable
    },
    /**
     * @description: 自动匹配上传表头与选项数据
     * @param {*}
     * @return {*}
     */
    automatchData() {
      this.dialogTitleList.forEach((item) => {
        this.dialogTitleOption.forEach((obj) => {
          if (item.key == obj.value) {
            item.selectKey = obj.value
          }
        })
      })
    },
    /**
     * @description:确认导入
     * @param {*}
     * @return {*}
     */
    confirmImport() {
      // 检查必选项是否全部被选中
      let noSelectObj = null
      this.tableTitleSelcetOption.forEach((v) => {
        if (v.required) {
          let have = this.dialogTitleList.some((d) => d.selectKey == v.value)
          if (!have) noSelectObj = v
        }
      })
      if (noSelectObj) {
        this.$message({
          message: `选项《${noSelectObj.value}》是必选项`,
          type: 'warning',
        })
        return
      }
      let dialogTitleList = this.dialogTitleList
      if (!this.returnAll) {
        dialogTitleList = this.dialogTitleList.filter(
          (diaItem) => diaItem.selectKey
        )
      }
      let res = []
      this.importData.forEach((impItem) => {
        let curObj = {}
        dialogTitleList.forEach((diaItem) => {
          let addObj = this.tableTitleSelcetOption.find(
            (v) => v.value == diaItem.selectKey
          )
          if (addObj) {
            let addKey = addObj.key
            curObj[addKey] = impItem[diaItem.key]
          } else {
            curObj[diaItem.key] = impItem[diaItem.key]
          }
        })
        res.push(curObj)
      })
      this.$emit('affirm', res, this.fileName)
    },
    /**
     * @description: 关闭弹窗
     * @param {*}
     * @return {*}
     */
    closeDialog() {
      this.importDialogForm.show = false
    },
    // 组合时间格式(缺0)
    dateAddZero(date) {
      if (date < 10) {
        date = '0' + date
      }
      return date
    },
    /**
     * @description: 处理数据中特殊数据（时间参数）
     * @param {list} 待处理数据
     * @return {list} 已处理数据
     */
    setDate(list) {
      // 数据转译上传的时间参数
      list.forEach((item) => {
        this.dialogTitleList.forEach((obj) => {
          if (item[obj.key] && item[obj.key] instanceof Date) {
            const d = new Date(item[obj.key])
            const resDate =
              d.getFullYear() +
              '-' +
              this.dateAddZero(d.getMonth() + 1) +
              '-' +
              this.dateAddZero(d.getDate())
            const resTime =
              this.dateAddZero(d.getHours()) +
              ':' +
              this.dateAddZero(d.getMinutes()) +
              ':' +
              this.dateAddZero(d.getSeconds())
            item[obj.key] = resDate + ' ' + resTime
          }
        })
      })

      return list
    },
    /**
     * @description: 处理点击数据的验证
     * @param {*} index 当前的索引号
     * @param {*} selectKey 选中的key值
     * @return {*}
     */
    tableHeaderChange(index, selectKey) {
      this.index = index
      // 手动清除选择
      if (!selectKey) {
        this.importData.forEach((v) => {
          if (!v.errList) this.$set(v, 'errList', [])
          let columnName = this.dialogTitleList[index].key
          let findIndex = v.errList.findIndex((e) => e == columnName)
          if (findIndex != -1) {
            v.errList.splice(findIndex, 1)
          }
        })
      }

      let selectInfo = {}
      this.dialogTitleList.forEach((item) => {
        if (item.selectKey == selectKey) {
          selectInfo = item
        }
      })
      this.importData.forEach((v) => {
        if (!v.errList) this.$set(v, 'errList', [])
        this.tableTitleSelcetOption.forEach((m) => {
          if (m.value == selectInfo.selectKey) {
            // 有验证
            if (m.rules) {
              const reg = m.rules
              let errFlag = !reg.test(v[selectInfo.key])
              if (errFlag) {
                if (!v.errList.some((e) => e == selectInfo.key)) {
                  v.errList.push(selectInfo.key)
                }
              }
            }
            // 无需验证
            if (!m.rules) {
              let columnName = this.dialogTitleList[this.index].key
              let findIndex = v.errList.findIndex((e) => e == columnName)
              if (findIndex != -1) {
                v.errList.splice(findIndex, 1)
              }
            }
          }
        })
      })
      this.$forceUpdate()
    },
    /**
     * @description: 单元格样式的修改
     * @param {*} row
     * @param {*} column
     * @param {*} rowIndex
     * @param {*} columnIndex
     * @return {*}
     */
    cellStyle({ row, columnIndex }) {
      if (
        row.errList &&
        row.errList.indexOf(this.dialogTitleList[columnIndex].key) != -1
      ) {
        return 'color: red'
      }
    },
  },
}
</script>

<style lang="scss">
.import-dialog {
  width: 100%;

  /deep/.el-dialog__header {
    text-align: left;
  }

  .import-body {
    width: 100%;
    height: 605px;
    display: flex;
    flex-direction: column;

    .import-tips {
      width: 100%;
      font-size: 16px;
      color: #727e8e;
    }

    .btn-box {
      width: 100%;
      display: flex;
      margin-top: 20px;
    }

    .import-table {
      flex: 1;
      width: 100%;
      margin-top: 20px;
      overflow: auto;

      /deep/ .el-table {
        tr > th:first-child {
          padding-right: 0.4rem !important;
          padding-left: 0 !important;
        }

        tr > th:nth-child(2) {
          padding-left: 0 !important;
        }

        tr > td:first-child {
          padding-right: 0.4rem !important;
          padding-left: 0 !important;
        }

        tr > td:nth-child(2) {
          padding-left: 0 !important;
        }
      }

      .table-header {
        display: flex;
        flex-direction: column;

        .headText {
          height: 23px;
          line-height: 23px;
          font-size: 16px;
          color: #2b3642;
          font-weight: 500;
          margin-top: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
