<template>
  <div id="feedbackPage">
    <HeadNav type="user" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="user" sort="userNotice"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" style="min-height: 660px">
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg">
                  <div class="tabs" style="padding: 0 15px">
                    <a-tabs :activeKey="tabKey" @change="callback">
                      <a-tab-pane key="1">
                        <span slot="tab">
                          系统通知
                          <a-badge dot v-if="noticeState" style="position:absolute;">
                            <div style="width: 2px"></div>
                          </a-badge>
                        </span>
                      </a-tab-pane>
                      <a-tab-pane key="2">
                        <span slot="tab">
                          待办事项
                          <a-badge dot v-if="todoState" style="position:absolute;">
                            <div style="width: 2px"></div>
                          </a-badge>
                        </span>
                      </a-tab-pane>
                      <a-tab-pane key="3">
                        <span slot="tab">
                          产品动态
                          <a-badge dot v-if="newsState" style="position:absolute;">
                            <div style="width: 2px"></div>
                          </a-badge>
                        </span>
                      </a-tab-pane>
                    </a-tabs>
                  </div>
                </div>
              </div>
            </a-affix>
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
                      {{ item.title }}
                      <a-badge dot v-if="item.message_status == 0">
                        <div style="height: 13px; width: 2px"></div>
                      </a-badge>
                    </div>
                    <div class="float-right">
                      <span>{{ item.create_time }}</span>
                    </div>
                  </div>
                  <div class="middle one">{{ item.content }}</div>
                  <!-- <div class="bottom">
                  <div>平台回复：</div>
                  <div class="desc">感谢您的意见，我们已经忽略了。</div>
                </div> -->
                  <div v-if="tabKey == '2'">
                    <div class="bottom1 clearfix" v-if="item.todo_status == 1">
                      <div class="float-right">
                        <span
                          ><a-button @click="refuce(item, index)"
                            >拒绝</a-button
                          ></span
                        >
                        <span style="margin-left: 5px">
                          <a-button type="primary" @click="reply(item, index)"
                            >同意</a-button
                          >
                        </span>
                      </div>
                    </div>
                    <div class="bottom clearfix" v-else>
                      <div class="float-right">
                        {{ item.deal_time }} {{ item.deal_account }}
                        {{ item.todo_status == 2 ? "已同意" : "已拒绝" }}
                      </div>
                    </div>
                  </div>
                  <div class="bottom1 clearfix" v-if="tabKey == '3'">
                    <div class="float-right">
                      <span>
                        <a-button type="primary">查看链接</a-button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 无数据 -->
            <div class="model-container" v-else>
              <div class="model-bg" style="position:relative;min-height:606px;">
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
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/other.scss"></style>
<script>
import {
  MESSAGE_LISTS,
  MESSAGE_READINFO,
  USER_AUTH_DEAL,
} from "../../apis/user.js";
export default {
  data() {
    return {
      tabKey: "1",
      page: 1,
      pageSize: 20,
      total: 0,
      list: [],
      noticeState: true,
      newsState: false,
      todoState: false,
      isLoading: true,
    };
  },
  mounted() {
    this.getData();
    this.getState();
  },
  updated() {

  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        type: this.tabKey,
        // organization_id: this.$refs.head.publishInfo.organization_id,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MESSAGE_LISTS(data);
      if (res.code == 0) {
        this.list = [];
        this.list = res.data.messages;
        this.total = res.data.count;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async getState() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MESSAGE_READINFO(data);
      if (res.code == 0) {
        this.noticeState = res.data.system;
        this.newsState = res.data.news;
        this.todoState = res.data.todo;
        this.$refs.head.allState = res.data.all;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async dealPower(id, type) {
      var tStamp = this.$getTimeStamp();
      let data = {
        apply_id: id,
        status: type,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await USER_AUTH_DEAL(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "操作成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    callback(key) {
      this.tabKey = key;
      this.page = 1;
      this.getData();
      this.getState();
    },
    onShowSizeChange(page, pageSize) {
      this.page = page;
      this.getData();
    },
    refuce(item, index) {
      this.dealPower(item.apply_id, 3);
    },
    reply(item, index) {
      this.dealPower(item.apply_id, 2);
    },
  },
};
</script>
