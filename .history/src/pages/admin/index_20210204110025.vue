<template>
  <div id="organizePage">
    <div>
      <HeadNav type="admin" ref="head" :show="1"></HeadNav>
      <div class="wd-1220">
        <div class="clearfix">
          <div class="float-left">
            <SlideNav type="admin" sort="adminIndex"></SlideNav>
          </div>
          <div class="float-right">
            <div class="main-container" v-if="powerType == 1">
              <div class="model-container">
                <div
                  class="model-bg"
                  style="min-height:660px;padding-bottom:75px;"
                  v-if="powerType == 1"
                >
                  <div class="section-title clearfix">
                    <span class="float-left">
                      机构列表
                      <span class="desc">共{{totalSize}}家机构</span>
                    </span>
                    <span class="float-right click-font" @click="showModal">新增机构</span>
                  </div>
                  <div class="search">
                    <div class="content common">
                      <a-input-search
                        placeholder="搜索机构名称"
                        enter-button="搜索"
                        size="large"
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
                  <div class="table">
                    <table style="table-layout:fixed;">
                      <colgroup>
                        <col width="100" />
                        <col width="300" />
                        <col width="80" />
                        <col width="200" />
                        <col width="100" />
                        <col width="300" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>机构ID</td>
                          <td>机构名称</td>
                          <td>成员人数</td>
                          <td>创建时间</td>
                          <td>状态</td>
                          <td style="text-align:right;">操作</td>
                        </tr>
                      </thead>
                      <tbody v-if="organizeList.length > 0">
                        <tr v-for="(item,index) in organizeList" :key="index">
                          <td>{{item.organization_id}}</td>
                          <td>
                            <span class="main-font">{{item.organization_name}}</span>
                            <span class="tag" v-if="item.type==2">试用</span>
                          </td>
                          <td style="text-align:center;">
                            <span
                              class="click-font"
                              style="padding:0 10px;"
                              @click="toMember(item,index)"
                              v-if="item.state == 1"
                            >{{item.member_num}}</span>
                            <span v-if="item.state == 0">{{item.member_num}}</span>
                          </td>
                          <td>{{item.create_time}}</td>
                          <td>
                            <span class="main-font">{{item.state == 1?'正常':'注销'}}</span>
                            <!-- <span v-if="item.state == 0">注销</span> -->
                          </td>
                          <td style="text-align:right;">
                            <span
                              class="click-font"
                              v-if="item.state == 1"
                              @click="toMember(item,index)"
                            >成员</span>
                            <span
                              class="click-font"
                              style="margin-left:10px;"
                              @click="setFunction(item,index)"
                              v-if="item.state == 1"
                            >功能</span>
                            <span
                              class="click-font"
                              style="margin-left:10px;"
                              v-if="item.state == 0"
                              @click="recovery(item,index)"
                            >恢复</span>
                            <span
                              class="click-font"
                              style="margin-left:10px;"
                              @click="showReadModal(item,index)"
                            >信息</span>
                            <span class="click-font"
                              style="margin-left:10px;" @click="deleteOrganize(item,index,2)" v-if="item.state == 0">
                              删除
                            </span>
                            <span
                              class="click-font"
                              style="margin-left:10px;"
                              v-if="item.state == 1"
                              @click="deleteOrganize(item,index,1)"
                            >注销</span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="6" style="text-align:center;">
                            <div style="margin-top:100px;"><a-empty /></div>
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
                      :total="totalSize"
                      :defaultPageSize="page_size"
                      @change="onShowSizeChange"
                    />
                  </div>
                </div>
                <div
                  class="model-bg"
                  style="min-height:660px;padding-bottom:75px;position:relative"
                  v-else
                >
                  <PageNoPower></PageNoPower>
                </div>
              </div>
            </div>
            <div class="main-container" v-else>
              <div class="model-container">
                <div
                  class="model-bg"
                  style="min-height:660px;padding-bottom:75px;position:relative"
                >
                  <PageNoPower></PageNoPower>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 新增机构弹层 -->
      <a-modal v-model="addOrganize" width="600px" title="新建机构" on-ok="handleOk">
        <template slot="footer">
          <a-button key="back" @click="handleCancel">取消</a-button>
          <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
        </template>
        <div class="popup">
          <div class="option">
            <span class="lable">*机构名称</span>
            <div class="normal">
              <a-input placeholder="输入机构简称" v-model="addOrganizeInfo.name" />
            </div>
          </div>
          <div class="option">
            <span class="lable">*绑定出版单位</span>
            <div class="normal">
              <!-- <a-input placeholder="搜索出版社名称" v-model="addOrganizeInfo.supplier_id" /> -->
              <a-auto-complete
                option-label-prop="value"
                style="width: 460px"
                placeholder="搜索出版单位名称"
                @search="onAddSearch"
                @select="selected"
                v-model="addOrganizeInfo.supplier_name"
              >
                <template slot="dataSource">
                  <a-select-option
                    v-for="(opt,index) in dataSource"
                    :key="index"
                    :value="opt.supplier_name"
                    :id="opt.supplier_id"
                  >
                    <div class="result">
                      <span>{{opt.supplier_name}}</span>
                    </div>
                  </a-select-option>
                </template>
              </a-auto-complete>
            </div>
          </div>
          <div class="option">
            <span class="lable">*机构类型</span>
            <div class="normal">
              <a-radio-group name="radioGroup" v-model="addOrganizeInfo.type" size="small">
                <a-radio :value="1">正式</a-radio>
                <a-radio :value="2">试用</a-radio>
              </a-radio-group>
            </div>
          </div>
          <div style="padding:0 15px;">
            <a-divider />
          </div>
          <div class="option">
            <span class="lable">地址</span>
            <div class="normal">
              <a-input placeholder="请输入机构所在地址" v-model="addOrganizeInfo.address" />
            </div>
          </div>
          <div class="option">
            <span class="lable">联系人</span>
            <div class="normal">
              <a-input placeholder="请输入机构联系人姓名" v-model="addOrganizeInfo.contact_name" />
            </div>
          </div>
          <div class="option">
            <span class="lable">联系电话</span>
            <div class="normal">
              <a-input placeholder="请输入机构联系电话" v-model="addOrganizeInfo.contact_mobile" />
            </div>
          </div>
          <div class="option">
            <span class="lable">联系邮箱</span>
            <div class="normal">
              <a-input placeholder="请输入机构联系邮箱" v-model="addOrganizeInfo.contact_email" />
            </div>
          </div>
        </div>
      </a-modal>
      <!-- 机构信息查看 -->
      <a-modal v-model="readOrganize" width="600px" title="机构信息" on-ok="readhandleOk">
        <template slot="footer">
          <div class="clearfix">
            <div
              class="float-left click-font-warn"
              style="line-height:32px;"
              @click="deleteOrganize(0,null,2)"
            >删除机构</div>
            <div class="float-right">
              <a-button key="back" @click="handleCancel">取消</a-button>
              <a-button key="submit" type="primary" :loading="loading" @click="readhandleOk">确定</a-button>
            </div>
          </div>
        </template>
        <div class="popup">
          <div class="option">
            <span class="lable">*机构名称</span>
            <div class="normal">
              <a-input placeholder="输入机构名称" v-if="organizeInfo.state == 1" v-model="organizeInfo.organization_name" />
              <a-input placeholder="输入机构名称" v-else readonly v-model="organizeInfo.organization_name" />
            </div>
          </div>
          <div class="option">
            <span class="lable">*绑定出版单位</span>
            <div class="normal">{{organizeInfo.supplier_name}}</div>
          </div>
          <div class="option">
            <span class="lable">*机构类型</span>
            <div class="normal">
              <a-radio-group name="radioGroup" v-model="organizeInfo.type" @change="onChange" size="small">
                <a-radio :value="1" v-if="organizeInfo.state == 1">正式</a-radio>
                <a-radio :value="1" v-else disabled>正式</a-radio>
                <a-radio :value="2" v-if="organizeInfo.state == 1">试用</a-radio>
                <a-radio :value="2" v-else disabled>试用</a-radio>
              </a-radio-group>
            </div>
          </div>
          <div style="padding:0 15px;">
            <a-divider style="margin:10px 0;"/>
          </div>
          <div class="option">
            <span class="lable">地址</span>
            <div class="normal" v-if="organizeInfo.address">{{organizeInfo.address}}</div>
            <div class="normal" v-else>--</div>
          </div>
          <div class="option">
            <span class="lable">联系人</span>
            <div class="normal" v-if="organizeInfo.contact_name">{{organizeInfo.contact_name}}</div>
            <div class="normal" v-else>--</div>
          </div>
          <div class="option">
            <span class="lable">联系电话</span>
            <div class="normal" v-if="organizeInfo.contact_mobile">{{organizeInfo.contact_mobile}}</div>
            <div class="normal" v-else>--</div>
          </div>
          <div class="option">
            <span class="lable">联系邮箱</span>
            <div class="normal" v-if="organizeInfo.contact_email">{{organizeInfo.contact_email}}</div>
            <div class="normal" v-else>--</div>
          </div>
          <div style="padding:0 15px;">
            <a-divider style="margin:10px 0;"/>
          </div>
          <div class="option">
            <span class="lable">竞社名额</span>
            <div class="normal">
              <a-input placeholder="" v-model="organizeInfo.pubnum" />
            </div>
          </div>
          <div class="option">
            <span class="lable">竞品名额</span>
            <div class="normal">
              <a-input placeholder="" v-model="organizeInfo.goodsnum" />
            </div>
          </div>
        </div>
      </a-modal>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/index.scss"></style>
