<template>
  <div id="headPage">
    <a-affix :offset-top="0">
      <div class="scroll-top" v-if="fixed">
        <div class="wd-1220">
          <div class="clear-fix">
            <div class="float-left">
              <span class="logo-font">出版数据中心</span>
              <span class="publish">
                <a-dropdown :trigger="['click']" v-model="choose">
                  <a
                    class="ant-dropdown-link"
                    @click="e => e.preventDefault()"
                    style="color:#F4F7FD;font-size:12px;"
                  >
                    {{publishInfo.organization_name}}
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay">
                    <a-input
                      style="margin:5px 10px;width:200px;"
                      placeholder="请输入机构名称"
                      v-model="inputVal"
                      @change="onSearch"
                    />
                    <a-menu-item v-for="(item,index) in publishList" :key="index">
                      <a
                        href="javascript:;"
                        style="padding:5px 15px;color:#515A6E;font-size:12px;"
                        @click="selectOpt(item,index)"
                      >{{item.organization_name}}</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
            </div>
            <div class="float-right">
              <span style="margin-right:25px;cursor: pointer;">
                <svg class="icon" aria-hidden="true" @click="noOpen">
                  <use xlink:href="#icon-question" />
                </svg>
              </span>
              <span style="margin-right:25px;cursor: pointer;">
                <a-badge dot>
                  <svg class="icon" aria-hidden="true" @click="noOpen">
                    <use xlink:href="#icon-notice" />
                  </svg>
                </a-badge>
              </span>
              <span>
                <a-dropdown :trigger="['click']" placement="bottomRight">
                  <a
                    class="ant-dropdown-link"
                    @click="e => e.preventDefault()"
                    style="color:#F4F7FD;font-size:12px;"
                  >
                    <span>
                      <img
                        size="small"
                        src="../assets/user1.png"
                        width="24px"
                        height="24px"
                        style="border-radius:50%"
                        v-if="accountInfo.pic == 1"
                      />
                      <img
                        size="small"
                        src="../assets/user2.png"
                        width="24px"
                        height="24px"
                        style="border-radius:50%"
                        v-if="accountInfo.pic == 2"
                      />
                      <img
                        size="small"
                        src="../assets/user3.png"
                        width="24px"
                        height="24px"
                        style="border-radius:50%"
                        v-if="accountInfo.pic == 3"
                      />
                      <img
                        size="small"
                        src="../assets/user4.png"
                        width="24px"
                        height="24px"
                        style="border-radius:50%"
                        v-if="accountInfo.pic == 4"
                      />
                      <img
                        size="small"
                        src="../assets/user5.png"
                        width="24px"
                        height="24px"
                        style="border-radius:50%"
                        v-if="accountInfo.pic == 5"
                      />
                      <img
                        size="small"
                        src="../assets/user6.png"
                        width="24px"
                        height="24px"
                        style="border-radius:50%"
                        v-if="accountInfo.pic == 6"
                      />
                    </span>
                    {{accountInfo.account}}
                    <a-icon type="down" />
                  </a>
                  <a-menu slot="overlay" style="top:5px;">
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        style="padding:5px 15px;color:#515A6E;font-size:12px;text-align:center;"
                        @click="$router.push({name:'userinfo'})"
                      >账号管理</a>
                    </a-menu-item>
                    <a-menu-item
                      v-if="accountInfo.type == 2 && publishInfo.user_organization_type == 1"
                    >
                      <a
                        href="javascript:;"
                        style="padding:5px 15px;color:#515A6E;font-size:12px;text-align:center;"
                        @click="$router.push({name:'organizeinfo'})"
                      >机构管理</a>
                    </a-menu-item>
                    <a-menu-item v-if="accountInfo.type == 1">
                      <a
                        href="javascript:;"
                        style="padding:5px 15px;color:#515A6E;font-size:12px;text-align:center;"
                        @click="$router.push({name:'adminindex'})"
                      >平台管理</a>
                    </a-menu-item>
                    <a-menu-item>
                      <a
                        href="javascript:;"
                        style="padding:5px 15px;color:#515A6E;font-size:12px;text-align:center;"
                        @click="loginOut"
                      >退出登录</a>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </span>
            </div>
          </div>
          <!-- 标签导航 -->
          <div class="tab-nav">
            <router-link to="/">
              <span :class="type == 'index'?'active':''">首页</span>
            </router-link>
            <router-link to="/publish/index">
              <span :class="type == 'publish'?'active':''">本社</span>
            </router-link>
            <router-link to="/compete/publishmonitor">
              <span :class="type == 'compete'?'active':''">竞争</span>
            </router-link>
            <router-link to="/industry/market">
              <span :class="type == 'industry'?'active':''">行业</span>
            </router-link>
            <span :class="type == 'application'?'active':''" @click="noOpen">应用</span>
          </div>
        </div>
      </div>
      <div class="scroll-bottom" v-else>
        <div class="wd-1220">
          <div class="clear-fix" style="padding:0;">
            <div class="float-left">
              <span class="logo-font" style="margin-right:20px;">出版数据中心</span>
              <!-- 标签导航 -->
              <div class="tab-nav" style="display:inline-block;">
                <router-link to="/">
                  <span :class="type == 'index'?'active':''">首页</span>
                </router-link>
                <router-link to="/publish/index">
                  <span :class="type == 'publish'?'active':''">本社</span>
                </router-link>
                <router-link to="/compete/publishmonitor">
                  <span :class="type == 'compete'?'active':''">竞争</span>
                </router-link>
                <router-link to="/industry/market">
                  <span :class="type == 'industry'?'active':''">行业</span>
                </router-link>
                <span @click="noOpen">应用</span>
              </div>
            </div>
            <div class="float-right" style="line-height:46px;">
              <span style="margin-right:25px;cursor: pointer;">
                <svg class="icon" aria-hidden="true" @click="noOpen">
                  <use xlink:href="#icon-question" />
                </svg>
              </span>
              <span style="margin-right:25px;cursor: pointer;">
                <a-badge dot>
                  <svg class="icon" aria-hidden="true" @click="noOpen">
                    <use xlink:href="#icon-notice" />
                  </svg>
                </a-badge>
              </span>
            </div>
          </div>
        </div>
      </div>
    </a-affix>
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
</style>

