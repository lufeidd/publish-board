<template>
  <div id="detailPage" @click="showCompete = false,showYear = false">
    <HeadNav type="publish" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="detail"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container">
            <!-- 商品详情 -->
            <div class="model-container">
              <div class="model-bg goods-detail">
                <div v-if="goodsDetailPower">
                  <img
                    :src="goodsInfo.cover_pic"
                    alt
                    width="175px"
                    height="175px"
                    v-if="goodsInfo.cover_pic"
                  />
                  <span v-else class="no-pic" style="min-width:175px;min-height:175px;"></span>
                  <div class="goods-desc">
                    <div class="title">{{goodsInfo.title}}</div>
                    <div class="isbn">
                      <span>ISBN</span>
                      <span class="value">{{goodsInfo.isbn}}</span>
                    </div>
                    <div class="money">
                      <span>定价</span>
                      <span class="value">￥{{goodsInfo.fixed_price.toFixed(2)}}</span>
                    </div>
                    <div class="author">
                      <span>作者</span>
                      <span class="value">{{goodsInfo.author}}</span>
                    </div>
                    <div class="publish">
                      <span>出版社</span>
                      <span class="value">{{goodsInfo.publisher_short}}</span>
                    </div>
                    <div class="cate">
                      <span>类目</span>
                      <span
                        class="value"
                      >{{goodsInfo.cate_node_2}} ＞ {{goodsInfo.cate_node_3}} ＞ {{goodsInfo.cate_node_4}}</span>
                    </div>
                  </div>
                  <!-- 雷达图 -->
                  <div class="radarMap" style="width:400px;">
                    <div id="radar"></div>
                  </div>
                </div>
                <div style="height:240px;position:relative;" v-else>
                  <ModelNoPower type="noPower"></ModelNoPower>
                </div>
                <!-- 标签页 -->
                <div class="tabs">
                  <a-tabs :activeKey="tabKey" @change="callback">
                    <a-tab-pane key="1" tab="销售走势"></a-tab-pane>
                    <a-tab-pane key="2" tab="生命周期"></a-tab-pane>
                    <a-tab-pane key="3" tab="读者画像"></a-tab-pane>
                    <a-tab-pane key="4" tab="相似品种" disabled></a-tab-pane>
                  </a-tabs>
                </div>
              </div>
            </div>
            <!-- 销售走势选择时间 -->
            <div class="model-container" v-if="tabKey == '1'">
              <div class="model-bg choose clearfix" v-if="salePower">
                <div class></div>
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
            <!-- 生命周期选择时间 -->
            <!-- <div class="model-container" v-if="tabKey == '2'">
              <div class="model-bg choose clearfix">
                <div class></div>
                <div class="float-right">
                  <span class="time-picker">
                    <span
                      :class="dateLifeType == 3?'picker active':'picker'"
                      @click="lifeChange(3)"
                    >月</span>
                  </span>
                  <span class="time-picker">
                    <span
                      :class="dateLifeType == 4?'picker active':'picker'"
                      @click="lifeChange(4)"
                    >年</span>
                  </span>
                  <span class="time-picker">
                    <span :class="canLeft?'picker':'picker disabled'" @click="checkMonth">
                      <a-icon type="left" />
                    </span>
                  </span>
                  <span class="time-picker">
                    <span :class="canRight?'picker':'picker disabled'" @click="checkYear">
                      <a-icon type="right" />
                    </span>
                  </span>
                </div>
              </div>
            </div>-->
            <!-- 核心数据监控 -->
            <div class="model-container core-data" v-if="tabKey == '1'">
              <div v-if="salePower">
                <div class="section-title model-bg">核心数据监控</div>
                <div class="content model-bg">
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
                      <div class="data-font">{{sale_total_info.now}}</div>
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
                        <span class="secondary-font">行业排名</span>
                      </div>
                      <div class="data-font">{{sale_rank_info.now}}</div>
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
                        <span class="secondary-font">类目排名</span>
                      </div>
                      <div class="data-font">{{sale_cate_rank_info.now}}</div>
                      <div class="clearfix compare" style="width:160px;">
                        <div class="float-left" v-if="dateType == 2">上周对比</div>
                        <div class="float-left" v-if="dateType == 3">上月对比</div>
                        <div class="float-left" v-if="dateType == 4">上年对比</div>
                        <div
                          class="float-right up-number"
                          v-if="sale_cate_rank_info.pre_compare > 0"
                        >{{sale_cate_rank_info.pre_compare}} ↓</div>
                        <div
                          class="float-right down-number"
                          v-if="sale_cate_rank_info.pre_compare < 0"
                        >{{sale_cate_rank_info.pre_compare*-1}} ↑</div>
                        <div
                          class="float-right down-number"
                          v-if="sale_cate_rank_info.pre_compare == 0"
                        >{{sale_cate_rank_info.pre_compare}}</div>
                        <div
                          class="float-right down-number"
                          v-if="sale_cate_rank_info.pre_compare == '--'"
                        >{{sale_cate_rank_info.pre_compare}}</div>
                      </div>
                      <div class="clearfix compare" style="width:160px;">
                        <div class="float-left">上年同期</div>
                        <div
                          class="float-right up-number"
                          v-if="sale_cate_rank_info.last_compare > 0"
                        >{{sale_cate_rank_info.last_compare}} ↑</div>
                        <div
                          class="float-right down-number"
                          v-if="sale_cate_rank_info.last_compare < 0"
                        >{{sale_cate_rank_info.last_compare}} ↓</div>
                        <div
                          class="float-right down-number"
                          v-if="sale_cate_rank_info.last_compare == 0"
                        >{{sale_cate_rank_info.last_compare}}</div>
                        <div
                          class="float-right down-number"
                          v-if="sale_cate_rank_info.last_compare == '--'"
                        >{{sale_cate_rank_info.last_compare}}</div>
                      </div>
                    </span>
                  </div>
                  <!-- 折线图 -->
                  <div style="margin-top:20px;">
                    <div id="broken-line1"></div>
                  </div>
                </div>
              </div>
              <div class="model-bg" style="height:450px;position:relative;" v-else>
                <ModelNoPower type="noPower"></ModelNoPower>
              </div>
            </div>
            <!-- 生命周期走势 -->
            <div class="model-container life-cycle" v-if="tabKey == '2'">
              <div class="model-bg" v-if="lifePower">
                <div class="section-title model-bg">生命周期走势</div>
                <div class="data-choose clearfix model-bg">
                  <div class="float-left">
                    <span class="data-block">
                      <div>
                        <a-icon type="line-chart" />
                        <span class="secondary-font">品种类型</span>
                      </div>
                      <div class="data-font" v-if="sale_type == 1">新品品种</div>
                      <div class="data-font" v-if="sale_type == 2">畅销品种</div>
                      <div class="data-font" v-if="sale_type == 3">常销品种</div>
                      <div class="data-font" v-if="sale_type == 4">一般品种</div>
                      <div class="data-font" v-if="sale_type == 5">滞销品种</div>
                    </span>
                    <span class="data-block">
                      <div>
                        <a-icon type="line-chart" />
                        <span class="secondary-font">上市时间</span>
                      </div>
                      <div class="data-font">{{publish_duration}}个月</div>
                    </span>
                  </div>
                  <div class="float-right">
                    <span class="set-compare" @click.stop="showCompete = true">
                      <span class="word">+设置对比</span>
                      <div class="content" v-if="showCompete">
                        <a-auto-complete
                          option-label-prop="value"
                          style="width: 240px"
                          placeholder="搜索品种名称、ISBN"
                          @change="onChange"
                          @select="onSelect"
                          v-model="inputVal"
                        >
                          <template slot="dataSource">
                            <a-select-option
                              v-for="opt in dataSource"
                              :key="opt.title"
                              :value="opt.title"
                            >
                              <div class="result">
                                <img
                                  :src="opt.cover_pic"
                                  alt
                                  width="20px"
                                  height="20px"
                                  v-if="opt.cover_pic"
                                />
                                <span v-else class="no-pic" style="min-width:20px;min-height:20px;"></span>
                                <span>{{opt.title}}</span>
                              </div>
                              <!-- <span slot="label">
                              {{ group.title }}
                              <a
                                style="float: right"
                                href="https://www.google.com/search?q=antd"
                                target="_blank"
                                rel="noopener noreferrer"
                              >more</a>
                              </span>-->
                            </a-select-option>
                          </template>
                        </a-auto-complete>
                        <div style="text-align:center;margin-top:10px;" v-if="searchLoading">
                          <a-spin tip></a-spin>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
                <!-- 折线图 -->
                <div style="padding:15px;">
                  <div id="broken-line2"></div>
                </div>
              </div>
              <div class="model-bg" v-else style="height:450px;position:relative;">
                <ModelNoPower type="noPower"></ModelNoPower>
              </div>
            </div>
            <!-- 读者画像 -->
            <div v-if="tabKey == '3'">
              <!-- 读者概况 -->
              <div class="model-container life-cycle">
                <div class="model-bg">
                  <div class="section-title">读者概况</div>
                  <div class="data-choose" style="padding:20px 15px;">
                    <span class="data-block">
                      <div>
                        <a-icon type="line-chart" />
                        <span class="secondary-font">读者基数</span>
                      </div>
                      <div class="data-font">5000000</div>
                    </span>
                    <span class="data-block">
                      <div>
                        <a-icon type="line-chart" />
                        <span class="secondary-font">人均购买</span>
                      </div>
                      <div class="data-font">2本</div>
                    </span>
                  </div>
                </div>
              </div>
              <!-- 基础特征 -->
              <div class="model-container basic">
                <div class="model-bg">
                  <div class="section-title">基础特征</div>
                  <div class="feature">
                    <div class="clearfix">
                      <div class="float-left">
                        <div>性别分布</div>
                        <div id="ring1" style="width:400px;margin-top:20px;"></div>
                        <div style="margin-top:20px;">消费能力</div>
                        <div id="ring2" style="width:400px;margin-top:20px;"></div>
                      </div>
                      <div class="float-left" style="margin-left:100px;">
                        <div>年龄分布</div>
                        <div id="column1" style="width:400px;margin-left:40px;margin-top:20px;"></div>
                        <div style="margin-top:20px;">兴趣分布</div>
                        <div id="column2" style="width:400px;margin-left:40px;margin-top:20px;"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 地域 -->
              <div class="model-container">
                <div class="model-bg">
                  <div class="section-title">地域</div>
                  <div class="clearfix">
                    <div class="float-left" style="position:relative;margin-top:15px;">
                      <div id="map" style="height:284px;width:520px;"></div>
                    </div>
                    <div class="float-left" style="width:500px;margin-left:50px;">
                      <p style="margin-top:15px;">地域（省）</p>
                      <div id="bar-chart1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/publish/detail.scss"></style>

