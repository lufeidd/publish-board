<template>
  <div id="noPage">
    <div class="container">
      <div class="content">
        <div class="big">404</div>
        <p>抱歉，没有找到您访问的页面</p>
        <p>
          <router-link to="/index"><a-button type="primary">返回首页</a-button></router-link>
        </p>
        <p><span class="click-font" @click="returnPage">返回上一页</span></p>
      </div>
      <div class="content">
        <img src="../assets/404.jpg" alt=""  style="width:200px;height:200px;">
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#noPage {
  background-color: $clf;
  min-height: 100%;
  & .container{
    margin-left: 280px;
    padding-top: 175px;
    & .content{
      display: inline-block;
      vertical-align: middle;
      font-size: $fontSize + 2;
      & .big{
        font-size: $fontSize + 26;
        color: $fontColor1;
        font-weight: 700;
      }
    }
  }
}
</style>
<script>
export default {
  data() {
    return{

    }
  },
  methods: {
    returnPage(){
      this.$router.go(-1);
    }
  }
};
</script>
