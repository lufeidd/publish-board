<template>
  <div id="organizePage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminUser"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="powerType == 1">
            <!-- <div class="model-container">
              <div class="model-bg total-user">全平台总计 {{adminCount}} 个用户</div>
            </div>-->
            <div class="model-container">
              <div class="model-bg" style="min-height:650px;padding-bottom:75px;">
                <div class="section-title">
                  用户列表
                  <span class="desc">共{{total}}个用户</span>
                </div>
                <div class="search">
                  <div class="content common">
                    <a-input-search
                      placeholder="搜索用户名称、用户手机号"
                      enter-button="搜索"
                      size="large"
                      @search="onSearch"
                      v-model="inputVal"
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
                      <col width="150" />
                      <col width="150" />
                      <col width="150" />
                      <col width="150" />
                      <col width="130" />
                      <col width="150" />
                      <col width="200" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>用户ID</td>
                        <td>用户名称</td>
                        <td style="text-align:right;">用户手机号</td>
                        <td style="text-align:right;">加入机构</td>
                        <td style="text-align:right;">状态</td>
                        <td style="text-align:right;">注册时间</td>
                        <td style="text-align:right;">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="userList.length > 0">
                      <tr v-for="(item,index) in userList" :key="index">
                        <td>
                          <span class="main-font">{{item.user_id}}</span>
                        </td>
                        <td>
                          <span class="main-font">{{item.account}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.mobile}}</span>
                        </td>
                        <td style="text-align:right;">
                          <div
                            v-if="item.count == 1"
                            class="click-font one-text"
                            @click="showModal(item,index)"
                            :title="item.organization_name"
                            style="width:150px;"
                          >{{item.organization_name}}</div>
                          <span
                            class="click-font"
                            @click="showModal(item,index)"
                            v-if="item.count > 1"
                          >共加入{{item.count}}个机构</span>
                          <span class="click-font" v-if="item.count == 0">--</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.state==1?'正常':'注销'}}</span>
                        </td>
                        <td style="text-align:right;">{{item.create_time}}</td>
                        <td style="text-align:right;">
                          <span class="click-font" @click="showInfoModal(item,index)">信息</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7" style="text-align:center;">
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
                    :total="total"
                    :defaultPageSize="page_size"
                    v-model="page"
                    @change="onShowSizeChange"
                  />
                </div>
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
    <!-- 已加入机构 -->
    <a-modal
      v-model="alreadyJoin"
      width="600px"
      :title="userInfo.account+'已加入的机构'"
      on-ok="handleOk"
    >
      <template slot="footer">
        <div class="clearfix">
          <div
            class="float-left click-font-warn"
            style="line-height:32px;"
            @click="moveoutOrganize"
          >移出机构</div>
          <div class="float-right">
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="moveoutOrganize">确定</a-button>
          </div>
        </div>
      </template>
      <div class="popup">
        <div class="organize-list" v-if="joinOrganizeList.length > 0">
          <div class="clearfix select" v-for="(item,index) in joinOrganizeList" :key="index">
            <div class="float-left">{{item.organization_name}}</div>
            <div class="float-right">
              <a-checkbox :checked="item.checked" @change="onChange(item,index,$event)"></a-checkbox>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <!-- 查看信息 -->
    <a-modal v-model="readOrganize" width="600px" title="用户信息" on-ok="readhandleOk">
      <template slot="footer">
        <div class="clearfix">
          <div
            class="float-left click-font-warn"
            style="line-height:32px;"
            @click="deleteOrganize"
            v-if="userInfo.state == 1"
          >注销用户</div>
          <div class="float-right">
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="readhandleOk">确定</a-button>
          </div>
        </div>
      </template>
      <div class="popup">
        <div class="option">
          <span class="lable">头像</span>
          <div class="normal">
            <img
              src="../../assets/user1.png"
              alt
              width="60px"
              height="60px"
              v-if="userInfo.pic == 1"
            />
            <img
              src="../../assets/user2.png"
              alt
              width="60px"
              height="60px"
              v-if="userInfo.pic == 2"
            />
            <img
              src="../../assets/user3.png"
              alt
              width="60px"
              height="60px"
              v-if="userInfo.pic == 3"
            />
            <img
              src="../../assets/user4.png"
              alt
              width="60px"
              height="60px"
              v-if="userInfo.pic == 4"
            />
            <img
              src="../../assets/user5.png"
              alt
              width="60px"
              height="60px"
              v-if="userInfo.pic == 5"
            />
            <img
              src="../../assets/user6.png"
              alt
              width="60px"
              height="60px"
              v-if="userInfo.pic == 6"
            />
          </div>
        </div>
        <div class="option">
          <span class="lable">用户ID</span>
          <div class="normal">{{userInfo.user_id}}</div>
        </div>
        <div class="option">
          <span class="lable">姓名</span>
          <div class="normal">{{userInfo.account}}</div>
        </div>
        <div class="option">
          <span class="lable">加入时间</span>
          <div class="normal">
            {{userInfo.create_time}}
            <span class="sub"></span>
          </div>
        </div>
        <div style="padding:0 20px;">
          <a-divider />
        </div>
        <div class="option">
          <span class="lable">手机号</span>
          <div class="normal" v-if="userInfo.mobile">{{userInfo.mobile}}</div>
          <div class="normal" v-else>--</div>
        </div>
        <div class="option">
          <span class="lable">邮箱</span>
          <div class="normal" v-if="userInfo.email">{{userInfo.email}}</div>
          <div class="normal" v-else>--</div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/index.scss"></style>
