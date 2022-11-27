<template>
  <div class="base-node">
    <div>测试.vue 的node节点{{itemData.id}}</div>
    <div class="center">
      <el-button @click="click" type="success">button</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: "base-node",
  props: {
    itemData: {
      type: Object,
    },
    canvasNode: {// 兼容历史版本。2.0.0移除
      type: Object
    },
    canvasData: {// 推荐使用这个参数
      type: Object
    },
  },
  methods: {
    click(e) {
      console.log('click');
      e.stopPropagation();
    }
  },
  created() {
    // console.log(this.itemData);
    // console.log('Node -> canvasData === canvasNode', this.canvasData === this.canvasNode)
    // console.log('Node -> canvasData', this.canvasData);
    // console.log('Node -> canvasNode', this.canvasNode);
  }
};
</script>

<style scoped>
  .base-node {
    width: 190px;
    border-radius: 5px;
    border: 1px solid #aaa;
    padding: 10px;
    box-shadow: 3px 4px 16px #888888;
  }

  .base-node .center {
    text-align: center;
  }
</style>
