<template>
  <div id="indexPage" @click="bodyClick">
    <HeadNav
      type="actual"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="actual" sort="board"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container">
            <div class="model-container clearfix">
              <div
                class="float-left model-bg real-data"
                style="width: 535px; padding: 15px"
              >
                <div
                  class="real-data-block"
                  style="display: inline-block; width: 200px; cursor: auto"
                >
                  <div>
                    <a-icon type="line-chart" />
                    <span class="secondary-font">本社销售指数</span>
                  </div>
                  <div class="data-font">{{ publishData.today }}</div>
                  <div class="before">
                    <span>昨日全天</span>
                    <span class="num">{{ publishData.yesterday }}</span>
                  </div>
                  <div class="before">
                    <span>同时段对比</span>
                    <span class="num red" v-if="publishData.compare_rate > 0"
                      >+{{ publishData.compare_rate }}%</span
                    >
                    <span
                      class="num green"
                      v-else-if="publishData.compare_rate <= 0"
                      >{{ publishData.compare_rate }}%</span
                    >
                    <span class="num" v-else>--</span>
                  </div>
                </div>
                <div
                  style="
                    display: inline-block;
                    width: 285px;
                    vertical-align: top;
                    margin-left:14px;
                  "
                >
                  <div id="measure"></div>
                </div>
              </div>
              <div
                class="model-bg real-data float-right"
                style="width: 535px; padding: 15px"
              >
                <div class="real-data-block" style="display: inline-block;width: 200px; cursor: auto">
                  <div>
                    <a-icon type="line-chart" />
                    <span class="secondary-font">大盘销售指数</span>
                  </div>
                  <div class="data-font">{{ allData.today }}</div>
                  <div class="before">
                    <span>昨日全天</span>
                    <span class="num">{{ allData.yesterday }}</span>
                  </div>
                  <div class="before">
                    <span>同时段对比</span>
                    <span class="num red" v-if="allData.compare_rate > 0"
                      >+{{ allData.compare_rate }}%</span
                    >
                    <span
                      class="num green"
                      v-else-if="allData.compare_rate <= 0"
                      >{{ allData.compare_rate }}%</span
                    >
                    <span class="num" v-else>--</span>
                  </div>
                </div>
                <div
                  style="
                    display: inline-block;
                    width: 285px;
                    vertical-align: top;
                    margin-left:14px;
                  "
                >
                  <div id="broken-line"></div>
                </div>
              </div>
            </div>
            <!-- 选择品种，日期 -->
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg clearfix" style="padding: 7px 15px">
                  <div class="float-left">
                    <a-cascader
                      :field-names="{
                        label: 'name',
                        value: 'category_id',
                        children: 'child_list',
                      }"
                      :options="categoryList"
                      placeholder="所有类目"
                      change-on-select
                      :allowClear="false"
                      :popupVisible="catePopup"
                      expand-trigger="hover"
                      v-model="chooseCategory"
                      @click.stop="cateClick"
                      @change="selectCategory"
                    />
                  </div>
                </div>
              </div>
            </a-affix>
            <div class="model-container clearfix">
              <div
                class="float-left model-bg publishgoods"
                style="width: 535px; min-height: 430px; padding-bottom: 20px"
              >
                <div class="section-title">本社品种实时排行</div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="45" />
                      <col width="160" />
                      <col width="140" />
                      <col width="80" />
                      <col width="80" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>品种</td>
                        <td>类目</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">同时段对比</td>
                      </tr>
                    </thead>
                    <tbody v-if="plist.length > 0">
                      <tr v-for="(item, index) in plist" :key="index">
                        <td>{{ item.rank }}</td>
                        <td>
                          <div class="goods-desc">
                            <span class="goods-image" v-if="item.cover_pic">
                              <img
                                :src="item.cover_pic"
                                alt
                                style="width: 40px; height: 40px"
                              />
                            </span>
                            <span
                              v-else
                              class="no-pic"
                              style="min-width: 40px; min-height: 40px"
                            ></span>
                            <span
                              class="click-font goods-name"
                              :title="item.goods_name"
                              @click.stop="$toDetail(item.goods_id)"
                              >{{ item.goods_name }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <span
                            >{{ item.cate_node_2 }}
                            <span v-if="item.cate_node_3"
                              >> {{ item.cate_node_3 }}</span
                            ></span
                          >
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.sale_amount }}</span>
                        </td>
                        <td style="text-align: right">
                          <span class="percent" v-if="item.compare_rate > 0"
                            >+{{ item.compare_rate }}%</span
                          >
                          <span class="green" v-else-if="item.compare_rate < 0"
                            >{{ item.compare_rate }}%</span
                          >
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="5">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div
                class="float-right model-bg allgoods"
                style="width: 535px; min-height: 430px; padding-bottom: 20px"
              >
                <div class="section-title">全品种实时排行</div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="45" />
                      <col width="160" />
                      <col width="140" />
                      <col width="80" />
                      <col width="80" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>品种</td>
                        <td>类目</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">同时段对比</td>
                      </tr>
                    </thead>
                    <tbody v-if="alist.length > 0">
                      <tr v-for="(item, index) in alist" :key="index">
                        <td>{{ item.rank }}</td>
                        <td>
                          <div class="goods-desc">
                            <span class="goods-image" v-if="item.cover_pic">
                              <img
                                :src="item.cover_pic"
                                alt
                                style="width: 40px; height: 40px"
                              />
                            </span>
                            <span
                              v-else
                              class="no-pic"
                              style="min-width: 40px; min-height: 40px"
                            ></span>
                            <span
                              class="click-font goods-name"
                              :title="item.goods_name"
                              @click.stop="$toDetail(item.goods_id)"
                              >{{ item.goods_name }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <span
                            >{{ item.cate_node_2 }}
                            <span v-if="item.cate_node_3"
                              >> {{ item.cate_node_3 }}</span
                            ></span
                          >
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.sale_amount }}</span>
                        </td>
                        <td style="text-align: right">
                          <span class="percent" v-if="item.compare_rate > 0"
                            >+{{ item.compare_rate }}%</span
                          >
                          <span class="green" v-else-if="item.compare_rate < 0"
                            >{{ item.compare_rate }}%</span
                          >
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="5">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
<style lang="scss" scoped src="@/style/scss/pages/index.scss"></style>
<script>
import { Chart } from "@antv/g2";
import DataSet from "@antv/data-set";
import { COMMON_PUBLISHERCATEGORY } from "../../apis/common.js";
import { INDEX_REALTIME, INDEX_REALTIMEGOODS } from "../../apis/index.js";
export default {
  data() {
    return {
      pagePower: true,
      categoryList: [],
      chooseCategory: [0],
      catePopup: false,
      publishData: {
        today: 0,
        yesterday: 0,
        compare_rate: 0,
      },
      allData: {
        today: 0,
        yesterday: 0,
        compare_rate: 0,
      },
      plist: [],
      alist: [],
      measureData: [],
      lineData: [],
      measureChart: null,
      lineChart: null,
      isFirst: true,
      intervalId: null,
      isLoading: true,
    };
  },
  mounted() {
    this.getMeasureData();
    this.getFirstCategory();
    this.getListData("all");
    this.getListData("supplier");
  },
  
  destroyed() {
    this.clear();
  },
  methods: {
    // 实时数据获取
    async getMeasureData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        // supplier_id: this.$refs.head.publishInfo.supplier_id,
        supplier_id:438,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDEX_REALTIME(data);
      if (res.code == 0) {
        this.publishData.today = res.data.supplier.today.total;
        this.publishData.yesterday = res.data.supplier.yesterday.total;
        this.allData.today = res.data.all.today.total;
        this.allData.yesterday = res.data.all.yesterday.total;
        this.publishData.compare_rate = res.data.supplier.compare_rate;
        this.allData.compare_rate = res.data.all.compare_rate;
        this.measureData = [];
        this.lineData = [];
        let _arr1 = [],
          _arr2 = [];
        res.data.supplier.yesterday.chart_data.map((value, key) => {
          let _obj = {};
          _obj.time = value.time;
          _obj.昨日 = value.value;
          this.measureData.push(_obj);
        });
        res.data.supplier.today.chart_data.map((value, key) => {
          this.measureData[key].今日 = value.value;
        });
        res.data.all.yesterday.chart_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.time;
          _obj.city = "昨日";
          _obj.temperature = value.value;
          _arr1.push(_obj);
        });
        res.data.all.today.chart_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.time;
          _obj.city = "今日";
          _obj.temperature = value.value;
          _arr2.push(_obj);
        });
        _arr1.map((value, key) => {
          if (_arr1.length > key) this.lineData.push(_arr1[key]);
          if (_arr2.length > key) this.lineData.push(_arr2[key]);
        });
        let _this = this;
        setTimeout(() => {
          if (_this.isFirst) {
            _this.initActual();
            _this.initActualLine();
          } else {
            _this.measureChart.destroy();
            _this.lineChart.destroy();
            _this.initActual();
            _this.initActualLine();
          }
          _this.isFirst = false;
        }, 500);
        this.isLoading = false;
        // console.log(this.measureData);
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 获取品种
    async getListData(type) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        goods_cate: this.chooseCategory[this.chooseCategory.length - 1],
        type: type,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDEX_REALTIMEGOODS(data);
      if (res.code == 0) {
        if (type == "all") {
          this.alist = [];
          this.alist = res.data;
        } else if (type == "supplier") {
          this.plist = [];
          this.plist = res.data;
        }
        let alldom = document.getElementsByClassName("allgoods")[0],
          publishdom = document.getElementsByClassName("publishgoods")[0],
          _this = this;
        // console.log(alldom.offsetHeight)
        setTimeout(() => {
          if (this.alist.length > this.plist.length) {
            publishdom.style.height = alldom.offsetHeight + "px";
          } else {
            alldom.style.height = publishdom.offsetHeight + "px";
          }
          _this.isLoading = false;
        }, 100);
      } else {
        this.isLoading = false;
      }
    },
    // 获取初级分类列表
    async getFirstCategory() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        // floor: 2,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMMON_PUBLISHERCATEGORY(data);
      if (res.code == 0) {
        this.categoryList = [];
        // this.categoryList = res.data;
        let _data = {
          category_id: 0,
          name: "所有类目",
          pid: 0,
        };
        this.categoryList.push(_data);
        res.data.map((value, key) => {
          this.categoryList.push(value);
        });
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    cateClick() {
      this.catePopup = true;
    },
    bodyClick() {
      this.catePopup = false;
    },
    // 选择分类
    selectCategory(value) {
      this.catePopup = false;
      this.isLoading = true;
      this.getListData("all");
      this.getListData("supplier");
    },
    initActual() {
      let measureChartDv = new DataSet.DataView().source(this.measureData);
      measureChartDv.transform({
        type: "fold",
        fields: ["昨日", "今日"], // 展开字段集
        key: "type", // key字段
        value: "value", // value字段
      });

      this.measureChart = new Chart({
        container: "measure",
        autoFit: true,
        height: 125,
      });

      this.measureChart.data(measureChartDv.rows);
      this.measureChart.scale("time", {
        range: [0, 1],
      });
      this.measureChart.scale("value", {
        nice: true,
      });
      this.measureChart.axis("value", {
        label: {
          // style:{
          //   textBaseline: "bottom",
          //   textAlign: "left",
          // }
        },
      });
      this.measureChart.axis("time", {
        tickLine: null,
        label: {
          // style:{
          //   textAlign: "left",
          // },
          formatter: function (value) {
            if (value == "00:00") {
              return "0";
            } else if (value == "02:00") {
              return "2";
            } else if (value == "04:00") {
              return "4";
            } else if (value == "06:00") {
              return "6";
            } else if (value == "08:00") {
              return "8";
            } else if (value == "10:00") {
              return "10";
            } else if (value == "12:00") {
              return "12";
            } else if (value == "14:00") {
              return "14";
            } else if (value == "16:00") {
              return "16";
            } else if (value == "18:00") {
              return "18";
            } else if (value == "20:00") {
              return "20";
            } else if (value == "22:00") {
              return "22";
            } else {
              return "";
            }
          },
          autoHide: false | true,
          autoRotate: false,
        },
      });
      this.measureChart.legend(false);
      this.measureChart.tooltip({
        shared: true,
        showCrosshairs: true,
      });
      this.measureChart
        .area()
        .position("time*value")
        .color("type", (type) => {
          if (type == "昨日") {
            return "#D1DDF6";
          } else if (type == "今日") {
            return "#5A8BEE";
          }
        })
        .shape("smooth");
      this.measureChart
        .line()
        .position("time*value")
        .color("type", (type) => {
          if (type == "昨日") {
            return "#D1DDF6";
          } else if (type == "今日") {
            return "#5A8BEE";
          }
        })
        .shape("smooth")
        .size(1);
      this.measureChart.render();
    },
    initActualLine() {
      let _this = this;
      this.lineChart = new Chart({
        container: "broken-line",
        autoFit: false,
        width: 285,
        height: 125,
      });

      this.lineChart.data(this.lineData);
      this.lineChart.scale({
        month: {
          range: [0, 1],
        },
        temperature: {
          nice: true,
          min: 0,
        },
      });
      this.lineChart.tooltip({
        showCrosshairs: true,
        shared: true,
      });
      this.lineChart.axis("month", {
        tickLine: null,
        // line: {
        //   style: {
        //     width: 1050,
        //   },
        // },
        label:{
          formatter: function (value) {
            if (value == "00:00") {
              return "0";
            } else if (value == "02:00") {
              return "2";
            } else if (value == "04:00") {
              return "4";
            } else if (value == "06:00") {
              return "6";
            } else if (value == "08:00") {
              return "8";
            } else if (value == "10:00") {
              return "10";
            } else if (value == "12:00") {
              return "12";
            } else if (value == "14:00") {
              return "14";
            } else if (value == "16:00") {
              return "16";
            } else if (value == "18:00") {
              return "18";
            } else if (value == "20:00") {
              return "20";
            } else if (value == "22:00") {
              return "22";
            } else {
              return "";
            }
          },
          autoHide: false | true,
          autoRotate: false,
        }
      });
      this.lineChart.axis("temperature", {
        tickLine: null,
        line: null,
        // grid: {
        //   line: {
        //     type:'line',
        //     style: {
        //       width:1050
        //     },
        //   },
        // },
        label: {
          // offset: 0,
          // style: {
          //   textBaseline: "bottom",
          //   textAlign: "left",
          // },
        },
      });
      this.lineChart.legend(false);
      this.lineChart
        .line()
        .position("month*temperature")
        .color("city", (city) => {
          if (city == "上年同期") {
            return "#D1DDF6";
          } else if (city == "当期") {
            return "#5A8BEE";
          }
        })
        .shape("circle")
        .style({ lineWidth: 2 });

      this.lineChart
        .point()
        .position("month*temperature")
        .color("city", (city) => {
          if (city == "上年同期") {
            return "#D1DDF6";
          } else if (city == "当期") {
            return "#5A8BEE";
          }
        })
        .tooltip(false)
        .shape("circle");

      this.lineChart.render();
    },
    publisherChange() {
      this.isLoading = true;
      this.chooseCategory = [0];
      this.getFirstCategory();
      this.getListData("all");
      this.getListData("supplier");
    },
  },
};
</script>