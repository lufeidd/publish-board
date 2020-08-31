<template>
  <div id="functionPage">
    <HeadNav type="admin" ref="head"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminIndex"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="powerType == 1">
            <div class="model-container">
              <div class="model-bg" v-if="powerType == 1">
                <div class="section-title clearfix">
                  <div class="float-left">{{user_name}} 权限配置</div>
                  <div class="float-right">
                    <span
                      class="click-font"
                      @click="changePower(1)"
                      v-if="user_organization_type == 2"
                    >设为管理员</span>
                    <span
                      class="click-font"
                      @click="changePower(2)"
                      v-if="user_organization_type == 1"
                    >设为普通成员</span>
                  </div>
                </div>
                <!-- 内容 -->
                <div class="content common">
                  <div class="search">
                    <a-input-search
                      placeholder="搜索功能名称"
                      enter-button="搜索"
                      size="large"
                      @search="onSearch"
                      style="width:800px;"
                    >
                      <div slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-search" />
                        </svg>
                        <span class="rowLine">|</span>
                      </div>
                    </a-input-search>
                  </div>
                  <div class="function">
                    <div class="left-cate">
                      <div
                        :class="chooseType == 0?'cate-block active':'cate-block'"
                        @click="choose($event)"
                      >全部</div>
                      <div class="line"></div>
                      <div
                        :class="chooseType == 1?'cate-block active':'cate-block'"
                        @click="choose($event)"
                      >本社</div>
                      <div
                        :class="chooseType == 2?'cate-block active':'cate-block'"
                        @click="choose($event)"
                      >竞争</div>
                      <div
                        :class="chooseType == 3?'cate-block active':'cate-block'"
                        @click="choose($event)"
                      >行业</div>
                      <div
                        :class="chooseType == 4?'cate-block active':'cate-block'"
                        @click="choose($event)"
                      >应用</div>
                    </div>
                    <div class="right-table">
                      <div class="table">
                        <table style="table-layout:fixed;">
                          <colgroup>
                            <col width="225" />
                            <col width="150" />
                            <col width="300" />
                            <col width="200" />
                          </colgroup>
                          <thead>
                            <tr>
                              <td>功能名称</td>
                              <td>归属</td>
                              <td>功能说明</td>
                              <td style="text-align:right;">操作</td>
                            </tr>
                          </thead>
                          <tbody v-if="showList.length > 0">
                            <tr v-for="(item,index) in showList" :key="index">
                              <td>
                                <span class="main-font">{{item.title}}</span>
                              </td>
                              <td>
                                <span class="main-font">{{item.group}}</span>
                              </td>
                              <td>{{item.auth_desc}}</td>
                              <td style="text-align:right;">
                                <span class="click-font" v-if="item.click" @click="changeFunction(item,index)">{{item.click_desc}}</span>
                                <span v-else>{{item.click_desc}}</span>
                              </td>
                            </tr>
                          </tbody>
                          <tbody v-else>
                            <tr>
                              <td colspan="4" style="text-align:center;">
                                <a-empty />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="model-bg"
                style="min-height:650px;padding-bottom:75px;position:relative"
                v-else
              >
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
          <div class="main-container" v-else>
            <div class="model-container">
              <div class="model-bg" style="min-height:650px;padding-bottom:75px;position:relative">
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/function.scss"></style>
<script>
import {
  ORGANIZATION_MEMBER_TYPESET,
  USER_ORGANIZATION_AUTH,
  ORGANIZATION_MEMBER_AUTH_EDIT,
  ORGANIZATION_MEMBER_INFO
} from "../../apis/admin.js";
export default {
  data() {
    return {
      powerType: 2,
      chooseType: 0,
      user_id: 0,
      user_name: "",
      organization_id: 0,
      allList: [],
      publishList: [],
      competeList: [],
      industyList: [],
      applicationList: [],
      showList: [],
      user_organization_type: 1,
      objInfo: {}
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.user_id = this.$route.query.user_id;
    this.user_name = this.$route.query.user_name;
    this.organization_id = this.$route.query.organization_id;
    if(this.powerType == 1){
      this.getData();
    }
    this.$setSlideHeight();
    // this.getPowerInfo();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    // 获取列表
    async getData() {
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id
      };
      let res = await USER_ORGANIZATION_AUTH(data);
      if (res.code == 0) {
        // this.objInfo = res.data;
        this.allList = [];
        this.allList = res.data.lists;
        this.showList = this.allList;
        this.user_organization_type = res.data.user_organization_type;
        for (let i = 0; i < this.allList.length; i++) {
          if (this.allList[i].group == "本社") {
            this.publishList.push(this.allList[i]);
          } else if (this.allList[i].group == "竞争") {
            this.competeList.push(this.allList[i]);
          } else if (this.allList[i].group == "行业") {
            this.industyList.push(this.allList[i]);
          } else if (this.allList[i].group == "应用") {
            this.applicationList.push(this.allList[i]);
          }
        }
        // console.log(this.publishList,this.competeList,this.industyList,this.applicationList)
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 获取成员信息
    async getPowerInfo() {
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id
      };
      let res = await ORGANIZATION_MEMBER_INFO(data);
      if (res.code == 0) {
        // this.user_organization_type = res.data.user_type;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 成员权限修改
    async changePower(type) {
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id,
        user_organization_type: type
      };
      let res = await ORGANIZATION_MEMBER_TYPESET(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "设置成功");
        this.getData();
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 功能配置权限修改
    async changeFunction(item, index) {
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id,
        group_id: item.group_id,
        type: item.status?'':'add'
      };
      let res = await ORGANIZATION_MEMBER_AUTH_EDIT(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "修改成功");
        this.getData();
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    onSearch(value) {
      var _list = [];
      this.showList = [];
      if (this.chooseType == 0) {
        _list = this.allList;
      } else if (this.chooseType == 1) {
        _list = this.publishList;
      } else if (this.chooseType == 2) {
        _list = this.competeList;
      } else if (this.chooseType == 3) {
        _list = this.industyList;
      } else if (this.chooseType == 4) {
        _list = this.applicationList;
      }
      var reg = new RegExp(value);
      for (let i = 0; i < _list.length; i++) {
        //如果字符串中不包含目标字符会返回-1
        if (_list[i].title.match(reg)) {
          // console.log(666)
          this.showList.push(_list[i]);
        }
      }
    },
    choose(e) {
      // console.log(e.srcElement.innerText)
      var _value = e.srcElement.innerText;
      this.showList = [];
      if (_value == "全部") {
        this.chooseType = 0;
        this.showList = this.allList;
      } else if (_value == "本社") {
        this.chooseType = 1;
        this.showList = this.publishList;
      } else if (_value == "竞争") {
        this.chooseType = 2;
        this.showList = this.competeList;
      } else if (_value == "行业") {
        this.chooseType = 3;
        this.showList = this.industyList;
      } else if (_value == "应用") {
        this.chooseType = 4;
        this.showList = this.applicationList;
      }
    }
  }
};
</script>
