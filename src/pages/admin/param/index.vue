<template>
  <div id="paramPage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="adminParam"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container">
            <div class="model-container">
              <div class="model-bg" v-if="powerType == 1" style="min-height:660px;">
                <div class="section-title">参数配置</div>
                <div class="container">
                  <p class="name">销售点数系数配置</p>
                  <div>
                    <router-link to="/admin/param/publish">
                      <span class="enter-click">出版社系数配置</span>
                    </router-link>
                    <router-link to="/admin/param/categroy">
                      <span class="enter-click">类目系数配置</span>
                    </router-link>
                    <router-link to="/admin/param/goods">
                      <span class="enter-click">品种系数配置</span>
                    </router-link>
                  </div>
                </div>
              </div>
              <div class="main-container" v-else>
                <div class="model-container">
                  <div
                    class="model-bg"
                    style="min-height:660px;padding-bottom:75px;position:relative"
                  >
                    <PageNoPower></PageNoPower>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/param.scss"></style>
<script>
export default {
  data() {
    return {
      powerType: 1
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    this.$setSlideHeight();
  }
};
</script>
