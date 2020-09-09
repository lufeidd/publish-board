<template>
  <div v-if="show">
    <div id="loadingPage" v-if="isLoading">
      <div class="loading-icon">
        <a-spin :indicator="indicator" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#loadingPage {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 99999;
  & .loading-icon {
    position: absolute;
    top: 50%;
    left: 50%;
  }
}
</style>
<script>
export default {
  props: ["show"],
  data() {
    return {
      indicator: <a-icon type="loading" style="font-size: 50px" spin />,
      isLoading: true
    };
  }
};
</script>
