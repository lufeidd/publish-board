<template>
  <div id="organizePage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminHelp"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="powerType == 1">
            <div class="model-container">
              <div class="model-bg">
                <!-- 标签页 -->
                <div class="tabs" style="padding:0 15px;">
                  <a-tabs :activeKey="tabKey" @change="callback">
                    <a-tab-pane key="1" tab="词条解释"></a-tab-pane>
                    <a-tab-pane key="2" tab="功能说明" disabled></a-tab-pane>
                    <a-tab-pane key="3" tab="常见问题" disabled></a-tab-pane>
                  </a-tabs>
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div class="model-container">
              <div class="model-bg" style="padding-bottom:75px;min-height:610px;">
                <div class="section-title clearfix">
                  <div class="float-left">词条解释管理</div>
                  <div class="float-right">
                    <span class="click-font" @click="addWord">新增词条</span>
                  </div>
                </div>
                <div class="search">
                  <div class="content common">
                    <a-input-search
                      placeholder="搜索词条名称"
                      enter-button="搜索"
                      size="large"
                      v-model="inputVal"
                      @search="onSearch"
                    >
                      <div slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-search" />
                        </svg>
                        <span class="rowLine">|</span>
                      </div>
                    </a-input-search>
                  </div>
                </div>
                <!-- 高级搜素 -->
                <div class="high-search" v-if="type == 1">
                  <div class="option">
                    <span class="title">词条位置</span>
                    <span
                      class="high-tab"
                      v-for="(item,index) in positionList"
                      :key="index"
                      :class="{'active':eventType==index}"
                      @click="change(item,index)"
                    >{{item.name}}</span>
                  </div>
                </div>
                <div class="search-switch click-font">
                  <span @click="control">
                    <span v-if="type == 0">展开高级搜索</span>
                    <span v-if="type == 1">收起高级搜索</span>
                    <svg class="icon" aria-hidden="true" v-if="type == 0">
                      <use xlink:href="#icon-open" />
                    </svg>
                    <svg class="icon" aria-hidden="true" v-if="type == 1">
                      <use xlink:href="#icon-shrink" />
                    </svg>
                  </span>
                </div>
                <!-- 表格 -->
                <div class="table" style="margin-top:50px">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="100" />
                      <col width="140" />
                      <col width="100" />
                      <col width="500" />
                      <col width="80" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>词条ID</td>
                        <td>词条名称</td>
                        <td style="text-align:center;">位置</td>
                        <td>说明文本</td>
                        <td>状态</td>
                        <td style="text-align:right;">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item,index) in list" :key="index">
                        <td>
                          <span class="main-font">{{item.help_id}}</span>
                        </td>
                        <td style="height:57px;">
                          <span class="main-font">{{item.title}}</span>
                        </td>
                        <td style="text-align:center;">
                          <span class="main-font" v-if="item.logo_id == 1">首页</span>
                          <span class="main-font" v-if="item.logo_id == 2">读者画像</span>
                          <span class="main-font" v-if="item.logo_id == 3">新品追踪</span>
                          <span class="main-font" v-if="item.logo_id == 4">基本定义</span>
                          <!-- <span class="main-font" v-if="item.logo_id == 5">应用</span> -->
                        </td>
                        <td>
                          <div class="author">
                            <span class="author-name" v-if="item.content" :title="item.content">{{item.content}}</span>
                            <span v-else>--</span>
                          </div>
                          <!-- <div style="height:36px;overflow:hidden;" v-else>--</div> -->
                        </td>
                        <td>
                          <span class="main-font" v-if="item.status == 1">正常</span>
                          <span class="main-font" v-if="item.status == 0">删除</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="click-font" v-if="item.status == 1" @click="openInfo(item,index)">编辑</span>
                          <span class="click-font" style="margin-left:5px;" v-if="item.status == 1" @click="deleteOrganize(item,index)">删除</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6" style="text-align:center;">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 分页 -->
                <div class="page">
                  <a-pagination
                    :show-total="total => `共 ${total} 条数据`"
                    :default-current="1"
                    v-model="page"
                    :total="total"
                    :defaultPageSize="pageSize"
                    @change="onShowSizeChange"
                  />
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
    <!-- 新增词条弹层 -->
    <a-modal v-model="addOrganize" width="600px" :title="isAdd?'编辑词条':'新增词条'" on-ok="handleOk">
      <template slot="footer">
        <div class="clearfix">
          <div class="float-rigth">
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" @click="handleOk">保存</a-button>
          </div>
        </div>
      </template>
      <div class="popup">
        <div class="option">
          <span class="lable">*词条名称</span>
          <div class="normal">
            <a-input placeholder="最多15个字" v-model="eventInfo.name" />
          </div>
        </div>
        <div class="option">
          <span class="lable">*位置</span>
          <div class="normal">
            <a-radio-group name="radioGroup" v-model="eventInfo.type" size="small">
              <a-radio :value="1">首页</a-radio>
              <a-radio :value="2">读者画像</a-radio>
              <a-radio :value="3">xinp</a-radio>
              <a-radio :value="4">行业</a-radio>
              <a-radio :value="5">应用</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="option">
          <span class="lable" style="vertical-align:top;">词条说明</span>
          <div class="normal">
            <a-textarea placeholder v-model="eventInfo.desc" style="height:96px;" />
          </div>
        </div>
      </div>
    </a-modal>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/index.scss"></style>
