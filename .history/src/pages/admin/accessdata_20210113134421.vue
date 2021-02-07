<template>
  <div id="">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminAccess"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="powerType == 1">
            <div class="model-container">
              <div class="model-bg" style="padding: 0 15px">
                <a-tabs :activeKey="tabKey" @change="callback">
                  <a-tab-pane key="1" tab="页面访问"></a-tab-pane>
                  <a-tab-pane key="2" tab="用户访问"></a-tab-pane>
                </a-tabs>
              </div>
            </div>
            <div class="model-container">
              <div class="model-bg" style="min-height: 600px;position:relaa">
                <div class="section-title">
                  <span v-if="tabKey == '1'">页面访问数据</span>
                  <span v-if="tabKey == '2'">用户访问数据</span>
                </div>
                <!-- 页面访问数据列表 -->
                <div class="table" v-if="tabKey == '1'">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="340" />
                      <col width="120" />
                      <col width="120" />
                      <col width="120" />
                      <col width="120" />
                      <col width="230" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>页面名称</td>
                        <td style="text-align: right">最近7天查询量</td>
                        <td style="text-align: right">最近7天查询人数</td>
                        <td style="text-align: right">累计查询量</td>
                        <td style="text-align: right">累计查询人数</td>
                        <td style="text-align: right">最近查询记录</td>
                      </tr>
                    </thead>
                    <tbody v-if="pageList.length > 0">
                      <tr v-for="(item,index) in pageList" :key="index">
                        <td>
                            <span class="main-font">{{item.page_name}}</span>
                        </td>
                        <td style="text-align: right">
                            <span class="main-font">{{item.recently_views}}</span>
                        </td>
                        <td style="text-align: right">
                            <span class="main-font">{{item.recently_users}}</span>
                        </td>
                        <td style="text-align: right">{{item.all_views}}</td>
                        <td style="text-align: right">{{item.all_users}}</td>
                        <td style="text-align: right">
                            <span class="main-font">{{item.last_view_info.account}}（{{item.last_view_info.mobile}}）</span>
                            <div>{{item.last_view_info.date_time}}</div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="6" style="text-align: center">
                                <div style="margin-top:130px;"><a-empty /></div>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 用户访问数据列表 -->
                <div class="table" v-if="tabKey == '2'">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="240" />
                      <col width="120" />
                      <col width="120" />
                      <col width="340" />
                      <col width="220" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>用户信息</td>
                        <td style="text-align: right">最近7天查询量</td>
                        <td style="text-align: right">累计查询量</td>
                        <td style="text-align: right">常用功能</td>
                        <td style="text-align: right">最近查询记录</td>
                      </tr>
                    </thead>
                    <tbody v-if="userList.length > 0">
                      <tr v-for="(item,index) in userList" :key="index">
                        <td>
                            <span class="main-font">{{item.name}}（{{item.mobile}}）</span>
                        </td>
                        <td style="text-align: right">
                            <span class="main-font">{{item.recently_views}}</span>
                        </td>
                        <td style="text-align: right">
                            <span class="main-font">{{item.all_views}}</span>
                        </td>
                        <td style="text-align: right">{{item.most_view}}</td>
                        <td style="text-align: right">
                            <span class="main-font">{{item.last_view_info.page_name}}</span>
                            <div>{{item.last_view_info.date_time}}</div>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                        <tr>
                            <td colspan="5" style="text-align: center">
                                <div style="margin-top:130px;"><a-empty /></div>
                            </td>
                        </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 分页 -->
                <div class="page" v-if="tabKey == '2'">
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
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<script>
import { VISITDATA_PAGE, VISITDATA_USER } from "../../apis/inquire.js";
export default {
  data() {
    return {
      powerType: 1,
      tabKey: "1",
      pageList: [],
      userList: [],
      page:1,
      total:0,
      pageSize:20,
      isLoading:true,
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.getData();
  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res;
      if (this.tabKey == "1") {
        res = await VISITDATA_PAGE(data);
      } else if (this.tabKey == "2") {
        res = await VISITDATA_USER(data);
      }
      if (res.code == 0) {
        this.powerType == 1;
        if (this.tabKey == "1") {
          this.pageList = [];
          this.pageList = res.data;
        } else if (this.tabKey == "2") {
          this.userList = [];
          this.total = res.data.count;
          this.userList = res.data.list;
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.powerType = 1;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    callback(key) {
      this.tabKey = key;
      this.getData();
    },
    onShowSizeChange(page, pageSize) {
      this.isLoading = true;
      this.page = page;
      this.getData();
    },
  },
};
</script>