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
              <div class="mo"></div>
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
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
  },
  methods: {},
};
</script>