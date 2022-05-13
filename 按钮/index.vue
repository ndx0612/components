<template>
  <div v-if="type=='open'" class="open-button cursor-pointer" :class="{disabled:disabled}">
    <slot></slot>
  </div>
  <div v-else class="close-button cursor-pointer" :class="{disabled:disabled}">
    <slot></slot>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "SignInButton",
  props: {
    /**
     * button类型
     * 可选值：open、close
     */
    type: {
      type: String,
      required: false,
      default: "close",
    },
    /**
     * true为禁用状态
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
});
</script>
<style lang="scss">
.close-button {
  line-height: 40px;
  text-align: center;
  width: 120px;
  height: 40px;
  border: 1px solid #399cac;
  border-radius: 4px;
  color: #00f9ff;
  font-size: 16px;
}

.close-button:hover {
  background: linear-gradient(
    180deg,
    rgba(0, 249, 255, 0),
    rgba(0, 249, 255, 0.4)
  );
}

.close-button:active {
  color: #399cac;
}

.open-button {
  line-height: 40px;
  text-align: center;
  width: 120px;
  height: 40px;
  border: 1px solid #399cac;
  border-radius: 4px;
  font-size: 16px;
  background: linear-gradient(
    180deg,
    rgba(0, 249, 255, 0),
    rgba(0, 249, 255, 0.4)
  );
}

.open-button:hover {
  background: linear-gradient(
    180deg,
    rgba(0, 249, 255, 0.1),
    rgba(0, 249, 255, 0.8)
  );
}

.open-button:active {
  color: #399cac;
  background: linear-gradient(
    180deg,
    rgba(0, 249, 255, 0),
    rgba(0, 249, 255, 0.4)
  );
}

.disabled {
  color: #399cac;
  background: linear-gradient(
    180deg,
    rgba(0, 249, 255, 0),
    rgba(0, 249, 255, 0.4)
  );
}
.disabled:hover {
  cursor: not-allowed !important;
  background: linear-gradient(
    180deg,
    rgba(0, 249, 255, 0),
    rgba(0, 249, 255, 0.4)
  );
}
</style>