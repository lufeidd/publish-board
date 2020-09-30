<template>
  <div id="feedbackPage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminFeedback"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" style="min-height:660px;">
            <div class="model-container">
              <div class="model-bg">
                <div class="clearfix" style="padding:10px 15px;">
                  <div class="float-left" style="line-height:32px;">
                    <a-dropdown :trigger="['click']" placement="bottomLeft">
                      <a
                        class="ant-dropdown-link"
                        @click="e => e.preventDefault()"
                        style="font-size:12px;color:#4576DB;"
                      >
                        <span v-if="chooseType == 0">所有意见与反馈</span>
                        <span v-if="chooseType == 1">友好建议</span>
                        <span v-if="chooseType == 2">问题反馈</span>
                        <span v-if="chooseType == 3">生气吐槽</span>
                        <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay">
                        <a-menu-item v-for="(item,index) in conditionList" :key="index">
                          <a
                            href="javascript:;"
                            style="padding:5px 15px;color:#515A6E;font-size:12px;"
                            @click="selectCategory(item,index)"
                          >{{item.name}}</a>
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                  <div class="float-right" style="width:378px;">
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
            <div class="model-container">
              <div class="model-bg">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/other.scss"></style>
<script>
export default {
  data() {
    return {
      conditionList: [
        { name: "所有意见与反馈", id: 0 },
        { name: "友好建议", id: 1 },
        { name: "问题反馈", id: 2 },
        { name: "生气吐槽", id: 3 },
      ],
      chooseType: 0,
      inputVal:""
    };
  },
  mounted() {},
  updated() {},
  methods: {
    selectCategory(item, index) {
      this.chooseType = item.id;
    },
    onSearch(){

    }
  },
};
</script>
