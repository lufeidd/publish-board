<template>
  <div id="organizePage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminUser"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="powerType == 1">
            <!-- <div class="model-container">
              <div class="model-bg total-user">全平台总计 {{adminCount}} 个用户</div>
            </div>-->
            <div class="model-container">
              <div
                class="model-bg"
                style="min-height: 660px; padding-bottom: 75px"
              >
                <div class="section-title clearfix">
                  <div class="float-left">
                    用户列表
                    <span class="desc">共{{ total }}个用户</span>
                  </div>
                  <div class="float-right">
                    <span class="click-font" @click="urlChange">邀请用户</span>
                  </div>
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
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="100" />
                      <col width="150" />
                      <col width="100" />
                      <col width="130" />
                      <col width="120" />
                      <col width="130" />
                      <col width="150" />
                      <col width="200" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>用户ID</td>
                        <td>用户名称</td>
                        <td style="text-align: right">角色</td>
                        <td style="text-align: right">用户手机号</td>
                        <td style="text-align: right">加入机构</td>
                        <td style="text-align: right">状态</td>
                        <td style="text-align: right">注册时间</td>
                        <td style="text-align: right">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="userList.length > 0">
                      <tr v-for="(item, index) in userList" :key="index">
                        <td>
                          <span class="main-font">{{ item.user_id }}</span>
                        </td>
                        <td>
                          <span class="main-font">{{ item.account }}</span>
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.type == 1" class="click-font" @click="setFunction(item,index)"
                            >平台级用户</span
                          >
                          <span class="main-font" v-if="item.type == 2"
                            >机构级用户</span
                          >
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.mobile }}</span>
                        </td>
                        <td style="text-align: right">
                          <div
                            v-if="item.count == 1"
                            class="click-font one-text"
                            @click="showModal(item, index)"
                            :title="item.organization_name"
                            style="width: 150px"
                          >
                            {{ item.organization_name }}
                          </div>
                          <span
                            class="click-font"
                            @click="showModal(item, index)"
                            v-if="item.count > 1"
                            >共加入{{ item.count }}个机构</span
                          >
                          <span class="click-font" v-if="item.count == 0"
                            >--</span
                          >
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{
                            item.state == 1 ? "正常" : "注销"
                          }}</span>
                        </td>
                        <td style="text-align: right">
                          {{ item.create_time }}
                        </td>
                        <td style="text-align: right">
                          <span
                            class="click-font"
                            style="margin-right: 10px"
                            v-if="item.state == 0"
                            @click="deleteUser(item,index)"
                            >删除</span
                          >
                          <span
                            class="click-font"
                            style="margin-right: 10px"
                            v-if="item.state == 0"
                            @click="recover(item,index)"
                            >恢复</span
                          >
                          <span
                            class="click-font"
                            @click="showInfoModal(item, index)"
                            >信息</span
                          >
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7" style="text-align: center">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 分页 -->
                <div class="page">
                  <a-pagination
                    :show-total="(total) => `共 ${total} 条数据`"
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
              <div
                class="model-bg"
                style="
                  min-height: 660px;
                  padding-bottom: 75px;
                  position: relative;
                "
              >
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
      :title="userInfo.account + '已加入的机构'"
      on-ok="handleOk"
    >
      <template slot="footer">
        <div class="clearfix">
          <div
            class="float-left click-font-warn"
            style="line-height: 32px"
            @click="moveoutOrganize"
          >
            移出机构
          </div>
          <div class="float-right">
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button
              key="submit"
              type="primary"
              :loading="loading"
              @click="handleCancel"
              >确定</a-button
            >
          </div>
        </div>
      </template>
      <div class="popup">
        <div class="organize-list" v-if="joinOrganizeList.length > 0">
          <div
            class="clearfix select"
            v-for="(item, index) in joinOrganizeList"
            :key="index"
          >
            <div class="float-left">{{ item.organization_name }}</div>
            <div class="float-right">
              <a-checkbox
                :checked="item.checked"
                @change="onChange(item, index, $event)"
              ></a-checkbox>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <!-- 查看信息 -->
    <a-modal
      v-model="readOrganize"
      width="600px"
      title="用户信息"
      on-ok="readhandleOk"
    >
      <template slot="footer">
        <div class="clearfix">
          <div class="float-left" style="line-height: 32px">
            <span
              class="click-font-warn"
              @click="deleteOrganize"
              v-if="userInfo.state == 1"
              style="margin-right: 40px"
              >注销用户</span
            >
            <span class="click-font-warn" @click="resetPssword">重置密码</span>
          </div>
          <div class="float-right">
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button
              key="submit"
              type="primary"
              :loading="loading"
              @click="readhandleOk"
              >确定</a-button
            >
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
              style="width:60px;height:60px;"
              v-if="userInfo.pic == 1"
            />
            <img
              src="../../assets/user2.png"
              alt
              style="width:60px;height:60px;"
              v-else-if="userInfo.pic == 2"
            />
            <img
              src="../../assets/user3.png"
              alt
              style="width:60px;height:60px;"
              v-else-if="userInfo.pic == 3"
            />
            <img
              src="../../assets/user4.png"
              alt
              style="width:60px;height:60px;"
              v-else-if="userInfo.pic == 4"
            />
            <img
              src="../../assets/user5.png"
              alt
              style="width:60px;height:60px;"
              v-else-if="userInfo.pic == 5"
            />
            <img
              src="../../assets/user6.png"
              alt
              style="width:60px;height:60px;"
              v-else-if="userInfo.pic == 6"
            />
            <span
              v-else
              class="no-pic"
              style="min-width: 60px; min-height: 60px; border-radius: 50%"
            ></span>
          </div>
        </div>
        <div class="option">
          <span class="lable">用户ID</span>
          <div class="normal">{{ userInfo.user_id }}</div>
        </div>
        <div class="option">
          <span class="lable">姓名</span>
          <div class="normal">{{ userInfo.account }}</div>
        </div>
        <div class="option">
          <span class="lable">加入时间</span>
          <div class="normal">
            {{ userInfo.create_time }}
            <span class="sub"></span>
          </div>
        </div>
        <div style="padding: 0 20px">
          <a-divider />
        </div>
        <div class="option">
          <span class="lable">手机号</span>
          <div class="normal" v-if="userInfo.mobile">{{ userInfo.mobile }}</div>
          <div class="normal" v-else>--</div>
        </div>
        <div class="option">
          <span class="lable">邮箱</span>
          <div class="normal" v-if="userInfo.email">{{ userInfo.email }}</div>
          <div class="normal" v-else>--</div>
        </div>
      </div>
    </a-modal>
    <!-- 邀请新成员生成链接 -->
    <a-modal
      v-model="creatUrl"
      width="600px"
      title="邀请平台级用户加入博道数据中心"
      :footer="null"
    >
      <div class="popup">
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
            }}<a-icon type="sync" class="reflash" @click="urlChange" />
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
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/index.scss"></style>
<script>
import {
  USER_GETSINCLUDE,
  USER_DELETE,
  ORGANIZATION_MEMBER_INFO,
  USER_ORGANIZATION_DELETE,
  USER_DESTROY,
  USER_ACTIVE,
  ORGANIZATION_MEMBER_RESETPWD,
} from "../../apis/admin.js";
import { USER_INVITE_ADMIN_CREATE } from "../../apis/login.js";
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
        account: "", // 账号
        mobile: "", // 手机
        pic: "", // 图像
        state: 1, // 状态, 1正常, 0删除
        email: "", // 邮箱
        create_time: "", // 创建时间
        count: 1, // 加入机构数量
        organization_id: 0, // 机构id
        organization_name: "", // 机构名字
      },
      joinOrganizeList: [],
      isLoading: true,
      creatUrl: false,
      inviteUrl: "",
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.adminCount = this.$refs.head.accountInfo.user_total;
    if (this.powerType == 1) {
      this.getData();
    } else {
      this.isLoading = false;
    }
  },
  updated() {},
  methods: {
    onSearch(value) {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(page, pageSize) {
      this.isLoading = true;
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
        title: "确认注销用户",
        content: "注销后用户将无法继续使用",
        okText: "注销用户",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.userDelete();
        },
        onCancel() {},
      });
    },
    // 删除
    deleteUser(item,index) {
      var _this = this;
      this.$confirm({
        title: "确认删除用户",
        content: "确认删除该用户吗？",
        okText: "删除用户",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.userDestroy(item.user_id);
        },
        onCancel() {},
      });
    },
    resetPssword() {
      var _this = this;
      this.$confirm({
        title: "确认重置用户密码",
        content:
          "确认将该用户密码重置吗？重置后的新密码将以短信形式发送至该用户手机号。",
        okText: "重置密码",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.editPassword();
        },
        onCancel() {},
      });
    },
    recover(item,index){
      var _this = this;
      this.$confirm({
        title: "确认恢复用户",
        content: "确认恢复该用户吗？",
        okText: "恢复用户",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.activeUser(item.user_id);
        },
        onCancel() {},
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
          onCancel() {},
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
      var tStamp = this.$getTimeStamp();
      let data = {
        page: this.page,
        page_size: this.page_size,
        // user_state: 1,
        timestamp: tStamp,
      };
      if (this.searchType == 0) data.organization_mix = this.inputVal;
      if (this.searchType == 1) data.user_mix = this.inputVal;
      data.sign = this.$getSign(data);
      let res = await USER_GETSINCLUDE(data);
      if (res.code == 0) {
        this.powerType == 1;
        this.userList = res.data.lists;
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
    // 重置用户密码
    async editPassword() {
      var tStamp = this.$getTimeStamp();
      let data = {
        mobile: this.userInfo.mobile,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_MEMBER_RESETPWD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "重置密码成功", 0);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 注销用户
    async userDelete() {
      var tStamp = this.$getTimeStamp();
      let data = {
        user_id: this.userInfo.user_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await USER_DELETE(data);
      if (res.code == 0) {
        this.readOrganize = false;
        this.getData();
        this.$refs.head.globalTip(2, "注销成功", 0);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 删除用户
    async userDestroy(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        user_id: id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await USER_DESTROY(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "删除成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 恢复用户
    async activeUser(id){
      var tStamp = this.$getTimeStamp();
      let data = {
        user_id: id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await USER_ACTIVE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "恢复成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 已加入机构
    async alreadJoinOrganize() {
      var tStamp = this.$getTimeStamp();
      let data = {
        user_id: this.userInfo.user_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
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
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: ids,
        user_id: this.userInfo.user_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await USER_ORGANIZATION_DELETE(data);
      if (res.code == 0) {
        this.alreadyJoin = false;
        this.getData();
        this.$refs.head.globalTip(2, "移出机构成功", 0);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 生成邀请码
    async buildInvite() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // invite_type: this.roleValue,
        // organization_id: this.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await USER_INVITE_ADMIN_CREATE(data);
      if (res.code == 0) {
        this.inviteUrl =
          window.location.href.split("#")[0] +
          "#/login/register?inviteCode=" +
          res.data.invite_code;
        this.addOrganize = false;
        this.creatUrl = true;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 复制链接
    doCopy() {
      var _this = this;
      this.$copyText(this.inviteUrl).then(
        function (e) {
          _this.$refs.head.globalTip(2, "复制成功", 0);
          // console.log(e);
        },
        function (e) {
          _this.$refs.head.globalTip(1, "复制失败", 0);
          // console.log(e);
        }
      );
    },
    urlChange() {
      // this.creatUrl = true;
      this.buildInvite();
    },
    setFunction(item,index){
      this.$router.push({
        name:"adminset",
        query:{
          user_id:item.user_id,
          user_name:item.account,
        }
      })
    }
  },
};
</script>
