<template>
  <div id="organizePage">
    <HeadNav type="admin" ref="head"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminIndex"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="powerType == 1">
            <div class="model-container">
              <div class="model-bg" style="min-height:650px;padding-bottom:75px;" v-if="powerType == 1">
                <div class="section-title clearfix">
                  <span class="float-left">{{organization_name}} 成员列表</span>
                  <span class="float-right click-font" @click="showModal">添加成员</span>
                </div>
                <div class="search">
                  <div class="content common">
                    <a-input-search
                      placeholder="搜索用户名称、用户手机号"
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
                      <col width="150" />
                      <col width="150" />
                      <col width="150" />
                      <col width="130" />
                      <col width="150" />
                      <col width="150" />
                      <col width="200" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>用户ID</td>
                        <td>用户名称</td>
                        <td style="text-align:right;">用户手机号</td>
                        <td style="text-align:right;">权限</td>
                        <td style="text-align:right;">加入时间</td>
                        <td style="text-align:right;">注册时间</td>
                        <td style="text-align:right;">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="userList.length > 0">
                      <tr v-for="(item,index) in userList" :key="index">
                        <td>{{item.user_id}}</td>
                        <td>{{item.account}}</td>
                        <td style="text-align:right;">{{item.mobile}}</td>
                        <td style="text-align:right;">
                          <span
                            class="click-font"
                            @click="toMemberFunction(item,index)"
                          >{{item.user_organization_type==1?'管理员':'普通用户'}}</span>
                        </td>
                        <td style="text-align:right;">{{item.join_time}}</td>
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
                    :total="totalCount"
                    :defaultPageSize="page_size"
                    v-model="page"
                    @change="onShowSizeChange"
                  />
                </div>
              </div>
              <div class="model-bg" style="min-height:650px;padding-bottom:75px;position:relative" v-else>
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
    <!-- 添加成员弹层 -->
    <a-modal v-model="addOrganize" width="600px" title="添加成员" on-ok="handleOk">
      <template slot="footer">
        <div class="clearfix">
          <div class="float-left click-font" style="line-height:32px;" @click="inviteNew">邀请新成员</div>
          <div class="float-right">
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" :loading="loading" @click="handleOk">添加为成员</a-button>
          </div>
        </div>
      </template>
      <div class="popup" style="text-align:center;min-height:260px;">
        <div class="option">
          <a-auto-complete
            option-label-prop="value"
            style="width: 560px"
            placeholder="搜索用户名称、用户手机号"
            @search="onAddSearch"
            @select="selected"
            v-model="memberName"
          >
            <template slot="dataSource">
              <a-select-option v-for="(opt,index) in dataSource" :key="index" :value="opt.account">
                <div class="result">
                  <img :src="opt.pic" alt width="20px" height="20px" />
                  <span>{{opt.account}}（{{opt.mobile}}）</span>
                </div>
              </a-select-option>
            </template>
            <a-input>
              <a-icon slot="prefix" type="search" class="certain-category-icon" />
            </a-input>
          </a-auto-complete>
          <div class="content">
            <div class="choose-item" v-for="(item,index) in chooseList" :key="index">
              <img :src="item.pic" alt width="20px" height="20px" />
              <span>{{item.account}} （{{item.mobile}}）</span>
              <a-icon type="close" class="delete" @click="remove(item,index)" />
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
          >移出机构</div>
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
            <img src="../../assets/user1.png" alt width="60px" height="60px" v-if="memberInfo.pic == 1" />
            <img src="../../assets/user2.png" alt width="60px" height="60px" v-if="memberInfo.pic == 2" />
            <img src="../../assets/user3.png" alt width="60px" height="60px" v-if="memberInfo.pic == 3" />
            <img src="../../assets/user4.png" alt width="60px" height="60px" v-if="memberInfo.pic == 4" />
            <img src="../../assets/user5.png" alt width="60px" height="60px" v-if="memberInfo.pic == 5" />
            <img src="../../assets/user6.png" alt width="60px" height="60px" v-if="memberInfo.pic == 6" />
          </div>
        </div>
        <div class="option">
          <span class="lable">用户ID</span>
          <div class="normal">{{memberInfo.user_id}}</div>
        </div>
        <div class="option">
          <span class="lable">姓名</span>
          <div class="normal">{{memberInfo.account}}</div>
        </div>
        <div class="option">
          <span class="lable">加入时间</span>
          <div class="normal">
            {{memberInfo.create_time}}
            <span class="sub">（{{memberInfo.inviter_account}}邀请）</span>
          </div>
        </div>
        <div style="padding:0 20px;">
          <a-divider />
        </div>
        <div class="option">
          <span class="lable">手机号</span>
          <div class="normal" v-if="memberInfo.mobile">{{memberInfo.mobile}}</div>
          <div class="normal" v-else>--</div>
        </div>
        <div class="option">
          <span class="lable">邮箱</span>
          <div class="normal" v-if="memberInfo.email">{{memberInfo.email}}</div>
          <div class="normal" v-else>--</div>
        </div>
      </div>
    </a-modal>
    <!-- 邀请新成员生成链接 -->
    <a-modal v-model="creatUrl" width="600px" title="邀请新成员加入机构" :footer="null">
      <div class="popup">
        <div class="option">
          <!-- <p style="padding:0 25px;">将 {用户姓名} 设置为：</p> -->
          <div class="role-content">
            <a-radio-group v-model="roleValue" @change="urlChange">
              <a-radio :style="radioStyle" :value="1">管理员</a-radio>
              <a-radio :style="radioStyle" :value="2">成员</a-radio>
            </a-radio-group>
            <span class="admin">机构管理 | 邀请成员 | 分配权限</span>
            <span class="read-data">查看数据</span>
          </div>
        </div>
        <div class="scess">
          <a-divider />
          <div class="url">{{inviteUrl}}</div>
          <p>邀请链接将在24小时内有效，链接过期不会影响已加入项目的成员</p>
          <div class="copy">
            <a-button type="primary" block size="large" @click="doCopy" style="font-size:14px !important;">复制链接</a-button>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/index.scss"></style>
