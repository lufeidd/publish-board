<template>
  <div class="modelNoPower">
    <!-- <HeadNav type="login" :show="0" ref="head"></HeadNav> -->
    <span v-if="type == 'noOpen'">功能板块尚未开放</span>
    <span v-if="type == 'noPower'">暂无权限查看</span>
    <div style="margin-top:5px;">
      <a-button type="primary" shape="round" v-if="type == 'noOpen'" @click="noOpen">申请开放</a-button>
      <a-button type="primary" shape="round" v-if="type == 'noPower'" @click="apply">申请权限</a-button>
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
import {USER_AUTH_APPLY} from "../apis/user.js";
export default {
  props: ["type","id","organizeId"],
  methods: {
    async apply(){
      var tStamp = this.$getTimeStamp();
      let data = {
        auth_id:this.id,
        organization_id:this.organizeId,
        timestamp: tStamp
      }
      data.sign = this.$getSign(data);
      let res = await USER_AUTH_APPLY(data);
      if(res.code == 0){
        this.$message.info({
            content: "申请成功",
            icon: <a-icon type="bell" />,
          });
      }else {
        this.$message.info({
            content: res.message,
            icon: <a-icon type="bell" />,
          });
      }
    },
    noOpen() {
      // this.$message.info({
      //   content: "该功能还在施工中，暂未开放",
      //   icon: <a-icon type="exclamation-circle" />
      // });
      // console.log(this.$refs.head.publishInfo.organization_id)
    }
  }
};
</script>