<script>
import {
  USER_GETSINCLUDE,
  USER_DELETE,
  ORGANIZATION_MEMBER_INFO,
  USER_ORGANIZATION_DELETE
} from "../../apis/admin.js";
export default {
  data() {
    return {
      powerType: 2,
      adminCount: 0,
      readOrganize: false,
      loading: false,
      alreadyJoin: false,
      searchType: 1,
      page: 1,
      page_size: 10,
      total: 0,
      userList: [],
      inputVal: "",
      userInfo: {
        user_id: 0, // 用户ID
        type: 3, // 用户类型 1, 超管, 2普通(用户和机构管理员)
        account: 13112345678, // 账号
        mobile: 13112345678, // 手机
        pic: "", // 图像
        state: 1, // 状态, 1正常, 0删除
        email: "", // 邮箱
        create_time: "", // 创建时间
        count: 1, // 加入机构数量
        organization_id: 0, // 机构id
        organization_name: "" // 机构名字
      },
      joinOrganizeList: []
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.adminCount = this.$refs.head.accountInfo.user_total;
    if (this.powerType == 1) {
      this.getData();
    }
    this.$setSlideHeight();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    onSearch(value) {
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(page, pageSize) {
      this.page = page;
      this.getData();
    },
    showModal(item, index) {
      this.userInfo = item;
      this.alreadJoinOrganize();
    },
    showInfoModal(item, index) {
      this.userInfo = item;
      this.readOrganize = true;
    },
    handleOk() {
      this.alreadyJoin = false;
    },
    readhandleOk(e) {
      this.readOrganize = false;
    },
    handleCancel(e) {
      this.readOrganize = false;
      this.alreadyJoin = false;
    },
    // 注销用户
    deleteOrganize() {
      var _this = this;
      this.$confirm({
        title: "注销用户",
        content: "注销后用户将无法继续使用",
        okText: "注销用户",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.userDelete();
        },
        onCancel() {}
      });
    },
    // 移出机构
    moveoutOrganize() {
      let ids = 0;
      // console.log(ids);return
      // if (ids > 0) {
      this.joinOrganizeList.map((value, key) => {
        if (value.checked) {
          ids++;
        }
      });
      if (ids > 0) {
        let _this = this;
        this.$confirm({
          title: "移出机构",
          content: "确认将用户移出机构？",
          okText: "移出机构",
          cancelText: "取消",
          okType: "danger",
          onOk() {
            _this.joinOrganizeList.map((value, key) => {
              if (value.checked) {
                _this.moveOut(value.organization_id);
                ids++;
              }
            });
          },
          onCancel() {}
        });
      } else {
        this.$refs.head.globalTip(1, "请选择需要移出的机构", 0);
      }
    },
    onChange(item, index, e) {
      this.joinOrganizeList = this.joinOrganizeList.map((value, key) => {
        if (index == key)
          value.checked ? (value.checked = false) : (value.checked = true);
        return value;
      });
    },
    // 获取列表数据
    async getData() {
      let data = {
        page: this.page,
        page_size: this.page_size,
        user_state: 1
      };
      if (this.searchType == 0) data.organization_mix = this.inputVal;
      if (this.searchType == 1) data.user_mix = this.inputVal;
      let res = await USER_GETSINCLUDE(data);
      if (res.code == 0) {
        this.userList = res.data.lists;
        this.total = res.data.count;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 注销用户
    async userDelete() {
      let data = {
        user_id: this.userInfo.user_id
      };
      let res = await USER_DELETE(data);
      if (res.code == 0) {
        this.readOrganize = false;
        this.getData();
        this.$refs.head.globalTip(2, "注销成功", 0);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 已加入机构
    async alreadJoinOrganize() {
      let data = {
        user_id: this.userInfo.user_id
      };
      let res = await ORGANIZATION_MEMBER_INFO(data);
      if (res.code == 0) {
        this.joinOrganizeList = [];
        this.joinOrganizeList = res.data.extra;
        this.joinOrganizeList = this.joinOrganizeList.map((value, key) => {
          value.checked = false;
          return value;
        });
        this.alreadyJoin = true;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 移出机构
    async moveOut(ids) {
      let data = {
        organization_id: ids,
        user_id: this.userInfo.user_id
      };
      let res = await USER_ORGANIZATION_DELETE(data);
      if (res.code == 0) {
        this.alreadyJoin = false;
        this.getData();
        this.$refs.head.globalTip(2, "移出机构成功", 0);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    }
  }
};
</script>
