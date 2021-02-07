<template>
  <div id="pageNoPower">
    <div class="content">
      <div class="big">暂无权限</div>
      <p>抱歉，该机构未开通此功能或您没有访问权限</p>
    </div>
    <div class="content" style="margin-left:100px;">
      <img src="../assets/404.jpg" alt width="200px" height="200px" style="width:0px;height:200px;" />
    </div>
  </div>
</template>
<style scoped lang="scss">
#pageNoPower {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -100px;
  margin-left: -312px;
  & .content {
    display: inline-block;
    vertical-align: middle;
    font-size: $fontSize + 2;
    & .big {
      font-size: $fontSize + 26;
      color: $fontColor1;
      font-weight: 700;
    }
  }
}
</style>
