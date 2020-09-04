<template>
  <div id="regionPage" @click="showYear = false">
    <HeadNav type="publish" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="region"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
            <div class="model-container">
              <div class="model-bg clearfix" style="padding:7px 15px;">
                <div class="float-left"></div>
                <div class="float-right">
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
            </a-affix>
            <!-- 地域简况 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">地域简况</div>
                <div class="clearfix">
                  <div
                    class="float-left"
                    style="position:relative;padding-top:15px;margin-left:-30px;"
                  >
                    <div id="map" style="height:284px;width:520px;"></div>
                  </div>
                  <div class="float-left">
                    <div class="container">
                      <div class="content">
                        <div class="title">销售点数排名前5名</div>
                        <p class="desc">
                          <span v-if="cityTop">{{cityTop}}</span>
                          <span v-else>--</span>
                        </p>
                        <div class="title">销售增长最多</div>
                        <p class="desc">
                          <span v-if="incrTop.name">{{incrTop.name}}</span>
                          <span v-else>--</span>
                          <span
                            class="text red"
                            v-if="incrTop.compare_rate"
                          >+{{incrTop.compare_rate}}%</span>
                          <span v-else class="text red">--</span>
                        </p>
                      </div>
                      <div class="content">
                        <div class="title">读者基数最高</div>
                        <p class="desc">
                          <span v-if="readerTop.name">{{readerTop.name}}</span>
                          <span v-else>--</span>
                          <span
                            class="text"
                            v-if="readerTop.reader_total"
                          >{{readerTop.reader_total}}</span>
                          <span class="text" v-else>--</span>
                        </p>
                        <div class="title">销售下降最多</div>
                        <p class="desc">
                          <span v-if="decrTop.name">{{decrTop.name}}</span>
                          <span v-else>--</span>
                          <span
                            class="text green"
                            v-if="decrTop.compare_rate"
                          >{{decrTop.compare_rate}}%</span>
                          <span class="text green" v-else>--</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 地域排行 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">地域排行</div>
                <div class="table">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="60" />
                      <col width="200" />
                      <col width="270" />
                      <col width="120" />
                      <col width="120" />
                      <col width="280" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td style="text-align:center;">排名</td>
                        <td>省份</td>
                        <td style="text-align:right;">读者基数</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">上期对比</td>
                        <td style="text-align:right;">说明</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item,index) in list" :key="index">
                        <td style="text-align:center;">{{item.rank}}</td>
                        <td>
                          <span class="main-font">{{item.name}}</span>
                        </td>
                        <td style="text-align:right;">{{item.reader_total}}</td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.sale_total}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="percent" v-if="item.compare_rate > 0">+{{item.compare_rate}}%</span>
                          <span class="green" v-if="item.compare_rate  < 0">{{item.compare_rate}}%</span>
                        </td>
                        <td
                          style="text-align:right;"
                          v-if="item.rank_compare < 0"
                        >较上期排名上升 {{item.rank_compare*-1}} 名</td>
                        <td
                          style="text-align:right;"
                          v-if="item.rank_compare > 0"
                        >较上期排名下降 {{item.rank_compare}} 名</td>
                        <td style="text-align:right;" v-if="item.rank_compare == 0">--</td>
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
    <Loading ref="load"></Loading>
  </div>
