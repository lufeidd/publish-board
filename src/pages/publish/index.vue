<template>
  <div id="ownIndexPage" @click="showYear = false">
    <HeadNav type="publish" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="index"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container">
            <!-- 本社综合概况 -->
            <div class="general-descrip model-container">
              <div class="section-title model-bg">本社综合概况</div>
              <div class="general-container model-bg" v-if="generalPower">
                <div class="content">
                  <div class="data-block">
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">在售品种数</span>
                    </div>
                    <div class="data-font" v-if="account.on_sale_num">{{account.on_sale_num}}</div>
                    <div class="data-font" v-else>0</div>
                  </div>
                  <div class="data-block" style="margin-top:10px;">
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">读者基数</span>
                    </div>
                    <div class="data-font" v-if="account.reader_num">{{account.reader_num}}</div>
                    <div class="data-font" v-else>0</div>
                  </div>
                </div>
                <!-- 牛眼图 -->
                <div class="content" style="width:320px;margin-right:80px;margin-left:50px;">
                  <div id="cow-chart"></div>
                </div>
                <!-- 雷达图 -->
                <div class="content" style="width:350px;">
                  <div id="radar"></div>
                </div>
              </div>
              <div class="model-bg" style="height:260px;position:relative;" v-else>
                <ModelNoPower type="noPower"></ModelNoPower>
              </div>
            </div>
            <!-- 选择品种，日期 -->
            <a-affix :offset-top="36" v-if="corePower">
              <div class="model-container">
                <div class="model-bg clearfix choose">
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
                          :allowClear="false"
                          placeholder="Select Week"
                          @change="weekChange"
                          :disabledDate="disabledEndDate"
                          format="YYYY-MM-DD"
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
                          format="YYYY-MM-DD"
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
            <!-- 核心数据监控 -->
            <div class="model-container core-data">
              <div class="section-title model-bg">核心数据监控</div>
              <div class="content model-bg" v-if="corePower">
                <div class="clearfix">
                  <!-- 销售点数 -->
                  <span
                    :class="typeText == 'sale_total'?'data-block float-left active':'data-block float-left'"
                    @click="coreTypeChange('sale_total')"
                  >
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">销售点数</span>
                    </div>
                    <div class="data-font" v-if="sale_total_info.now">{{sale_total_info.now}}</div>
                    <div class="data-font" v-else>0</div>
                    <div class="clearfix compare" style="width:160px;">
                      <div class="float-left" v-if="dateType == 2">上周对比</div>
                      <div class="float-left" v-if="dateType == 3">上月对比</div>
                      <div class="float-left" v-if="dateType == 4">上年对比</div>
                      <div
                        class="float-right up-number"
                        v-if="sale_total_info.pre_compare > 0"
                      >{{sale_total_info.pre_compare}}% ↑</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.pre_compare < 0"
                      >{{sale_total_info.pre_compare}}% ↓</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.pre_compare == 0"
                      >{{sale_total_info.pre_compare}}</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.pre_compare == '--'"
                      >{{sale_total_info.pre_compare}}</div>
                    </div>
                    <div class="clearfix compare" style="width:160px;">
                      <div class="float-left">上年同期</div>
                      <div
                        class="float-right up-number"
                        v-if="sale_total_info.last_compare > 0"
                      >{{sale_total_info.last_compare}}% ↑</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.last_compare < 0"
                      >{{sale_total_info.last_compare}}% ↓</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.last_compare == 0"
                      >{{sale_total_info.last_compare}}</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.last_compare == '--'"
                      >{{sale_total_info.last_compare}}</div>
                    </div>
                  </span>
                  <!-- 销售排名 -->
                  <span
                    :class="typeText == 'sale_rank'?'data-block float-left active':'data-block float-left'"
                    @click="coreTypeChange('sale_rank')"
                  >
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">销售排名</span>
                    </div>
                    <div class="data-font" v-if="sale_rank_info.now">{{sale_rank_info.now}}</div>
                    <div class="data-font" v-else>0</div>
                    <div class="clearfix compare" style="width:160px;">
                      <div class="float-left" v-if="dateType == 2">上周对比</div>
                      <div class="float-left" v-if="dateType == 3">上月对比</div>
                      <div class="float-left" v-if="dateType == 4">上年对比</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.pre_compare > 0"
                      >{{sale_rank_info.pre_compare}} ↓</div>
                      <div
                        class="float-right up-number"
                        v-if="sale_rank_info.pre_compare < 0"
                      >{{sale_rank_info.pre_compare*-1}} ↑</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.pre_compare == 0"
                      >{{sale_rank_info.pre_compare}}</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.pre_compare == '--'"
                      >{{sale_rank_info.pre_compare}}</div>
                    </div>
                    <div class="clearfix compare" style="width:160px;">
                      <div class="float-left">上年同期</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.last_compare > 0"
                      >{{sale_rank_info.last_compare}} ↓</div>
                      <div
                        class="float-right up-number"
                        v-if="sale_rank_info.last_compare < 0"
                      >{{sale_rank_info.last_compare}} ↑</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.last_compare == 0"
                      >{{sale_rank_info.last_compare}}</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.last_compare == '--'"
                      >{{sale_rank_info.last_compare}}</div>
                    </div>
                  </span>
                  <!-- 市场占有率 -->
                  <span
                    :class="typeText == 'sale_ratio'?'data-block float-left active':'data-block float-left'"
                    @click="coreTypeChange('sale_ratio')"
                  >
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">市场占有率</span>
                    </div>
                    <div class="data-font" v-if="sale_ratio_info.now">{{sale_ratio_info.now}}%</div>
                    <div class="data-font" v-else>0%</div>
                    <div class="clearfix compare" style="width:160px;">
                      <div class="float-left" v-if="dateType == 2">上周对比</div>
                      <div class="float-left" v-if="dateType == 3">上月对比</div>
                      <div class="float-left" v-if="dateType == 4">上年对比</div>
                      <div
                        class="float-right up-number"
                        v-if="sale_ratio_info.pre_compare > 0"
                      >{{sale_ratio_info.pre_compare}}% ↑</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.pre_compare < 0"
                      >{{sale_ratio_info.pre_compare}}% ↓</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.pre_compare == 0"
                      >{{sale_ratio_info.pre_compare}}</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.pre_compare == '--'"
                      >{{sale_ratio_info.pre_compare}}</div>
                    </div>
                    <div class="clearfix compare" style="width:160px;">
                      <div class="float-left">上年同期</div>
                      <div
                        class="float-right up-number"
                        v-if="sale_ratio_info.last_compare > 0"
                      >{{sale_ratio_info.last_compare}}% ↑</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.last_compare < 0"
                      >{{sale_ratio_info.last_compare}}% ↓</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.last_compare == 0"
                      >{{sale_ratio_info.last_compare}}</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.last_compare == '--'"
                      >{{sale_ratio_info.last_compare}}</div>
                    </div>
                  </span>
                  <!-- 动销品种数 -->
                  <span
                    :class="typeText == 'on_sale_goods'?'data-block float-left active':'data-block float-left'"
                    @click="coreTypeChange('on_sale_goods')"
                  >
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">动销品种数</span>
                    </div>
                    <div class="data-font" v-if="onsale_goods_info.now">{{onsale_goods_info.now}}</div>
                    <div class="data-font" v-else>0</div>
                    <div class="clearfix compare" style="width:160px;">
                      <div class="float-left">上月对比</div>
                      <div
                        class="float-right up-number"
                        v-if="onsale_goods_info.pre_compare > 0"
                      >{{onsale_goods_info.pre_compare}}% ↑</div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.pre_compare < 0"
                      >{{onsale_goods_info.pre_compare}}% ↓</div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.pre_compare == 0"
                      >{{onsale_goods_info.pre_compare}}</div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.pre_compare == '--'"
                      >{{onsale_goods_info.pre_compare}}</div>
                    </div>
                    <div class="clearfix compare" style="width:160px;">
                      <div class="float-left">上年同期</div>
                      <div
                        class="float-right up-number"
                        v-if="onsale_goods_info.last_compare > 0"
                      >{{onsale_goods_info.last_compare}}% ↑</div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.last_compare < 0"
                      >{{onsale_goods_info.last_compare}}% ↓</div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.last_compare == 0"
                      >{{onsale_goods_info.last_compare}}</div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.last_compare == '--'"
                      >{{onsale_goods_info.last_compare}}</div>
                    </div>
                  </span>
                </div>
                <!-- 折线图 -->
                <div style="margin-top:20px;">
                  <div id="broken-line" v-if="brokenLineData.length > 0"></div>
                  <div style="padding:20px 0;" v-else>
                    <a-empty />
                  </div>
                </div>
              </div>
              <div class="model-bg" style="height:405px;position:relative;" v-else>
                <ModelNoPower type="noPower"></ModelNoPower>
              </div>
            </div>
            <!-- 品种 -->
            <div class="model-container variety">
              <div class="section-title clearfix model-bg">
                <div class="float-left">品种</div>
                <router-link to="/publish/taopu100">
                  <div class="float-right click-font">进入淘普100</div>
                </router-link>
              </div>
              <div class="table model-bg" v-if="goodsPower">
                <table style="table-layout:fixed">
                  <colgroup>
                    <col width="50" />
                    <col width="300" />
                    <col width="150" />
                    <col width="200" />
                    <col width="100" />
                    <col width="125" />
                    <col width="125" />
                  </colgroup>
                  <thead>
                    <tr>
                      <td>排名</td>
                      <td>品种</td>
                      <td>作者</td>
                      <td>类目</td>
                      <td style="text-align:right;">销售点数</td>
                      <td style="text-align:right;">品种排名（类目）</td>
                      <td style="text-align:right;">品种排名（全部）</td>
                    </tr>
                  </thead>
                  <tbody v-if="goodsRankList.length > 0">
                    <tr v-for="(item,index) in goodsRankList" :key="index">
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
                      <td>
                        <span class="main-font">{{item.cate_node_2}} ＞ {{item.cate_node_3}}</span>
                      </td>
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
                  <tbody v-else>
                    <tr>
                      <td colspan="7">
                        <a-empty />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="model-bg" style="height:345px;position:relative;" v-else>
                <ModelNoPower type="noPower"></ModelNoPower>
              </div>
            </div>
            <!-- 地域 -->
            <div class="model-container area">
              <div class="section-title clearfix model-bg">
                <div class="float-left">地域</div>
                <router-link to="/publish/region">
                  <div class="float-right click-font">进入地域分布</div>
                </router-link>
              </div>
              <div v-if="regionPower">
                <div class="clearfix model-bg" v-show="barData.length > 0">
                  <div class="content float-left" style>
                    <div id="map" style="height:284px;width:100%;"></div>
                  </div>
                  <div class="content float-left" style="width:500px;margin-left:50px;">
                    <p class="desc">地域（省）</p>
                    <!-- <div>
                      <span>排名</span>
                      <span>省份</span>
                    </div>-->
                    <div>
                      <!-- <div class="rank-number">
                        <div class="number" v-for="(item,index) in barData" :key="index">{{index + 1}}</div>
                      </div>-->
                      <div style="width:500px;display:inline-block;vertical-align:top;">
                        <div id="bar-chart"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="model-bg" v-show="barData.length == 0">
                  <div style="padding:20px 0;">
                    <a-empty />
                  </div>
                </div>
              </div>
              <div
                class="model-bg"
                style="height:340px;position:relative;margin-bottom:20px;"
                v-else
              >
                <ModelNoPower type="noPower"></ModelNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load"></Loading>
  </div>
