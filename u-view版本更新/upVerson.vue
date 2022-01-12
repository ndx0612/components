<!-- 此页面只作用于app，小程序不支持此页面 -->
<template>
  <view>
    <u-modal v-model="show" :show-cancel-button="true" :show-confirm-button="!downloding" confirm-text="更新" :title="title" @cancel="cancel" @confirm="confirm" :async-close="true">
      <view class="u-update-content">
        <view v-if="!downloding" class="up-tips">
          版本: {{currentVersion}} -> {{vuex_version}}
        </view>
        <view v-else>
          <u-line-progress :striped="true" :percent="percent" :striped-active="true">
          </u-line-progress>
          <view>已下载：{{totalBytesWritten + 'M / ' + totalBytesExpectedToWrite + 'M'}}</view>
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
let downloadTask;
export default {
  data() {
    return {
      currentVersion: "1.0.0",
      title: "发现新版本",
      show: true,
      downloding: false,
      content: ``, // 传递给uni-app"rich-text"组件的富文本内容，可以使用"<br>"进行换行
      percent: 0,
      totalBytesWritten: 0,
      totalBytesExpectedToWrite: 0,
    };
  },
  created() {
    this.currentVersion = plus.runtime.version;
  },
  methods: {
    //取消将关闭app
    cancel() {
      //有下载先终止下载任务
      if (downloadTask) {
        downloadTask.abort();
      }
      if (uni.getSystemInfoSync().platform == "ios") {
        //ios关闭程序
        plus.ios
          .import("UIApplication")
          .sharedApplication()
          .performSelector("exit");
      } else if (uni.getSystemInfoSync().platform == "android") {
        plus.runtime.quit();
      }
    },
    //确认更新
    confirm() {
      this.downloding = true;
      this.title = "更新中...";
      //整包安装
      downloadTask = uni.downloadFile({
        //执行下载
        url: this.vuex_download_path, //下载地址
        success: (downloadResult) => {
          //下载成功
          if (downloadResult.statusCode == 200) {
            plus.runtime.install(
              //安装
              downloadResult.tempFilePath,
              {
                force: true,
              },
              function (res) {
                plus.runtime.restart(); //重启
              }
            );
          }
        },
      });

      //下载进度
      downloadTask.onProgressUpdate((res) => {
        this.percent = res.progress;
        this.totalBytesWritten = (res.totalBytesWritten / 1024 / 1024).toFixed(
          2
        );
        this.totalBytesExpectedToWrite = (
          res.totalBytesExpectedToWrite /
          1024 /
          1024
        ).toFixed(2);
      });

      //下载热更新资源并安装
      // uni.downloadFile({
      // 	url: data.wgtUrl, //热更新地址
      // 	success: (downloadResult) => {
      // 		uni.hideLoading();
      // 		if (downloadResult.statusCode === 200) {
      // 			plus.runtime.install(downloadResult.tempFilePath, {
      // 				force: false
      // 			}, function() {
      // 				console.log('install success...');
      // 				//应用重启
      // 				plus.runtime.restart();
      // 			}, function(e) {
      // 				console.error('install fail...');
      // 			});
      // 		}
      // 	}
      // });
    },
  },
};
</script>

<style scoped lang="scss">
.u-update-content {
  font-size: 26rpx;
  color: $u-content-color;
  line-height: 1.7;
  padding: 30rpx;

  .up-tips {
    width: 100%;
    text-align: center;
  }
}
</style>
