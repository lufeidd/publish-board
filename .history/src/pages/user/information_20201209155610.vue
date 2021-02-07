<template>
  <div id="userPage">
    <HeadNav type="user" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="user" sort="userInfo"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container">
            <div class="model-container">
              <div class="model-bg" style="min-height:660px;">
                <div class="section-title">个人信息</div>
                <div class="container">
                  <div class="option">
                    <span class="lable">头像</span>
                    <div class="normal">
                      <img
                        src="../../assets/user1.png"
                        alt
                        width="80px"
                        height="80px"
                        style="width"
                        v-if="userInfo.pic == 1"
                      />
                      <img
                        src="../../assets/user2.png"
                        alt
                        width="80px"
                        height="80px"
                        v-else-if="userInfo.pic == 2"
                      />
                      <img
                        src="../../assets/user3.png"
                        alt
                        width="80px"
                        height="80px"
                        v-else-if="userInfo.pic == 3"
                      />
                      <img
                        src="../../assets/user4.png"
                        alt
                        width="80px"
                        height="80px"
                        v-else-if="userInfo.pic == 4"
                      />
                      <img
                        src="../../assets/user5.png"
                        alt
                        width="80px"
                        height="80px"
                        v-else-if="userInfo.pic == 5"
                      />
                      <img
                        src="../../assets/user6.png"
                        alt
                        width="80px"
                        height="80px"
                        v-else-if="userInfo.pic == 6"
                      />
                      <span v-else class="no-pic" style="min-width:80px;min-height:80px;border-radius:50%;"></span>
                      <span class="change" @click="changePic">
                        <a-icon type="swap" />
                      </span>
                    </div>
                  </div>
                  <div class="option">
                    <span class="lable">用户ID</span>
                    <div class="normal">{{userInfo.user_id}}</div>
                  </div>
                  <div class="option">
                    <span class="lable">姓名</span>
                    <div class="normal">{{userInfo.account}}</div>
                    <span class="edit" @click="model = true;account = userInfo.account">
                      <a-icon type="edit" />
                    </span>
                  </div>
                  <div class="option">
                    <span class="lable">手机号</span>
                    <div class="normal">{{userInfo.mobile}}</div>
                  </div>
                  <div class="option">
                    <span class="lable">密码</span>
                    <div class="normal">
                      <router-link tag="a" target="_blank" :to="{name:'editpassword',query:{type:'edit'}}"><span class="click-font">修改密码</span></router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹层 -->
    <a-modal v-model="model" width="320px" on-ok="handleOk" :closable="false">
      <template slot="footer">
        <a-button key="submit" type="primary" @click="handleOk">修改</a-button>
        <a-button key="back" @click="model = false">取消</a-button>
      </template>
      <div style="padding:15px;">
        <a-input placeholder v-model="account" />
      </div>
    </a-modal>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/user/information.scss"></style>
<script>
import { ORGANIZATION_MEMBER_INFO } from "../../apis/admin.js";
import { USER_EDIT } from "../../apis/login.js";
export default {
  data() {
    return {
      userInfo: {},
      account: "",
      pic: 0,
      model: false
    };
  },
  mounted() {
    this.getData();
  },
  updated() {

  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        user_id: this.$refs.head.accountInfo.user_id,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await ORGANIZATION_MEMBER_INFO(data);
      if (res.code == 0) {
        this.userInfo = res.data;
        if (res.data.pic) {
          this.pic = res.data.pic;
        }
        this.account = res.data.account;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    changePic() {
      if (this.pic < 6) {
        this.pic++;
      } else if (this.pic == 6) {
        this.pic = 1;
      }
      this.edit(null, this.pic);
    },
    handleOk() {
      if (this.account.length > 0) {
        this.edit(this.account, null);
      } else {
        this.$message.info({
          content: "姓名不能为空",
          icon: <a-icon type="exclamation-circle" />
        });
      }
    },
    // toEdit(){
    //   this.$router.push({name:"editpassword"})
    // },
    async edit(account, pic) {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp
      };
      if (account) data.account = account;
      if (pic) data.pic = pic;
      data.sign = this.$getSign(data);
      let res = await USER_EDIT(data);
      if (res.code == 0) {
        if (pic) {
          this.userInfo.pic = pic;
          this.$refs.head.accountInfo.pic = pic;
        }
        if (account) {
          this.userInfo.account = account;
          this.$refs.head.accountInfo.account = account;
          this.model = false;
        }
        localStorage.setItem(
          "headInfo",
          JSON.stringify(this.$refs.head.accountInfo)
        );
        this.$message.info({
          content: "修改成功",
          icon: <a-icon type="bell" />
        });
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    }
  }
};
</script>
