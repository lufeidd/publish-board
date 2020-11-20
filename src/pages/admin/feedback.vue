<template>
  <div id="feedbackPage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminFeedback"></SlideNav>
        </div>
        <div class="float-right">
          <div
            class="main-container"
            v-if="powerType == 1"
            style="min-height: 660px"
          >
            <div class="model-container">
              <div class="model-bg">
                <div class="clearfix" style="padding: 10px 15px">
                  <div class="float-left" style="line-height: 32px">
                    <a-dropdown :trigger="['click']" placement="bottomLeft">
                      <a
                        class="ant-dropdown-link"
                        @click="(e) => e.preventDefault()"
                        style="font-size: 12px; color: #4576db"
                      >
                        <span v-if="chooseType == 0">所有意见与反馈</span>
                        <span v-if="chooseType == 1">友好建议</span>
                        <span v-if="chooseType == 2">问题反馈</span>
                        <span v-if="chooseType == 3">生气吐槽</span>
                        <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay">
                        <a-menu-item
                          v-for="(item, index) in conditionList"
                          :key="index"
                        >
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectCategory(item, index)"
                            >{{ item.name }}</a
                          >
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                  <div class="float-right" style="width: 378px">
                    <a-input-search
                      placeholder="搜索用户名称、手机号码"
                      enter-button="搜索"
                      v-model="inputVal"
                      @search="onSearch"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div v-if="list.length > 0">
              <div
                class="model-container"
                v-for="(item, index) in list"
                :key="index"
              >
                <div class="model-bg">
                  <div class="top clearfix">
                    <div class="float-left title">
                      <span v-if="item.type == 1">友好建议</span>
                      <span v-if="item.type == 2">问题反馈</span>
                      <span v-if="item.type == 3">生气吐槽</span>
                    </div>
                    <div class="float-right">
                      <span>{{ item.account }}（{{ item.mobile }}）</span>
                      <span>{{ item.create_time }}</span>
                    </div>
                  </div>
                  <div class="middle">{{ item.content }}</div>
                  <div class="bottom" v-if="item.status == 1">
                    <div>平台回复：</div>
                    <div class="desc">{{ item.reply_content }}</div>
                  </div>
                  <div class="bottom clearfix" v-if="item.status == -1">
                    <div class="float-right">已忽略</div>
                  </div>
                  <div class="bottom1 clearfix" v-if="item.status == 0">
                    <div class="float-right">
                      <span
                        ><a-button @click="lose(item, index)"
                          >忽略</a-button
                        ></span
                      >
                      <span style="margin-left: 5px"
                        ><a-button type="primary" @click="reply(item, index)"
                          >回复</a-button
                        ></span
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 空状态 -->
            <div class="model-container" v-else>
              <div class="model-bg" style="position:relative;min-height:598px;">
                <div class="no-data">暂无数据</div>
              </div>
            </div>
            <!-- 分页 -->
            <div class="model-container" v-if="list.length > 0">
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
    <!-- 回复弹层 -->
    <a-modal v-model="replyHandle" width="600px" title="回复" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">回复</a-button>
      </template>
      <div style="padding: 20px 24px">
        <a-textarea placeholder v-model="replyValue" style="height: 140px" />
      </div>
    </a-modal>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/other.scss"></style>
<script>
import {
  FEEDBACK_LISTS,
  FEEDBACK_IGNORE,
  FEEDBACK_REPLY,
} from "../../apis/user.js";
export default {
  data() {
    return {
      powerType: 2,
      conditionList: [
        { name: "所有意见与反馈", id: 0 },
        { name: "友好建议", id: 1 },
        { name: "问题反馈", id: 2 },
        { name: "生气吐槽", id: 3 },
      ],
      chooseType: 0,
      inputVal: "",
      page: 1,
      pageSize: 20,
      total: 0,
      replyHandle: false,
      replyValue: "",
      list: [],
      replyID: 0,
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
        type: this.chooseType,
        search: this.inputVal,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await FEEDBACK_LISTS(data);
      if (res.code == 0) {
        this.list = [];
        this.list = res.data.list;
        this.total = res.data.total;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async ignore(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        id: id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await FEEDBACK_IGNORE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "忽略成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async replyFeedback() {
      var tStamp = this.$getTimeStamp();
      let data = {
        id: this.replyID,
        reply_content: this.replyValue,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await FEEDBACK_REPLY(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "回复成功", 0);
        this.getData();
        this.replyHandle = false;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    selectCategory(item, index) {
      this.isLoading = true;
      this.chooseType = item.id;
      this.page = 1;
      this.getData();
    },
    onSearch() {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(page, pageSize) {
      this.isLoading = true;
      this.page = page;
      this.getData();
    },
    handleCancel() {
      this.replyHandle = false;
    },
    handleOk() {
      if (this.replyValue.length == 0) {
        this.$refs.head.globalTip(1, "回复内容不能为空", 0);
        return;
      }
      this.replyFeedback();
    },
    reply(item, index) {
      this.replyHandle = true;
      this.replyID = item.id;
    },
    lose(item, index) {
      this.ignore(item.id);
    },
  },
};
</script>
