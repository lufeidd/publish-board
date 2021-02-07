<template>
  <div id="registerPage">
    <HeadNav type="login" :show="0" ref="head"></HeadNav>
    <img src="../../assets/login-bg.png" alt  style="width:100%;height:100%;" />
    <div class="main-container">
      <p class="titles edit">{{type == 'edit'?'修改密码':'找回密码'}}</p>
      <div class="name edit"  style="margin-top: 80px">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-mobile" />
        </svg>
        <div class="input">
          <input type="text" placeholder="输入手机号" v-model="mobile" />
          <span>
            <span
              class="click-font get-code"
              v-if="sendTime.time == 0"
              @click="send"
              >{{ desc }}</span
            >
            <span class="click-font get-code" v-else
              >{{ sendTime.time }}s后重新发送</span
            >
          </span>
        </div>
      </div>
      <div class="name edit" style="margin-top: 30px">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-authentication" />
        </svg>
        <div class="input">
          <input
            type="text"
            placeholder="输入验证码"
            v-model="code"
          />
        </div>
      </div>
      <div class="name edit" style="margin-top: 30px">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-key" />
        </svg>
        <div class="input">
          <input
            type="password"
            placeholder="输入新密码，6~24位字母或数字"
            v-model="passcode"
          />
        </div>
      </div>
      <div
        class="btn"
        style="width: 330px; display: inline-block; margin-top: 40px"
      >
        <a-button
          type="primary"
          size="large"
          block
          style="font-size: 14px !important"
          @click="editPassword"
          >提交密码</a-button
        >
      </div>
    </div>
    <div class="copy-right" v-if="screenHeight > 700">
      ———— · 博道出版数据实验室 · 博库数字出版传媒集团 · ————
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/login.scss"></style>

<script>
import { PASSPORT_UPDATEPWD } from "../../apis/login.js";
import { COMMON_CAPTCHA_SMS } from "../../apis/common.js";
export default {
  data() {
    return {
      mobile: "",
      code: null,
      passcode:null,
      desc: "获取验证码",
      sendTime: {
        time: 0
      },
      type:null,
      screenHeight:0
    }
  },
  mounted() {
    this.type = this.$route.query.type;
    this.screenHeight = document.body.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight;
      })();
    };
  },
  methods: {
    async sendNumCode() {
      var tStamp = this.$getTimeStamp();
      let data = {
        mobile: this.mobile,
        type: "update_pwd",
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await COMMON_CAPTCHA_SMS(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "发送成功", 0);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async compelete(){
      var tStamp = this.$getTimeStamp();
      let data = {
        mobile: this.mobile,
        code: this.code,
        pwd: this.passcode,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await PASSPORT_UPDATEPWD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "修改成功，即将跳转至登录页", 0);
        let _this = this;
        setTimeout(()=>{
          _this.$router.push({name:"loginindex"})
        },2000)
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    send() {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$refs.head.globalTip(1, "手机号码有误，请重新输入", 0);
        return;
      }
      this.sendTime.time = 60;
      this.$countDown(this.sendTime);
      this.sendNumCode();
    },
    editPassword() {
      var regu = new RegExp(/^[0-9a-zA-Z]{6,24}$/);
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$refs.head.globalTip(1, "手机号码有误，请重新输入", 0);
        return;
      }
      if(!this.code){
        this.$refs.head.globalTip(1, "请输入验证码", 0);
        return;
      }
      if (this.passcode) {
        if (!regu.test(this.passcode)) {
          this.$refs.head.globalTip(1, "密码格式不正确", 0);
          return;
        }
      } else {
        this.$refs.head.globalTip(1, "请输入密码", 0);
        return;
      }
      this.compelete();
    },
  },
};
</script>
