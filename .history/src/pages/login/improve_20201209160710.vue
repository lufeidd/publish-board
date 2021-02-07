<template>
  <div id="registerPage">
    <HeadNav type="login" :show="0" ref="head"></HeadNav>
    <img src="../../assets/login-bg.png" alt width="100%" height="100%" style="width:" />
    <div class="main-container">
      <p class="titles">
        <span v-if="organization_name">已加入
        <span class="publish-name">{{organization_name}}</span>，</span>请完善信息
      </p>
      <div class="head">
        <img
          src="../../assets/user1.png"
          alt
          width="80px"
          height="80px"
          v-if="userPic == 1"
        />
        <img
          src="../../assets/user2.png"
          alt
          width="80px"
          height="80px"
          v-if="userPic == 2"
        />
        <img
          src="../../assets/user3.png"
          alt
          width="80px"
          height="80px"
          v-if="userPic == 3"
        />
        <img
          src="../../assets/user4.png"
          alt
          width="80px"
          height="80px"
          v-if="userPic == 4"
        />
        <img
          src="../../assets/user5.png"
          alt
          width="80px"
          height="80px"
          v-if="userPic == 5"
        />
        <img
          src="../../assets/user6.png"
          alt
          width="80px"
          height="80px"
          v-if="userPic == 6"
        />
        <span class="change" @click="changePic">
          <a-icon type="swap" />
        </span>
      </div>
      <div class="name">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhongwen" />
        </svg>
        <div class="input">
          <input type="text" placeholder="完善真实姓名，1~16个字母或中文" v-model="name" style="text-align:center;" />
        </div>
      </div>
      <div class="name" style="margin-top:30px;">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-key" />
        </svg>
        <div class="input">
          <input type="password" placeholder="完善登录密码，6~24位字母或数字" v-model="code" style="text-align:center;" />
        </div>
      </div>
      <div class="btn" style="width:330px;display:inline-block;margin-top:40px;">
        <a-button type="primary" size="large" block @click="toIndex" style="font-size:14px !important;">进入数据中心</a-button>
      </div>
    </div>
    <div class="copy-right" v-if="screenHeight > 700">———— · 博道出版数据中心 · 博库数字出版传媒集团 · ————</div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/login.scss"></style>

<script>
import { USER_EDIT } from "../../apis/login.js";
export default {
  data() {
    return {
      name: "",
      code: null,
      organization_name: null,
      userPic: 1,
      screenHeight:0
    };
  },
  mounted() {
    this.organization_name = this.$route.query.organization_name;
    this.screenHeight = document.body.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight;
      })();
    };
  },
  methods: {
    // 完善信息
    async compelete() {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp
      };
      if (this.name) data.account = this.name;
      if (this.code) data.password = this.code;
      if (this.userPic) data.pic = this.userPic;
      data.sign = this.$getSign(data);
      let res = await USER_EDIT(data);
      if (res.code == 0) {
        localStorage.setItem('headFirst',0);
        localStorage.setItem('loginState',1);
        this.$router.push({
          name: "index"
        });
      } else {
        if (this.$systemCode.test(res.code)) {
          this.$message.info({
            content: "系统错误",
            icon: <a-icon type="exclamation-circle" />
          });
        } else {
          this.$message.info({
            content: res.message,
            icon: <a-icon type="exclamation-circle" />
          });
        }
      }
    },
    toIndex() {
      var regu = new RegExp(/^[0-9a-zA-Z]{6,24}$/);
      var regp = new RegExp(/^[\u4e00-\u9fa5a-zA-Z]{1,16}$/);
      if (this.name) {
        if (!regp.test(this.name)) {
          this.$message.info({
            content: "姓名格式不正确",
            icon: <a-icon type="exclamation-circle" />
          });
          return;
        }
      } else {
        this.$message.info({
          content: "请填写姓名",
          icon: <a-icon type="exclamation-circle" />
        });
        return;
      }
      if (this.code) {
        if (!regu.test(this.code)) {
          this.$message.info({
            content: "密码格式不正确",
            icon: <a-icon type="exclamation-circle" />
          });
          return;
        }
      } else {
        this.$message.info({
          content: "请设置密码",
          icon: <a-icon type="exclamation-circle" />
        });
        return;
      }
      this.compelete();
    },
    changePic(){
      if(this.userPic < 6){
        this.userPic ++;
      }else if(this.userPic == 6){
        this.userPic = 1;
      }
    }
  }
};
</script>