</template>
<style lang="scss" scoped>
#regionPage {
  padding-bottom: 20px;
  & .container {
    padding: 15px;
    & .content {
      display: inline-block;
      margin-left: 50px;
      & .title {
        font-size: $fontSize - 2;
      }
      & .desc {
        color: $fontColor1;
        margin-top: 10px;
        margin-bottom: 20px;
        & .text {
          margin-left: 40px;
          &.red {
            color: $red;
          }
          &.green {
            color: $green;
          }
        }
      }
    }
  }
}
</style>
<script>
import { MYREGION_INDEX } from "../../apis/publish.js";
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
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
      cityTop: "",
      readerTop: {
        name: "",
        reader_total: 0
      },
      incrTop: {
        name: "",
        compare_rate: 0
      },
      decrTop: {
        name: "",
        compare_rate: 0
      },
      list: []
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
        start_date: this.oneDay,
        period: this.cycle
      };
      let res = await MYREGION_INDEX(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.list = [];
        this.list = res.data.rank_list;
        this.cityTop = res.data.sale_top;
        this.readerTop = res.data.reader_top;
        this.incrTop = res.data.incr_top;
        this.decrTop = res.data.decr_top;
        this.initMap();
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.pagePower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    weekChange(date, dateString) {
      // var _day = date._d.getDate();
      this.$refs.load.isLoading = true;
      const startDate = date.day(1).format("YYYY-MM-DD"); // 周一日期
      const endDate = date.day(7).format("YYYY-MM-DD"); // 周日日期
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
      this.cycle = dateString.replace(/-|周/g, "");
      this.oneDay = startDate.replace(/-/g, "");
      this.getData();
      console.log(666, startDate, endDate);
    },
    monthChange(date, dateString) {
      this.$refs.load.isLoading = true;
      const startDate = date
        .month(date.month())
        .startOf("month")
        .format("YYYY-MM-DD");
      const endDate = date
        .month(date.month())
        .endOf("month")
        .format("YYYY-MM-DD");
      console.log(dateString, startDate, endDate);
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
      this.cycle = dateString.replace(/-/g, "");
      this.oneDay = startDate.replace(/-/g, "");
      this.getData();
      console.log(startDate, endDate);
    },
    yearChange(e) {
      this.$refs.load.isLoading = true;
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
      this.$refs.load.isLoading = true;
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
        this.$refs.load.isLoading = true;
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
    initMap() {
      let _this = this;
      const scene = new Scene({
        id: "map",
        logoVisible: false,
        map: new Mapbox({
          center: [116.2825, 39.9],
          pitch: 0,
          style: "blank",
          autoFit: true,
          zoom: 3,
          minZoom: 1,
          maxZoom: 10
        })
      });
      scene.setMapStatus({
        dragEnable: false, //是否允许地图拖拽
        keyboardEnable: false, // 是否允许形键盘事件
        doubleClickZoom: false, // 双击放大
        zoomEnable: false, // 滚动缩放
        rotateEnable: false // 旋转
      });
      const attachMapContainer = document.createElement("div");
      attachMapContainer.id = "attach";
      attachMapContainer.style.cssText =
        "position: absolute;height:80px;width:50px;right:50px;bottom:20px;border:1px solid #F4F7FD;";
      document.getElementById("map").parentElement.append(attachMapContainer);

      scene.on("loaded", () => {
        new CountryLayer(scene, {
          data: [],
          joinBy: ["NAME_CHN", "name"],
          depth: 1,
          provinceStroke: "#FFF",
          stroke: "#D1DDF5",
          countyStroke: "#FFF",
          cityStroke: "#FFF",
          cityStrokeWidth: 0,
          // chinaNationalWidth: 0,
          coastlineWidth: 0,
          chinaNationalStroke: "#D1DDF5",
          label: {
            enable: false
          },
          fill: {
            color: {
              field: "NAME_CHN",
              values:
                ("name",
                function(value) {
                  // console.log(value)
                  let _arr = _this.cityTop.split("、");
                  // console.log(_arr)
                  if (value.indexOf(_arr[0]) > -1 && _arr[0]) {
                    return "#4777D8";
                  } else if (value.indexOf(_arr[1]) > -1 && _arr[1]) {
                    return "#6E94E1";
                  } else if (value.indexOf(_arr[2]) > -1 && _arr[2]) {
                    return "#82A3E5";
                  } else if (value.indexOf(_arr[3]) > -1 && _arr[3]) {
                    return "#96B2E8";
                  } else if (value.indexOf(_arr[4]) > -1 && _arr[4]) {
                    return "#A0B9EA";
                  } else {
                    return "#D1DDF5";
                  }
                })
            },
            activeColor: "#4777D8"
          },
          popup: {
            enable: true,
            Html: props => {
              // return `<span>${props.NAME_CHN}</span>`;
              let _name = props.NAME_CHN,
                _num = 0;
              this.list.map((value, key) => {
                if (_name.indexOf(value.name) > -1) {
                  _num = value.sale_total;
                }
              });
              return `<span>${props.NAME_CHN}<br>销售点数：${_num}</span>`;
            }
            // lnglat :[116.2825, 39.9]
          }
        });
      });
      // 添加附图，附图需要和主图保持一致
      const scene2 = new Scene({
        id: "attach",
        logoVisible: false,
        map: new Mapbox({
          center: [113.60540108435657, 12.833692637803168],
          pitch: 0,
          style: "blank",
          zoom: 1.93,
          minZoom: 0,
          maxZoom: 3,
          interactive: false
        })
      });
      scene2.on("loaded", () => {
        new CountryLayer(scene2, {
          data: [],
          label: {
            enable: false
          },
          popup: {
            enable: true
          },
          autoFit: false,
          depth: 1,
          fill: {
            color: {
              field: "NAME_CHN",
              values: [
                "#feedde",
                "#fdd0a2",
                "#fdae6b",
                "#fd8d3c",
                "#e6550d",
                "#a63603"
              ]
            }
          }
        });
      });
      this.$setSlideHeight();
    },
    publisherChange() {
      this.$refs.load.isLoading = true;
      this.cycle = this.$weekDate().weekth;
      this.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.chooseWeek = this.$weekDate().start;
      this.chooseMonth = this.$weekDate().start;
      this.chooseYear = this.$weekDate().start;
      this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.getData();
    }
  }
};
</script>
