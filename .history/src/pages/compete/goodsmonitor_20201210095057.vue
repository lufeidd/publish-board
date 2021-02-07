<template>
  <div id="competePage" @click="$refs.time.showYear = false">
    <HeadNav type="compete" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="compete" sort="goodsmonitor"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
            <div class="model-container">
              <div class="model-bg clearfix">
                <div class="float-left"></div>
                <div class="float-right" style="padding:7px 15px;">
                  <TimeChoose ref="time" @changeTime="changeTime"></TimeChoose>
                </div>
              </div>
            </div>
            </a-affix>
            <!-- 列表 -->
            <div class="model-container">
              <div class="model-bg" style="padding-bottom:50px;min-height:604px;">
                <div class="section-title">监控列表</div>
                <div class="table">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="60" />
                      <col width="350" />
                      <col width="160" />
                      <col width="160" />
                      <col width="160" />
                      <col width="180" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td style="text-align:center;">排名</td>
                        <td>品种</td>
                        <td style="text-align:right;">销售指数</td>
                        <td style="text-align:right;">行业排名</td>
                        <td style="text-align:right;">类目排名</td>
                        <td style="text-align:right;">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="goodsList.length > 0">
                      <tr v-for="(item,index) in goodsList" :key="index">
                        <td style="text-align:center;">{{index+1}}</td>
                        <td>
                          <div class="goods-desc">
                            <span class="goods-image" v-if="item.cover_pic">
                            <img
                            :src="item.cover_pic"
                            alt
                            style="width:40px;height:40px;"
                          />
                          </span>
                            <span v-else class="no-pic" style="min-width:40px;min-height:40px;"></span>
                            <span
                              class="goods-name click-font"
                              :title="item.goods_name"
                              @click.stop="$toDetail(item.goods_id)"
                            >{{item.goods_name}}</span>
                          </div>
                        </td>
                        <td style="text-align:right;">
                          <span v-if="item.sale_total">{{item.sale_total}}</span>
                          <span v-else>--</span>
                        </td>
                        <td style="text-align:right;">
                          <span v-if="item.industry_rank">{{item.industry_rank}}</span>
                          <span v-else>--</span>
                        </td>
                        <td style="text-align:right;">
                          <span v-if="item.cate_rank">{{item.cate_rank}}</span>
                          <span v-else>--</span>
                        </td>
                        <td style="text-align:right;">--</td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="main-container" v-else>
            <div class="model-container">
              <div class="model-bg" style="min-height:660px;padding-bottom:75px;position:relative">
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/compete/set.scss"></style>
<script>
import { COMPETE_MONITOR_GOODS_LISTS } from "../../apis/compete.js";
export default {
  data() {
    return {
      pagePower: true,
      goodsList: [],
      isLoading:true,
    };
  },
  mounted() {
    this.getData();
  },
  updated() {

  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        date_type: this.$refs.time.dateType,
        // start_date: this.oneDay,
        period: this.$refs.time.cycle,
        timestamp: tStamp
      };
      data.sign = this.$getSign(data);
      let res = await COMPETE_MONITOR_GOODS_LISTS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.goodsList = [];
        this.goodsList = res.data;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else{
          this.$refs.head.globalTip(1, res.message,res.code);
        }
      }
    },
    changeTime(){
      this.isLoading = true;
      this.getData();
    },
    publisherChange() {
      this.isLoading = true;
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      this.$refs.time.dateType = 2;
      this.getData();
    }
  }
};
</script>
