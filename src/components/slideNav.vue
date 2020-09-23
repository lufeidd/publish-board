<template>
  <div id="slideNav">
    <div
      :class="['index','taopu','core','region','publishmonitor','goodsmonitor','market'].includes(sort)?'top-container other':'top-container'"
    >
      <div class="slide-desc" v-if="type == 'publish'">
        <img src="../assets/publish.png" alt width="50px" height="50px" />
        <div class="text">本社数据</div>
      </div>
      <div class="slide-desc" v-if="type == 'admin'">
        <img src="../assets/admin.png" alt width="50px" height="50px" />
        <div class="text">平台管理</div>
      </div>
      <div class="slide-desc" v-if="type == 'user'">
        <img src="../assets/account.png" alt width="50px" height="50px" />
        <div class="text">账号管理</div>
      </div>
      <div class="slide-desc" v-if="type == 'organize'">
        <img src="../assets/organize.png" alt width="50px" height="50px" />
        <div class="text">机构管理</div>
      </div>
      <div class="slide-desc" v-if="type == 'compete'">
        <img src="../assets/compete.png" alt width="50px" height="50px" />
        <div class="text">竞争数据</div>
      </div>
      <div class="slide-desc" v-if="type == 'industry'">
        <img src="../assets/industry.png" alt width="50px" height="50px" />
        <div class="text">行业数据</div>
      </div>
      <div class="slide-desc" v-if="type == 'application'">
        <img src="../assets/application.png" alt width="50px" height="50px" />
        <div class="text">应用功能</div>
      </div>
      <div class="slide-content" v-if="type == 'publish'">
        <router-link to="/publish/index">
          <div :class="sort=='index'?'active tab':'tab'">本社看板</div>
        </router-link>
        <router-link to="/publish/taopu100">
          <div :class="['taopu','detail'].includes(sort)?'active tab':'tab'">淘普100</div>
        </router-link>
        <router-link to="/publish/core">
          <div :class="sort=='core'?'active tab':'tab'">核心类目</div>
        </router-link>
        <router-link to="/publish/newproduct">
          <div :class="sort=='newproduct'?'active tab':'tab'">新品追踪</div>
        </router-link>
        <div class="tab" @click="noOpen">异常监控</div>
        <router-link to="/publish/reader">
          <div :class="sort=='reader'?'active tab':'tab'">读者画像</div>
        </router-link>
        <router-link to="/publish/region">
          <div :class="sort=='region'?'active tab':'tab'">地域分布</div>
        </router-link>
        <router-link to="/publish/authors">
          <div :class="sort=='authors'?'active tab':'tab'">本社作者</div>
        </router-link>
      </div>
      <div class="slide-content" v-if="type == 'admin'">
        <router-link to="/admin/index">
          <div :class="sort=='adminIndex'?'active tab':'tab'">机构列表</div>
        </router-link>
        <router-link to="/admin/user">
          <div :class="sort=='adminUser'?'active tab':'tab'">用户列表</div>
        </router-link>
        <router-link to="/admin/goodslist">
          <div :class="sort=='goods'?'active tab':'tab'">品种列表</div>
        </router-link>
        <router-link to="/admin/event">
          <div :class="sort=='event'?'active tab':'tab'">大事件管理</div>
        </router-link>
        <router-link to="/admin/param/index">
          <div :class="sort=='adminParam'?'active tab':'tab'">参数配置</div>
        </router-link>
      </div>
      <div class="slide-content" v-if="type == 'organize'">
        <router-link to="/organize/information">
          <div :class="sort=='organizeInfo'?'active tab':'tab'">机构信息</div>
        </router-link>
        <router-link to="/organize/member">
          <div :class="sort=='member'?'active tab':'tab'">成员管理</div>
        </router-link>
      </div>
      <div class="slide-content" v-if="type == 'compete'">
        <router-link to="/compete/publishmonitor">
          <div :class="sort=='publishmonitor'?'active tab':'tab'">竞社监控</div>
        </router-link>
        <router-link to="/compete/goodsmonitor">
          <div :class="sort=='goodsmonitor'?'active tab':'tab'">竞品监控</div>
        </router-link>
        <router-link to="/compete/set">
          <div :class="sort=='competeset'?'active tab':'tab'">竞争配置</div>
        </router-link>
      </div>
      <div class="slide-content" v-if="type == 'user'">
        <router-link to="/user/information">
          <div :class="sort=='userInfo'?'active tab':'tab'">个人信息</div>
        </router-link>
        <!-- <router-link to="/admin/user">
          <div :class="sort=='adminUser'?'active tab':'tab'">账号安全</div>
        </router-link>-->
      </div>
      <div class="slide-content" v-if="type == 'industry'">
        <router-link to="/industry/market">
          <div :class="sort=='market'?'active tab':'tab'">行业大盘</div>
        </router-link>
        <router-link to="/industry/authors">
          <div :class="sort=='authors'?'active tab':'tab'">作者库</div>
        </router-link>
      </div>
      <div class="slide-content" v-if="type == 'application'">
        <router-link to="/application/event">
          <div :class="sort=='event'?'active tab':'tab'">大事件</div>
        </router-link>
        <router-link to="/application/saleforcast">
          <div :class="sort=='saleforcast'?'active tab':'tab'">销量预测</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#slideNav {
  width: 130px;
  margin-right: 10px;
  box-sizing: border-box;
  margin-top: 10px;
  & img {
    background-color: transparent;
  }
  & .top-container {
    background-color: $clf;
    height: 100%;
    &.other {
      height: calc(100% - 10px);
    }
    & .slide-desc {
      width: 100%;
      text-align: center;
      padding: 30px 0;
      border-bottom: 1px solid $themeColor5;
      // margin-top: 10px;
      & .text {
        font-size: $fontSize + 2;
        color: $themeColor100;
      }
    }
    & .slide-content {
      margin-top: 10px;
      & .tab {
        box-sizing: border-box;
        line-height: 47px;
        text-align: center;
        color: $fontColor1;
        cursor: pointer;
        &.active {
          color: $themeColor80;
          border-left: 2px solid $themeColor100;
          background-color: $themeColor5;
        }
        &:hover {
          color: $themeColor80;
        }
      }
    }
  }
}
</style>
<script>
export default {
  props: ["type", "sort"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.sort == ("taopu" || "detail") ? "true" : "false");
  },
  methods: {
    noOpen() {
      this.$message.info({
        content: "该功能还在施工中，暂未开放",
        icon: <a-icon type="exclamation-circle" />,
      });
    },
  },
};
</script>
