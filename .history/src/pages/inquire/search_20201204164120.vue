<template>
  <div id="organizePage">
    <div>
      <HeadNav type="inquire" ref="head" :show="1"></HeadNav>
      <div class="wd-1220">
        <div class="clearfix">
          <div class="float-left">
            <SlideNav type="inquire" sort="search"></SlideNav>
          </div>
          <div class="float-right">
            <div class="main-container" v-if="powerType == 1">
              <div class="model-container">
                <div class="model-bg" style="min-height: 660px;">
                  <div class="section-title">出版单位查询</div>
                  <div class="search">
                    <div class="content common">
                      <a-input-search
                        placeholder="搜索出版单位名称"
                        enter-button="搜索"
                        v-model="inputVal"
                        size="large"
                        @search="onSearch"
                      >
                        <div slot="prefix">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-search" />
                          </svg>
                          <span class="rowLine">|</span>
                        </div>
                      </a-input-search>
                    </div>
                  </div>
                  <!-- 列表 -->
                  <div class="table" style="padding-bottom:75px;">
                    <table style="table-layout:fixed;">
                      <colgroup>
                        <col width="730" />
                        <col width="320" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>出版单位</td>
                          <td style="text-align:right;">上月销售指数</td>
                        </tr>
                      </thead>
                      <tbody v-if="list.length > 0">
                        <tr v-for="(item,index) in list" :key="index">
                          <td>
                            <span class="click-font" @click="toRead(item,index)">{{item.supplier_name}}</span>
                          </td>
                          <td style="text-align:right;">{{item.pre_month_sale_amount}}</td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="" style="text-align:center;">
                            <a-empty />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- 分页 -->
                  <div class="page">
                    <a-pagination
                      :show-total="total => `共 ${total} 条数据`"
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
            <div class="main-container" v-else>
              <div class="model-container">
                <div
                  class="model-bg"
                  style="min-height:660px;padding-bottom:75px;position:relative"
                >
                  <PageNoPower></PageNoPower>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/admin/index.scss"></style>
<script>
import {QUERY_SUPPLIER_LISTS} from "../../apis/inquire.js";
export default {
  data() {
    return {
      powerType:1,
      page:1,
      pageSize:20,
      total:0,
      list:[],
      inputVal:"",
      isLoading:true,
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    if (this.powerType == 1) {
      this.getData();
    }else{
      this.isLoading = false;
    }
  },
  methods: {
    async getData(){
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_name:this.inputVal,
        page:this.page,
        page_size:this.pageSize,
        timestamp: tStamp
      }
      data.sign = this.$getSign(data);
      let res = await QUERY_SUPPLIER_LISTS(data);
      if (res.code == 0) {
        this.list = [];
        this.powerType = 1;
        this.list = res.data.list;
        this.total = res.data.count;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if(res.code == 1009){
          this.powerType = 0;
        }else{
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    onSearch(value){
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(page,pageSize){
      this.isLoading = true;
      this.page = page;
      this.getData();
    },
    toRead(item,index){
      this.$router.push({
        name:"inquiredetail",
        query:{
          id:item.supplier_id,
          name:item.supplier_name,
        }
      })
    }
  },
};
</script>
