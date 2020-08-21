<template>
  <div id="registerPage">
    <img src="../../assets/login-bg.png" alt width="100%" height="100%" />
    <div class="main-container" v-if="showLogin == false">
      <div class="left">
        <img src="../../assets/login-advertise.png" alt="" width="100%" height="100%" style="border-radius: 10px 0 0 10px;">
      </div>
      <div class="right">
        <p class="title" v-if="inviteCode">
          {{invite_name}}
          <span class="invite">邀请你加入</span>
          {{organization_name}}
        </p>
        <p class="title" v-else>{{codeType == 1?'密码登录':'验证码登录'}}</p>
        <div class="mobile">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-mobile" />
          </svg>
          <div class="input">
            <input type="text" placeholder="输入手机号" v-model="mobile" />
            <span v-if="codeType == 2">
              <span class="click-font get-code" v-if="sendTime.time == 0" @click="send">{{desc}}</span>
              <span class="click-font get-code" v-else>{{sendTime.time}}s后重新发送</span>
            </span>
          </div>
        </div>
        <div class="code" v-if="codeType == 2">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-authentication" />
          </svg>
          <div class="input">
            <input type="text" placeholder="输入验证码" v-model="code" />
          </div>
          <div class="tips" v-if="isShort">短信验证码错误</div>
        </div>
        <div class="code" v-if="codeType == 1">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-authentication" />
          </svg>
          <div class="input">
            <input type="password" placeholder="输入密码" v-model="passCode" />
          </div>
          <div class="tips" v-if="isPassword">密码错误</div>
        </div>
        <div class="btn">
          <a-button type="primary" size="large" block @click="test" style="font-size:14px !important;">登录</a-button>
          <div class="word clearfix">
            <span class="float-left" v-if="inviteCode">
              没有账号？
              <span class="click-font" @click="toRegister">去注册</span>
            </span>
            <span class="float-right">
              <span class="click-font" @click="noOpen">忘记密码</span>
              <span class="click-font" style="margin-left:10px;" @click="codeChange">{{codeDesc}}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="main-container" v-else>
      <p class="titles">
        <span class="publish-name">{{invite_name}}</span> 邀请你加入
        <span class="publish-name">{{organization_name}}</span>
      </p>
      <div style="margin-top:40px;">
        <img
          src="../../assets/login-invite1.png"
          alt
          width="80px"
          height="80px"
          style="margin-right:5px;"
        />
        <img
          src="../../assets/login-invite2.png"
          alt
          width="80px"
          height="80px"
          style="margin-right:5px;"
        />
        <img
          src="../../assets/login-invite3.png"
          alt
          width="80px"
          height="80px"
        />
      </div>
      <div style="margin-bottom:40px;margin-top:10px;">
        <img
          src="../../assets/login-invite4.png"
          alt
          width="80px"
          height="80px"
          style="margin-right:5px;"
        />
        <img
          src="../../assets/login-invite5.png"
          alt
          width="80px"
          height="80px"
          style="margin-right:5px;"
        />
        <img
          src="../../assets/login-invite6.png"
          alt
          width="80px"
          height="80px"
        />
      </div>
      <div style="width:330px;display:inline-block;">
        <!-- <router-link to="/"> -->
          <a-button type="primary" size="large" block @click="join" style="font-size:14px !important;">加入机构</a-button>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="copy-right">———— · 淘普出版数据中心 · 博库数字出版传媒集团 · ————</div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/login.scss"></style>

