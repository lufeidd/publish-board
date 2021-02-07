<template>
  <div id="registerPage">
    <img src="../../assets/login-bg.png" alt width="100%" height="100%" />
    <div class="main-container">
      <div class="left">
        <img
          src="../../assets/login-advertise.png"
          alt
          width="100%"
          height="100%"
          style="border-radius: 10px 0 0 10px;width:"
        />
      </div>
      <div class="right">
        <p class="title">
          {{invite_name}}
          <span class="invite">邀请你加入</span>
          {{organization_name}}
        </p>
        <div class="mobile">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mobile" />
          </svg>
          <div class="input">
            <input type="text" placeholder="输入手机号" v-model="mobile" />
            <span class="click-font get-code" v-if="sendTime.time == 0" @click="send">{{desc}}</span>
            <span class="click-font get-code" v-else>{{sendTime.time}}s后重新发送</span>
          </div>
        </div>
        <div class="code">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-authentication" />
          </svg>
          <div class="input">
            <input type="text" placeholder="输入验证码" v-model="code" />
          </div>
          <div class="tips" v-if="isShort">短信验证码错误</div>
        </div>
        <div class="btn">
          <a-button
            type="primary"
            size="large"
            block
            @click="test"
            style="font-size:14px !important;"
          >注册并加入机构</a-button>
          <div class="word">
            已有账号？
            <span class="click-font" @click="toLogin">去登陆</span>
          </div>
        </div>
      </div>
    </div>
    <div class="copy-right" v-if="screenHeight > 700">———— · 博道出版数据中心 · 博库数字出版传媒集团 · ————</div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/login.scss"></style>

<script>
import {
  PASSPORT_LOGIN,
  USER_INVITE_INFO,
  USER_INVITE_CONSUME,
  PASSPORT_REGISTER,
  USER_CHECK
} from "../../apis/login.js";
import { COMMON_CAPTCHA_SMS } from "../../apis/common.js";
export default {
  data() {
    return {
      invite_name: null,
      organization_name: null,
      inviteCode: null,
      mobile: "",
      code: "",
      desc: "获取验证码",
      isShort: false,
      sendTime: {
        time: 0
      },
      screenHeight:0,
    };
  },
  mounted() {
    if (this.$route.query.inviteCode) {
      this.inviteCode = this.$route.query.inviteCode;
      this.translateInvite();
    } else {
      this.$router.replace({ name: "nullpage" });
    }
    this.screenHeight = document.body.clientHeight;
    window.onresize = () => {
      return (() => {
        this.screenHeight = document.body.clientHeight;
      })();
    };
  },
  methods: {
    send() {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.gl;
        this.$message.info({
          content: "手机号码有误，请重新输入",
          icon: <a-icon type="exclamation-circle" />
        });
      } else {
        this.checkRegister();
      }
    },
    test() {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$message.info({
          content: "手机号码有误，请重新输入",
          icon: <a-icon type="exclamation-circle" />
        });
        return;
      }
      if (this.code.length == 0) {
        this.$message.info({
          content: "请输入验证码",
          icon: <a-icon type="exclamation-circle" />
        });
        return;
      }
      this.login();
    },
    toLogin() {
      this.$router.push({
        name: "loginindex",
        query: {
          inviteCode: this.inviteCode
        }
      });
    },
    // 注册并登录
    async login() {
      var tStamp = this.$getTimeStamp();
      let data = {
        mobile: this.mobile,
        invite_code: this.inviteCode,
        code: this.code,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await PASSPORT_REGISTER(data);
      if (res.code == 0) {
        this.$router.replace({
          name: "improve",
          query: {
            organization_name: this.organization_name
          }
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
        this.isShort = true;
      }
    },
    // 解析邀请码
    async translateInvite() {
      var tStamp = this.$getTimeStamp();
      let data = {
        invite_code: this.inviteCode,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await USER_INVITE_INFO(data);
      if (res.code == 0) {
        this.invite_name = res.data.invite_name;
        this.organization_name = res.data.organization_name;
        if (res.data.is_login) {
          this.$router.push({
            name: "loginindex",
            query: {
              inviteCode: this.inviteCode
            }
          });
        }
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
    // 检测手机是否已经注册
    async checkRegister() {
      var tStamp = this.$getTimeStamp();
      let data = {
        mobile: this.mobile,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await USER_CHECK(data);
      if (res.code == 0) {
        if (res.data.is_register) {
          this.$message.info({
            content: "该号码已注册，可直接登录",
            icon: <a-icon type="exclamation-circle" />
          });
          let _this = this;
          setTimeout(() => {
            _this.$router.push({
              name: "loginindex",
              query:{
                mobile: _this.mobile,
                inviteCode: _this.inviteCode
              }
            });
          }, 2000);
        } else {
          this.sendTime.time = 60;
          this.$countDown(this.sendTime);
          this.sendCode();
        }
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
    // 发送验证码
    async sendCode() {
      var tStamp = this.$getTimeStamp();
      let data = {
        mobile: this.mobile,
        type: "register",
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await COMMON_CAPTCHA_SMS(data);
      if (res.code == 0) {
        this.$message.info({
          content: "发送成功",
          icon: <a-icon type="bell" />
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
    }
  }
};
</script>
