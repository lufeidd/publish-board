<template>
  <div id="competePage" @click="showYear = false">
    <HeadNav type="compete" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="compete" sort="goodsmonitor"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg clearfix">
                <div class="float-left"></div>
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
                      <span @click.stop="showYear = true">
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
            <!-- 列表 -->
            <div class="model-container">
              <div class="model-bg" style="padding-bottom:50px;">
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
                        <td style="text-align:right;">销售点数</td>
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
                              :title="item.goods_name"
                              @click="$refs.head.noOpen()"
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
<style scoped lang="scss" src="@/style/scss/pages/compete/set.scss"></style>
<script>
import { COMPETE_MONITOR_GOODS_LISTS } from "../../apis/compete.js";
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
      goodsList: []
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
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        date_type: this.dateType,
        // start_date: this.oneDay,
        period: this.cycle
      };
      let res = await COMPETE_MONITOR_GOODS_LISTS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.goodsList = [];
        this.goodsList = res.data;
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
      console.log(666, this.cycle);
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
      console.log(_month);
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
      console.log(startDate, endDate);
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
    publisherChange() {
      this.cycle = this.$weekDate().weekth;
      this.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.chooseWeek = this.$weekDate().start;
      this.chooseMonth = this.$weekDate().start;
      this.chooseYear = this.$weekDate().start;
      this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.canAdd = false;
      this.canSub = true;
      this.dateType = 2;
      this.getData();
    }
  }
};
</script>
