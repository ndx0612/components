<template>
  <div>
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
const aa = () => {
  var list = [
    { id: 2, parent_id: 0, name: "上海市" },
    { id: 1, parent_id: 0, name: "北京市" },
    { id: 3, parent_id: 0, name: "广东省" },

    { id: 12, parent_id: 1, name: "朝阳区" },
    { id: 241, parent_id: 24, name: "田林街道" },
    { id: 31, parent_id: 3, name: "广州市" },
    { id: 13, parent_id: 1, name: "昌平区" },
    { id: 2421, parent_id: 242, name: "上海科技绿洲" },
    { id: 21, parent_id: 2, name: "静安区" },
    { id: 242, parent_id: 24, name: "漕河泾街道" },
    { id: 22, parent_id: 2, name: "黄浦区" },
    { id: 11, parent_id: 1, name: "顺义区" },
    { id: 24, parent_id: 2, name: "徐汇区" },
    { id: 2422, parent_id: 242, name: "漕河泾开发区" },
    { id: 32, parent_id: 3, name: "深圳市" },
    { id: 33, parent_id: 3, name: "东莞市" },
  ];
  const arr2 = arrayToTreeV3(list, 0);
  console.log(arr2);
};

/**
 * 数组转树形结构: （推荐方法效率最高）
 * @param {array} list 被转换的数组
 * @param {number|string} root 根节点（最外层节点）的 id
 * @return array
 */
function arrayToTree(list, root) {
  const result = []; // 用于存放结果
  const map = {}; // 用于存放 list 下的节点

  // 1. 遍历 list，将 list 下的所有节点以 id 作为索引存入 map
  for (const item of list) {
    map[item.id] = { ...item }; // 浅拷贝
  }

  // 2. 再次遍历，将根节点放入最外层，子节点放入父节点
  for (const item of list) {
    // 3. 获取节点的 id 和 父 id
    const { id, parent_id } = item; // ES6 解构赋值
    // 4. 如果是根节点，存入 result
    if (item.parent_id === root) {
      result.push(map[id]);
    } else {
      // 5. 反之，存入到父节点
      map[parent_id].children
        ? map[parent_id].children.push(map[id])
        : (map[parent_id].children = [map[id]]);
    }
  }

  // 将结果返回
  return result;
}

/**
 * 数组转树形结构
 * @param {array} list 被转换的数组
 * @param {number|string} root 根节点（最外层节点）
 * @returns array
 */
function arrayToTreeV2(list, root) {
  const result = []; // 用于存放结果
  const map = {}; // 用于存放 list 下的节点

  // 遍历 list
  for (const item of list) {
    // 1. 获取节点的 id 和 父 id
    const { id, parent_id } = item; // ES6 解构赋值

    // 2. 将节点存入 map
    if (!map[id]) map[id] = {};

    // 3. 根据 id，将节点与之前存入的子节点合并
    map[id] = map[id].children
      ? { ...item, children: map[id].children }
      : { ...item };

    // 4. 如果是根节点，存入 result
    if (parent_id === root) {
      result.push(map[id]);
    } else {
      // 5. 反之，存入父节点
      if (!map[parent_id]) map[parent_id] = {};
      if (!map[parent_id].children) map[parent_id].children = [];
      map[parent_id].children.push(map[id]);
    }
  }

  // 将结果返回
  return result;
}

/**
 * 数组转树形结构
 * @param {array} list 被转换的数组
 * @param {number|string} root 根节点（最外层节点）
 * @returns array
 */
function arrayToTreeV3(list, root) {
  return list
    .filter((item) => item.parent_id === root)
    .map((item) => ({ ...item, children: arrayToTreeV3(list, item.id) }));
}
</script>

<style lang='scss' scoped>
</style>
