<template>
  <div id="">
    <HeadNav type="inquire" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="inquire" sort="goods"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="powerType == 1">
            <div class="model-container">
              <div class="model-bg" style="padding:0 15px;">
                <a-tabs :activeKey="tabKey" @change="callback">
                  <a-tab-pane key="1" tab="页面访问"></a-tab-pane>
                  <a-tab-pane key="2" tab="用户访问"></a-tab-pane>
                </a-tabs>
              </div>
            </div>
            <div class="model-container">
                <div class="model-bg" style="min-height:600px;">
                    <div class="section-title">
                        <span v-if="tabKey == '1'">页面访问数据</span>
                        <span v-if="tabKey == '2'">用户访问数据</span>
                    </div>
                    <!-- 列表 -->
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
                                    <td style="text-align:right;">最近7天查询量</td>
                                    <td style="text-align:right;">最近7天查询人数</td>
                                    <td style="text-align:right;">累计查询量</td>
                                    <td style="text-align:right;">累计查询人数</td>
                                    <td style="text-align:right;">最近查询记录</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td></td>
                                    <td style="text-align:right;"></td>
                                    <td style="text-align:right;"></td>
                                    <td style="text-align:right;"></td>
                                    <td style="text-align:right;"></td>
                                    <td style="text-align:right;"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
          </div>
          <div class="main-container" v-else>
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
</template>
<script>
export default {
  data() {
    return {
      powerType: 1,
      tabKey:"1",
      pageList:[],
      userList:[]
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
  },
  methods: {
      callback(key){
          this.tabKey = key;
      }
  },
};
</script>