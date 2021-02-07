<template>
  <div id="noPage">
    <div class="container">
      <div class="content">
        <div class="big">未加入机构</div>
        <p>抱歉，您尚未加入任何机构，请联系机构管理员</p>
        <p>
          <a-button type="primary" @click="loginOut">退出登录</a-button>
        </p>
      </div>
      <div class="content">
        <img src="../assets/404.jpg" alt="" style="width:200px;height:200px;">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#noPage {
  background-color: $clf;
  min-height: 100%;
  & .container{
    margin-left: 280px;
    padding-top: 175px;
    & .content{
      display: inline-block;
      vertical-align: middle;
      font-size: $fontSize + 2;
      & .big{
        font-size: $fontSize + 26;
        color: $fontColor1;
        font-weight: 700;
      }
    }
  }
}
</style>
<script>
import {PASSPORT_LOGOUT} from "../apis/login.js"
export default {
  data() {
    return{}
  },
  methods: {
     // 退出登录
    async loginOut() {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await PASSPORT_LOGOUT(data);
      if (res.code == 0) {
        localStorage.setItem("loginState", 0);
        this.$router.push({
          name: "loginindex"
        });
      } else {

      }
    },
  }
};
</script>
