<template>
  <div class="w-[100%] h-[100%]" @click="methods.closeMenu">
    <div class="box" @contextmenu.prevent="methods.openMenu($event)"></div>
    <!-- 右键菜单 -->
    <div class="right-menu" v-show="data.rightMenu.isShow" :style="{top: data.rightMenu.pageY+'px', left: data.rightMenu.pageX+'px'}">
    </div>
  </div>
</template>

<script setup>
import { reactive, getCurrentInstance, onMounted } from "vue";
const data = reactive({
  // 右键菜单
  rightMenu: {
    isShow: false,
    pageX: "",
    pageY: "",
  },
});

const methods = reactive({
  // 关闭菜单
  closeMenu() {
    data.rightMenu.isShow = false;
  },
  // 显示菜单
  openMenu(value) {
    data.rightMenu.isShow = true;
    data.rightMenu.pageX = value.pageX;
    data.rightMenu.pageY = value.pageY;
  },
});
</script>
<style scoped lang='scss'>
.box {
  width: 200px;
  height: 40px;
  border: solid 1px rgb(137, 130, 130);
  border-radius: 5px;
  margin: 10px 20px;
}
.right-menu {
  width: 166px;
  height: 122px;
  background: #ffffff;
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
  border-radius: 4px;
  border: 1px solid #e4e7ed;
  position: fixed;
}
</style>