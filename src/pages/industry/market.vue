<template>
  <div id="industryPage">
    <HeadNav type="industry" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="market"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg clearfix">
                <div class="float-right" style="padding:7px 15px;">
                  <div class="time-choose">
                    <span class="time-text">统计时间 {{dateText}}</span>
                    <span class="time-picker">
                      <span :class="dateType == 2?'picker active':'picker'">周</span>
                      <a-week-picker
                        class="week"
                        placeholder="Select Week"
                        :allowClear="false"
                        @change="weekChange"
                        :disabledDate="disabledEndDate"
                        :value="chooseWeek"
                      />
                    </span>
                    <span class="time-picker">
                      <span :class="dateType == 3?'picker active':'picker'">月</span>
                      <a-month-picker
                        class="week"
                        :allowClear="false"
                        @change="monthChange"
                        placeholder="Select month"
                        :value="chooseMonth"
                        :disabledDate="disabledEndDate"
                      />
                    </span>
                    <span class="time-picker">
                      <span :class="dateType == 4?'picker active':'picker'">年</span>
                      <span @click.stop="showYear = true;show1=false;show2=false;show3=false">
                        <a-date-picker
                          class="week"
                          :allowClear="false"
                          mode="year"
                          format="YYYY"
                          :open="showYear"
                          @panelChange="yearChange($event)"
                          :value="chooseYear"
                          :disabledDate="disabledEndDate"
                          inputReadOnly
                        />
                      </span>
                    </span>
                    <span class="time-picker">
                      <span :class="canSub?'picker':'picker disabled'" @click="subLeft">
                        <a-icon type="left" />
                      </span>
                    </span>
                    <span class="time-picker">
                      <span :class="canAdd?'picker':'picker disabled'" @click="addRight">
                        <a-icon type="right" />
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
                    <div id="broken-line"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 品种、类目排名 -->
            <div class="model-container clearfix">
              <div class="rank-data float-left model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">品种排名</div>
                  <div class="float-right click-font">更多</div>
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
                          >+{{item.compare_rate.toFixed(2)}}%</span>
                          <span class="green" v-else>{{item.compare_rate.toFixed(2)}}%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else style="height:340px;position:relative;">
                  <a-empty />
                </div>
              </div>
              <div class="rank-data float-right model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">类目排名</div>
                  <div class="float-right click-font">更多</div>
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
                          >+{{item.compare_rate.toFixed(2)}}%</span>
                          <span class="green" v-else>{{item.compare_rate.toFixed(2)}}%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else style="height:340px;position:relative;">
                  <a-empty />
                </div>
              </div>
            </div>
            <!-- 出版社、地域排名 -->
            <div class="model-container clearfix">
              <div class="rank-data float-left model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">出版社排名</div>
                  <div class="float-right click-font">更多</div>
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
                        <td>出版社</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">占比</td>
                        <td style="text-align:right;">上期对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in publishRankList" :key="index">
                        <td style="text-align:center;">{{item.sale_rank}}</td>
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
                          >+{{item.compare_rate.toFixed(2)}}%</span>
                          <span class="green" v-else>{{item.compare_rate.toFixed(2)}}%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  </table>
                </div>
                <div v-else style="height:340px;position:relative;">
                  <a-empty />
                </div>
              </div>
              <div class="rank-data float-right model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">地域排名</div>
                  <div class="float-right click-font">更多</div>
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
                          >+{{item.compare_rate.toFixed(2)}}%</span>
                          <span class="green" v-else>{{item.compare_rate.toFixed(2)}}%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else style="height:340px;position:relative;">
                  <a-empty />
                </div>
              </div>
            </div>
            <!-- 版块 -->
            <div class="model-container" v-for="(litem,lindex) in plateList" :key="lindex">
              <div class="model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">{{litem.name}}</div>
                  <div class="float-right click-font">进入板块详情</div>
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
          <div class="main-container" v-else>
            <div class="model-container">
              <div class="model-bg" style="min-height:650px;padding-bottom:75px;position:relative">
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      showYear: false,
      chooseWeek: null,
      chooseMonth: null,
      chooseYear: null,
      dateText: "",
      dateType: 2,
      canSub: true,
      canAdd: false,
      oneDay: "",
      cycle: "",
      brokenLineData: [],
      chartChange: null,
      saleTotal: 0,
      isFirst: true,
      goodsRankList: [],
      cateRankList: [],
      publishRankList: [],
      regionRankList: [],
      plateList:[],
      plateChart:{},
    };
  },
  mounted() {
    this.cycle = this.$weekDate().weekth;
    this.oneDay = this.$weekDate().start.replace(/-/g, "");
    this.chooseWeek = this.$weekDate().start;
    this.chooseMonth = this.$weekDate().start;
    this.chooseYear = this.$weekDate().start;
    this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;

    this.getData();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    async getData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        date_type: this.dateType,
        start_date: this.oneDay,
        period: this.cycle
      };
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
        this.publishRankList = res.data.publisher_rank;
        this.regionRankList = res.data.region_rank;
        this.plateList = res.data.plate_data;
        this.plateList.map((value,key)=>{
          this.plateChart[key] = null;
        })
        // console.log(this.plateChart)
        let _arr1 = [],
          _arr2 = [],
          _length = 0;
        res.data.all_info.chart_data.current_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "当期";
          _obj.temperature = value.value;
          _arr1.unshift(_obj);
        });
        res.data.all_info.chart_data.last_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "上年同期";
          _obj.temperature = value.value;
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
          this.initLineData();
          setTimeout(()=>{
            _this.initPlate();
          },500)
        } else {
          this.chartChange.changeData(this.brokenLineData);
          for(let i=0;i<this.plateList.length;i++){
            this.plateChart.i.changeData(this.plateList[i].data.chart_data.reverse());
          }
        }
        console.log(this.brokenLineData)
        this.isFirst = false;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if (res.code == 1009) {
          this.pagePower = false;
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    weekChange(date, dateString) {
      // var _day = date._d.getDate();
      const startDate = date.day(1).format("YYYY-MM-DD"); // 周一日期
      const endDate = date.day(7).format("YYYY-MM-DD"); // 周日日期
      let _weekth = date.week();
      if (_weekth < 10) {
        _weekth = "0" + _weekth;
      }
      if (
        startDate <
        this.$moment("2013-12-30")
          .startOf("week")
          .format("YYYY-MM-DD")
      ) {
        this.canAdd = true;
      } else {
        this.canAdd = false;
      }
      this.dateType = 2;
      this.chooseWeek = startDate;
      this.dateText = startDate + "~" + endDate;
      this.cycle = dateString.split("-")[0] + _weekth;
      this.oneDay = startDate.replace(/-/g, "");
      this.getData();
    },
    monthChange(date, dateString) {
      const startDate = date
        .month(date.month())
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = date
        .month(date.month())
        .endOf("month")
        .format("YYYY-MM-DD");
      let _month = date.month() + 1;
      if (_month < 10) {
        _month = "0" + _month;
      }
      // console.log(dateString, startDate, endDate);
      if (
        startDate <
        this.$moment("2013-12-30")
          .startOf("month")
          .format("YYYY-MM-DD")
      ) {
        this.canAdd = true;
      } else {
        this.canAdd = false;
      }
      this.dateType = 3;
      this.chooseMonth = startDate;
      this.dateText = startDate + "~" + endDate;
      this.cycle = dateString.split("-")[0] + _month;
      this.oneDay = startDate.replace(/-/g, "");
      this.getData();
    },
    yearChange(e) {
      if (
        e._d.getFullYear().toString() >=
        this.$moment("2013-12-30").format("YYYY")
      ) {
        this.chooseYear = this.$moment("2013-12-30").format("YYYY");
        this.canAdd = false;
      } else {
        this.chooseYear = e._d.getFullYear().toString();
        this.canAdd = true;
      }
      this.dateType = 4;
      this.cycle = this.chooseYear;
      this.oneDay = this.$moment(this.chooseYear)
        .format("YYYY-MM-DD")
        .replace(/-/g, "");
      this.dateText =
        this.chooseYear + "-01-01 ~ " + this.chooseYear + "-12-31";
      this.showYear = false;
      this.getData();
    },
    subLeft() {
      let _max = "";
      if (this.dateType == 2) {
        _max = this.$weekDate("2013-12-30").start;
        if (this.chooseWeek <= _max) {
          let end = this.$moment(this.chooseWeek)
            .week(this.$moment(this.chooseWeek).week() - 1)
            .endOf("week")
            .format("YYYY-MM-DD");
          this.chooseWeek = this.$moment(this.chooseWeek)
            .week(this.$moment(this.chooseWeek).week() - 1)
            .startOf("week")
            .format("YYYY-MM-DD");
          this.cycle = (Number(this.cycle) - 1).toString();
          this.oneDay = this.chooseWeek.replace(/-/g, "");
          this.dateText = this.chooseWeek + "~" + end;
          this.canAdd = true;
        }
      } else if (this.dateType == 3) {
        _max = this.$moment("2013-12-30")
          .startOf("month")
          .format("YYYY-MM-DD");
        if (this.chooseMonth <= _max) {
          let end = this.$moment(this.chooseMonth)
            .month(this.$moment(this.chooseMonth).month() - 1)
            .endOf("month")
            .format("YYYY-MM-DD");
          this.chooseMonth = this.$moment(this.chooseMonth)
            .month(this.$moment(this.chooseMonth).month() - 1)
            .startOf("month")
            .format("YYYY-MM-DD");
          this.cycle = (Number(this.cycle) - 1).toString();
          this.oneDay = this.chooseMonth.replace(/-/g, "");
          this.dateText = this.chooseMonth + "~" + end;
          this.canAdd = true;
        }
      } else if (this.dateType == 4) {
        _max = this.$moment("2013-12-30").format("YYYY");
        // console.log(111, this.chooseYear, _max, this.chooseYear <= _max);
        if (this.chooseYear <= _max) {
          this.chooseYear = (Number(this.chooseYear) - 1).toString();
          this.cycle = (Number(this.cycle) - 1).toString();
          this.dateText = this.cycle + "-01-01 ~ " + this.cycle + "-12-31";
          this.oneDay = this.$moment(this.chooseYear)
            .format("YYYY-MM-DD")
            .replace(/-/g, "");
          this.canAdd = true;
        }
      }
      this.getData();
    },
    addRight() {
      if (this.canAdd) {
        let _max = "";
        if (this.dateType == 2) {
          _max = this.$weekDate().start;
          if (this.chooseWeek < _max) {
            let end = this.$moment(this.chooseWeek)
              .week(this.$moment(this.chooseWeek).week() + 1)
              .endOf("week")
              .format("YYYY-MM-DD");
            this.chooseWeek = this.$moment(this.chooseWeek)
              .week(this.$moment(this.chooseWeek).week() + 1)
              .startOf("week")
              .format("YYYY-MM-DD");
            this.cycle = (Number(this.cycle) + 1).toString();
            this.oneDay = this.chooseWeek.replace(/-/g, "");
            this.dateText = this.chooseWeek + "~" + end;
            if (this.chooseWeek >= _max) this.canAdd = false;
          }
        } else if (this.dateType == 3) {
          _max = this.$moment("2013-12-30")
            .startOf("month")
            .format("YYYY-MM-DD");
          if (this.chooseMonth < _max) {
            let end = this.$moment(this.chooseMonth)
              .month(this.$moment(this.chooseMonth).month() + 1)
              .endOf("month")
              .format("YYYY-MM-DD");
            this.chooseMonth = this.$moment(this.chooseMonth)
              .month(this.$moment(this.chooseMonth).month() + 1)
              .startOf("month")
              .format("YYYY-MM-DD");
            this.cycle = (Number(this.cycle) + 1).toString();
            this.oneDay = this.chooseMonth.replace(/-/g, "");
            this.dateText = this.chooseMonth + "~" + end;
            if (this.chooseMonth >= _max) this.canAdd = false;
          }
        } else if (this.dateType == 4) {
          _max = this.$moment("2013-12-30").format("YYYY");
          if (this.chooseYear < _max) {
            this.chooseYear = (Number(this.chooseYear) + 1).toString();
            this.cycle = (Number(this.cycle) + 1).toString();
            this.oneDay = this.$moment(this.chooseYear)
              .format("YYYY-MM-DD")
              .replace(/-/g, "");
            this.dateText = this.cycle + "-01-01 ~ " + this.cycle + "-12-31";
            if (this.chooseYear >= _max) this.canAdd = false;
          }
        }
        this.getData();
      }
    },
    disabledEndDate(endValue) {
      // console.log(endValue);
      const startValue = new Date("2013-12-30");
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() <= endValue.valueOf();
    },
    initLineData() {
      this.chartChange = new Chart({
        container: "broken-line",
        autoFit: true,
        height: 240
      });

      this.chartChange.data(this.brokenLineData);
      this.chartChange.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true,
          min: 0
        }
      });
      this.chartChange.tooltip({
        showCrosshairs: true,
        shared: true
      });
      this.chartChange.axis("temperature", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });
      this.chartChange.legend(false);
      this.chartChange
        .line()
        .position("month*temperature")
        .color("city")
        .shape("circle")
        .style({ lineWidth: 2 });

      this.chartChange
        .point()
        .position("month*temperature")
        .color("city")
        .shape("circle");

      this.chartChange.render();
    },
    initPlate(){
      for(let i=0;i<this.plateList.length;i++){
        this.plateChart.i = new Chart({
          container: 'plate-line'+i,
          autoFit: true,
          height: 70,
        });

        this.plateChart.i.data(this.plateList[i].data.chart_data.reverse());
        this.plateChart.i.scale(false);
        this.plateChart.i.axis(false);
        this.plateChart.i.tooltip({
          showCrosshairs: true, // 展示 Tooltip 辅助线
          shared: true,
        });

        this.plateChart.i.line().position('date*value').tooltip("date*value", (date, value) => {
          date = "销售点数";
          return {
            name: date,
            value: value
          };
        });;
        // this.plateChart.i.line().position('date*value');

        this.plateChart.i.render();
      }
    },
    publisherChange(){
      this.cycle = this.$weekDate().weekth;
      this.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.chooseWeek = this.$weekDate().start;
      this.chooseMonth = this.$weekDate().start;
      this.chooseYear = this.$weekDate().start;
      this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.dateType = 2;
      this.canAdd = false;
      this.canSub = true;
      this.getData();
    }
  }
};
</script>
