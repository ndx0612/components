<template>
  <view class="">
    <u-dropdown>
      <u-dropdown-item v-model="value1" title="距离" :options="options1" @change="change1" @click="send">
      </u-dropdown-item>
      <u-dropdown-item v-model="value2" title="温度" :options="options2" @change="change2" @click="send">
      </u-dropdown-item>
    </u-dropdown>
    <slot></slot>
  </view>
</template>

<script>
export default {
  data() {
    return {
      prop: {
        distance: "",
        temperature: "",
      },
      value1: 1,
      value2: 2,
      options1: [
        {
          label: "默认排序",
          value: 3,
        },
        {
          label: "距离优先",
          value: 4,
        },
      ],
      options2: [
        {
          label: "去冰",
          value: 5,
        },
        {
          label: "加冰",
          value: 6,
        },
      ],
    };
  },
  methods: {
    change1(index) {
      this.prop.distance = index;
    },
    change2(index) {
      this.prop.temperature = index;
    },
    send() {
      // 第一个测试填写父组件接收的名称,第二个填需要传递的数据
      this.$emit("getProps", this.prop);
    },
  },
};
</script>
