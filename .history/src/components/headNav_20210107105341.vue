<template>
  <div id="headPage" v-if="show">
    <a-affix :offset-top="0">
      <div class="scroll-top" v-if="fixed">
        <div class="wd-1220">
          <div class="clear-fix">
            <div class="float-left">
              <span class="logo-font">博道出版数据实验室</span>
              <span class="publish" style="margin-bottom: 2px">
                <a-dropdown
                  :trigger="['click']"
                  v-model="choose"
                  @visibleChange="triggerChange"
                >
                  <a
                    class="ant-dropdown-link"
                    @click="(e) => e.preventDefault()"
                    style="color: #f4f7fd; font-size: 12px"
                  >
                    {{ publishInfo.organization_name }}
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-input
                      style="margin: 5px 10px; width: 200px"
                      placeholder="请输入机构名称"
                      v-model="inputVal"
                      @change="onSearch"
                    />
                    <a-menu-item
                      v-for="(item, index) in publishList"
                      :key="index"
                    >
                      <a
                        href="javascript:;"
                        style="
                          padding: 5px 15px;
                          color: #515a6e;
                          font-size: 12px;
                        "
                        @click="selectOpt(item, index)"
                        >{{ item.organization_name }}</a
                      >
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
            </div>
            <div class="float-right">
              <span
                @click="urlChange(1)"
                style="margin-right: 20px; cursor: pointer; color: #fff"
                v-if="accountInfo.type == 1"
              >
                <a-icon type="user-add" />
                <span style="font-size: 12px">邀请新成员加入</span>
              </span>
              <span
                @click="urlChange(2)"
                style="margin-right: 20px; cursor: pointer; color: #fff"
                v-if="
                  accountInfo.type == 2 &&
                  publishInfo.user_organization_type == 1
                "
              >
                <a-icon type="user-add" />
                <span style="font-size: 12px">邀请新成员加入</span>
              </span>
              <span style="margin-right: 20px; cursor: pointer">
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click.stop="$router.push({ name: 'usersuggesstion' })"
                >
                  <use xlink:href="#icon-kefu" />
                </svg>
              </span>
              <span style="margin-right: 20px; cursor: pointer">
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click.stop="$router.push({ name: 'helpindex' })"
                >
                  <use xlink:href="#icon-question" />
                </svg>
              </span>

              <span style="margin-right: 20px; cursor: pointer">
                <a-badge dot v-if="allState">
                  <svg
                    class="icon"
                    aria-hidden="true"
                    @click.stop="$router.push({ name: 'usernotice' })"
                  >
                    <use xlink:href="#icon-notice" />
                  </svg>
                </a-badge>
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click.stop="$router.push({ name: 'usernotice' })"
                  v-else
                >
                  <use xlink:href="#icon-notice" />
                </svg>
              </span>
              <span class="data-tab data-tab-five" style="margin: 0 10px 0 0">
                <span v-if="accountInfo.type == 1">平台级</span>
                <span v-else-if="publishInfo.user_organization_type == 1"
                  >机构管理员</span
                >
                <span v-else>普通成员</span>
              </span>
              <span>
                <a-dropdown :trigger="['click']" placement="bottomRight">
                  <a
                    class="ant-dropdown-link"
                    @click="(e) => e.preventDefault()"
                    style="color: #f4f7fd; font-size: 12px"
                  >
                    <span>
                      <img
                        size="small"
                        src="../assets/user1.png"
                        style="border-radius: 50%; width: 24px; height: 24px"
                        v-if="accountInfo.pic == 1"
                      />
                      <img
                        size="small"
                        src="../assets/user2.png"
                        style="border-radius: 50%; width: 24px; height: 24px"
                        v-else-if="accountInfo.pic == 2"
                      />
                      <img
                        size="small"
                        src="../assets/user3.png"
                        style="border-radius: 50%; width: 24px; height: 24px"
                        v-else-if="accountInfo.pic == 3"
                      />
                      <img
                        size="small"
                        src="../assets/user4.png"
                        style="border-radius: 50%; width: 24px; height: 24px"
                        v-else-if="accountInfo.pic == 4"
                      />
                      <img
                        size="small"
                        src="../assets/user5.png"
                        style="border-radius: 50%; width: 24px; height: 24px"
                        v-else-if="accountInfo.pic == 5"
                      />
                      <img
                        size="small"
                        src="../assets/user6.png"
                        style="border-radius: 50%; width: 24px; height: 24px"
                        v-else-if="accountInfo.pic == 6"
                      />
                      <span
                        v-else
                        class="no-pic"
                        style="
                          min-width: 24px;
                          min-height: 24px;
                          border-radius: 50%;
                        "
                      ></span>
                    </span>
                    {{ accountInfo.account }}
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay" style="top: 5px">
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        style="
                          padding: 5px 15px;
                          color: #515a6e;
                          font-size: 12px;
                          text-align: center;
                        "
                        @click="$router.push({ name: 'userinfo' })"
                        >账号管理</a
                      >
                    </a-menu-item>
                    <a-menu-item
                      v-if="
                        accountInfo.type == 2 &&
                        publishInfo.user_organization_type == 1
                      "
                    >
                      <a
                        href="javascript:;"
                        style="
                          padding: 5px 15px;
                          color: #515a6e;
                          font-size: 12px;
                          text-align: center;
                        "
                        @click="$router.push({ name: 'organizeinfo' })"
                        >机构管理</a
                      >
                    </a-menu-item>
                    <a-menu-item v-if="accountInfo.type == 1">
                      <a
                        href="javascript:;"
                        style="
                          padding: 5px 15px;
                          color: #515a6e;
                          font-size: 12px;
                          text-align: center;
                        "
                        @click="$router.push({ name: 'adminindex' })"
                        >平台管理</a
                      >
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        style="
                          padding: 5px 15px;
                          color: #515a6e;
                          font-size: 12px;
                          text-align: center;
                        "
                        @click="loginOut"
                        >退出登录</a
                      >
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
            </div>
          </div>
          <!-- 标签导航 -->
          <div class="tab-nav">
            <span
              :class="type == 'index' ? 'active' : ''"
              @click.stop="$router.push({ name: 'index' })"
              >首页</span
            >
            <span
              :class="type == 'publish' ? 'active' : ''"
              @click.stop="$router.push({ name: 'publishindex' })"
              >本社</span
            >
            <span
              :class="type == 'actual' ? 'active' : ''"
              @click.stop="$router.push({ name: 'actualboard' })"
              >实时</span
            >
            <span
              :class="type == 'compete' ? 'active' : ''"
              @click.stop="$router.push({ name: 'publishmonitor' })"
              >竞争</span
            >
            <span
              :class="type == 'industry' ? 'active' : ''"
              @click.stop="$router.push({ name: 'industrymarket' })"
              >行业</span
            >
            <span
              :class="type == 'application' ? 'active' : ''"
              @click.stop="$router.push({ name: 'applicationevent' })"
              >应用</span
            >
            <span
              :class="type == 'inquire' ? 'active' : ''"
              @click.stop="$router.push({ name: 'inquiresearch' })"
              v-if="accountInfo.type == 1"
              >查询</span
            >
          </div>
        </div>
      </div>
      <div class="scroll-bottom" v-else>
        <div class="wd-1220">
          <div class="clear-fix" style="padding: 0">
            <div class="float-left">
              <span class="logo-font" style="margin-right: 20px"
                >博道出版数据实验室</span
              >
              <!-- 标签导航 -->
              <div class="tab-nav" style="display: inline-block">
                <span
                  :class="type == 'index' ? 'active' : ''"
                  @click.stop="$router.push({ name: 'index' })"
                  >首页</span
                >
                <span
                  :class="type == 'publish' ? 'active' : ''"
                  @click.stop="$router.push({ name: 'publishindex' })"
                  >本社</span
                >
                <span
                  :class="type == 'actual' ? 'active' : ''"
                  @click.stop="$router.push({ name: 'actualboard' })"
                  >实时</span
                >
                <span
                  :class="type == 'compete' ? 'active' : ''"
                  @click.stop="$router.push({ name: 'publishmonitor' })"
                  >竞争</span
                >
                <span
                  :class="type == 'industry' ? 'active' : ''"
                  @click.stop="$router.push({ name: 'industrymarket' })"
                  >行业</span
                >
                <span
                  :class="type == 'application' ? 'active' : ''"
                  @click.stop="$router.push({ name: 'applicationevent' })"
                  >应用</span
                >
                <span
                  :class="type == 'inquire' ? 'active' : ''"
                  @click.stop="$router.push({ name: 'inquiresearch' })"
                  v-if="accountInfo.type == 1"
                  >查询</span
                >
              </div>
            </div>
            <div class="float-right" style="line-height: 46px">
              <span style="margin-right: 25px; cursor: pointer">
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click.stop="$router.push({ name: 'usersuggesstion' })"
                >
                  <use xlink:href="#icon-kefu" />
                </svg>
              </span>
              <span style="margin-right: 25px; cursor: pointer">
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click.stop="$router.push({ name: 'helpindex' })"
                >
                  <use xlink:href="#icon-question" />
                </svg>
              </span>

              <span style="margin-right: 25px; cursor: pointer">
                <a-badge dot v-if="allState">
                  <svg
                    class="icon"
                    aria-hidden="true"
                    @click.stop="$router.push({ name: 'usernotice' })"
                  >
                    <use xlink:href="#icon-notice" />
                  </svg>
                </a-badge>
                <svg
                  class="icon"
                  aria-hidden="true"
                  @click.stop="$router.push({ name: 'usernotice' })"
                  v-else
                >
                  <use xlink:href="#icon-notice" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </a-affix>
    <!-- 邀请平台级新成员生成链接 -->
    <a-modal
      v-model="creatUrl"
      width="600px"
      title="邀请平台级用户加入博道数据中心"
      :footer="null"
    >
      <div class="popup" style="margin-top: 10px">
        <div class="option" style="margin-bottom: 50px">
          <!-- <p style="padding:0 25px;">将 {用户姓名} 设置为：</p> -->
          <div class="role-content clearfix">
            <span class="float-left">平台级用户</span>
            <span class="float-right">分配平台级权限 | 查看所有机构</span>
            <!-- <span class="read-data">查看数据</span> -->
          </div>
        </div>
        <div class="scess">
          <!-- <a-divider /> -->
          <div class="url">
            {{ inviteUrl
            }}<a-icon type="sync" class="reflash" @click="urlChange(1)" />
          </div>
          <p>邀请链接将在24小时内有效，链接过期不会影响已加入项目的成员</p>
          <div class="copy">
            <a-button
              type="primary"
              block
              size="large"
              @click="doCopy"
              style="font-size: 14px !important"
              >复制链接</a-button
            >
          </div>
        </div>
      </div>
    </a-modal>
    <!-- 邀请新成员加入 -->
    <!-- 邀请新成员生成链接 -->
    <a-modal
      v-model="creatUrl1"
      width="600px"
      title="邀请新成员加入机构"
      :footer="null"
    >
      <div class="popup">
        <div class="option">
          <!-- <p style="padding:0 25px;">将 {用户姓名} 设置为：</p> -->
          <div class="role-content">
            <a-radio-group v-model="roleValue" @change="urlChange(2)">
              <a-radio :style="radioStyle" :value="1">机构管理员</a-radio>
              <a-radio :style="radioStyle" :value="2">普通成员</a-radio>
            </a-radio-group>
            <span class="admin">机构管理 | 邀请成员 | 分配权限</span>
            <span class="read-data">查看数据</span>
          </div>
        </div>
        <div class="scess">
          <a-divider />
          <div class="url">
            {{ inviteUrl
            }}<a-icon type="sync" class="reflash" @click="urlChange(2)" />
          </div>
          <p>邀请链接将在24小时内有效，链接过期不会影响已加入项目的成员</p>
          <div class="copy">
            <a-button
              type="primary"
              block
              size="large"
              @click="doCopy"
              style="font-size: 14px !important"
              >复制链接</a-button
            >
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<style scoped lang="scss">
#headPage {
  & .clear-fix {
    @include clearfix;
    padding: 15px 0;
    & .float-left {
      float: left;
      & .publish {
        margin-left: 30px;
      }
    }
    & .float-right {
      float: right;
      & .icon {
        color: $themeColor5;
        font-size: $fontSize + 4;
      }
    }
  }
  & .tab-nav {
    & span {
      padding: 10px 20px;
      display: inline-block;
      font-size: $fontSize + 2;
      color: $themeColor5;
      cursor: pointer;
      box-sizing: border-box;
      border-bottom: 2px solid transparent;
      &:hover {
        color: $clf;
      }
    }
    & span.active {
      border-bottom: 2px solid $clf;
    }
  }
  & .ant-dropdown-menu-item {
    &:hover {
      background-color: #f2f2f2;
    }
  }
  & .scroll-top {
    background-color: $themeColor100;
  }
  & .scroll-bottom {
    // position: fixed;
    // top: 0;
    // width: 100%;
    background-color: $themeColor100;
    z-index: 99;
  }
}
.popup {
  font-size: $fontSize - 2;
  padding-bottom: 50px;
  & .role-content {
    padding: 10px 100px;
    position: relative;
    & .admin,
    & .read-data {
      position: absolute;
      right: 100px;
      font-size: $fontSize;
      color: $fontColor2;
    }
    & .admin {
      top: 20px;
    }
    & .read-data {
      bottom: 20px;
    }
  }
  & .scess {
    padding: 0 20px;
    text-align: center;
    color: $fontColor2;
    & .url {
      display: inline-block;
      width: 400px;
      padding: 15px 40px;
      background-color: $themeColor5;
      font-size: $fontSize;
      margin-top: 15px;
      margin-bottom: 10px;
      position: relative;
      & .reflash {
        position: absolute;
        right: 15px;
        top: 50%;
        margin-top: -7px;
        cursor: pointer;
        color: $themeColor80;
      }
    }
    & .copy {
      display: inline-block;
      width: 400px;
      margin-top: 75px;
    }
  }
}
</style>