<script>
import {
  HELP_LISTS,
  HELP_ADD,
  HELP_EDIT,
  HELP_DELETE,
} from "../../apis/admin.js";
export default {
  data() {
    return {
      powerType:0,
      tabKey: "1",
      inputVal: "",
      page: 1,
      pageSize: 20,
      total: 0,
      type: 0,
      eventType: 0,
      positionList: [
        { id: 0, name: "全部" },
        { id: 1, name: "首页" },
        { id: 2, name: "本社" },
        { id: 3, name: "竞争" },
        { id: 4, name: "行业" },
        { id: 5, name: "应用" },
      ],
      list: [],
      addOrganize:false,
      isAdd:0,
      eventInfo:{
        id:0,
        name:"",
        type:0,
        desc:"",
      },
      isLoading:true,
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    if (this.powerType == 1) {
      this.getData();
    } else {
      this.isLoading = false;
    }
  },
  updated() {

  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        title: this.inputVal,
        type_id: this.tabKey,
        status: 1,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp
      };
      if (this.type == 1) data.logo_id = this.eventType;
      data.sign = this.$getSign(data);
      let res = await HELP_LISTS(data);
      if (res.code == 0) {
        this.powerType == 1;
        this.list = [];
        this.list = res.data.helps;
        this.total = res.data.count;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if(res.code == 1009){
          this.powerType == 0;
        }else{
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async addEvents(){
      var tStamp = this.$getTimeStamp();
      let data = {
        type_id:this.tabKey,
        logo_id:this.eventInfo.type,
        title:this.eventInfo.name,
        content:this.eventInfo.desc,
        status:1,
        sort:0,
        timestamp: tStamp
      }
      data.sign = this.$getSign(data);
      let res = await HELP_ADD(data);
      if(res.code == 0){
        this.$refs.head.globalTip(2, "新增成功", 0);
        this.getData();
        this.addOrganize = false;
      }else{
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async editEvent(){
      var tStamp = this.$getTimeStamp();
      let data = {
        type_id:this.tabKey,
        logo_id:this.eventInfo.type,
        title:this.eventInfo.name,
        content:this.eventInfo.desc,
        status:1,
        sort:0,
        help_id:this.eventInfo.id,
        timestamp: tStamp
      }
      data.sign = this.$getSign(data);
      let res = await HELP_EDIT(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "编辑成功", 0);
        this.getData();
        this.addOrganize = false;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async deleteEvent(id){
      var tStamp = this.$getTimeStamp();
      let data = {
        help_id:id,
        timestamp: tStamp
      }
      data.sign = this.$getSign(data);
      let res = await HELP_DELETE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "删除成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    callback(key) {},
    addWord() {
      this.isAdd = 0;
      this.eventInfo.id = 0;
      this.eventInfo.name = "";
      this.eventInfo.type = 0;
      this.eventInfo.desc = "";
      this.addOrganize = true;
    },
    onSearch() {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    control() {
      this.type = this.type ? 0 : 1;
    },
    change(item, index) {
      this.isLoading = true;
      this.eventType = index;
      this.page = 1;
      this.getData();
    },
    handleCancel(){
      this.addOrganize = false;
    },
    handleOk(){
      if (this.eventInfo.name.length == 0) {
        this.$refs.head.globalTip(1, "请填写词条名称", 0);
        return;
      }
      if (this.eventInfo.name.length > 15) {
        this.$refs.head.globalTip(1, "词条名称不能超过15个字", 0);
        return;
      }
      if (this.eventInfo.type == 0) {
        this.$refs.head.globalTip(1, "请选择词条位置", 0);
        return;
      }
      if (this.isAdd == 0) {
        this.addEvents();
      } else {
        this.editEvent();
      }
    },
    openInfo(item, index) {
      this.isAdd = 1;
      this.eventInfo.id = item.help_id;
      this.eventInfo.name = item.title;
      this.eventInfo.type = item.logo_id;
      this.eventInfo.desc = item.content;
      this.addOrganize = true;
    },
    deleteOrganize(item, index) {
      var _this = this;
      this.$confirm({
        title: "确认删除词条",
        content: "请谨慎操作。",
        okText: "删除词条",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.deleteEvent(item.help_id);
        },
        onCancel() {},
      });
    },
    onShowSizeChange(page, pageSize) {
      this.isLoading = true;
      this.page = page;
      this.getData();
    },
  },
};
</script>