<script>
import {
  PASSPORT_LOGIN,
  USER_INVITE_INFO,
  USER_INVITE_CONSUME
} from "../../apis/login.js";
import { COMMON_CAPTCHA_SMS } from "../../apis/common.js";
export default {
  data() {
    return {
      invite_name: null,
      organization_name: null,
      last_organization_id: 0,
      inviteCode: null,
      showLogin: false,
      mobile: "",
      code: "",
      passCode: "",
      desc: "获取验证码",
      codeType: 2,
      codeDesc: "密码登录",
      isShort: false,
      isPassword: false,
      sendTime: {
        time: 0
      }
    };
  },
  mounted() {
    var _this = this;
    if (this.$route.query.mobile) {
      this.mobile = this.$route.query.mobile;
    }
    if (this.$route.query.inviteCode) {
      this.inviteCode = this.$route.query.inviteCode;
      this.translateInvite();
    }
    document.onkeydown = function(event) {
      var e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 13) {
        if (_this.showLogin) {
          _this.join();
        } else {
          _this.test();
        }
      }
    };
  },
  watch: {
    code(val) {
      if (!val) this.isShort = false;
    },
    passCode(val) {
      if (!val) this.isPassword = false;
    }
  },
  methods: {
    noOpen() {
      this.$message.info({
        content: "该功能还在施工中，暂未开放",
        icon: <a-icon type="exclamation-circle" />
      });
    },
    toRegister() {
      this.$router.push({
        name: "register",
        query: {
          inviteCode: this.inviteCode
        }
      });
    },
    send() {
      if (!/^1[3456789]\d{9}$/.test(this.mobile)) {
        this.$message.info({
          content: "手机号码有误，请重新输入",
          icon: <a-icon type="exclamation-circle" />
        });
        return;
      }
      this.sendTime.time = 60;
      this.$countDown(this.sendTime);
      this.sendNumCode();
    },
    codeChange() {
      if (this.codeType == 2) {
        this.codeType = 1;
        this.codeDesc = "验证码登录";
        this.code = null;
      } else if (this.codeType == 1) {
        this.codeType = 2;
        this.codeDesc = "密码登录";
        this.passCode = null;
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
      let _code = this.codeType == 1 ? this.passCode : this.code
      console.log(1010,_code)
      if(_code.length == 0){
        this.$message.info({
          content: this.codeType == 1 ? "请输入密码" : "请输入验证码",
          icon: <a-icon type="exclamation-circle" />
        });
        return;
      }
      // this.translateInvite();
      this.login();
    },
    async sendNumCode() {
      let data = {
        mobile: this.mobile,
        type: "login"
      };
      let res = await COMMON_CAPTCHA_SMS(data);
      if (res.code == 0) {
        this.$message.info({
          content: "发送成功",
          icon: <a-icon type="bell" />
        });
      } else {
        this.$message.info({
          content: res.message,
          icon: <a-icon type="exclamation-circle" />
        });
      }
    },
    // 加入机构
    async join() {
      this.useInvite();
    },
    // 登录
    async login() {
      let data = {
        mobile: this.mobile,
        type: this.codeType,
        code: this.codeType == 1 ? this.passCode : this.code
      };
      let res = await PASSPORT_LOGIN(data);
      if (res.code == 0) {
        localStorage.setItem("headFirst", 0);
        if (this.inviteCode) {
          location.reload();
        } else {
          this.$router.push({
            name: "index"
          });
        }
      } else {
        if (res.code == 5002) {
          this.codeType == 1 ? (this.isPassword = true) : (this.isShort = true);
        }
        this.$message.info({
          content: res.message,
          icon: <a-icon type="exclamation-circle" />
        });
      }
    },
    // 解析邀请码
    async translateInvite() {
      let data = {
        invite_code: this.inviteCode
      };
      let res = await USER_INVITE_INFO(data);
      if (res.code == 0) {
        this.invite_name = res.data.invite_name;
        this.organization_name = res.data.organization_name;
        this.showLogin = res.data.is_login;
        this.last_organization_id = res.data.organization_id;
      } else {
        this.$message.info({
          content: res.message,
          icon: <a-icon type="exclamation-circle" />
        });
      }
    },
    // 使用邀请码
    async useInvite() {
      let data = {
        invite_code: this.inviteCode
      };
      let res = await USER_INVITE_CONSUME(data);
      if (res.code == 0) {
        localStorage.setItem("headFirst", 0);
        this.$message.info({
          content: "加入机构成功",
          icon: <a-icon type="exclamation-circle" />
        });
        setTimeout(() => {
          this.$router.replace({
            name: "index",
            query: {
              last_organization_id: this.last_organization_id
            }
          });
        }, 2000);
      } else {
        this.$message.info({
          content: res.message,
          icon: <a-icon type="exclamation-circle" />
        });
      }
    }
  }
};
</script>
