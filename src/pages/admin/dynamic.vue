<template>
  <div id="feedbackPage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminDynamic"></SlideNav>
        </div>
        <div class="float-right">
          <div
            class="main-container"
            style="min-height: 660px"
            v-if="powerType == 1"
          >
            <div class="model-container">
              <div class="model-bg">
                <div
                  class="clearfix"
                  style="line-height: 48px; padding: 0 15px"
                >
                  <div class="float-right">
                    <span class="click-font" @click="release"
                      >发布产品动态</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="top clearfix">
                  <div class="float-left title">
                    08月24日 功能优化：生命周期评分算法重磅升级！
                  </div>
                  <div class="float-right">
                    <span>2020-12-25 12:20:20</span>
                  </div>
                </div>
                <div class="middle one">
                  <div>
                    为了更好地为商家提供服务，小鹅通将上线微信服务商模式账户，您将可以灵活管理店铺收入，提现最快3小时到账，支持对公银行账户提现！
                  </div>
                </div>
                <div class="bottom1 clearfix">
                  <div class="float-right">
                    <span><a-button @click="cancel">删除</a-button></span>
                    <span style="margin-left: 5px"
                      ><a-button type="primary" @click="edit"
                        >修改</a-button
                      ></span
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- 分页 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="page">
                  <a-pagination
                    :show-total="(total) => `共 ${total} 条数据`"
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
    <a-modal
      v-model="replyHandle"
      width="600px"
      :title="type == 1 ? '新建产品动态' : '修改产品动态'"
      on-ok="handleOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
      </template>
      <div class="popup" style="padding: 20px 24px">
        <div>
          <a-textarea placeholder v-model="product.val" style="height: 140px" />
        </div>
        <div class="clearfix" style="margin-top: 10px">
          <div class="float-left">
            <span class="text" style="line-height: 32px">跳转链接</span>
          </div>
          <div class="float-left" style="width: 490px; margin-left: 12px">
            <a-input placeholder="请输入链接地址" v-model="product.url" />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/other.scss"></style>
<script>
export default {
  data() {
    return {
      powerType: 2,
      page: 1,
      pageSize: 20,
      total: 0,
      type: 1,
      product: {
        id: 0,
        val: "",
        url: "",
      },
      replyHandle: false,
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
  },
  updated() {},
  methods: {
    release() {
      this.type = 1;
      this.product.id = 0;
      this.product.val = "";
      this.product.url = "";
      this.replyHandle = true;
    },
    edit() {
      this.type = 2;
      this.replyHandle = true;
    },
    onShowSizeChange(page, pageSize) {},
    handleCancel() {
      this.replyHandle = false;
    },
    handleOk() {
      var _this = this;
      this.$confirm({
        title: _this.type == 1 ? "确认发布产品动态" : "确认修改产品动态",
        content:
          _this.type == 1
            ? "发布后将通知所有用户并展示消息内容。"
            : "修改产品动态不会重新以新消息通知用户。",
        okText: "确认",
        cancelText: "取消",
        okType: "primary",
        onOk() {},
        onCancel() {},
      });
    },
    cancel() {
      var _this = this;
      this.$confirm({
        title: "确认删除产品动态",
        content: "删除后将不再显示在用户的消息列表中。",
        okText: "确认",
        cancelText: "取消",
        okType: "primary",
        onOk() {},
        onCancel() {},
      });
    },
  },
};
</script>
