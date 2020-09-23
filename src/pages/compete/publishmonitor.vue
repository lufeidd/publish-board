<template>
  <div id="competePage" @click="showYear = false;show1=false;show2=false;show3=false">
    <HeadNav type="compete" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="compete" sort="publishmonitor"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
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
            </a-affix>
            <!-- 数据对比 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">数据对比</div>
                <div class="compete">
                  <div class="top">
                    <span class="publish">本社</span>
                    <span style="margin:0 8px;">对比</span>
                    <!-- 对比一 -->
                    <div
                      :class="close1?'compete-publish active':'compete-publish'"
                      @click.stop="showCompete1"
                    >
                      {{text1}}
                      <a-icon type="close" v-if="close1" @click.stop="delete1" />
                      <div class="search" v-if="show1">
                        <!-- <div style="padding:0 10px;">
                          <a-input placeholder="搜索出版社名称" v-model="inputVal1" @input="onSearch1" />
                        </div>-->
                        <div class="list" v-if="publishList1.length > 0">
                          <div
                            class="content"
                            v-for="(item1,index1) in publishList1"
                            :key="index1"
                            @click.stop="onSelect1(item1,index1,1)"
                          >{{item1.publisher_name}}</div>
                        </div>
                        <div class="no-choose" v-else>无可选择的出版社</div>
                      </div>
                    </div>
                    <span style="margin:0 8px;">对比</span>
                    <!-- 对比二 -->
                    <div
                      :class="close2?'compete-publish active':'compete-publish'"
                      @click.stop="showCompete2"
                    >
                      {{text2}}
                      <a-icon type="close" v-if="close2" @click.stop="delete2" />
                      <div class="search" v-if="show2">
                        <!-- <div style="padding:0 10px;">
                          <a-input placeholder="搜索出版社名称" v-model="inputVal2" @input="onSearch2" />
                        </div>-->
                        <div class="list" v-if="publishList2.length > 0">
                          <div
                            class="content"
                            v-for="(item2,index2) in publishList2"
                            :key="index2"
                            @click.stop="onSelect2(item2,index2,2)"
                          >{{item2.publisher_name}}</div>
                        </div>
                        <div class="no-choose" v-else>无可选择的出版社</div>
                      </div>
                    </div>
                    <span style="margin:0 8px;">对比</span>
                    <!-- 对比三 -->
                    <div
                      :class="close3?'compete-publish active':'compete-publish'"
                      @click.stop="showCompete3"
                    >
                      {{text3}}
                      <a-icon type="close" v-if="close3" @click.stop="delete3" />
                      <div class="search" v-if="show3">
                        <!-- <div style="padding:0 10px;">
                          <a-input placeholder="搜索出版社名称" v-model="inputVal3" @input="onSearch3" />
                        </div>-->
                        <div class="list" v-if="publishList3.length > 0">
                          <div
                            class="content"
                            v-for="(item3,index3) in publishList3"
                            :key="index3"
                            @click.stop="onSelect3(item3,index3,3)"
                          >{{item3.publisher_name}}</div>
                        </div>
                        <div class="no-choose" v-else>无可选择的出版社</div>
                      </div>
                    </div>
                  </div>
                  <!-- 核心数据 -->
                  <div class="middle clearfix">
                    <!-- 销售点数 -->
                    <span
                      :class="typeText == 'sale_total'?'data-block float-left active':'data-block float-left'"
                      @click="coreTypeChange('sale_total')"
                    >
                      <div style="margin-bottom:10px;">
                        <a-icon type="line-chart" />
                        <span class="secondary-font">销售点数</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left own">本社</span>
                        <span
                          class="value float-right"
                          v-if="ownInfo.sale_total"
                        >{{ownInfo.sale_total}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left one">竞社1</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo1.sale_total"
                        >{{chooseInfo1.sale_total}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left two">竞社2</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo2.sale_total"
                        >{{chooseInfo2.sale_total}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left three">竞社3</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo3.sale_total"
                        >{{chooseInfo3.sale_total}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                    </span>
                    <!-- 销售排名 -->
                    <span
                      :class="typeText == 'sale_rank'?'data-block float-left active':'data-block float-left'"
                      @click="coreTypeChange('sale_rank')"
                    >
                      <div style="margin-bottom:10px;">
                        <a-icon type="line-chart" />
                        <span class="secondary-font">销售排名</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left own">本社</span>
                        <span
                          class="value float-right"
                          v-if="ownInfo.sale_rank"
                        >{{ownInfo.sale_rank}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left one">竞社1</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo1.sale_rank"
                        >{{chooseInfo1.sale_rank}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left two">竞社2</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo2.sale_rank"
                        >{{chooseInfo2.sale_rank}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left three">竞社3</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo3.sale_rank"
                        >{{chooseInfo3.sale_rank}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                    </span>
                    <!-- 市场占有率 -->
                    <span
                      :class="typeText == 'sale_ratio'?'data-block float-left active':'data-block float-left'"
                      @click="coreTypeChange('sale_ratio')"
                    >
                      <div style="margin-bottom:10px;">
                        <a-icon type="line-chart" />
                        <span class="secondary-font">市场占有率</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left own">本社</span>
                        <span
                          class="value float-right"
                          v-if="ownInfo.market_share"
                        >{{ownInfo.market_share}}%</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left one">竞社1</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo1.market_share"
                        >{{chooseInfo1.market_share}}%</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left two">竞社2</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo2.market_share"
                        >{{chooseInfo2.market_share}}%</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left three">竞社3</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo3.market_share"
                        >{{chooseInfo3.market_share}}%</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                    </span>
                    <!-- 动销品种数 -->
                    <span
                      :class="typeText == 'on_sale_goods'?'data-block float-left active':'data-block float-left'"
                      @click="coreTypeChange('on_sale_goods')"
                    >
                      <div style="margin-bottom:10px;">
                        <a-icon type="line-chart" />
                        <span class="secondary-font">动销品种数</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left own">本社</span>
                        <span
                          class="value float-right"
                          v-if="ownInfo.cate_count"
                        >{{ownInfo.cate_count}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left one">竞社1</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo1.cate_count"
                        >{{chooseInfo1.cate_count}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left two">竞社2</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo2.cate_count"
                        >{{chooseInfo2.cate_count}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height:normal;">
                        <span class="name float-left three">竞社3</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo3.cate_count"
                        >{{chooseInfo3.cate_count}}</span>
                        <span class="value float-right" v-else>--</span>
                      </div>
                    </span>
                  </div>
                  <!-- 折线图 -->
                  <div style="margin-top:20px;">
                    <div id="broken-line"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 监控列表 -->
            <div class="model-container">
              <div class="model-bg" style="min-height:300px;padding-bottom:20px;">
                <div class="section-title">监控列表</div>
                <div class="table">
                  <table style="table-layou:fixed;">
                    <colgroup>
                      <col width="60" />
                      <col width="345" />
                      <col width="160" />
                      <col width="160" />
                      <col width="320" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td style="text-align:center;">排名</td>
                        <td>出版社</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">行业排名</td>
                        <td style="text-align:right;">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item,index) in list" :key="index">
                        <td style="text-align:center;">{{index+1}}</td>
                        <td>
                          <span
                            class="click-font"
                            @click="$refs.head.noOpen()"
                          >{{item.publisher_name}}</span>
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
                          <span class="click-dark">详细分析</span>
                        </td>
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
    <Loading ref="load" :show="1"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/compete/set.scss"></style>
<script>
import {
  COMPETE_MONITOR_PUBLISHER_LISTS,
  COMPETE_MONITOR_PUBLISHER_TREND,
  COMPETE_MONITOR_PUBLISHER_INFO
} from "../../apis/compete.js";
import { PUBLISHER_GETS } from "../../apis/common.js";
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
      list: [],
      typeText: "sale_total",
      close1: false,
      close2: false,
      close3: false,
      inputVal1: "",
      inputVal2: "",
      inputVal3: "",
      show1: false,
      show2: false,
      show3: false,
      publishList1: [],
      publishList2: [],
      publishList3: [],
      brokenLineData: [],
      isFirst: true,
      changeChart: null,
      ownList: [],
      chooseList1: [],
      chooseList2: [],
      chooseList3: [],
      selectList:[],
      text1: "+设置对比",
      text2: "+设置对比",
      text3: "+设置对比",
      publishId1: 0,
      publishId2: 0,
      publishId3: 0,
      ownInfo: {
        sale_total: 0, // 销售点数
        sale_rank: 0, // 销售排名
        market_share: 0, // 市场占有率
        cate_count: 0 // 动销品种数
      },
      chooseInfo1: {
        sale_total: 0, // 销售点数
        sale_rank: 0, // 销售排名
        market_share: 0, // 市场占有率
        cate_count: 0 // 动销品种数
      },
      chooseInfo2: {
        sale_total: 0, // 销售点数
        sale_rank: 0, // 销售排名
        market_share: 0, // 市场占有率
        cate_count: 0 // 动销品种数
      },
      chooseInfo3: {
        sale_total: 0, // 销售点数
        sale_rank: 0, // 销售排名
        market_share: 0, // 市场占有率
        cate_count: 0 // 动销品种数
      }
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
    this.getCore(this.$refs.head.publishInfo.publisher_id, 0);
    this.getTrend(this.$refs.head.publishInfo.publisher_id, 0);
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
      let res = await COMPETE_MONITOR_PUBLISHER_LISTS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.list = [];
        this.list = res.data;
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 竞争数据信息
    async getCore(id, _index) {
      let data = {
        publisher_id: id,
        period: this.cycle,
        date_type: this.dateType,
        organization_id: this.$refs.head.publishInfo.organization_id
      };
      let res = await COMPETE_MONITOR_PUBLISHER_INFO(data);
      if (res.code == 0) {
        this.pagePower = true;
        if (_index == 0) {
          this.ownInfo = res.data;
        } else if (_index == 1) {
          this.chooseInfo1 = res.data;
        } else if (_index == 2) {
          this.chooseInfo2 = res.data;
        } else {
          this.chooseInfo3 = res.data;
        }
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 竞争趋势
    async getTrend(id, _index) {
      let data = {
        publisher_id: id,
        start_date: this.oneDay,
        date_type: this.dateType,
        type: this.typeText,
        organization_id: this.$refs.head.publishInfo.organization_id
      };
      let res = await COMPETE_MONITOR_PUBLISHER_TREND(data);
      if (res.code == 0) {
        this.pagePower = true;
        if (_index == 0) {
          this.ownList = [];
          if (res.data.length > 0) {
            res.data.map((value, key) => {
              let _obj = {};
              _obj.month = value.date.toString();
              _obj.city = "本社";
              _obj.temperature = value.value;
              this.ownList.unshift(_obj);
            });
          }
        } else if (_index == 1) {
          this.chooseList1 = [];
          if (res.data.length > 0) {
            res.data.map((value, key) => {
              let _obj = {};
              _obj.month = value.date.toString();
              _obj.city = "竞社1";
              _obj.temperature = value.value;
              this.chooseList1.unshift(_obj);
            });
          }
        } else if (_index == 2) {
          this.chooseList2 = [];
          if (res.data.length > 0) {
            res.data.map((value, key) => {
              let _obj = {};
              _obj.month = value.date.toString();
              _obj.city = "竞社2";
              _obj.temperature = value.value;
              this.chooseList2.unshift(_obj);
            });
          }
        } else {
          this.chooseList3 = [];
          if (res.data.length > 0) {
            res.data.map((value, key) => {
              let _obj = {};
              _obj.month = value.date.toString();
              _obj.city = "竞社3";
              _obj.temperature = value.value;
              this.chooseList3.unshift(_obj);
            });
          }
        }
        this.lineArr();
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 出版社列表获取
    async getPublishList(val, _index) {
      let data = {
        publisher_name: val,
        page: 1,
        page_size: 1000
      };
      let res = await PUBLISHER_GETS(data);
      if (res.code == 0) {
        if (_index == 1) {
          this.publishList1 = [];
          this.publishList1 = res.data.list;
        } else if (_index == 2) {
          this.publishList2 = [];
          this.publishList2 = res.data.list;
        } else if (_index == 3) {
          this.publishList3 = [];
          this.publishList3 = res.data.list;
        }
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    weekChange(date, dateString) {
      this.$refs.load.isLoading = true;
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
      this.getCore(this.$refs.head.publishInfo.publisher_id, 0);
      this.getTrend(this.$refs.head.publishInfo.publisher_id, 0);
      if (this.publishId1 > 0) {
        this.getCore(this.publishId1, 1);
        this.getTrend(this.publishId1, 1);
      }
      if (this.publishId2 > 0) {
        this.getCore(this.publishId2, 2);
        this.getTrend(this.publishId2, 2);
      }
      if (this.publishId3 > 0) {
        this.getCore(this.publishId3, 1);
        this.getTrend(this.publishId3, 1);
      }
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
      this.getCore(this.$refs.head.publishInfo.publisher_id, 0);
      this.getTrend(this.$refs.head.publishInfo.publisher_id, 0);
      if (this.publishId1 > 0) {
        this.getCore(this.publishId1, 1);
        this.getTrend(this.publishId1, 1);
      }
      if (this.publishId2 > 0) {
        this.getCore(this.publishId2, 2);
        this.getTrend(this.publishId2, 2);
      }
      if (this.publishId3 > 0) {
        this.getCore(this.publishId3, 1);
        this.getTrend(this.publishId3, 1);
      }
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
      this.getCore(this.$refs.head.publishInfo.publisher_id, 0);
      this.getTrend(this.$refs.head.publishInfo.publisher_id, 0);
      if (this.publishId1 > 0) {
        this.getCore(this.publishId1, 1);
        this.getTrend(this.publishId1, 1);
      }
      if (this.publishId2 > 0) {
        this.getCore(this.publishId2, 2);
        this.getTrend(this.publishId2, 2);
      }
      if (this.publishId3 > 0) {
        this.getCore(this.publishId3, 1);
        this.getTrend(this.publishId3, 1);
      }
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
      this.getCore(this.$refs.head.publishInfo.publisher_id, 0);
      this.getTrend(this.$refs.head.publishInfo.publisher_id, 0);
      if (this.publishId1 > 0) {
        this.getCore(this.publishId1, 1);
        this.getTrend(this.publishId1, 1);
      }
      if (this.publishId2 > 0) {
        this.getCore(this.publishId2, 2);
        this.getTrend(this.publishId2, 2);
      }
      if (this.publishId3 > 0) {
        this.getCore(this.publishId3, 1);
        this.getTrend(this.publishId3, 1);
      }
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
        this.getCore(this.$refs.head.publishInfo.publisher_id, 0);
        this.getTrend(this.$refs.head.publishInfo.publisher_id, 0);
        if (this.publishId1 > 0) {
          this.getCore(this.publishId1, 1);
          this.getTrend(this.publishId1, 1);
        }
        if (this.publishId2 > 0) {
          this.getCore(this.publishId2, 2);
          this.getTrend(this.publishId2, 2);
        }
        if (this.publishId3 > 0) {
          this.getCore(this.publishId3, 1);
          this.getTrend(this.publishId3, 1);
        }
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
      this.changeChart = new Chart({
        container: "broken-line",
        autoFit: true,
        height: 240
      });

      this.changeChart.data(this.brokenLineData);
      this.changeChart.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true,
          min: 0
        }
      });
      this.changeChart.tooltip({
        showCrosshairs: true,
        shared: true
      });
      this.changeChart.axis("temperature", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });
      this.changeChart.legend(false);
      this.changeChart
        .line()
        .position("month*temperature")
        .color("city")
        .shape("circle")
        .style({ lineWidth: 2 });

      this.changeChart
        .point()
        .position("month*temperature")
        .color("city")
        .shape("circle");

      this.changeChart.render();
      this.$setSlideHeight();
    },
    lineArr() {
      let _length = 0,
        _arr = [];
      _arr.push(this.ownList.length);
      _arr.push(this.chooseList1.length);
      _arr.push(this.chooseList2.length);
      _arr.push(this.chooseList3.length);
      for (let i = 0; i < _arr.length; i++) {
        if (_arr[i] > _length) {
          _length = _arr[i];
        }
      }
      this.brokenLineData = [];
      for (let j = 0; j < _length; j++) {
        if (this.ownList.length > j) this.brokenLineData.push(this.ownList[j]);
        if (this.chooseList1.length > j)
          this.brokenLineData.push(this.chooseList1[j]);
        if (this.chooseList2.length > j)
          this.brokenLineData.push(this.chooseList2[j]);
        if (this.chooseList3.length > j)
          this.brokenLineData.push(this.chooseList3[j]);
      }
      if (this.isFirst) {
        this.initLineData();
      } else {
        this.changeChart.changeData(this.brokenLineData);
      }
      console.log(this.brokenLineData);
      this.isFirst = false;
      this.$refs.load.isLoading = false;
    },
    showCompete1() {
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
      this.showYear = false;
      this.publishList1 = [];
      for(let i = 0;i<this.list.length;i++){
        if(!this.selectList.includes(this.list[i].publisher_name)){
          this.publishList1.push(this.list[i])
        }
      }
    },
    showCompete2() {
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
      this.showYear = false;
      this.publishList2 = [];
      for(let i = 0;i<this.list.length;i++){
        if(!this.selectList.includes(this.list[i].publisher_name)){
          this.publishList2.push(this.list[i])
        }
      }
    },
    showCompete3() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.showYear = false;
      this.publishList3 = [];
      for(let i = 0;i<this.list.length;i++){
        if(!this.selectList.includes(this.list[i].publisher_name)){
          this.publishList3.push(this.list[i])
        }
      }
    },
    onSearch1() {
      console.log(this.inputVal1);
      // this.getPublishList(this.inputVal1, 1);
      this.publishList1 = [];
      this.list.map((value, key) => {
        if (value.publisher_name.indexOf(this.inputVal1) > -1) {
          this.publishList1.push(value);
        }
      });
    },
    onSearch2() {
      // this.getPublishList(this.inputVal2, 2);
      this.publishList2 = [];
      this.list.map((value, key) => {
        if (value.publisher_name.indexOf(this.inputVal2) > -1) {
          this.publishList2.push(value);
        }
      });
    },
    onSearch3() {
      // this.getPublishList(this.inputVal3, 3);
      this.publishList3 = [];
      this.list.map((value, key) => {
        if (value.publisher_name.indexOf(this.inputVal3) > -1) {
          this.publishList3.push(value);
        }
      });
    },
    onSelect1(item1, index1, _index) {
      this.show1 = false;
      this.close1 = true;
      this.publishId1 = item1.publisher_id;
      this.inputVal1 = "";
      this.publishList1 = [];
      let _name = this.text1;
      if(this.selectList.includes(_name)){
        this.selectList = this.selectList.filter((value,key)=>{
          return value != _name;
        })
      };
      this.text1 = item1.publisher_name;
      if(this.selectList.includes(item1.publisher_name)){

      }else{
        this.selectList.push(item1.publisher_name);
      }
      this.getCore(this.publishId1, 1);
      this.getTrend(this.publishId1, 1);
    },
    onSelect2(item2, index2, _index) {
      this.show2 = false;
      this.close2 = true;
      this.publishId2 = item2.publisher_id;
      this.inputVal2 = "";
      this.publishList2 = [];
      let _name = this.text2;
      if(this.selectList.includes(_name)){
        this.selectList = this.selectList.filter((value,key)=>{
          return value != _name;
        })
      };
      this.text2 = item2.publisher_name;
      if(this.selectList.includes(item2.publisher_name)){

      }else{
        this.selectList.push(item2.publisher_name);
      }
      this.getCore(this.publishId2, 2);
      this.getTrend(this.publishId2, 2);
    },
    onSelect3(item3, index3, _index) {
      this.show3 = false;
      this.close3 = true;
      this.publishId3 = item3.publisher_id;
      this.inputVal3 = "";
      this.publishList3 = [];
      let _name = this.text3;
      if(this.selectList.includes(_name)){
        this.selectList = this.selectList.filter((value,key)=>{
          return value != _name;
        })
      };
      this.text3 = item3.publisher_name;
      if(this.selectList.includes(item3.publisher_name)){

      }else{
        this.selectList.push(item3.publisher_name);
      }
      this.getCore(this.publishId3, 3);
      this.getTrend(this.publishId3, 3);
    },
    delete1() {
      this.close1 = false;
      this.show1 = false;
      this.publishId1 = 0;
      this.selectList = this.selectList.filter((value,key)=>{
        return value != this.text1
      });
      this.text1 = "+设置对比";
      this.chooseInfo1.sale_total = 0;
      this.chooseInfo1.sale_rank = 0;
      this.chooseInfo1.market_share = 0;
      this.chooseInfo1.cate_count = 0;
      this.chooseList1 = [];
      this.showYear = false;
      this.lineArr();
    },
    delete2() {
      this.close2 = false;
      this.show2 = false;
      this.publishId2 = 0;
      this.selectList = this.selectList.filter((value,key)=>{
        return value != this.text2
      });
      this.text2 = "+设置对比";
      this.chooseInfo2.sale_total = 0;
      this.chooseInfo2.sale_rank = 0;
      this.chooseInfo2.market_share = 0;
      this.chooseInfo2.cate_count = 0;
      this.chooseList2 = [];
      this.showYear = false;
      this.lineArr();
    },
    delete3() {
      this.close3 = false;
      this.show3 = false;
      this.publishId3 = 0;
      this.selectList = this.selectList.filter((value,key)=>{
        return value != this.text3
      });
      this.text3 = "+设置对比";
      this.chooseInfo3.sale_total = 0;
      this.chooseInfo3.sale_rank = 0;
      this.chooseInfo3.market_share = 0;
      this.chooseInfo3.cate_count = 0;
      this.chooseList3 = [];
      this.showYear = false;
      this.lineArr();
    },
    coreTypeChange(text) {
      this.typeText = text;
      this.getTrend(this.$refs.head.publishInfo.publisher_id, 0);
      if (this.publishId1 > 0) {
        this.getTrend(this.publishId1, 1);
      }
      if (this.publishId2 > 0) {
        this.getTrend(this.publishId2, 2);
      }
      if (this.publishId3 > 0) {
        this.getTrend(this.publishId3, 3);
      }
    },
    publisherChange() {
      this.$refs.load.isLoading = true;
      this.cycle = this.$weekDate().weekth;
      this.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.chooseWeek = this.$weekDate().start;
      this.chooseMonth = this.$weekDate().start;
      this.chooseYear = this.$weekDate().start;
      this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.dateType = 2;
      this.typeText = "sale_total";
      this.canAdd = false;
      this.canSub = true;
      this.delete1();
      this.delete2();
      this.delete3();
      this.getData();
      this.getCore(this.$refs.head.publishInfo.publisher_id, 0);
      this.getTrend(this.$refs.head.publishInfo.publisher_id, 0);
    }
  }
};
</script>
