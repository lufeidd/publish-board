<template>
  <div id="industryPage" @click="bodyClick">
    <HeadNav
      type="industry"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="market"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
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
                      expand-trigger="hover"
                      :popupVisible="catePopup"
                      v-model="chooseCategory"
                      @click.stop="cateClick"
                      @change="selectCategory"
                    />
                  </div>
                  <div class="float-right">
                    <TimeChoose
                      ref="time"
                      @changeTime="changeTime"
                    ></TimeChoose>
                  </div>
                </div>
              </div>
            </a-affix>
            <!-- 大盘数据 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">大盘数据-{{ cateText }}</div>
                <div class="market-data">
                  <div>
                    <span class="data-block">
                      <div>
                        <a-icon type="line-chart" />
                        <span class="secondary-font">销售指数</span>
                      </div>
                      <div class="data-font" v-if="saleTotal">
                        {{ saleTotal }}
                      </div>
                      <div class="data-font" v-else>--</div>
                      <div class="compete">
                        <span style="margin-right: 40px">上月对比</span>
                        <span class="red" v-if="compareRate > 0"
                          >+{{ compareRate }}% ↑</span
                        >
                        <span class="green" v-else-if="compareRate < 0"
                          >{{ compareRate * -1 }}% ↓</span
                        >
                        <span v-else>{{ compareRate }}</span>
                      </div>
                    </span>
                  </div>
                  <!-- 折线图 -->
                  <div style="margin-top: 20px">
                    <div id="broken-linedata"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 品种排名 -->
            <div class="model-container">
              <div class="model-bg" style="padding-bottom:10px;">
                <div class="section-title clearfix">
                  <div class="float-left">品种-{{ cateText }}</div>
                  <div class="float-right">
                    <span
                      class="click-font"
                      @click.stop="$router.push({ name: 'taopu100' })"
                      >查看更多</span
                    >
                  </div>
                </div>
                <!-- 列表 -->
                <div class="table" v-if="goodsRankList.length > 0">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="55" />
                      <col width="280" />
                      <col width="190" />
                      <col width="140" />
                      <col width="140" />
                      <col width="140" />
                      <col width="100" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>品种</td>
                        <td>作者</td>
                        <td>出版社</td>
                        <td>类目</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">上期对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in goodsRankList" :key="index">
                        <td style="text-align: center">{{ item.sale_rank }}</td>
                        <td>
                          <div class="goods-desc">
                            <img
                              :src="item.cover_pic"
                              alt
                              width="40px"
                              height="40px"
                              v-if="item.cover_pic"
                            />
                            <span
                              v-else
                              class="no-pic"
                              style="min-width: 40px; min-height: 40px"
                            ></span>
                            <span
                              class="goods-name click-font"
                              :title="item.name"
                              @click="toDetail(item, index)"
                              >{{ item.name }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <div class="click-font author">
                            
                            <div
                              class="author-name"
                              @click.stop="openAuthor(item, index)"
                            >
                              {{ item.author }}
                            </div>
                            <div class="author-list" v-if="item.active">
                              <div v-if="item.authors.length > 0">
                                <div
                                  class="author-item click"
                                  v-for="(aitem, aindex) in item.authors"
                                  :key="aindex"
                                  @click.stop="toAuthor(aitem, aindex)"
                                >
                                  {{ aitem.name }}
                                </div>
                              </div>
                              <div v-else>
                                <div class="author-item">
                                  未查询到对应作者信息
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>{{ item.publish_name }}</td>
                        <td>
                          <span>{{ item.cate_node_2 }}</span>
                          <span v-if="item.cate_node_3"
                            >>{{ item.cate_node_3 }}</span
                          >
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.sale_total }}</span>
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
                  </table>
                </div>
                <div
                  v-else
                  style="height: 340px; position: relative; padding: 105px 0"
                >
                  <a-empty />
                </div>
              </div>
            </div>
            <div></div>
            <!-- 类目、出版单位排名 -->
            <div class="model-container clearfix">
              <div
                class="rank-data float-left model-bg"
                style="min-height: 689px"
              >
                <div class="section-title clearfix">
                  <div class="float-left">类目排名-{{ cateText }}</div>
                  <div
                    class="float-right click-font"
                    @click.stop="$router.push({ name: 'caterank' })"
                  >
                    查看更多
                  </div>
                </div>
                <div class="table" v-if="cateRankList.length > 0">
                  <table style="table-layout: fixed">
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
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">占比</td>
                        <td style="text-align: right">上期对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in cateRankList" :key="index">
                        <td style="text-align: center">{{ item.sale_rank }}</td>
                        <td style="height: 61px">
                          <span class="main-font">{{ item.name }}</span>
                        </td>
                        <td style="text-align: right">{{ item.sale_total }}</td>
                        <td style="text-align: right">
                          {{ item.ratio.toFixed(2) }}%
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
                  </table>
                </div>
                <div v-else style="position: relative; padding: 258px 0">
                  <a-empty />
                </div>
              </div>
              <div
                class="rank-data float-right model-bg"
                style="min-height: 689px"
              >
                <div class="section-title clearfix">
                  <div class="float-left">出版单位排名-{{ cateText }}</div>
                  <!-- <div class="float-right click-font" @click="$refs.head.noOpen()">更多</div> -->
                </div>
                <div class="table" v-if="publishRankList.length > 0">
                  <table style="table-layout: fixed">
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
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">占比</td>
                        <td style="text-align: right">上期对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in publishRankList" :key="index">
                        <td style="text-align: center; height: 61px">
                          {{ item.sale_rank }}
                        </td>
                        <td>
                          <span class="main-font">{{ item.name }}</span>
                        </td>
                        <td style="text-align: right">{{ item.sale_total }}</td>
                        <td style="text-align: right">
                          {{ item.ratio.toFixed(2) }}%
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
                  </table>
                </div>
                <div v-else style="position: relative; padding: 258px 0">
                  <a-empty />
                </div>
              </div>
            </div>
            <!-- 地域排名 -->
            <div class="model-container">
              <div class="model-bg" v-if="regionRankList.length > 0">
                <div class="section-title">地域</div>
                <div class="clearfix" style="padding:15px 0;">
                  <div class="float-left" style="width:500px;position:relative;">
                    <div id="map" style="height: 284px; width: 100%"></div>
                  </div>
                  <div
                    class="float-left"
                    style="width: 500px; margin-left: 50px"
                  >
                   <p class="region-desc">地域（省）</p>
                    <div>
                      <div
                        style="
                          width: 500px;
                          display: inline-block;
                          vertical-align: top;
                        "
                      >
                        <div id="bar-chart"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="model-bg" v-else>
                <div class="section-title">地域</div>
                <div class="no-give" style="padding: 140px 0">
                  暂不提供类目下的地域分布数据
                </div>
              </div>
            </div>
          </div>
          <div class="main-container" v-else>
            <div class="model-container">
              <div
                class="model-bg"
                style="
                  min-height: 660px;
                  padding-bottom: 75px;
                  position: relative;
                "
              >
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
import { COMMON_CATEGORY } from "../../apis/common.js";
import { Chart } from "@antv/g2";
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
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
      isLoading: true,
      categoryList: [],
      chooseCategory: [0],
      cateText: "所有类目",
      catePopup: false,
      compareRate: 0,
      barChart: null,
      barFirst: true,
      barMapData: [],
    };
  },
  mounted() {
    this.getData();
    this.getFirstCategory();
  },
  updated() {},
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        period: this.$refs.time.cycle,
        cate_level: this.chooseCategory.length == 1 ? "one" : "two",
        goods_cate: this.chooseCategory[this.chooseCategory.length - 1],
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_INDEX(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.compareRate = res.data.all_info.compare_rate;
        this.saleTotal = res.data.all_info.sale_total;
        this.brokenLineData = [];
        this.goodsRankList = [];
        this.cateRankList = [];
        this.regionRankList = [];
        this.publishRankList = [];
        this.plateList = [];
        res.data.goods_rank.map((value, key) => {
          value.active = false;
          this.goodsRankList.push(value);
        });
        this.cateRankList = res.data.category_rank;
        this.publishRankList = res.data.supplier_rank;
        this.regionRankList = res.data.region_rank
          .splice(0, 10)
          .map((value, key) => {
            this.barMapData.push(value.name);
            value.region_name = value.name;
            return value;
          });
        this.regionRankList = this.regionRankList.reverse();
        console.log(this.regionRankList);
        let _arr1 = [],
          _arr2 = [],
          _length = 0;
        res.data.all_info.chart_data.current_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "当期";
          _obj.temperature = value.value;
          if (value.week_range) {
            _obj.range = value.week_range;
          }
          _arr1.unshift(_obj);
        });
        res.data.all_info.chart_data.last_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "上年同期";
          _obj.temperature = value.value;
          if (value.week_range) {
            _obj.range = value.week_range;
          }
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
        let _this = this;
        if (this.isFirst) {
          setTimeout(() => {
            _this.lineDataInit();
          }, 500);
        } else {
          this.chartChange.destroy();
          this.lineDataInit();
        }
        if (this.regionRankList.length > 0) {
          setTimeout(() => {
            if (_this.barFirst) {
              _this.initBar();
            } else {
              _this.barChart.destroy();
              _this.initBar();
            }
            _this.barFirst = false;
            _this.initMap();
          }, 500);
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
    // 获取初级分类列表
    async getFirstCategory() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // floor: 2,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMMON_CATEGORY(data);
      if (res.code == 0) {
        this.categoryList = [];
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
    changeTime() {
      this.isLoading = true;
      this.getData();
    },
    // 选择分类
    selectCategory(value, selectedOptions) {
      // console.log(value,selectedOptions)
      let _text = [];
      this.catePopup = false;
      this.isLoading = true;
      selectedOptions.map((val, key) => {
        _text.push(val.name);
      });
      this.cateText = _text.join(">");
      this.getData();
    },
    openAuthor(item, index) {
      this.$refs.time.showYear = false;
      this.catePopup = false;
      this.goodsRankList = this.goodsRankList.map((value, key) => {
        if (index == key) {
          value.active = true;
        } else {
          value.active = false;
        }
        return value;
      });
    },
    toAuthor(id) {
      this.$router.push({
        name: "authordetail",
        query: {
          author_id: id,
        },
      });
    },
    cateClick() {
      this.catePopup = true;
      this.$refs.time.showYear = false;
      this.goodsRankList = this.goodsRankList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    bodyClick() {
      this.$refs.time.showYear = false;
      this.catePopup = false;
      this.goodsRankList = this.goodsRankList.map((value, key) => {
        value.active = false;
        return value;
      });
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
        .color("city", (city) => {
          if (city == "上年同期") {
            return "#D1DDF6";
          } else if (city == "当期") {
            return "#5A8BEE";
          }
        })
        .shape("circle")
        .style({ lineWidth: 2 })
        .tooltip("month*temperature*city*range", function (
          month,
          temperature,
          city,
          range
        ) {
          // tooltip的第一个参数写上需要显示的字段'item1*item2*...'；第二个参数为一个函数，该函数的参数为需要显示的字段。
          let _title;
          if (_this.$refs.time.dateType == 2) {
            _title = month + "（" + range + "）";
          } else {
            _title = month;
          }
          // let _month = month + '哈';
          // console.log(666,range);
          return {
            title: _title,
            name: city,
            value: temperature, // 这里也可以通过调用其他自定义函数的方式，去对数据进行更深层次的变换。但要注意this的指向问题！
          };
        });

      this.chartChange
        .point()
        .position("month*temperature")
        .color("city", (city) => {
          if (city == "上年同期") {
            return "#D1DDF6";
          } else if (city == "当期") {
            return "#5A8BEE";
          }
        })
        .shape("circle");

      this.chartChange.render();
    },
    toDetail(item, index) {
      this.$router.push({
        name: "detail",
        query: {
          goods_id: item.goods_id,
        },
      });
    },
    initMap() {
      let _this = this;
      const scene = new Scene({
        id: "map",
        logoVisible: false,
        map: new Mapbox({
          center: [116.2825, 39.9],
          // center:[0,0],
          pitch: 0,
          style: "blank",
          zoom: 3,
          minZoom: 1,
          maxZoom: 10,
        }),
      });
      scene.setMapStatus({
        dragEnable: false, //是否允许地图拖拽
        keyboardEnable: false, // 是否允许形键盘事件
        doubleClickZoom: false, // 双击放大
        zoomEnable: false, // 滚动缩放
        rotateEnable: false, // 旋转
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
            enable: false,
          },
          fill: {
            color: {
              field: "NAME_CHN",
              values:
                ("name",
                function (value) {
                  let _arr = _this.barMapData;
                  if (value.indexOf(_arr[0]) > -1) {
                    return "#4777D8";
                  } else if (value.indexOf(_arr[1]) > -1) {
                    return "#6E94E1";
                  } else if (value.indexOf(_arr[2]) > -1) {
                    return "#82A3E5";
                  } else if (value.indexOf(_arr[3]) > -1) {
                    return "#96B2E8";
                  } else if (value.indexOf(_arr[4]) > -1) {
                    return "#A0B9EA";
                  } else if (value.indexOf(_arr[5]) > -1) {
                    return "#BDCEF1";
                  } else {
                    return "#D1DDF5";
                  }
                }),
            },
            activeColor: "#4777D8",
          },
          popup: {
            enable: true,
            Html: (props) => {
              return `<span>${props.NAME_CHN}</span>`;
            },
          },
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
          interactive: false,
        }),
      });
      scene2.on("loaded", () => {
        new CountryLayer(scene2, {
          data: [],
          label: {
            enable: false,
          },
          popup: {
            enable: true,
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
                "#a63603",
              ],
            },
          },
        });
      });
    },
    initBar(_max) {
      let _this = this,
        _height = this.regionRankList.length * 25.4;
      this.barChart = new Chart({
        container: "bar-chart",
        autoFit: true,
        height: _height,
      });
      this.barChart.data(this.regionRankList);
      this.barChart.scale({
        compare_rate: {
          // max: this.barMax + 100,
          max: 150,
          min: 0,
          alias: " ",
        },
      });
      this.barChart.axis("region_name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null,
        label: {
          textStyle: {
            textAlign: "left",
          },
        },
      });

      this.barChart.axis("compare_rate", {
        label: null,
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              fillOpacity: 0,
              strokeOpacity: 0,
            },
          },
        },
        title: null,
      });
      this.barChart.legend(false);
      this.barChart.coordinate().transpose();
      this.barChart.tooltip(false);
      this.barChart
        .interval()
        .position("region_name*compare_rate")
        .size(8)
        .label("compare_rate", {
          style: {
            fill: "#7789af",
            autoHide: false | true,
          },
          // offset: 10,
          content: (originData) => {
            return originData.compare_rate + "%";
          },
          remove: false,
        });
      // chart.interaction("element-active");
      this.barChart.render();
    },
    publisherChange() {
      this.isLoading = true;
      this.chooseCategory = [0];
      this.cateText = "所有类目";
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText =
        this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.dateType = 2;
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      if (!this.pagePower) {
        this.isFirst = true;
      }
      this.getData();
    },
  },
};
</script>