</template>

<style lang="scss" scoped src="@/style/scss/pages/publish/index.scss"></style>

<script>
import { Chart, Util, registerShape } from "@antv/g2";
import DataSet from "@antv/data-set";
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
import {
  MYVIEW_PUBLISHERINFO,
  MYVIEW_GOODSRANK,
  MYVIEW_REGIONRANK,
  MYVIEW_KERNELCHART,
  MYVIEW_KERNELDATA
} from "../../apis/publish.js";
import { COMMON_CATEGORY } from "../../apis/common.js";
export default {
  data() {
    return {
      generalPower: true,
      corePower: true,
      goodsPower: true,
      regionPower: true,
      cowData: [
        { type: "滞销", sold: 0 },
        { type: "一般", sold: 0 },
        { type: "常销", sold: 0 },
        { type: "畅销", sold: 0 },
        { type: "新品", sold: 0 }
      ],
      radarData: [
        { item: "综合评分", 本社: 0 },
        { item: "销售评分", 本社: 0 },
        { item: "读者评分", 本社: 0 },
        { item: "热点评分", 本社: 0 },
        { item: "生命周期评分", 本社: 0 }
      ],
      brokenLineData: [
        // { month: "01月", city: "当期", temperature: 3000 },
        // { month: "01月", city: "上年同期", temperature: 3500 },
        // { month: "Feb", city: "当期", temperature: 4500 },
        // { month: "Feb", city: "上年同期", temperature: 6000 },
        // { month: "Mar", city: "当期", temperature: 6400 },
        // { month: "Mar", city: "上年同期", temperature: 5000 },
        // { month: "Apr", city: "当期", temperature: 7500 },
        // { month: "Apr", city: "上年同期", temperature: 5300 },
        // { month: "May", city: "当期", temperature: 6000 },
        // { month: "May", city: "上年同期", temperature: 5500 },
        // { month: "Jun", city: "当期", temperature: 7600 },
        // { month: "Jun", city: "上年同期", temperature: 6300 },
        // { month: "Jul", city: "当期", temperature: 5000 },
        // { month: "Jul", city: "上年同期", temperature: 5200 },
        // { month: "Aug", city: "当期", temperature: 4600 },
        // { month: "Aug", city: "上年同期", temperature: 4200 },
        // { month: "Sep", city: "当期", temperature: 6500 },
        // { month: "Sep", city: "上年同期", temperature: 5600 },
        // { month: "Oct", city: "当期", temperature: 8600 },
        // { month: "Oct", city: "上年同期", temperature: 7000 },
        // { month: "Nov", city: "当期", temperature: 12000 },
        // { month: "Nov", city: "上年同期", temperature: 7600 },
        // { month: "Dec", city: "当期", temperature: 9000 },
        // { month: "Dec", city: "上年同期", temperature: 8600 }
      ],
      barData: [],
      barMapData: [],
      showYear: false,
      chooseWeek: null,
      chooseMonth: null,
      chooseYear: null,
      dateText: "",
      dateType: 2,
      cycle: "",
      oneDay: "",
      canSub: true,
      canAdd: false,
      account: {
        on_sale_num: 2888, // 在售品种数
        reader_num: 28633 // 读者基数
      },
      goodsRankList: [],
      categoryList: [],
      chooseCategory: {
        name: "所有类目",
        id: 0
      },
      typeText: "sale_total",
      isFirst: true,
      radarFirst: true,
      cowChart: null,
      radarChart: null,
      radarMax: 0,
      radardv: null,
      barMax: 0,
      changeChart: null,
      mapChart: null,
      barChart: null,
      barFirst: true,
      sale_total_info: {
        // 销售点数
        now: 0, // 当前
        pre_compare: 0, // 上月对比
        last_compare: 0 // 去年同期
      },
      sale_rank_info: {
        // 销售排名
        now: 0,
        pre_compare: 0,
        last_compare: 0
      },
      sale_ratio_info: {
        // 行业占比
        now: 0,
        pre_compare: 0,
        last_compare: 0
      },
      onsale_goods_info: {
        // 动销品种数
        now: 0,
        pre_compare: 0,
        last_compare: 0
      }
    };
  },
  updated() {
    this.$setSlideHeight();
  },
  mounted() {
    this.cycle = this.$weekDate().weekth;
    this.oneDay = this.$weekDate().start.replace(/-/g, "");
    this.chooseWeek = this.$weekDate().start;
    this.chooseMonth = this.$weekDate().start;
    this.chooseYear = this.$weekDate().start;
    this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
    this.getData();
    this.getGoods();
    this.getRegion();
    this.getCategory();
    this.getCore();
    this.getCoreData();
  },
  methods: {
    async getData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id
      };
      let res = await MYVIEW_PUBLISHERINFO(data);
      if (res.code == 0) {
        this.generalPower = true;
        this.account = res.data;
        this.cowData = this.cowData.map((value, key) => {
          if (value.type == "滞销") {
            value.sold = res.data.goods_num.num_short?res.data.goods_num.num_short:0;
          } else if (value.type == "一般") {
            value.sold = res.data.goods_num.num_normal?res.data.goods_num.num_normal:0;
          } else if (value.type == "常销") {
            value.sold = res.data.goods_num.num_long?res.data.goods_num.num_long:0;
          } else if (value.type == "畅销") {
            value.sold = res.data.goods_num.num_hot?res.data.goods_num.num_hot:0;
          } else if (value.type == "新品") {
            value.sold = res.data.goods_num.num_new?res.data.goods_num.num_new:0;
          }
          return value;
        });
        this.radarData = this.radarData.map((value, key) => {
          if (value.item == "综合评分") {
            value.本社 = res.data.score.score_all?res.data.score.score_all:0;
          } else if (value.item == "销售评分") {
            value.本社 = res.data.score.score_sale?res.data.score.score_sale:0;
          } else if (value.item == "读者评分") {
            value.本社 = res.data.score.score_reader?res.data.score.score_reader:0;
          } else if (value.item == "热点评分") {
            value.本社 = res.data.score.score_hot?res.data.score.score_hot:0;
          } else if (value.item == "生命周期评分") {
            value.本社 = res.data.score.score_life?res.data.score.score_life:0;
          }
          return value;
        });
        let _max = 0;
        for (let key in res.data.score) {
          if (_max < res.data.score[key]) {
            _max = res.data.score[key];
          }
        }
        this.radarMax = _max;
        if (this.radarFirst) {
          setTimeout(() => {
            this.initData();
            this.initRadarData();
          }, 500);
        } else {
          setTimeout(() => {
            this.cowChart.changeData(this.cowData);
            var { DataView } = DataSet;
            this.radardv = new DataView().source(this.radarData);
            this.radardv.transform({
              type: "fold",
              fields: ["本社"], // 展开字段集
              key: "user", // key字段
              value: "score" // value字段
            });
            this.radarChart.changeData(this.radardv.rows);
          }, 500);
        }
        this.radarFirst = false;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.generalPower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 品种排行
    async getGoods() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        period: this.cycle,
        date_type: this.dateType,
        goods_cate: this.chooseCategory.id
      };
      let res = await MYVIEW_GOODSRANK(data);
      if (res.code == 0) {
        this.goodsRankList = res.data;
        this.goodsPower = true;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.goodsPower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 地域排行
    async getRegion() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        period: this.cycle,
        date_type: this.dateType,
        goods_cate: this.chooseCategory.id
      };
      let res = await MYVIEW_REGIONRANK(data);
      if (res.code == 0) {
        this.regionPower = true;
        this.barMapData = [];
        this.barData = res.data.splice(0, 10).map((value, key) => {
          this.barMapData.push(value.region_name);
          value.region_name = key + 1 + "   " + value.region_name;
          return value;
        });
        this.barData = this.barData.reverse();
        if (this.barData.length > 0) {
          for (let i = 0; i < this.barData.length; i++) {
            if (this.barMax < this.barData[i].sale_total_rate) {
              this.barMax = this.barData[i].sale_total_rate;
            }
          }
          setTimeout(() => {
            if (this.barFirst) {
              this.initBar();
            } else {
              this.barChart.changeData(this.barData);
            }
            this.barFirst = false;
            this.initMap();
            console.log(666);
          }, 500);
        }
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.regionPower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
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
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 获取核心数据
    async getCore() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        date_type: this.dateType,
        start_date: this.oneDay,
        goods_cate: this.chooseCategory.id,
        period: this.cycle
      };
      let res = await MYVIEW_KERNELDATA(data);
      if (res.code == 0) {
        this.corePower = true;
        this.sale_total_info = res.data.sale_total_info;
        this.sale_rank_info = res.data.sale_rank_info;
        this.sale_ratio_info = res.data.sale_ratio_info;
        this.onsale_goods_info = res.data.onsale_goods_info;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.corePower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 获取核心数据图形
    async getCoreData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        date_type: this.dateType,
        type: this.typeText,
        start_date: this.oneDay,
        goods_cate: this.chooseCategory.id,
        period: this.cycle
      };
      let res = await MYVIEW_KERNELCHART(data);
      if (res.code == 0) {
        this.corePower = true;
        let _arr1 = [],
          _arr2 = [];
        this.brokenLineData = [];
        res.data.current_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "当期";
          _obj.temperature = value.value;
          _arr1.unshift(_obj);
        });
        res.data.last_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "上年同期";
          _obj.temperature = value.value;
          _arr2.unshift(_obj);
        });
        // console.log(_arr);
        _arr1.map((value, key) => {
          if (_arr1.length > key) this.brokenLineData.push(_arr1[key]);
          if (_arr2.length > key) this.brokenLineData.push(_arr2[key]);
        });
        console.log(this.brokenLineData);
        if (this.brokenLineData.length > 0) {
          if (this.isFirst) {
            setTimeout(() => {
              this.initLineData();
              console.log("选");
            }, 500);
          } else {
            setTimeout(() => {
              this.changeChart.changeData(this.brokenLineData);
              console.log("不选");
            }, 500);
          }
          this.$setSlideHeight();
          this.isFirst = false;
        }
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.corePower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    weekChange(date, dateString) {
      this.$refs.load.isLoading = true;
      // var _day = date._d.getDate();
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
      this.getGoods();
      this.getRegion();
      this.getCore();
      this.getCoreData();
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
      this.getGoods();
      this.getRegion();
      this.getCore();
      this.getCoreData();
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
      this.getGoods();
      this.getRegion();
      this.getCore();
      this.getCoreData();
      console.log(this.oneDay);
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
      this.getGoods();
      this.getRegion();
      this.getCore();
      this.getCoreData();
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
        this.getGoods();
        this.getRegion();
        this.getCore();
        this.getCoreData();
      }
    },
    initData() {
      // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
      const sliceNumber = 0.003;
      // 自定义 other 的图形，增加两条线
      registerShape("interval", "slice-shape", {
        draw(cfg, container) {
          const points = cfg.points;
          let path = [];
          path.push(["M", points[0].x, points[0].y]);
          path.push(["L", points[1].x, points[1].y - sliceNumber]);
          path.push(["L", points[2].x, points[2].y - sliceNumber]);
          path.push(["L", points[3].x, points[3].y]);
          path.push("Z");
          path = this.parsePath(path);
          return container.addShape("path", {
            attrs: {
              fill: cfg.color,
              path
            }
          });
        }
      });

      this.cowChart = new Chart({
        container: "cow-chart", // 指定图表容器 ID
        autoFit: true,
        height: 240,
        padding: [0, 0, 10, 0]
      });

      this.cowChart.data(this.cowData);
      this.cowChart.scale("sold", {
        formatter: val => {
          // val = val * 100 + "%";
          return val;
        }
      });
      this.cowChart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6
      });
      this.cowChart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
      });
      this.cowChart
        .interval()
        .adjust("stack")
        .position("sold")
        .color("type", type => {
          if (type == "滞销") {
            return "#D3DFF5";
          } else if (type == "一般") {
            return "#275FD1";
          } else if (type == "常销") {
            return "#FE9D31";
          } else if (type == "畅销") {
            return "#E36867";
          } else if (type == "新品") {
            return "#59B87A";
          }
        })
        .tooltip("type*sold", (type, sold) => {
          // sold = sold * 100 + "%";
          return {
            name: type,
            value: sold
          };
        })
        .shape("slice-shape");
      this.cowChart.legend({
        position: "right"
      });
      this.cowChart.interaction("element-active");

      this.cowChart.render();
    },
    initRadarData() {
      var { DataView } = DataSet;
      this.radardv = new DataView().source(this.radarData);
      this.radardv.transform({
        type: "fold",
        fields: ["本社"], // 展开字段集
        key: "user", // key字段
        value: "score" // value字段
      });
      this.radarChart = new Chart({
        container: "radar",
        forceFit: false,
        autoFit: true,
        height: 240
      });
      this.radarChart.legend(false);
      this.radarChart.data(this.radardv.rows);
      this.radarChart.scale("score", {
        min: 0,
        // max: this.radarMax + 2,
        max: 10,
        show: false
      });
      this.radarChart.coordinate("polar", {
        radius: 0.8
      });
      // chart.axis(false);
      this.radarChart.axis("score", {
        line: null,
        tickLine: null,
        label: null,
        grid: {
          line: {
            type: "circle",
            style: {
              lineDash: null
            }
          },
          alternateColor: "rgba(0, 0, 0, 0)"
        }
      });
      this.radarChart.tooltip({
        shared: true, // 合并数据项
        follow: true, // tooltip 跟随鼠标
        showCrosshairs: true, // 展示 crosshairs
        crosshairs: {
          // 配置 crosshairs 样式
          type: "xy", // crosshairs 类型
          line: {
            // crosshairs 线样式
            style: {
              stroke: "#565656",
              lineDash: [4]
            }
          }
        }
      });
      this.radarChart
        .point()
        .position("item*score")
        .color("user")
        .shape("circle")
        .size(4)
        .style({
          stroke: "#fff",
          lineWidth: 1,
          fillOpacity: 1
        });
      this.radarChart
        .line()
        .position("item*score")
        .color("user")
        .size(2)
        .style({
          fill: "#5B8DF0",
          fillOpacity: 0.3
        });
      this.radarChart.render();
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
    initMap() {
      this.$setSlideHeight();
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
                })
            },
            activeColor: "#4777D8"
          },
          popup: {
            enable: true,
            Html: props => {
              return `<span>${props.NAME_CHN}</span>`;
            }
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
    initBar(_max) {
      this.$setSlideHeight();
      let _this = this;
      this.barChart = new Chart({
        container: "bar-chart",
        autoFit: true,
        height: 254
      });
      this.barChart.data(this.barData);
      this.barChart.scale({
        sale_total_rate: {
          // max: this.barMax + 100,
          max: 110,
          min: 0,
          alias: " "
        }
      });
      this.barChart.axis("region_name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null,
        label: {
          textStyle: {
            textAlign: "left"
          }
        }
      });

      this.barChart.axis("sale_total_rate", {
        label: null,
        line: null,
        tickLine: null,
        grid: null,
        title: null
      });
      this.barChart.legend(false);
      this.barChart.coordinate().transpose();
      this.barChart.tooltip(false);
      this.barChart
        .interval()
        .position("region_name*sale_total_rate")
        .size(8)
        .label("sale_total_rate", {
          style: {
            fill: "#7789af",
            autoHide: false | true
          },
          offset: 10,
          content: originData => {
            return originData.sale_total_rate + "%";
          },
          remove: false
        });
      // chart.interaction("element-active");
      this.barChart.render();
      this.$setSlideHeight();
    },
    disabledEndDate(endValue) {
      // console.log(endValue);
      const startValue = new Date("2013-12-30");
      if (!endValue || !startValue) {
        return false;
      }
      return startValue.valueOf() <= endValue.valueOf();
    },
    // 选择分类
    selectCategory(item, index) {
      // console.log(index)
      this.$refs.load.isLoading = true;
      if (index == -1) {
        this.chooseCategory.name = "所有类目";
        this.chooseCategory.id = 0;
      } else {
        this.chooseCategory.name = item.name;
        this.chooseCategory.id = item.category_id;
      }
      this.getGoods();
      this.getRegion();
      this.getCore();
      this.getCoreData();
    },
    coreTypeChange(text) {
      this.typeText = text;
      this.getCoreData();
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
      this.$refs.load.isLoading = true;
      this.cycle = this.$weekDate().weekth;
      this.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.chooseWeek = this.$weekDate().start;
      this.chooseMonth = this.$weekDate().start;
      this.chooseYear = this.$weekDate().start;
      this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.dateType = 2;
      this.typeText = "sale_total";
      this.chooseCategory.name = "所有类目";
      this.chooseCategory.id = 0;
      this.canAdd = false;
      this.canSub = true;
      this.getData();
      this.getGoods();
      this.getRegion();
      this.getCategory();
      this.getCore();
      this.getCoreData();
    }
  }
};
</script>
