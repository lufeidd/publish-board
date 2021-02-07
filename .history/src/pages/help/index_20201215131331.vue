<template>
  <div id="helpPage">
    <HeadNav type="help" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div>
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
        <div class="model-container">
          <div class="model-bg" style="min-height:610px;position: relative;padding-bottom:75px;">
            <div class="content">
              <div class="clearfix">
                <div class="float-left">
                  <span
                    class="high-tab"
                    v-for="(item,index) in positionList"
                    :key="index"
                    :class="{'active':eventType==index}"
                    @click="change(item,index)"
                  >{{item.name}}</span>
                </div>
                <div class="float-right" style="width:378px;">
                  <a-input-search
                    placeholder="搜索词条关键词"
                    enter-button="搜索"
                    v-model="inputVal"
                    @search="onSearch"
                  />
                </div>
              </div>
              <!-- 列表 -->
              <div class="list" v-if="list.length > 0">
                <div class="list-td" v-for="(item,index) in list" :key="index">
                  <div class="title">{{item.title}}</div>
                  <div class="desc">{{item.content}}</div>
                </div>
              </div>
              <div style="padding:50px 0;" v-else>
                <a-empty />
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
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/help/index.scss"></style>
<script>
import { HELP_LISTS } from "../../apis/admin.js";
export default {
  data() {
    return {
      tabKey: "1",
      list: [],
      page: 1,
      pageSize: 20,
      total: 0,
      eventType: 0,
      positionList: [
        { id: 0, name: "全部" },
        { id: 1, name: "读者画像" },
        { id: 2, name: "xin" },
        { id: 3, name: "竞争" },
        { id: 4, name: "行业" },
        { id: 5, name: "应用" },
      ],
      inputVal: "",
      isLoading:true,
    };
  },
  mounted() {
    this.getData();
  },
  updated() {},
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        search: this.inputVal,
        type_id: this.tabKey,
        status: 1,
        page: this.page,
        page_size: this.pageSize,
        logo_id: this.eventType,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await HELP_LISTS(data);
      if (res.code == 0) {
        this.list = [];
        this.list = res.data.helps;
        this.total = res.data.count;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    callback(key) {},
    change(item, index) {
      this.isLoading = true;
      this.eventType = index;
      this.page = 1;
      this.getData();
    },
    onSearch() {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(page, pageSize){
      this.isLoading = true;
      this.page = page;
      this.getData();
    }
  },
};
</script>
