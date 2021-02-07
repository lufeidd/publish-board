<template>
  <div id="functionPage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminIndex"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="powerType == 1">
            <div class="model-container">
              <div class="model-bg" style="min-height:660px;">
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
                      v-model="inputVal"
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
                                <div class="main-font" style="line-height:36px;">{{item.group}}</div>
                              </td>
                              <td>{{item.auth_desc}}</td>
                              <td style="text-align:right;">
                                <span
                                  class="click-font"
                                  v-if="item.click"
                                  @click="changeFunction(item,index)"
                                >{{item.click_desc}}</span>
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
            </div>
          </div>
          <div class="main-container" v-else>
            <div class="model-container">
              <div class="model-bg" style="min-height:660px;padding-bottom:75px;position:relative">
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
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
      inputVal:"",
      user_organization_type: 1,
      objInfo: {},
      isLoading:true,
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.user_id = this.$route.query.user_id;
    this.user_name = this.$route.query.user_name;
    this.organization_id = this.$route.query.organization_id;
    if (this.powerType == 1) {
      this.getData();
    }else{
      this.isLoading = false;
    }
    // this.getPowerInfo();
  },
  updated() {

  },
  methods: {
    // 获取列表
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await USER_ORGANIZATION_AUTH(data);
      if (res.code == 0) {
        // this.objInfo = res.data;
        this.powerType == 1;
        this.allList = [];
        this.publishList = [];
        this.competeList = [];
        this.industyList = [];
        this.applicationList = [];
        this.allList = res.data.lists;
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
        this.changeArr();
        this.isLoading = false;
        // console.log(this.publishList,this.competeList,this.industyList,this.applicationList)
      } else {
        this.isLoading = false;
        if(res.code == 1009){
          this.powerType == 0;
        }else{
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 获取成员信息
    async getPowerInfo() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_MEMBER_INFO(data);
      if (res.code == 0) {
        // this.user_organization_type = res.data.user_type;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 成员权限修改
    async changePower(type) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id,
        user_organization_type: type,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_MEMBER_TYPESET(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "设置成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 功能配置权限修改
    async changeFunction(item, index) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id,
        group_id: item.group_id,
        type: item.status ? "" : "add",
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_MEMBER_AUTH_EDIT(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "修改成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    confirmChange(type){
      var _this = this;
      this.$confirm({
        title: "确认xi",
        content: "确认将该成员设置为机构管理员吗？",
        okText: "确定",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.organizeLogon(item.organization_id);
        },
        onCancel() {}
      });
    },
    onSearch(value) {
      this.changeArr();
    },
    changeArr(){
      // console.log(this.inputVal)
      this.showList = [];
      var _list = [];
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
      var reg = new RegExp(this.inputVal);
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
        // this.showList = this.allList;
      } else if (_value == "本社") {
        this.chooseType = 1;
        // this.showList = this.publishList;
      } else if (_value == "竞争") {
        this.chooseType = 2;
        // this.showList = this.competeList;
      } else if (_value == "行业") {
        this.chooseType = 3;
        // this.showList = this.industyList;
      } else if (_value == "应用") {
        this.chooseType = 4;
        // this.showList = this.applicationList;
      }
      this.changeArr();
    }
  }
};
</script>
