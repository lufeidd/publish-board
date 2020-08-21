<template>
  <div id="taopuPage" @click="showYear = false">
    <HeadNav type="publish" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="taopu"></SlideNav>
          <div
            v-if="!goodsPower"
            style="height:10px;margin-right:10px;margin-top:-10px;background-color:#FFF;"
          ></div>
        </div>
        <div class="float-right" v-if="goodsPower">
          <div class="main-container">
            <!-- 搜索品种 -->
            <div class="model-container">
              <div class="model-bg search">
                <p class="title">搜索品种</p>
                <div class="content common" style="position:relative;">
                  <a-auto-complete
                    option-label-prop="value"
                    style="width: 800px"
                    placeholder="搜索品种名称、ISBN"
                    @search="inputSearch"
                    @select="selected"
                    v-model="inputVal"
                  >
                    <template slot="dataSource">
                      <a-select-option
                        v-for="(opt,index) in dataSource"
                        :key="index"
                        :value="opt.title"
                      >
                        <div class="result">
                          <img
                            :src="opt.cover_pic"
                            alt
                            width="35px"
                            height="35px"
                            v-if="opt.cover_pic"
                          />
                          <span v-else class="no-pic" style="min-width:35px;min-height:35px;"></span>
                          <span>{{opt.title}}</span>
                        </div>
                      </a-select-option>
                    </template>
                    <a-input style="height:40px;">
                      <div slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-search" />
                        </svg>
                        <span class="rowLine">|</span>
                      </div>
                    </a-input>
                  </a-auto-complete>
                  <div style="text-align:center;margin-top:10px;" v-if="searchLoading">
                    <a-spin tip></a-spin>
                  </div>
                </div>
                <p class="curren" v-if="historyList.length > 0">最近搜索</p>
                <div class="history" v-if="historyList.length > 0">
                  <div
                    class="content"
                    v-for="(item,index) in historyList"
                    :key="index"
                    @click="toDetail(item,index)"
                  >
                    <div>
                      <img
                        :src="item.cover_pic"
                        alt
                        width="100px"
                        height="100px"
                        v-if="item.cover_pic"
                      />
                      <span v-else class="no-pic" style="min-width:100px;min-height:100px;"></span>
                    </div>
                    <div class="title" :title="item.title">{{item.title}}</div>
                    <div class="sale">销售点数 {{item.sale_total}}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 时间选择 -->
            <!-- 选择品种，日期 -->
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg choose clearfix">
                  <div class="float-left">
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
                            @click="selectCategory(null,-1)"
                          >所有类目</a>
                        </a-menu-item>
                        <a-menu-item v-for="(item,index) in categoryList" :key="index">
                          <a
                            href="javascript:;"
                            style="padding:5px 15px;color:#515A6E;font-size:12px;"
                            @click="selectCategory(item,index)"
                          >{{item.name}}</a>
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
            <!-- 品种销售排行 -->
            <div class="model-container sale-rank">
              <div class="section-title model-bg">品种销售排行</div>
              <div v-if="goodsPower">
                <div class="table model-bg" v-if="goodsList.length > 0">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="50" />
                      <col width="310" />
                      <col width="150" />
                      <col width="200" />
                      <col width="100" />
                      <col width="120" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排行</td>
                        <td>品种</td>
                        <td>作者</td>
                        <td>类目</td>
                        <td style="text-align:right;">销售点数</td>
                        <td style="text-align:right;">品种排名（类目）</td>
                        <td style="text-align:right;">品种排名（全部）</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in goodsList" :key="index">
                        <td>{{item.sale_rank}}</td>
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
                              class="click-font goods-name"
                              :title="item.goods_name"
                              @click="toDetail(item,index)"
                            >{{item.goods_name}}</span>
                          </div>
                        </td>
                        <td>
                          <span
                            class="click-font author"
                            :title="item.goods_author"
                          >{{item.goods_author}}</span>
                        </td>
                        <td>{{item.cate_node_2}} ＞ {{item.cate_node_3}}</td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.sale_total}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.in_all_cate_rank}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.in_all_rank}}</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
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
                <div class="model-bg" v-else style="padding:20px">
                  <a-empty />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="float-right" v-else style="width:1080px;">
          <div>
            <div
              class="main-container"
              style="min-height:650px;position:relative;background-color:#FFF;margin-top:10px;"
            >
              <PageNoPower></PageNoPower>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/publish/taopu100.scss"></style>
