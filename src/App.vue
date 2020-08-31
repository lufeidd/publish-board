<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<style lang="scss" src="@/style/scss/common.scss"></style>
<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
export default {
  name: "App",
  data() {
    return {
      zh_CN
    };
  },
  mounted() {
    this.$message.config({
      top: `100px`,
      duration: 2,
      maxCount: 5
    });
  },
};
</script>

