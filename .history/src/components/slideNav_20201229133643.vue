<template>
  <div id="slideNav">
    <div class="top-container">
      <div class="slide-desc" v-if="type == 'publish'">
        <img src="../assets/publish.png" alt  style="width:50px;height:50px;" />
        <div class="text">本社数据</div>
      </div>
      <div class="slide-desc" v-if="type == 'admin'">
        <img src="../assets/admin.png" alt  style="width:50px;height:50px;" />
        <div class="text">平台管理</div>
      </div>
      <div class="slide-desc" v-if="type == 'user'">
        <img src="../assets/account.png" alt  style="width:50px;height:50px;" />
        <div class="text">账号管理</div>
      </div>
      <div class="slide-desc" v-if="type == 'organize'">
        <img src="../assets/organize.png" alt  style="width:50px;height:50px;" />
        <div class="text">机构管理</div>
      </div>
      <div class="slide-desc" v-if="type == 'compete'">
        <img src="../assets/compete.png" alt  style="width:50px;height:50px;" />
        <div class="text">竞争数据</div>
      </div>
      <div class="slide-desc" v-if="type == 'industry'">
        <img src="../assets/industry.png" alt  style="width:50px;height:50px;" />
        <div class="text">行业数据</div>
      </div>
      <div class="slide-desc" v-if="type == 'application'">
        <img src="../assets/application.png" alt  style="width:50px;height:50px;" />
        <div class="text">应用功能</div>
      </div>
      <div class="slide-desc" v-if="type == 'inquire'">
        <img src="../assets/application.png" alt  style="width:50px;height:50px;" />
        <div class="text">分析查询</div>
      </div>
      
      <div class="slide-content" v-if="type == 'publish'">
          <div :class="sort=='index'?'active tab':'tab'" @click.stop="$router.push({ name: 'publishindex' })">本社看板</div>
          <div :class="['taopu','detail'].includes(sort)?'active tab':'tab'" @click.stop="$router.push({ name: 'taopu100' })">本社品种</div>
          <div :class="sort=='newproduct'?'active tab':'tab'" @click.stop="$router.push({ name: 'newproduct' })">新品追踪</div>
          <div :class="sort=='core'?'active tab':'tab'" @click.stop="$router.push({ name: 'core' })">核心类目</div>
          <div :class="sort=='region'?'active tab':'tab'" @click.stop="$router.push({ name: 'region' })">地域分布</div>
          <div :class="sort=='reader'?'active tab':'tab'" @click.stop="$router.push({ name: 'publishreader' })">读者画像</div>
          <div :class="sort=='authors'?'active tab':'tab'" @click.stop="$router.push({ name: 'publishauthors' })">本社作者</div>
          <!-- <div class="tab disabled">异常监控</div> -->
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
        <!-- <router-link to="/admin/param/index">
          <div :class="sort=='adminParam'?'active tab':'tab'">参数配置</div>
        </router-link> -->
        <router-link to="/admin/help">
          <div :class="sort=='adminHelp'?'active tab':'tab'">帮助中心管理</div>
        </router-link>
        <router-link to="/admin/feedback">
          <div :class="sort=='adminFeedback'?'active tab':'tab'">意见与反馈</div>
        </router-link>
        <!-- <router-link to="/admin/dynamic">
          <div :class="sort=='adminDynamic'?'active tab':'tab'">产品动态</div>
        </router-link> -->
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
          <div :class="sort=='publishmonitor'?'active tab':'tab'" @click.stop="$router.push({ name: 'publishmonitor' })">竞社监控</div>
          <div :class="sort=='goodsmonitor'?'active tab':'tab'" @click.stop="$router.push({ name: 'goodsmonitor' })">竞品监控</div>
          <div :class="sort=='competeset'?'active tab':'tab'" @click.stop="$router.push({ name: 'competeset' })">竞争配置</div>
      </div>
      <div class="slide-content" v-if="type == 'user'">
        <router-link to="/user/information">
          <div :class="sort=='userInfo'?'active tab':'tab'">个人信息</div>
        </router-link>
        <router-link to="/user/notice">
          <div :class="sort=='userNotice'?'active tab':'tab'">消息通知</div>
        </router-link>
        <router-link to="/user/suggesstion">
          <div :class="sort=='userSuggesstion'?'active tab':'tab'">意见与反馈</div>
        </router-link>
      </div>
      <div class="slide-content" v-if="type == 'industry'">
          <div :class="sort=='market'?'active tab':'tab'" @click.stop="$router.push({ name: 'industrymarket' })">行业大盘</div>
          <div :class="sort=='goods'?'active tab':'tab'" @click.stop="$router.push({ name: 'goodsrank' })">全品种排行</div>
          <div :class="sort=='cate'?'active tab':'tab'" @click.stop="$router.push({ name: 'caterank' })">全类目排行</div>
          <div :class="sort=='region'?'active tab':'tab'" @click.stop="$router.push({ name: 'regionrank' })">地域分布</div>
          <div :class="sort=='authors'?'active tab':'tab'" @click.stop="$router.push({ name: 'industryauthors' })">作者库</div>
      </div>
      <div class="slide-content" v-if="type == 'inquire'">
        <div :class="sort=='search'?'active tab':'tab'" @click.stop="$router.push({ name: 'inquiresearch' })">出版单位查询</div>
        <div :class="sort=='rank'?'active tab':'tab'" @click.stop="$router.push({ name: 'inquirerank' })">大盘排行</div>
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
  // margin-top: 10px;
  position: absolute;
  top: 10px;
  bottom: 0;
  background-color: $clf;
  & img {
    background-color: transparent;
  }
  & .top-container {
    // background-color: $clf;
    height: 100%;
    &.other {
      // height: calc(100% - 10px);
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
        &.disabled{
          color: $fontColor2;
          cursor: no-drop;
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
    // console.log(this.sort == ("taopu" || "detail") ? "true" : "false");
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