<script>
import {
  PASSPORT_LOGOUT,
  USER_INVITE_ADMIN_CREATE,
  USER_INVITE_CREATE,
} from "../apis/login.js";
import { PASSPORT_INIT } from "../apis/common.js";
import { MESSAGE_READINFO } from "../apis/user.js";
export default {
  props: ["type", "show"],
  data() {
    return {
      fixed: true,
      accountInfo: {
        pic: "",
      },
      publishInfo: {
        organization_id: 0, // 机构id
        supplier_id: 0, // 出版社id
        organization_name: "", // 机构名字
        type: 2, // 机构类型, 1正式, 2试用
        state: 1, // 机构状态
        resource_ids: "", // 机构开通权限
        member_num: 0, // 机构人数
        create_time: "", // 机构创建时间
        user_organization_type: 0, // 机构用户类型, 1 管理员, 2普通用户
        auth_ids: [
          // 当前用户在当前机构用户权限
        ],
      },
      publishList: [
        // { name: "浙江摄影出版社", id: 1 },
        // { name: "浙江少儿出版社", id: 2 },
        // { name: "浙江电子音像出版社", id: 3 },
        // { name: "中信出版社", id: 4 },
        // { name: "浙江人民出版社", id: 5 }
      ],
      allPublishList: [],
      inputVal: "",
      value: "",
      dataSource: [],
      choose: false,
      allState: false,
      creatUrl: false,
      creatUrl1: false,
      inviteUrl: "",
      radioStyle: {
        display: "block",
        height: "40px",
        lineHeight: "40px",
      },
      roleValue: 2,
    };
  },
  mounted() {
    if (this.type != "login") {
      if (localStorage.getItem("headFirst") == 1) {
        this.accountInfo = JSON.parse(localStorage.getItem("headInfo"));
        this.allPublishList = this.accountInfo.extra;
        if (this.accountInfo.extra.length > 20 && this.accountInfo.type == 1) {
          this.publishList = this.accountInfo.extra.slice(0, 20);
        } else {
          this.publishList = this.accountInfo.extra;
        }
        if (this.allPublishList.length == 0 && this.accountInfo.type !== 1) {
          this.$router.push({ name: "noorganize" });
        }
        if (this.allPublishList.length > 0) {
          let a = 0;
          if (this.$route.query.last_organization_id) {
            a = this.$route.query.last_organization_id;
          } else if (this.accountInfo.last_organization_id) {
            a = this.accountInfo.last_organization_id;
          } else {
            a = this.allPublishList[0].organization_id;
          }
          this.allPublishList.map((value, key) => {
            if (value.organization_id == a) {
              this.publishInfo = value;
            }
          });
          if (this.publishInfo.organization_id == 0) {
            this.publishInfo = this.allPublishList[0];
          }
          if (this.$route.name == "index") {
            this.$emit("initPage");
          }
        } else {
          if (this.$route.name == "index") {
            this.$emit("noInitPage");
          }
        }
      } else {
        if (localStorage.getItem("loginState") == 1) this.getData();
      }
      if (this.$route.name != "usernotice") {
        this.getState();
      }
    }
  },
  created() {
    this.listenerFunction();
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.listenerFunction);
  },
  watch: {
    value(val) {
      // console.log("value", val);
    },
  },
  methods: {
    // 功能未开放
    noOpen() {
      this.globalTip(1, "该功能还在施工中，暂未开放", 0);
    },
    // 全局提示
    globalTip(type, content, code) {
      if (code == 1008) {
        localStorage.setItem("loginState", 0);
        this.$router.push({ name: "loginindex" });
        return;
      } else if (code == 5015) {
        this.$router.push({ name: "improve" });
        return;
      } else if (this.$systemCode.test(code)) {
        content = "系统错误";
      }
      switch (type) {
        case 1:
          this.$message.info({
            content: content,
            icon: <a-icon type="exclamation-circle" />,
          });
          break;
        case 2:
          this.$message.info({
            content: content,
            icon: <a-icon type="bell" />,
          });
          break;
      }
    },
    listenerFunction(e) {
      document.addEventListener("scroll", this.handleScroll, true);
    },
    handleScroll() {
      var _height = window.pageYOffset;
      // console.log(_height)
      if (_height > 50) {
        this.fixed = false;
      } else {
        this.fixed = true;
      }
    },
    triggerChange(visible) {
      // console.log(visible);
      if (visible) {
        this.inputVal = "";
        this.publishList = [];
        if (this.accountInfo.type == 1) {
          this.allPublishList.map((value, key) => {
            if (key < 20) {
              this.publishList.push(value);
            }
          });
        } else {
          this.publishList = this.allPublishList;
        }
      }
    },
    onSearch() {
      console.log(this.inputVal)
      this.publishList = [];
      if(this.inputVal.length > 0){
        this.allPublishList.map((value, key) => {
        if (value.organization_name.indexOf(this.inputVal) > -1) {
          this.publishList.push(value);
        }
      });
      }
      
    },
    selectOpt(item, index) {
      this.publishInfo = item;
      this.accountInfo.last_organization_id = item.organization_id;
      localStorage.setItem("headInfo", JSON.stringify(this.accountInfo));
      this.$emit("publisherChange");
      this.choose = false;
    },
    onChange(value) {
      // console.log("onChange", value);
      // this.choose = false;
    },
    // 获取消息通知状态
    async getState() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // organization_id: this.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MESSAGE_READINFO(data);
      if (res.code == 0) {
        this.allState = res.data.all;
      } else {
        this.globalTip(1, res.message, res.code);
      }
    },
    // 退出登录
    async loginOut() {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await PASSPORT_LOGOUT(data);
      if (res.code == 0) {
        localStorage.setItem("loginState", 0);
        this.$router.push({
          name: "loginindex",
        });
      } else {
        this.globalTip(1, res.message, res.code);
      }
    },
    // 获取基础信息
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await PASSPORT_INIT(data);
      if (res.code == 0) {
        this.accountInfo = res.data;
        this.allPublishList = res.data.extra;
        if (res.data.extra.length > 20 && res.data.type == 1) {
          this.publishList = res.data.extra.slice(0, 20);
        } else {
          this.publishList = res.data.extra;
        }
        // console.log(this.accountInfo.type);
        if (this.allPublishList.length == 0 && this.accountInfo.type !== 1) {
          // console.log(123456);
          this.$router.push({ name: "noorganize" });
        }
        if (this.allPublishList.length > 0) {
          let a = 0;
          if (this.$route.query.last_organization_id) {
            a = this.$route.query.last_organization_id;
          } else if (this.accountInfo.last_organization_id) {
            a = this.accountInfo.last_organization_id;
          } else {
            a = this.allPublishList[0].organization_id;
          }
          this.allPublishList.map((value, key) => {
            if (value.organization_id == a) {
              this.publishInfo = value;
            }
          });
          if (this.publishInfo.organization_id == 0) {
            this.publishInfo = this.allPublishList[0];
          }
          if (this.$route.name == "index") {
            this.$emit("initPage");
          }
          localStorage.setItem("headFirst", 1);
          localStorage.setItem("headInfo", JSON.stringify(res.data));
        }
      } else {
        this.globalTip(1, res.message, res.code);
      }
    },
    // 生成邀请码
    async buildInvite(type) {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp,
      };
      if (type == 2) {
        data.invite_type = this.roleValue;
        data.organization_id = this.publishInfo.organization_id;
      }
      data.sign = this.$getSign(data);
      let res;
      if (type == 1) {
        res = await USER_INVITE_ADMIN_CREATE(data);
      } else if (type == 2) {
        res = await USER_INVITE_CREATE(data);
      }
      if (res.code == 0) {
        this.inviteUrl =
          window.location.href.split("#")[0] +
          "#/login/register?inviteCode=" +
          res.data.invite_code;
        if (type == 1) {
          this.creatUrl = true;
        } else if (type == 2) {
          this.creatUrl1 = true;
        }
      } else {
        this.globalTip(1, res.message, res.code);
      }
    },
    urlChange(type) {
      // this.creatUrl = true;
      this.buildInvite(type);
    },
    // 复制链接
    doCopy() {
      var _this = this;
      this.$copyText(this.inviteUrl).then(
        function (e) {
          _this.globalTip(2, "复制成功", 0);
          // console.log(e);
        },
        function (e) {
          _this.globalTip(1, "复制失败", 0);
          // console.log(e);
        }
      );
    },
  },
};
</script>
