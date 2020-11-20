<template>
  <div id="feedbackPage">
    <HeadNav type="user" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="user" sort="userSuggesstion"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" style="min-height: 660px">
            <div class="model-container">
              <div class="model-bg">
                <div class="top">
                  <div class="title">意见与反馈</div>
                </div>
                <div class="middle">
                  <div>
                    <a-radio-group
                      name="radioGroup"
                      v-model="type"
                      size="small"
                    >
                      <a-radio :value="1">友好建议</a-radio>
                      <a-radio :value="2">问题反馈</a-radio>
                      <a-radio :value="3">生气吐槽</a-radio>
                    </a-radio-group>
                  </div>
                  <div style="margin-top:10px;">
                    <a-textarea placeholder v-model="inputVal" style="height: 120px" />
                  </div>
                  <div style="text-align:center;margin-top:10px;">
                    <a-button type="primary" @click="submit">提交我的意见</a-button>
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div class="model-container" v-for="(item,index) in list" :key="index">
              <div class="model-bg">
                <div class="top clearfix">
                  <div class="float-left title">
                    <span v-if="item.type == 1">友好建议</span>
                    <span v-if="item.type == 2">问题反馈</span>
                    <span v-if="item.type == 3">生气吐槽</span>
                  </div>
                  <div class="float-right">
                    <!-- <span>{{item.account}}（{{item.mobile}}）</span> -->
                    <span>{{item.create_time}}</span>
                  </div>
                </div>
                <div class="middle">{{item.content}}</div>
                <div class="bottom" v-if="item.reply_content">
                  <div>平台回复：</div>
                  <div class="desc">{{item.reply_content}}</div>
                </div>
                <!-- <div class="bottom clearfix">
                  <div class="float-right">已忽略</div>
                </div> -->
              </div>
            </div>
            <!-- 分页 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="page">
                  <a-pagination
                    :show-total="(total) => `共 ${total} 条数据`"
                    :default-current="1"
                    v-model="page"
                    :total="total"
                    :defaultPageSize="pageSize"
                    @change="onShowSizeChange"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/other.scss"></style>
<script>
import {FEEDBACK_MY,FEEDBACK_ADD} from "../../apis/user.js";
export default {
  data() {
    return {
      type:0,
      inputVal:"",
      list:[],
      page:1,
      pageSize:20,
      total:0,
    };
  },
  mounted(){
    this.getData();
  },
  updated(){

  },
  methods:{
    async getData(){
      var tStamp = this.$getTimeStamp();
      let data = {
        page:this.page,
        page_size:this.pageSize,
        timestamp: tStamp
      }
      data.sign = this.$getSign(data);
      let res = await FEEDBACK_MY(data);
      if(res.code == 0){
        this.list = [];
        this.list = res.data.list;
        this.total = res.data.total;
      }else{
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async addFeedback(){
      var tStamp = this.$getTimeStamp();
      let data = {
        type:this.type,
        content:this.inputVal,
        timestamp: tStamp
      }
      data.sign = this.$getSign(data);
      let res = await FEEDBACK_ADD(data);
      if(res.code == 0){
        this.inputVal = "";
        this.type = 0;
        this.$refs.head.globalTip(2,"提交成功", 0);
        this.getData();
      }else{
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    onShowSizeChange(page, pageSize) {
      this.page = page;
      this.getData();
    },
    submit(){
      if(this.type == 0){
        this.$refs.head.globalTip(1,"请选择意见类型", 0);
        return;
      }
      if(this.inputVal.length == 0){
        this.$refs.head.globalTip(1,"请填写您的意见", 0);
        return;
      }
      this.addFeedback();
    }
  }
};
</script>
