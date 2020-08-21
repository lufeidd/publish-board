<template>
  <div id="taopuPage">
    <HeadNav type="industry" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="authors"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container">
            <div class="model-container">
              <div class="model-bg search">
                <p class="title">搜索作者</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/publish/taopu100.scss"></style>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  updated(){},
  methods: {}
};
</script>
