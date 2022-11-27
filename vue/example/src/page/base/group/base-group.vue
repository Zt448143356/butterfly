<template>
  <div @click="click">
    <div class="base-group" :style="groupStyle">
      <div class="base-group-header">
        {{itemData.userData.name}}
      </div>
      <div class="base-group-content">
        <el-button @click="editData">修改group大小</el-button>
      </div> 
    </div>
  </div>
</template>

<script>
export default {
  name: "base-group",
  props: {
    itemData: {
      type: Object,
    },
    canvasData: {
      type: Object
    },
  },
  data: () => {
    return {
      groupStyle: {
        width: '150px',
        height: '150px',
      }
    }
  },
  methods: {
    click() {
      console.log('group click');
    },
    editData() {
      this.groupStyle.height = '300px';
      this.canvasData.height = 300;
    }
  },
  created() {
    // console.log('Group -> canvasData', this.canvasData);
  }
};
</script>

<style scoped>
  .base-group {
    border-radius: 5px;
    box-shadow: 3px 4px 16px #888888;
  }

  .base-group .base-group-header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    height: 30px;
    background-color: #aaa;
    text-align: center;
    line-height: 30px;
  }

  .base-group .base-group-content {
    min-height: 120px;
  }
</style>