<script>
import {
  ORGANIZATION_ADD,
  ORGANIZATION_GETS,
  ORGANIZATION_EDIT,
  ORGANIZATION_DELETE,
  ORGANIZATION_LOGOFF,
  ORGANIZATION_LOGON,
  ORGANIZATION_COMPETE
} from "../../apis/admin.js";
import { SUPPLIER_GET, SUPPLIER_GETS } from "../../apis/common.js";
export default {
  data() {
    return {
      powerType: 2,
      addOrganize: false,
      readOrganize: false,
      loading: false,
      organizeList: [],
      organizeIndex: 0,
      searchVal: "",
      page: 1,
      page_size: 20,
      totalSize: 0,
      dataSource: [],
      addOrganizeInfo: {
        name: "",
        supplier_id: 0,
        type: 0,
        address: "",
        contact_name: "",
        contact_mobile: null,
        contact_email: ""
      },
      organizeInfo: {
        organization_id: 0, // 机构id
        supplier_id: 0, // 出版社id
        supplier_name: "", //出版社名称
        organization_name: "", // 机构名
        short_name: "", // 机构简称
        type: 2, // 类型 1正常, 2试用
        state: 1, // 状态 1正常, 0删除
        address: "", // 地址
        contact_name: "", // 联系人
        contact_mobile: "", // 手机
        contact_email: "", // 邮箱
        member_num: 0, // 成员数
        create_time: "", // 创建时间
        update_time: "",
        pubnum:0,
        goodsnum:0,
        maxPubnum:0,
        maxGoodsnum:0,
        auth_ids: [
          // 权限
          ""
        ]
      },
      isLoading:true,
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    if (this.powerType == 1) {
      this.getData();
    }else{
      this.isLoading = false;
    }
  },
  updated() {

  },
  methods: {
    // 机构列表
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_name: this.searchVal,
        page: this.page,
        page_size: this.page_size,
        organization_state: 1,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_GETS(data);
      if (res.code == 0) {
        this.powerType == 1;
        this.organizeList = [];
        this.organizeList = res.data.lists;
        this.totalSize = res.data.total;
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
    // 新增机构
    async add() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.addOrganizeInfo.supplier_id,
        organization_name: this.addOrganizeInfo.name,
        type: this.addOrganizeInfo.type,
        address: this.addOrganizeInfo.address,
        contact_name: this.addOrganizeInfo.contact_name,
        contact_mobile: this.addOrganizeInfo.contact_mobile,
        contact_email: this.addOrganizeInfo.contact_email,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_ADD(data);
      if (res.code == 0) {
        this.addOrganize = false;
        this.getData();
        this.$refs.head.globalTip(2, "新增机构成功", 0);
        this.addOrganizeInfo.publish_id = 0;
        this.addOrganizeInfo.name = "";
        this.addOrganizeInfo.type = 0;
        this.addOrganizeInfo.address = "";
        this.addOrganizeInfo.contact_name = "";
        this.addOrganizeInfo.contact_mobile = "";
        this.addOrganizeInfo.contact_email = "";
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 编辑机构
    async editOrganize() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.organizeInfo.supplier_id,
        organization_name: this.organizeInfo.organization_name,
        type: this.organizeInfo.type,
        address: this.organizeInfo.address,
        contact_name: this.organizeInfo.contact_name,
        contact_mobile: this.organizeInfo.contact_mobile,
        organization_id: this.organizeInfo.organization_id,
        compete_supplier_nums: this.organizeInfo.pubnum,
        compete_goods_nums:this.organizeInfo.goodsnum,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_EDIT(data);
      if (res.code == 0) {
        this.readOrganize = false;
        this.organizeList = this.organizeList.map((value, key) => {
          if (this.organizeIndex == key) {
            value.organization_name = this.organizeInfo.organization_name;
            value.type = this.organizeInfo.type;
          }
          return value;
        });
        this.$refs.head.globalTip(2, "修改成功", 0);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 删除机构
    async delete(index, id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_DELETE(data);
      if (res.code == 0) {
        this.readOrganize = false;
        this.$refs.head.globalTip(2, "删除成功", 0);
        this.getData();
        // this.organizeList = this.organizeList.filter((value, key) => {
        //   return index != key;
        // });
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 注销机构
    async deleteLogo(index, id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_LOGOFF(data);
      if (res.code == 0) {
        this.readOrganize = false;
        this.$refs.head.globalTip(2, "注销成功", 0);
        this.getData();
        // this.organizeList = this.organizeList.filter((value, key) => {
        //   return index != key;
        // });
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 绑定出版社获取
    async getPublisher() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.organizeInfo.supplier_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await SUPPLIER_GET(data);
      if (res.code == 0) {
        this.organizeInfo.supplier_name = res.data.supplier_name;
        this.readOrganize = true;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 出版社列表获取
    async getPublishList(val) {
      var tStamp = this.$getTimeStamp();
      let data = {
        page: 1,
        page_size: 100,
        timestamp: tStamp,
        supplier_name: val,
      };
      // if(val) data.supplier_name = val;
      data.sign = this.$getSign(data);
      let res = await SUPPLIER_GETS(data);
      if (res.code == 0) {
        this.dataSource = res.data.list;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 恢复机构
    async organizeLogon(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_LOGON(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "恢复成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 获取机构竞争数量限制
    async getCompete(){
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.organizeInfo.organization_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_COMPETE(data);
      if (res.code == 0) {
        this.organizeInfo.pubnum = res.data.supplier_nums;
        this.organizeInfo.goodsnum = res.data.goods_nums;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    onChange(e) {
      // console.log('radio checked', e.target.value);
      if(e.target.value == 1){
        this.organizeInfo.pubnum = 3;
        this.organizeInfo.goodsnum = 10;
      }else{
        this.organizeInfo.pubnum = 1;
        this.organizeInfo.goodsnum = 1;
      }
    },
    onShowSizeChange(page, pageSize) {
      this.isLoading = true;
      this.page = page;
      this.getData();
    },
    onSearch(value) {
      this.isLoading = true;
      this.page = 1;
      this.searchVal = value;
      this.getData();
    },
    showModal() {
      this.addOrganizeInfo.name = "";
      this.addOrganizeInfo.supplier_id = 0;
      this.addOrganizeInfo.supplier_name = "";
      this.addOrganizeInfo.type = 2;
      this.addOrganizeInfo.address = "";
      this.addOrganizeInfo.contact_name = "";
      this.addOrganizeInfo.contact_mobile = "";
      this.addOrganizeInfo.contact_email = "";
      this.addOrganize = true;
    },
    showReadModal(item, index) {
      let _obj = item;
      // this.organizeInfo = _obj;
      this.organizeIndex = index;
      this.organizeInfo.supplier_id = _obj.supplier_id;
      this.organizeInfo.organization_id = _obj.organization_id;
      this.getCompete();
      this.getPublisher();
      this.organizeInfo.organization_name = _obj.organization_name;
      this.organizeInfo.type = _obj.type;
      this.organizeInfo.state = _obj.state;
      this.organizeInfo.address = _obj.address;
      this.organizeInfo.contact_name = _obj.contact_name;
      this.organizeInfo.contact_mobile = _obj.contact_mobile;
      this.organizeInfo.contact_email = _obj.contact_email;
      // if(this.organizeInfo.type == 1){
      //   this.organizeInfo.pubnum = 3;
      //   this.organizeInfo.goodsnum = 10;
      // }else{
      //   this.organizeInfo.pubnum = 1;
      //   this.organizeInfo.goodsnum = 1;
      // }
    },
    handleOk(e) {
      // this.loading = true;
      // this.addOrganize = false;
      // this.loading = false;
      if (this.addOrganizeInfo.name.length == 0) {
        this.$refs.head.globalTip(1, "请填写机构名称", 0);
        return;
      }
      if (this.addOrganizeInfo.supplier_id == 0) {
        this.$refs.head.globalTip(1, "请选择要绑定的出版单位", 0);
        return;
      }
      if (this.addOrganizeInfo.type == 0) {
        this.$refs.head.globalTip(1, "请选择机构类型", 0);
        return;
      }
      this.add();
    },
    readhandleOk(e) {
      let _reg = /^\d+(\.\d+)?$/;
      if(_reg.test(this.organizeInfo.pubnum)){

      }else{
        this.$refs.head.globalTip(1, "竞社名额必须为数字", 0);
        return;
      }
      if(_reg.test(this.organizeInfo.goodsnum)){

      }else{
        this.$refs.head.globalTip(1, "竞品名额必须为数字", 0);
        return;
      }
      if(this.organizeInfo.state == 1){
        this.editOrganize();
      }else{
        this.readOrganize = false;
      }
    },
    handleCancel(e) {
      this.addOrganize = false;
      this.readOrganize = false;
    },
    // 删除机构
    deleteOrganize(item, index, type) {
      let _id = 0;
      if(item){
        _id = item.organization_id;
      }else{
        _id = this.organizeInfo.organization_id;
      }
      console.
      var _this = this;
      this.$confirm({
        title: type == 1 ? "确认注销机构" : "确认删除机构",
        content:
          type == 1
            ? "注销机构将影响机构成员的数据查看，请谨慎操作。"
            : "删除机构将无法恢复，请谨慎操作。",
        okText: type == 1 ? "注销机构" : "删除机构",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          if (type == 1) {
            _this.deleteLogo(index, _id);
          } else if (type == 2) {
            _this.delete(
              _this.organizeIndex,
              _id
            );
          }
        },
        onCancel() {}
      });
    },
    // 恢复机构
    recovery(item, index) {
      var _this = this;
      this.$confirm({
        title: "确认恢复已注销机构",
        content: "确认恢复该机构吗？",
        okText: "恢复机构",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.organizeLogon(item.organization_id);
        },
        onCancel() {}
      });
    },
    // 功能设置
    setFunction(item, index) {
      this.$router.push({
        name: "adminfunction",
        query: {
          organization_id: item.organization_id,
          organization_name: item.organization_name
        }
      });
    },
    // 成员列表
    toMember(item, index) {
      this.$router.push({
        name: "adminmember",
        query: {
          organization_id: item.organization_id,
          organization_name: item.organization_name
        }
      });
    },
    onAddSearch(value) {
      // console.log("search", typeof(value));
      let _value = value.toString();
      this.dataSource = [];
      this.addOrganizeInfo.supplier_id = 0;
      this.getPublishList(_value);
    },
    // 选中出版社
    selected(value) {
      // console.log(value);
      // let _value = value.toString();
      this.dataSource.map((val, key) => {
        if (val.supplier_name == value)
          this.addOrganizeInfo.supplier_id = val.supplier_id;
      });
      // console.log(this.addOrganizeInfo);
    }
  }
};
</script>
