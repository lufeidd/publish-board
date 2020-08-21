<template>
  <div class="modelNoPower">
    <span v-if="type == 'noOpen'">功能板块尚未开放</span>
    <span v-if="type == 'noPower'">暂无权限查看</span>
    <div style="margin-top:5px;">
      <a-button type="primary" shape="round" v-if="type == 'noOpen'" @click="noOpen">申请开放</a-button>
      <a-button type="primary" shape="round" v-if="type == 'noPower'" @click="noOpen">申请权限</a-button>
    </div>
  </div>
</template>
<style scoped lang="scss">
.modelNoPower {
  position: absolute;
  width: 100%;
  top: 50%;
  margin-top: -29px;
  text-align: center;
  font-size: $fontSize - 2;
}
</style>
<script>
export default {
  props: ["type"],
  methods: {
    noOpen() {
      this.$message.info({
        content: "该功能还在施工中，暂未开放",
        icon: <a-icon type="exclamation-circle" />
      });
    }
  }
};
</script>