<script>
import { PASSPORT_LOGOUT } from "../apis/login.js";
import { PASSPORT_INIT } from "../apis/common.js";
export default {
  props: ["type"],
  data() {
    return {
      fixed: true,
      accountInfo: {
        pic: ""
      },
      publishInfo: {
        organization_id: 0, // 机构id
        publisher_id: 0, // 出版社id
        organization_name: "", // 机构名字
        type: 2, // 机构类型, 1正式, 2试用
        state: 1, // 机构状态
        resource_ids: "1,2,3", // 机构开通权限
        member_num: 0, // 机构人数
        create_time: "", // 机构创建时间
        user_organization_type: 2, // 机构用户类型, 1 管理员, 2普通用户
        auth_ids: [
          // 当前用户在当前机构用户权限
        ]
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
      choose: false
    };
  },
  mounted() {
    if (localStorage.getItem("headFirst") == 1) {
      this.accountInfo = JSON.parse(localStorage.getItem("headInfo"));
      this.allPublishList = this.accountInfo.extra;
      this.publishList = this.accountInfo.extra;
      if (this.allPublishList.length == 0 && this.accountInfo.type !== 1) {
        this.$router.push({ name: "noorganize" });
      }
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
      if (this.publishInfo.organization_id == 0)
        this.publishInfo = this.allPublishList[0];
    } else {
      this.getData();
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
      console.log("value", val);
    }
  },
  methods: {
    // 功能未开放
    noOpen() {
      this.globalTip(1, "该功能还在施工中，暂未开放");
    },
    // 全局提示
    globalTip(type, content) {
      switch (type) {
        case 1:
          this.$message.info({
            content: content,
            icon: <a-icon type="exclamation-circle" />
          });
          break;
        case 2:
          this.$message.info({
            content: content,
            icon: <a-icon type="bell" />
          });
          break;
      }
      if (content == "请先登入") {
        this.$router.push({ name: "loginindex" });
      } else if (content == "请补充用户信息") {
        this.$router.push({ name: "improve" });
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
    onSearch() {
      this.publishList = [];
      this.allPublishList.map((value, key) => {
        if (value.organization_name.indexOf(this.inputVal) > -1) {
          this.publishList.push(value);
        }
      });
    },
    // onSelect(opt, index) {
    //   // console.log("onSelect",opt);
    //   this.publishInfo = opt;
    //   this.accountInfo.last_organization_id = opt.organization_id;
    //   localStorage.setItem("headInfo", JSON.stringify(this.accountInfo));
    //   this.$emit.publisherChange();
    //   this.choose = false;
    // },
    selectOpt(item, index) {
      // console.log(this.$route.name);return
      // if(this.$route.name == 'index'){

      // }else{
      //   this.$router.push({
      //     name:"index"
      //   })
      // }
      this.publishInfo = item;
      this.accountInfo.last_organization_id = item.organization_id;
      localStorage.setItem("headInfo", JSON.stringify(this.accountInfo));
      this.$emit("publisherChange");
      this.choose = false;
      this.inputVal = "";
      this.publishList = [];
      this.publishList = this.allPublishList;
    },
    onChange(value) {
      // console.log("onChange", value);
      // this.choose = false;
    },
    // 退出登录
    async loginOut() {
      let data = {};
      let res = await PASSPORT_LOGOUT(data);
      if (res.code == 0) {
        this.$router.push({
          name: "loginindex"
        });
      } else {
        this.globalTip(1, res.message);
      }
    },
    // 获取基础信息
    async getData() {
      let data = {};
      let res = await PASSPORT_INIT(data);
      if (res.code == 0) {
        this.accountInfo = res.data;
        this.allPublishList = res.data.extra;
        this.publishList = res.data.extra;
        console.log(this.accountInfo.type);
        if (this.allPublishList.length == 0 && this.accountInfo.type !== 1) {
          console.log(123456);
          this.$router.push({ name: "noorganize" });
        }
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
        if (this.publishInfo.organization_id == 0)
          this.publishInfo = this.allPublishList[0];
        localStorage.setItem("headFirst", 1);
        localStorage.setItem("headInfo", JSON.stringify(res.data));
      } else {
        this.globalTip(1, res.message);
      }
    }
  }
};
</script>