<script>
import DataSet from "@antv/data-set";
import { Chart, registerShape } from "@antv/g2";
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
import {
  TOP_GOODS_INFO,
  TOP_GOODS_KERNELDATA,
  TOP_GOODS_HISTORYCHART,
  TOP_GOODS_HISTORY,
  TOP_SEARCH
} from "../../apis/publish.js";
export default {
  data() {
    return {
      goodsDetailPower: true,
      salePower: true,
      lifePower: true,
      radarData: [
        { item: "综合评分", 本社: 70 },
        { item: "销售评分", 本社: 60 },
        { item: "读者评分", 本社: 50 },
        { item: "热点评分", 本社: 40 },
        { item: "生命周期评分", 本社: 60 }
      ],
      brokenLineData1: [
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
      saleTotalList: [],
      saleRankList: [],
      saleCateList: [],
      brokenLineData2: [],
      goodsData: [],
      otherGoods: [],
      tabKey: "1",
      value: "",
      dataSource: [],
      goods_id: 0,
      radarMax: 0,
      radarChart: null,
      radardv: null,
      radarFirst: true,
      goodsInfo: {
        fixed_price: 0
      },
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
      typeText: "sale_total",
      sale_total_info: {
        // 销售点数
        now: 0, // 现在
        pre_compare: 0, // 上一周期对比
        last_compare: 0 // 上年同期
      },
      sale_rank_info: {
        // 行业排名
        now: 0,
        pre_compare: 0,
        last_compare: 0
      },
      sale_cate_rank_info: {
        // 类目排名
        now: 0,
        pre_compare: 0,
        last_compare: 0
      },
      dateLifeType: 3,
      canLeft: false,
      canRight: true,
      sale_type: 0,
      publish_duration: 0,
      showCompete: false,
      lineFirst1: true,
      lineFirst2: true,
      lineChart1: null,
      lineChart2: null,
      searchLoading: false,
      inputVal: "",
      ringData1: [
        { type: "女性", value: 20 },
        { type: "男性", value: 18 },
        { type: "未知", value: 32 }
      ],
      ringData2: [
        { type: "高消费能力", value: 20 },
        { type: "一般消费能力", value: 18 },
        { type: "低消费能力", value: 32 }
      ],
      columnData1: [
        { type: "儿童", value: 160 },
        { type: "少年", value: 125 },
        { type: "青年", value: 240 },
        { type: "壮年", value: 350 },
        { type: "中年", value: 220 },
        { type: "老年", value: 50 }
      ],
      columnData2: [
        { type: "学霸", value: 160 },
        { type: "文艺青年", value: 125 },
        { type: "理性派", value: 240 },
        { type: "居家达人", value: 350 },
        { type: "旅行者", value: 220 },
        { type: "艺术家", value: 50 }
      ],
      barData1: []
    };
  },
  updated() {
    this.$setSlideHeight();
  },
  mounted() {
    this.goods_id = this.$route.query.goods_id;
    this.cycle = this.$weekDate().weekth;
    this.oneDay = this.$weekDate().start.replace(/-/g, "");
    this.chooseWeek = this.$weekDate().start;
    this.chooseMonth = this.$weekDate().start;
    this.chooseYear = this.$weekDate().start;
    this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
    console.log(666, this.$refs.head.publishInfo);
    this.getData();
    this.getCoreData();
    this.getDefault();
    this.getLifeData();
  },
  watch: {
    value(val) {
      // console.log("value", val);
    }
  },
  methods: {
    // 商品基础信息
    async getData() {
      let data = {
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        goods_id: this.goods_id
      };
      let res = await TOP_GOODS_INFO(data);
      if (res.code == 0) {
        this.goodsDetailPower = true;
        this.goodsInfo = res.data;
        this.radarData = this.radarData.map((value, key) => {
          if (value.item == "综合评分") {
            value.本社 = res.data.score_chart.score_all;
          } else if (value.item == "销售评分") {
            value.本社 = res.data.score_chart.score_sale;
          } else if (value.item == "读者评分") {
            value.本社 = res.data.score_chart.score_reader;
          } else if (value.item == "热点评分") {
            value.本社 = res.data.score_chart.score_hot;
          } else if (value.item == "生命周期评分") {
            value.本社 = res.data.score_chart.score_life;
          }
          return value;
        });
        let _max = 0;
        for (let key in res.data.score_chart) {
          if (_max < res.data.score_chart[key]) {
            _max = res.data.score_chart[key];
          }
        }
        this.radarMax = _max;
        // console.log(this.radarData);
        if (this.radarFirst) {
          setTimeout(() => {
            this.initRadarData();
          }, 1000);
        } else {
          setTimeout(() => {
            var { DataView } = DataSet;
            this.radardv = new DataView().source(this.radarData);
            this.radardv.transform({
              type: "fold",
              fields: ["本社"], // 展开字段集
              key: "user", // key字段
              value: "score" // value字段
            });
            this.radarChart.changeData(this.radardv.rows);
          }, 1000);
        }
        this.radarFirst = false;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if (res.code == 1009) {
          this.goodsDetailPower = false;
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 获取销售走势核心数据
    async getCoreData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        goods_id: this.goods_id,
        period: this.cycle,
        date_type: this.dateType,
        start_date: this.oneDay
      };
      let res = await TOP_GOODS_KERNELDATA(data);
      if (res.code == 0) {
        this.salePower = true;
        this.sale_total_info = res.data.kernel_data.sale_total_info;
        this.sale_rank_info = res.data.kernel_data.sale_rank_info;
        this.sale_cate_rank_info = res.data.kernel_data.sale_cate_rank_info;
        let _arr1 = [],
          _arr2 = [];
        this.saleTotalList = [];
        this.saleRankList = [];
        this.saleCateList = [];
        if (res.data.chart_data.sale_total.current_data) {
          res.data.chart_data.sale_total.current_data.map((value, key) => {
            let _obj = {};
            _obj.month = value.date.toString();
            _obj.city = "当期";
            _obj.temperature = value.value;
            _arr1.unshift(_obj);
          });
        }
        if (res.data.chart_data.sale_total.last_data) {
          res.data.chart_data.sale_total.last_data.map((value, key) => {
            let _obj = {};
            _obj.month = value.date.toString();
            _obj.city = "上年同期";
            _obj.temperature = value.value;
            _arr2.unshift(_obj);
          });
        }
        // console.log('第一',_arr1,_arr2)
        _arr1.map((value, key) => {
          if (_arr1.length > key) this.saleTotalList.push(_arr1[key]);
          if (_arr2.length > key) this.saleTotalList.push(_arr2[key]);
        });
        _arr1 = [];
        _arr2 = [];
        if (res.data.chart_data.sale_rank.current_data) {
          res.data.chart_data.sale_rank.current_data.map((value, key) => {
            let _obj = {};
            _obj.month = value.date.toString();
            _obj.city = "当期";
            _obj.temperature = value.value;
            _arr1.unshift(_obj);
          });
        }
        if (res.data.chart_data.sale_rank.last_data) {
          res.data.chart_data.sale_rank.last_data.map((value, key) => {
            let _obj = {};
            _obj.month = value.date.toString();
            _obj.city = "上年同期";
            _obj.temperature = value.value;
            _arr2.unshift(_obj);
          });
        }
        _arr1.map((value, key) => {
          if (_arr1.length > key) this.saleRankList.push(_arr1[key]);
          if (_arr1.length > key) this.saleRankList.push(_arr2[key]);
        });
        _arr1 = [];
        _arr2 = [];
        if (res.data.chart_data.cate_rank.current_data) {
          res.data.chart_data.cate_rank.current_data.map((value, key) => {
            let _obj = {};
            _obj.month = value.date.toString();
            _obj.city = "当期";
            _obj.temperature = value.value;
            _arr1.unshift(_obj);
          });
        }
        if (res.data.chart_data.cate_rank.last_data) {
          res.data.chart_data.cate_rank.last_data.map((value, key) => {
            let _obj = {};
            _obj.month = value.date.toString();
            _obj.city = "上年同期";
            _obj.temperature = value.value;
            _arr2.unshift(_obj);
          });
        }
        _arr1.map((value, key) => {
          if (_arr1.length > key) this.saleCateList.push(_arr1[key]);
          if (_arr1.length > key) this.saleCateList.push(_arr2[key]);
        });
        _arr1 = [];
        _arr2 = [];
        this.brokenLineData1 = [];
        this.brokenLineData1 = this.saleTotalList;
        this.typeText = "sale_total";
        console.log(777, this.brokenLineData1);
        if (this.lineFirst1) {
          setTimeout(() => {
            this.initLineData1();
          }, 1000);
        } else {
          setTimeout(() => {
            this.lineChart1.changeData(this.brokenLineData1);
          }, 1000);
        }
        this.lineFirst1 = false;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if (res.code == 1009) {
          this.salePower = false;
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 获取生命周期数据
    async getDefault() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        goods_id: this.goods_id
      };
      let res = await TOP_GOODS_HISTORY(data);
      if (res.code == 0) {
        this.lifePower = true;
        this.sale_type = res.data.sale_type;
        this.publish_duration = res.data.publish_duration;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if (res.code == 1009) {
          this.lifePower = false;
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    async getLifeData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        goods_id: this.goods_id,
        date_type: this.dateLifeType
      };
      let res = await TOP_GOODS_HISTORYCHART(data);
      if (res.code == 0) {
        this.lifePower = true;
        this.goodsData = [];
        res.data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "本品";
          _obj.temperature = value.value;
          this.goodsData.push(_obj);
        });
        this.brokenLineData2 = this.goodsData;
        if (this.tabKey == 2) {
          if (this.lineFirst2) {
            setTimeout(() => {
              this.initLineData2();
            }, 1000);
          } else {
            setTimeout(() => {
              this.lineChart2.changeData(this.brokenLineData2);
            }, 1000);
          }
          this.lineFirst2 = false;
        }
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if (res.code == 1009) {
          this.lifePower = false;
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    async selectOther(id) {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        goods_id: id,
        date_type: this.dateLifeType
      };
      let res = await TOP_GOODS_HISTORYCHART(data);
      if (res.code == 0) {
        this.otherGoods = [];
        res.data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "对比";
          _obj.temperature = value.value;
          this.otherGoods.push(_obj);
        });
        let _length;
        if (this.goodsData.length > this.otherGoods.length) {
          _length = this.goodsData.length;
        } else {
          _length = this.otherGoods.length;
        }
        this.brokenLineData2 = [];
        for (let i = 0; i < _length; i++) {
          if (i < this.goodsData.length) {
            this.brokenLineData2.push(this.goodsData[i]);
          }
          if (i < this.otherGoods.length) {
            this.brokenLineData2.push(this.otherGoods[i]);
          }
        }
        setTimeout(() => {
          this.lineChart2.changeData(this.brokenLineData2);
        }, 1000);
        // console.log(666, this.brokenLineData2);
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else{
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 搜索
    async search(val) {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        search: val
      };
      let res = await TOP_SEARCH(data);
      if (res.code == 0) {
        if (res.data.search == this.inputVal) {
          this.dataSource = res.data.lists;
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
    weekChange(date, dateString) {
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
      this.getCoreData();
      // console.log(666, startDate, endDate);
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
      this.cycle = dateString.replace(/-/g, "");
      this.oneDay = startDate.replace(/-/g, "");
      this.getCoreData();
      // console.log(startDate, endDate);
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
      this.getCoreData();
      // console.log(this.oneDay);
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
      this.getCoreData();
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
        this.getCoreData();
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
    coreTypeChange(text) {
      this.typeText = text;
      if (text == "sale_total") {
        this.brokenLineData1 = this.saleTotalList;
      } else if (text == "sale_rank") {
        this.brokenLineData1 = this.saleRankList;
      } else if (text == "sale_ratio") {
        this.brokenLineData1 = this.saleCateList;
      }
      this.lineChart1.changeData(this.brokenLineData1);
    },
    lifeChange(type) {
      this.dateLifeType = type;
      if (type == 3) {
        this.canLeft = false;
        this.canRight = true;
      } else {
        this.canLeft = true;
        this.canRight = false;
      }
    },
    checkMonth() {
      this.dateLifeType = 3;
      this.canLeft = false;
      this.canRight = true;
    },
    checkYear() {
      this.dateLifeType = 4;
      this.canLeft = true;
      this.canRight = false;
    },
    callback(key) {
      this.tabKey = key;
      var _this = this;
      if (key == "1") {
        setTimeout(function() {
          _this.initLineData1();
          // console.log(666,_this.brokenLineData1)
          // if (_this.lineFirst1) {
          //   _this.initLineData1();
          // } else {
          //   _this.lineChart1.changeData(_this.brokenLineData1);
          // }
        }, 500);
      } else if (key == "2") {
        setTimeout(function() {
          _this.initLineData2();
        }, 500);
      } else if (key == "3") {
        setTimeout(() => {
          _this.initRing1();
          _this.initColumn1();
          _this.initRing2();
          _this.initColumn2();
          _this.initMap();
        },500);
      }
      setTimeout(() => {
        this.$setSlideHeight();
      }, 500);
      // console.log(this.tabKey);
    },
    onSelect(value) {
      // console.log("onSelect", value);
      this.dataSource.map((val, key) => {
        if (value == val.title) {
          this.selectOther(val.goods_id);
        }
      });
      this.showCompete = false;
    },
    onChange(value) {
      // console.log("onChange", value);
      this.dataSource = [];
      if (value.length > 0) {
        this.searchLoading = true;
        this.search(value);
      }
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
    initLineData2() {
      this.lineChart2 = new Chart({
        container: "broken-line2",
        autoFit: true,
        height: 240
      });

      this.lineChart2.data(this.brokenLineData2);
      this.lineChart2.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true,
          min: 0,
        }
      });
      this.lineChart2.tooltip({
        showCrosshairs: true,
        shared: true
      });
      this.lineChart2.axis("temperature", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });
      this.lineChart2.legend(false);
      this.lineChart2
        .line()
        .position("month*temperature")
        .color("city")
        .shape("circle")
        .style({ lineWidth: 2 });

      this.lineChart2
        .point()
        .position("month*temperature")
        .color("city")
        .shape("circle");

      this.lineChart2.render();
    },
    initLineData1() {
      this.lineChart1 = new Chart({
        container: "broken-line1",
        autoFit: true,
        height: 240
      });

      this.lineChart1.data(this.brokenLineData1);
      this.lineChart1.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true,
          min: 0,
        }
      });
      this.lineChart1.tooltip({
        showCrosshairs: true,
        shared: true
      });
      this.lineChart1.axis("temperature", {
        label: {
          autoHide: false | true,
          formatter: val => {
            return val;
          }
        }
      });
      this.lineChart1.legend(false);
      this.lineChart1
        .line()
        .position("month*temperature")
        .color("city")
        .shape("circle")
        .style({ lineWidth: 2 });

      this.lineChart1
        .point()
        .position("month*temperature")
        .color("city")
        .shape("circle");

      this.lineChart1.render();
      setTimeout(() => {
        this.$setSlideHeight();
      }, 500);
    },
    // 环形图
    initRing1() {
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

      const chart = new Chart({
        container: "ring1",
        autoFit: true,
        height: 234
      });

      chart.data(this.ringData1);
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.4
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });
      chart.legend({
        position: "right"
      });
      chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", type => {
          if (type == "女性") {
            return "#2F6CE4";
          } else if (type == "男性") {
            return "#F3D145";
          } else {
            return "#FE8B4A";
          }
        })
        .shape("slice-shape");

      chart.render();
    },
    initRing2() {
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

      const chart = new Chart({
        container: "ring2",
        autoFit: true,
        height: 234
      });

      chart.data(this.ringData2);
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.4
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      });
      chart.legend({
        position: "right"
      });
      chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("type", type => {
          if (type == "高消费能力") {
            return "#2F6CE4";
          } else if (type == "一般消费能力") {
            return "#F3D145";
          } else {
            return "#FE8B4A";
          }
        })
        .shape("slice-shape");

      chart.render();
    },
    // 柱状图
    initColumn1() {
      let _this = this;
      const chart = new Chart({
        container: "column1",
        autoFit: true,
        height: 234
      });
      chart.data(this.columnData1);
      chart.scale("value", {
        nice: true
      });
      chart.axis("type", {
        tickLine: null,
        autoHide: false | true,
        autoRotate: false
      });
      chart.axis("value", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });
      chart.tooltip({
        showMarkers: false
      });
      chart.interaction("active-region");
      chart.legend(false);
      chart
        .interval()
        .position("type*value")
        .color("type", val => {
          if (val == "儿童") {
            return "#2665E3";
          } else if (val == "少年") {
            return "#F2CF30";
          } else if (val == "青年") {
            return "#FE8540";
          } else if (val == "壮年") {
            return "#51B6FC";
          } else if (val == "中年") {
            return "#BB65E1";
          } else if (val == "老年") {
            return "#1AC9A8";
          }
        });
      chart.render();
    },
    initColumn2() {
      let _this = this;
      const chart = new Chart({
        container: "column2",
        autoFit: true,
        height: 234
      });
      chart.data(this.columnData2);
      chart.scale("value", {
        nice: true
      });
      chart.axis("type", {
        tickLine: null,
        autoHide: false | true,
        autoRotate: false
      });
      chart.axis("value", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });
      chart.tooltip({
        showMarkers: false
      });
      chart.interaction("active-region");
      chart.legend(false);
      chart
        .interval()
        .position("type*value")
        .color("type", val => {
          if (val == "学霸") {
            return "#2665E3";
          } else if (val == "文艺青年") {
            return "#F2CF30";
          } else if (val == "理性派") {
            return "#FE8540";
          } else if (val == "居家达人") {
            return "#51B6FC";
          } else if (val == "旅行者") {
            return "#BB65E1";
          } else if (val == "艺术家") {
            return "#1AC9A8";
          }
        });
      chart.render();
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
                  // let _arr = _this.barMapData;
                  // if (value.indexOf(_arr[0]) > -1) {
                  //   return "#4777D8";
                  // } else if (value.indexOf(_arr[1]) > -1) {
                  //   return "#6E94E1";
                  // } else if (value.indexOf(_arr[2]) > -1) {
                  //   return "#82A3E5";
                  // } else if (value.indexOf(_arr[3]) > -1) {
                  //   return "#96B2E8";
                  // } else if (value.indexOf(_arr[4]) > -1) {
                  //   return "#A0B9EA";
                  // } else if (value.indexOf(_arr[5]) > -1) {
                  //   return "#BDCEF1";
                  // } else {
                  return "#D1DDF5";
                  // }
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
    publisherChange() {
      // location.reload();
      if (this.tabKey == "2") {
        this.lineFirst1 = true;
      }
      this.tabKey = "1";
      this.cycle = this.$weekDate().weekth;
      this.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.chooseWeek = this.$weekDate().start;
      this.chooseMonth = this.$weekDate().start;
      this.chooseYear = this.$weekDate().start;
      this.dateText = this.$weekDate().start + "~" + this.$weekDate().end;
      this.dateType = 2;
      this.canSub = true;
      this.canAdd = false;
      this.getData();
      this.getCoreData();
      this.getDefault();
      this.getLifeData();
    }
  }
};
</script>
