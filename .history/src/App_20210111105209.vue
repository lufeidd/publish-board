<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view
        v-if="
          ![
            'loginindex',
            'register',
            'improve',
            'editpassword',
            'nullpage',
            'noorganize',
          ].includes($route.name)
        "
        style="min-height: calc(100% - 141px); padding-bottom: 20px"
      />
      <router-view v-else />
      <!-- 底部版权 -->
      <div
        class="copyright"
        v-if="
          ![
            'loginindex',
            'register',
            'improve',
            'editpassword',
            'nullpage',
            'noorganize',
          ].includes($route.name)
        "
      >
        <div class="copy-link">
          <span class="url" @click="link(1)">博库gua</span>
          <span>&nbsp·&nbsp</span>
          <span class="url" @click="link(2)">博库图书专营店</span>
          <span>&nbsp·&nbsp</span>
          <span class="url" @click="link(3)">博库网微博</span>
        </div>
        <div class="copy-word">
          Copyright © 2020 博库数字出版传媒集团 All Rights Reserved
        </div>
      </div>
      <!-- 回到顶部 -->
      <div id="components-back-top-demo-custom">
        <a-back-top :visibilityHeight="900">
          <div class="ant-back-top-inner">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-top" />
            </svg>
          </div>
        </a-back-top>
      </div>
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
      zh_CN,
    };
  },
  mounted() {
    this.$message.config({
      top: `100px`,
      duration: 2,
      maxCount: 5,
    });
  },
  methods: {
    link(type) {
      let _url;
      if (type == 1) {
        _url = "https://www.bookuu.com/";
      } else if (type == 2) {
        _url = "https://bokuts.tmall.com/";
      } else if (type == 3) {
        _url = "https://weibo.com/bookuuvip?is_hot=1";
      }
      // window.location.replace(_url);
      window.open(_url, "_blank");
    },
  },
};
</script>

