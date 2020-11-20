<template>
  <div id="industryPage" @click="$refs.time.showYear = false;">
    <HeadNav type="industry" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="market"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
            <div class="model-container">
              <div class="model-bg clearfix">
                <div class="float-right" style="padding:7px 15px;">
                  <TimeChoose ref="time" @changeTime="changeTime"></TimeChoose>
                </div>
              </div>
            </div>
            </a-affix>
            <!-- 大盘数据 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">大盘数据</div>
                <div class="market-data">
                  <div>
                    <span class="data-block">
                      <div>
                        <a-icon type="line-chart" />
                        <span class="secondary-font">销售点数</span>
                      </div>
                      <div class="data-font" v-if="saleTotal">{{saleTotal}}</div>
                      <div class="data-font" v-else>--</div>
                    </span>
                  </div>
                  <!-- 折线图 -->
                  <div style="margin-top:20px;">
                    <div id="broken-linedata"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 品种、类目排名 -->
            <div class="model-container clearfix">
              <div class="rank-data float-left model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">品种排名</div>
                  <div class="float-right click-font" @click="$refs.head.noOpen()">更多</div>
                </div>
                <div class="table" v-if="goodsRankList.length > 0">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="55" />
                      <col width="280" />
                      <col width="100" />
                      <col width="100" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>品种</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">上期对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in goodsRankList" :key="index">
                        <td style="text-align:center;">{{item.sale_rank}}</td>
                        <td>
                          <div class="goods-desc">
                            <img
                              :src="item.cover_pic"
                              alt
                              width="40px"
                              height="40px"
                              v-if="item.cover_pic"
                            />
                            <span v-else class="no-pic" style="min-width:40px;min-height:40px;"></span>
                            <span
                              class="goods-name click-font"
                              :title="item.name"
                              @click="toDetail(item,index)"
                            >{{item.name}}</span>
                          </div>
                        </td>
                        <td style="text-align:right;">{{item.sale_total}}</td>
                        <td style="text-align:right;">
                          <span
                            class="percent"
                            v-if="item.compare_rate > 0"
                          >+{{item.compare_rate}}%</span>
                          <span class="green" v-else-if="item.compare_rate < 0">{{item.compare_rate}}%</span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else style="height:340px;position:relative;padding:105px 0;">
                  <a-empty />
                </div>
              </div>
              <div class="rank-data float-right model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">类目排名</div>
                  <div class="float-right click-font" @click="$refs.head.noOpen()">更多</div>
                </div>
                <div class="table" v-if="cateRankList.length > 0">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="55" />
                      <col width="150" />
                      <col width="100" />
                      <col width="80" />
                      <col width="150" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>品种</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">占比</td>
                        <td style="text-align:right;">上期对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in cateRankList" :key="index">
                        <td style="text-align:center;">{{item.sale_rank}}</td>
                        <td style="height:61px;">
                          <span
                            class="main-font"
                          >{{item.name}}</span>
                        </td>
                        <td style="text-align:right;">{{item.sale_total}}</td>
                        <td style="text-align:right;">{{item.ratio.toFixed(2)}}%</td>
                        <td style="text-align:right;">
                          <span
                            class="percent"
                            v-if="item.compare_rate > 0"
                          >+{{item.compare_rate}}%</span>
                          <span class="green" v-else-if="item.compare_rate < 0">{{item.compare_rate}}%</span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else style="height:340px;position:relative;padding:105px 0;">
                  <a-empty />
                </div>
              </div>
            </div>
            <!-- 出版社、地域排名 -->
            <div class="model-container clearfix">
              <div class="rank-data float-left model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">出版单位排名</div>
                  <div class="float-right click-font" @click="$refs.head.noOpen()">更多</div>
                </div>
                <div class="table" v-if="publishRankList.length > 0">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="55" />
                      <col width="150" />
                      <col width="100" />
                      <col width="80" />
                      <col width="150" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>出版单位</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">占比</td>
                        <td style="text-align:right;">上期对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in publishRankList" :key="index">
                        <td style="text-align:center;height:61px;">{{item.sale_rank}}</td>
                        <td>
                          <span
                            class="main-font"
                          >{{item.name}}</span>
                        </td>
                        <td style="text-align:right;">{{item.sale_total}}</td>
                        <td style="text-align:right;">{{item.ratio.toFixed(2)}}%</td>
                        <td style="text-align:right;">
                          <span
                            class="percent"
                            v-if="item.compare_rate > 0"
                          >+{{item.compare_rate}}%</span>
                          <span class="green" v-else-if="item.compare_rate < 0">{{item.compare_rate}}%</span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </table>
                </div>
                <div v-else style="height:340px;position:relative;padding:105px 0;">
                  <a-empty />
                </div>
              </div>
              <div class="rank-data float-right model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">地域排名</div>
                  <div class="float-right click-font" @click="$refs.head.noOpen()">更多</div>
                </div>
                <div class="table" v-if="regionRankList.length > 0">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="55" />
                      <col width="150" />
                      <col width="100" />
                      <col width="80" />
                      <col width="150" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>地域</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">占比</td>
                        <td style="text-align:right;">上期对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in regionRankList" :key="index">
                        <td style="text-align:center;">{{item.sale_rank}}</td>
                        <td style="height:61px;">
                          <span
                            class="main-font"
                          >{{item.name}}</span>
                        </td>
                        <td style="text-align:right;">{{item.sale_total}}</td>
                        <td style="text-align:right;">{{item.ratio.toFixed(2)}}%</td>
                        <td style="text-align:right;">
                          <span
                            class="percent"
                            v-if="item.compare_rate > 0"
                          >+{{item.compare_rate}}%</span>
                          <span class="green" v-else-if="item.compare_rate < 0">{{item.compare_rate}}%</span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else style="height:340px;position:relative;padding:105px 0;">
                  <a-empty />
                </div>
              </div>
            </div>
            <!-- 版块 -->
            <div class="model-container" v-for="(litem,lindex) in plateList" :key="lindex">
              <div class="model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">{{litem.name}}</div>
                  <div class="float-right click-font" @click="$refs.head.noOpen()">进入板块详情</div>
                </div>
                <div class="market-data">
                  <div class="clearfix">
                    <div class="float-left">
                      <span class="data-block">
                        <div>
                          <a-icon type="line-chart" />
                          <span class="secondary-font">销售点数</span>
                        </div>
                        <div class="data-font" v-if="litem.data.sale_total">{{litem.data.sale_total}}</div>
                        <div class="data-font" v-else>--</div>
                      </span>
                    </div>
                    <!-- 折线图 -->
                    <div class="float-right" style="width:580px;">
                      <div :id="'plate-line'+lindex"></div>
                    </div>
                  </div>
                  <!-- 商品 -->
                  <div class="clearfix" style="margin-top:15px;">
                    <div class="content float-left" v-for="(gitem,gindex) in litem.data.goods_rank" :key="gindex">
                      <div @click="toDetail(gitem,gindex)">
                        <div>{{gitem.sale_rank}}</div>
                        <div>
                          <img :src="gitem.cover_pic" alt="" width="100px" height="100px" v-if="gitem.cover_pic">
                          <span v-else class="no-pic" style="min-width:100px;min-height:100px;"></span>
                        </div>
                        <div class="title">{{gitem.name}}</div>
                        <div class="num">销售点数 {{gitem.sale_total}}</div>
                      </div>
                    </div>
                  </div>
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
<style scoped lang="scss" src="@/style/scss/pages/industry/market.scss"></style>
<script>
import { INDUSTRY_INDEX } from "../../apis/industry.js";
import { Chart } from "@antv/g2";
export default {
  data() {
    return {
      pagePower: true,
      brokenLineData: [],
      chartChange: null,
      saleTotal: 0,
      isFirst: true,
      goodsRankList: [],
      cateRankList: [],
      publishRankList: [],
      regionRankList: [],
      plateList: [],
      plateChart: {},
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
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_INDEX(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.saleTotal = res.data.all_info.sale_total;
        this.brokenLineData = [];
        this.goodsRankList = [];
        this.cateRankList = [];
        this.regionRankList = [];
        this.publishRankList = [];
        this.plateList = [];
        this.goodsRankList = res.data.goods_rank;
        this.cateRankList = res.data.category_rank;
        this.publishRankList = res.data.supplier_rank;
        this.regionRankList = res.data.region_rank;
        this.plateList = res.data.plate_data;
        this.plateList.map((value, key) => {
          this.plateChart[key] = null;
        });
        // console.log(this.plateChart)
        let _arr1 = [],
          _arr2 = [],
          _length = 0;
        res.data.all_info.chart_data.current_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "当期";
          _obj.temperature = value.value;
          if(value.week_range){_obj.range = value.week_range};
          _arr1.unshift(_obj);
        });
        res.data.all_info.chart_data.last_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "上年同期";
          _obj.temperature = value.value;
          if(value.week_range){_obj.range = value.week_range};
          _arr2.unshift(_obj);
        });
        if (_arr1.length > _arr2.length) {
          _length = _arr1.length;
        } else {
          _length = _arr2.length;
        }
        for (let i = 0; i < _length; i++) {
          if (_arr1.length > i) {
            this.brokenLineData.push(_arr1[i]);
          }
          if (_arr2.length > i) {
            this.brokenLineData.push(_arr2[i]);
          }
        }
        if (this.isFirst) {
          let _this = this;
          setTimeout(() => {
            _this.lineDataInit();
            _this.initPlate();
          }, 500);
        } else {
          this.chartChange.changeData(this.brokenLineData);
          for (let i = 0; i < this.plateList.length; i++) {
            // console.log(this.plateChart.i,this.plateList[i].data.chart_data);
            this.plateChart.i.data(this.plateList[i].data.chart_data.reverse());
            this.plateChart.i.render();
          }
        }
        // console.log(this.plateList);
        this.isFirst = false;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }

      }
    },
    changeTime(){
      this.isLoading = true;
      this.getData();
    },
    lineDataInit() {
      let _this = this;
      this.chartChange = new Chart({
        container: "broken-linedata",
        autoFit: true,
        height: 240,
      });

      this.chartChange.data(this.brokenLineData);
      this.chartChange.scale({
        month: {
          range: [0, 1],
        },
        temperature: {
          nice: true,
          min: 0,
        },
      });
      this.chartChange.tooltip({
        showCrosshairs: true,
        shared: true,
      });
      this.chartChange.axis("temperature", {
        label: {
          formatter: (val) => {
            return val;
          },
        },
      });
      this.chartChange.legend(false);
      this.chartChange
        .line()
        .position("month*temperature")
        .color("city",(city) =>{
          if(city == '上年同期'){
            return "#D1DDF6";
          }else if(city == '当期'){
            return "#5A8BEE"
          }
        })
        .shape("circle")
        .style({ lineWidth: 2 })
        .tooltip("month*temperature*city*range", function (month, temperature, city,range) {
          // tooltip的第一个参数写上需要显示的字段'item1*item2*...'；第二个参数为一个函数，该函数的参数为需要显示的字段。
          let _title
          if(_this.$refs.time.dateType == 2){
            _title = month + '（' + range + '）';
          }else{
            _title = month;
          }
          // let _month = month + '哈';
          // console.log(666,range);
          return {
            title:_title,
            name: city,
            value: temperature, // 这里也可以通过调用其他自定义函数的方式，去对数据进行更深层次的变换。但要注意this的指向问题！
          };
        });

      this.chartChange
        .point()
        .position("month*temperature")
        .color("city",(city) =>{
          if(city == '上年同期'){
            return "#D1DDF6";
          }else if(city == '当期'){
            return "#5A8BEE"
          }
        })
        .shape("circle");

      this.chartChange.render();

    },
    initPlate() {
      for (let i = 0; i < this.plateList.length; i++) {
        this.plateChart.i = new Chart({
          container: "plate-line" + i,
          autoFit: true,
          height: 70,
          padding: [5, 0],
        });

        this.plateChart.i.data(this.plateList[i].data.chart_data.reverse());
        this.plateChart.i.scale(false);
        this.plateChart.i.axis(false);
        this.plateChart.i.tooltip({
          showCrosshairs: true, // 展示 Tooltip 辅助线
          shared: true,
        });

        this.plateChart.i
          .line()
          .position("date*value")
          .tooltip("date*value", (date, value) => {
            date = "销售点数";
            return {
              name: date,
              value: value,
            };
          });
        // this.plateChart.i.line().position('date*value');

        this.plateChart.i.render();
      }

    },
    toDetail(item, index) {
      this.$router.push({
        name: "detail",
        query: {
          goods_id: item.goods_id,
        },
      });
    },
    publisherChange() {
      this.isLoading = true;
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.dateType = 2;
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      if(!this.pagePower){
        this.isFirst = true;
      }
      this.getData();
    },
  },
};
</script>
