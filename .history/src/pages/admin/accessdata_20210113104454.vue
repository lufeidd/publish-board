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
              <div class="model-bg">
                <a-tabs :activeKey="tabKey" @change="callback">
                  <a-tab-pane key="1" tab="页面访问"></a-tab-pane>
                  <a-tab-pane key="2" tab="用户访问"></a-tab-pane>
                </a-tabs>
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