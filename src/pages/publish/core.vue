<template>
  <div id="corePage" style="padding-bottom:20px;">
    <HeadNav type="publish" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="core"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
            <div class="model-container">
              <div class="model-bg clearfix" style="padding:8px 15px;">
                <div class="float-left" style="margin-top:6px;">
                  <a-dropdown :trigger="['click']" placement="bottomLeft">
                    <a
                      class="ant-dropdown-link"
                      @click="e => e.preventDefault()"
                      style="font-size:12px;color:#4576DB;"
                    >
                      {{chooseCategory.name}}
                      <a-icon type="down" />
                    </a>
                    <a-menu slot="overlay">
                      <a-menu-item>
                        <a
                          href="javascript:;"
                          style="padding:5px 15px;color:#515A6E;font-size:12px;"
                          @click="selectCategory('one')"
                        >一级类目</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a
                          href="javascript:;"
                          style="padding:5px 15px;color:#515A6E;font-size:12px;"
                          @click="selectCategory('two')"
                        >二级类目</a>
                      </a-menu-item>
                      <a-menu-item>
                        <a
                          href="javascript:;"
                          style="padding:5px 15px;color:#515A6E;font-size:12px;"
                          @click="selectCategory('three')"
                        >三级类目</a>
                      </a-menu-item>
                    </a-menu>
                  </a-dropdown>
                </div>
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
            <!-- 类目排名 -->
            <div class="model-container">
              <div class="model-bg" style="min-height:603px;">
                <div class="section-title">类目排名</div>
                <div class="table">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="55" />
                      <col width="160" />
                      <col width="140" />
                      <col width="140" />
                      <col width="80" />
                      <col width="80" />
                      <col width="400" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>类目</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">父级类目</td>
                        <td style="text-align:right;">本社排名</td>
                        <td style="text-align:right;">类目占有率</td>
                        <td>说明</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item,index) in list" :key="index">
                        <td style="text-align:center;">
                          <div style="line-height:36px;">{{item.sale_rank}}</div>
                        </td>
                        <td>
                          <span class="main-font">{{item.category_name}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.sale_total}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span v-if="item.parents.length > 0">{{item.parents.join('>')}}</span>
                          <span v-else>无</span>
                        </td>
                        <td style="text-align:right;">{{item.publisher_rank}}</td>
                        <td style="text-align:right;">{{(item.cate_ratio*100).toFixed(2)}}%</td>
                        <td>
                          <span v-if="item.memo.goods_nums">
                            有{{item.memo.goods_nums}}个品种进入类目前100，《
                            <span>{{item.memo.goods_name}}</span>
                            》排名第{{item.memo.goods_rank}}位
                          </span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                    <tfoot v-if="list.length > 0">
                      <tr>
                        <td colspan="7" style="text-align:right;">
                          <a-pagination
                            :show-total="total => `共 ${total} 条数据`"
                            :default-current="1"
                            :total="total"
                            v-model="page"
                            :defaultPageSize="pageSize"
                            @change="onShowSizeChange"
                          />
                        </td>
                      </tr>
                    </tfoot>
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
<script>
import { MYCATE_INDEX } from "../../apis/publish.js";
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
      chooseCategory: {
        name: "一级类目",
        level: "one"
      },
      list: [],
      page:1,
      pageSize:20,
      total:0,
    };
  },
  mounted() {
    this.$loading = true;
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
        period: this.cycle,
        date_type: this.dateType,
        start_date: this.oneDay,
        category_level: this.chooseCategory.level,
        page:this.page,
        page_size:this.pageSize
      };
      let res = await MYCATE_INDEX(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.list = [];
        this.list = res.data.category_ranks;
        this.total = res.data.count
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message,res.code);
        }
      }
    },
    weekChange(date, dateString) {
      // var _day = date._d.getDate();
      this.$refs.load.isLoading = true;
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
      this.page = 1;
      this.getData();
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
      this.page = 1;
      this.getData();
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
      this.page = 1;
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
      this.page = 1;
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
        this.page = 1;
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
    selectCategory(type) {
      this.$refs.load.isLoading = true;
      if (type == "one") {
        this.chooseCategory.name = "一级类目";
        this.chooseCategory.level = type;
      } else if (type == "two") {
        this.chooseCategory.name = "二级类目";
        this.chooseCategory.level = type;
      } else if (type == "three") {
        this.chooseCategory.name = "三级类目";
        this.chooseCategory.level = type;
      }
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(current, pageSize) {
      console.log(current);
      this.page = current;
      this.getData();
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
      this.canAdd = false;
      this.canSub = true;
      this.chooseCategory.name = "一级类目";
      this.chooseCategory.level = "one";
      this.page = 1;
      this.getData();
    }
  }
};
</script>