<script>
import {
  ORGANIZATION_MEMBER_GETS,
  ORGANIZATION_MEMBER_DELETE,
  ORGANIZATION_MEMBER_ADD,
  ORGANIZATION_MEMBER_INFO,
  USER_BASEGETS,
  USER_GETSINCLUDE
} from "../../apis/admin.js";
import { USER_INVITE_CREATE } from "../../apis/login.js";
export default {
  data() {
    return {
      powerType:2,
      addOrganize: false,
      readOrganize: false,
      creatUrl: false,
      loading: false,
      value: "",
      dataSource: [],
      roleValue: 2,
      radioStyle: {
        display: "block",
        height: "40px",
        lineHeight: "40px"
      },
      inviteUrl: "https://lanhuapp.com/url/jCSRc-tA1JH",
      organization_id: 1,
      organization_name: "",
      user_id: 0,
      userList: [],
      searchVal:"",
      page: 1,
      page_size: 20,
      totalCount: null,
      memberIndex: 0,
      memberInfo: {
        user_id: 2,
        account: 13112345678, // 账号
        mobile: 13112345678, // 电话
        pic: "", // 图像
        email: "", // 邮箱
        create_time: "2020-07-27 11:48:03", // 注册时间
        user_organization_type: 2, // 权限, 1机构管理员, 2普通用户
        join_time: "2020-07-27 11:48:03", // 加入时间,
        inviter_account:""
      },
      chooseList: [],
      memberName:""
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.organization_id = this.$route.query.organization_id;
    this.organization_name = this.$route.query.organization_name;
    if(this.powerType == 1){
      this.getData();
    }
    this.$setSlideHeight();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    // 获取成员列表
    async getData() {
      let data = {
        organization_id: this.organization_id,
        page: this.page,
        page_size: this.page_size,
        user_mix:this.searchVal,
        user_state:1
      };
      let res = await ORGANIZATION_MEMBER_GETS(data);
      if (res.code == 0) {
        this.userList = res.data.lists;
        this.totalCount = res.data.total;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 查看成员信息
    async readMemberInfo(_index) {
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id
      };
      let res = await ORGANIZATION_MEMBER_INFO(data);
      if (res.code == 0) {
        this.memberInfo = res.data;
        this.memberInfo.inviter_account = this.userList[_index].inviter_account;
        this.readOrganize = true;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 删除成员
    async deleteMember() {
      let data = {
        organization_id: this.organization_id,
        user_id: this.user_id
      };
      let res = await ORGANIZATION_MEMBER_DELETE(data);
      if (res.code == 0) {
        this.userList = this.userList.filter((value, key) => {
          return this.memberIndex != key;
        });
        this.readOrganize = false;
        this.$refs.head.globalTip(2,"移出机构成功")
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 生成邀请码
    async buildInvite() {
      let data = {
        invite_type: this.roleValue,
        organization_id: this.organization_id
      };
      let res = await USER_INVITE_CREATE(data);
      if (res.code == 0) {
        this.inviteUrl =
          window.location.href.split("#")[0] +
          "#/login/register?inviteCode=" +
          res.data.invite_code;
        this.addOrganize = false;
        this.creatUrl = true;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 添加成员时搜索成员
    async searchMember(_value) {
      let data = {
        user_mix: _value,
        page_size: 10000000
      };
      let res = await USER_GETSINCLUDE(data);
      if (res.code == 0) {
        this.dataSource = res.data.lists.map((value, key) => {
          value.account = value.account.toString();
          return value;
        });
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 添加成员
    async addMember(ids) {
      let data = {
        organization_id: this.organization_id,
        user_ids: ids
      };
      let res = await ORGANIZATION_MEMBER_ADD(data);
      if (res.code == 0) {
        this.addOrganize = false;
        this.getData();
        this.$refs.head.globalTip(2,"添加成功")
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 搜索成员列表
    async searchData() {},
    // 分页切换
    onShowSizeChange(page, pageSize) {
      // console.log(page,pageSize)
      this.page = page;
      this.getData();
    },
    onSearch(value) {
      this.page = 1;
      this.searchVal = value;
      this.getData();
    },
    showModal() {
      this.memberName = "";
      this.chooseList = [];
      this.addOrganize = true;
    },
    showInfoModal(item, index) {
      this.user_id = item.user_id;
      this.memberIndex = index;
      this.readMemberInfo(index);
    },
    handleOk(e) {
      let ids = '';
      for (let i = 0; i < this.chooseList.length; i++) {
        if (ids) {
          ids += "," + this.chooseList[i].user_id;
        } else {
          ids += this.chooseList[i].user_id;
        }
      }
      // console.log(ids);return
      if (ids) {
        this.addMember(ids);
      } else {
        this.$refs.head.globalTip(1,"请选择要添加的成员")
      }
    },
    readhandleOk(e) {
      this.readOrganize = false;
    },
    handleCancel(e) {
      this.addOrganize = false;
      this.readOrganize = false;
    },
    // 添加新成员
    onAddSearch(value) {
      console.log("search", value);
      let _value = value.toString();
      this.searchMember(_value);
    },
    // 选中成员
    selected(value) {
      console.log(value);
      this.memberName = "";
      for (let i = 0; i < this.dataSource.length; i++) {
        if (value == this.dataSource[i].account) {
          this.chooseList.push(this.dataSource[i]);
        }
      }
    },
    // 移出已选中
    remove(item, index) {
      this.chooseList = this.chooseList.filter((value, key) => {
        return index != key;
      });
    },
    // onSelect(value) {
    //   console.log("onSelect", value);
    // },
    // onChange(value) {
    //   console.log("onChange", value);
    // },
    // 移出机构
    deleteOrganize() {
      var _this = this;
      this.$confirm({
        title: "确认移出该用户",
        content: "移出后用户将无法继续查看该机构数据",
        okText: "移出机构",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.deleteMember();
        },
        onCancel() {}
      });
    },
    // 成员权限设置
    toMemberFunction(item, index) {
      this.$router.push({
        name: "memberfunction",
        query: {
          user_id: item.user_id,
          user_name: item.account,
          organization_id: this.organization_id,
        }
      });
    },
    // 复制链接
    doCopy() {
      var _this = this;
      this.$copyText(this.inviteUrl).then(
        function(e) {
          _this.$refs.head.globalTip(2,"复制成功")
          // console.log(e);
        },
        function(e) {
          _this.$refs.head.globalTip(1,"复制失败")
          // console.log(e);
        }
      );
    },
    // 邀请新成员
    inviteNew() {
      this.buildInvite();
    },
    // 邀请权限改变
    urlChange() {
      this.buildInvite();
    }
  }
};
</script>