<script>
import { TOP_GOODSRANK, TOP_HISTORY, TOP_SEARCH } from "../../apis/publish.js";
import { COMMON_CATEGORY } from "../../apis/common.js";
export default {
  data() {
    return {
      goodsPower: true,
      goodsList: [],
      cycle: "",
      dateType: 2,
      page: 1,
      pageSize: 20,
      total: 0,
      historyList: [],
      categoryList: [],
      chooseCategory: {
        name: "所有类目",
        id: 0
      },
      showYear: false,
      chooseWeek: null,
      chooseMonth: null,
      chooseYear: null,
      dateText: "",
      canSub: true,
      canAdd: false,
      inputVal: "",
      dataSource: [],
      searchLoading: false
    };
  },
  mounted() {
    console.log(this.$weekDate());
    this.cycle = this.$weekDate().weekth;
    this.chooseWeek = this.$weekDate().start;
    this.chooseMonth = this.$weekDate().start;
    this.chooseYear = this.$weekDate().start;
    this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
    this.getData();
    this.getCategory();
    this.history();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    // 获取商品排行
    async getData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        period: this.cycle,
        date_type: this.dateType,
        goods_cate: this.chooseCategory.id,
        page: this.page,
        page_size: this.pageSize
      };
      let res = await TOP_GOODSRANK(data);
      if (res.code == 0) {
        this.total = res.data.total;
        this.goodsList = res.data.list;
        this.goodsPower = true;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if (res.code == 1009) {
          this.goodsPower = false;
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
        this.$setSlideHeight();
      }
    },
    // 获取搜索历史
    async history() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id
      };
      let res = await TOP_HISTORY(data);
      if (res.code == 0) {
        this.historyList = res.data;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 获取分类列表
    async getCategory() {
      let data = {};
      let res = await COMMON_CATEGORY(data);
      if (res.code == 0) {
        this.categoryList = res.data;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    async search(_value) {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        search: _value,
        page: 1,
        page_size: 100
      };
      let res = await TOP_SEARCH(data);
      if (res.code == 0) {
        if (res.data.search == this.inputVal) {
          this.dataSource = res.data.lists.map((value, key) => {
            return value;
          });
        }
        this.searchLoading = false;
      } else {
        this.searchLoading = false;
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    inputSearch(value) {
      console.log(111);
      this.dataSource = [];
      if (value.length > 0) {
        let _value = value.toString();
        this.searchLoading = true;
        this.search(_value);
      }
    },
    selected(value) {
      console.log(222);
      let goods_id;
      for (let i = 0; i < this.dataSource.length; i++) {
        if (value == this.dataSource[i].title) {
          goods_id = this.dataSource[i].goods_id;
        }
      }
      this.$router.push({
        name: "detail",
        query: {
          goods_id: goods_id
        }
      });
    },
    // 选择分类
    selectCategory(item, index) {
      // console.log(index)
      if (index == -1) {
        this.chooseCategory.name = "所有类目";
        this.chooseCategory.id = 0;
      } else {
        this.chooseCategory.name = item.name;
        this.chooseCategory.id = item.category_id;
      }
      this.page = 1;
      this.getData();
    },
    weekChange(date, dateString) {
      // var _day = date._d.getDate();
      const startDate = date.day(1).format("YYYY-MM-DD"); // 周一日期
      const endDate = date.day(7).format("YYYY-MM-DD"); // 周日日期
      console.log(666, date, dateString.replace(/-|周/g, ""));
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
      this.page = 1;
      this.getData();
    },
    monthChange(date, dateString) {
      // var _day = date._d.getDate();
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
      this.page = 1;
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
      this.dateText =
        this.chooseYear + "-01-01 ~ " + this.chooseYear + "-12-31";
      this.page = 1;
      this.getData();
      this.showYear = false;
    },
    subLeft() {
      let _max = "";
      if (this.dateType == 2) {
        _max = this.$weekDate().start;
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
          this.dateText = this.chooseWeek + "~" + end;
          this.canAdd = true;
          this.page = 1;
          this.getData();
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
          this.dateText = this.chooseMonth + "~" + end;
          this.canAdd = true;
          this.page = 1;
          this.getData();
        }
      } else if (this.dateType == 4) {
        _max = this.$moment("2013-12-30").format("YYYY");
        // console.log(111, this.chooseYear, _max, this.chooseYear <= _max);
        if (this.chooseYear <= _max) {
          this.chooseYear = (Number(this.chooseYear) - 1).toString();
          this.cycle = (Number(this.cycle) - 1).toString();
          this.dateText = this.cycle + "-01-01 ~ " + this.cycle + "-12-31";
          this.canAdd = true;
          this.page = 1;
          this.getData();
        }
      }
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
            this.dateText = this.chooseWeek + "~" + end;
            if (this.chooseWeek >= _max) this.canAdd = false;
            this.page = 1;
            this.getData();
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
            this.dateText = this.chooseMonth + "~" + end;
            if (this.chooseMonth >= _max) this.canAdd = false;
            this.page = 1;
            this.getData();
          }
        } else if (this.dateType == 4) {
          _max = this.$moment("2013-12-30").format("YYYY");
          if (this.chooseYear < _max) {
            this.chooseYear = (Number(this.chooseYear) + 1).toString();
            this.cycle = (Number(this.cycle) + 1).toString();
            this.dateText = this.cycle + "-01-01 ~ " + this.cycle + "-12-31";
            if (this.chooseYear >= _max) this.canAdd = false;
            this.page = 1;
            this.getData();
          }
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
    onShowSizeChange(current, pageSize) {
      console.log(current);
      this.page = current;
      this.getData();
    },
    toDetail(item, index) {
      this.$router.push({
        name: "detail",
        query: {
          goods_id: item.goods_id
        }
      });
    },
    publisherChange() {
      this.cycle = this.$weekDate().weekth;
      this.chooseWeek = this.$weekDate().start;
      this.chooseMonth = this.$weekDate().start;
      this.chooseYear = this.$weekDate().start;
      this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.chooseCategory.name = "所有类目";
      this.chooseCategory.id = 0;
      this.dateType = 2;
      this.canSub = true;
      this.canAdd = false;
      this.getData();
      this.history();
    }
  }
};
</script>
