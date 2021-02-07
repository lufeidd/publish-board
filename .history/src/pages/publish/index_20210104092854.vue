<template>
  <div id="ownIndexPage" @click="bodyClick">
    <HeadNav
      type="publish"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="index"></SlideNav>
        </div>
        <div class="float-right">
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
                    <div class="data-font" v-if="account.on_sale_num">
                      {{ account.on_sale_num }}
                    </div>
                    <div class="data-font" v-else>0</div>
                  </div>
                  <div class="data-block" style="margin-top: 10px">
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">读者基数</span>
                    </div>
                    <div class="data-font" v-if="account.reader_num">
                      {{ account.reader_num }}
                    </div>
                    <div class="data-font" v-else>0</div>
                  </div>
                </div>
                <!-- 牛眼图 -->
                <div
                  class="content"
                  style="width: 320px; margin-right: 80px; margin-left: 50px"
                >
                  <div id="cow-chart"></div>
                </div>
                <!-- 雷达图 -->
                <div class="content" style="width: 350px">
                  <div id="radar"></div>
                </div>
              </div>
              <div
                class="model-bg"
                style="height: 260px; position: relative"
                v-else
              >
                <ModelNoPower
                  type="noPower"
                  :id="generalPowerID"
                  :organizeId="$refs.head.publishInfo.organization_id"
                ></ModelNoPower>
              </div>
            </div>
            <!-- 选择品种，日期 -->
            <a-affix :offset-top="36" v-if="corePower">
              <div class="model-container">
                <div class="model-bg clearfix choose">
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
                  <div class="float-right">
                    <TimeChoose
                      ref="time"
                      @changeTime="changeTime"
                      @closeDom="closeDom"
                    ></TimeChoose>
                  </div>
                </div>
              </div>
            </a-affix>
            <!-- 核心数据监控 -->
            <div class="model-container core-data">
              <div class="section-title model-bg">核心数据监控</div>
              <div class="content model-bg" v-if="corePower">
                <div class="clearfix">
                  <!-- 销售指数 -->
                  <span
                    :class="
                      typeText == 'sale_total'
                        ? 'data-block float-left active'
                        : 'data-block float-left'
                    "
                    @click="coreTypeChange('sale_total')"
                  >
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">销售指数</span>
                    </div>
                    <div class="data-font" v-if="sale_total_info.now">
                      {{ sale_total_info.now }}
                    </div>
                    <div class="data-font" v-else>0</div>
                    <div class="clearfix compare" style="width: 160px">
                      <div class="float-left" v-if="dateType == 2">
                        上周对比
                      </div>
                      <div class="float-left" v-if="dateType == 3">
                        上月对比
                      </div>
                      <div class="float-left" v-if="dateType == 4">
                        上年对比
                      </div>
                      <div
                        class="float-right up-number"
                        v-if="sale_total_info.pre_compare > 0"
                      >
                        {{ sale_total_info.pre_compare }}% ↑
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.pre_compare < 0"
                      >
                        {{ sale_total_info.pre_compare * -1 }}% ↓
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.pre_compare == 0"
                      >
                        {{ sale_total_info.pre_compare }}
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.pre_compare == '--'"
                      >
                        {{ sale_total_info.pre_compare }}
                      </div>
                    </div>
                    <div class="clearfix compare" style="width: 160px">
                      <div class="float-left">上年同期</div>
                      <div
                        class="float-right up-number"
                        v-if="sale_total_info.last_compare > 0"
                      >
                        {{ sale_total_info.last_compare }}% ↑
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.last_compare < 0"
                      >
                        {{ sale_total_info.last_compare * -1 }}% ↓
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.last_compare == 0"
                      >
                        {{ sale_total_info.last_compare }}
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_total_info.last_compare == '--'"
                      >
                        {{ sale_total_info.last_compare }}
                      </div>
                    </div>
                  </span>
                  <!-- 销售排名 -->
                  <span
                    :class="
                      typeText == 'sale_rank'
                        ? 'data-block float-left active'
                        : 'data-block float-left'
                    "
                    @click="coreTypeChange('sale_rank')"
                  >
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">销售排名</span>
                    </div>
                    <div class="data-font" v-if="sale_rank_info.now">
                      {{ sale_rank_info.now }}
                    </div>
                    <div class="data-font" v-else>0</div>
                    <div class="clearfix compare" style="width: 160px">
                      <div class="float-left" v-if="dateType == 2">
                        上周对比
                      </div>
                      <div class="float-left" v-if="dateType == 3">
                        上月对比
                      </div>
                      <div class="float-left" v-if="dateType == 4">
                        上年对比
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.pre_compare > 0"
                      >
                        {{ sale_rank_info.pre_compare }} ↓
                      </div>
                      <div
                        class="float-right up-number"
                        v-if="sale_rank_info.pre_compare < 0"
                      >
                        {{ sale_rank_info.pre_compare * -1 }} ↑
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.pre_compare == 0"
                      >
                        {{ sale_rank_info.pre_compare }}
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.pre_compare == '--'"
                      >
                        {{ sale_rank_info.pre_compare }}
                      </div>
                    </div>
                    <div class="clearfix compare" style="width: 160px">
                      <div class="float-left">上年同期</div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.last_compare > 0"
                      >
                        {{ sale_rank_info.last_compare }} ↓
                      </div>
                      <div
                        class="float-right up-number"
                        v-if="sale_rank_info.last_compare < 0"
                      >
                        {{ sale_rank_info.last_compare * -1 }} ↑
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.last_compare == 0"
                      >
                        {{ sale_rank_info.last_compare }}
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_rank_info.last_compare == '--'"
                      >
                        {{ sale_rank_info.last_compare }}
                      </div>
                    </div>
                  </span>
                  <!-- 市场占有率 -->
                  <span
                    :class="
                      typeText == 'sale_ratio'
                        ? 'data-block float-left active'
                        : 'data-block float-left'
                    "
                    @click="coreTypeChange('sale_ratio')"
                  >
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">市场占有率</span>
                    </div>
                    <div class="data-font" v-if="sale_ratio_info.now">
                      {{ sale_ratio_info.now }}%
                    </div>
                    <div class="data-font" v-else>0%</div>
                    <div class="clearfix compare" style="width: 160px">
                      <div class="float-left" v-if="dateType == 2">
                        上周对比
                      </div>
                      <div class="float-left" v-if="dateType == 3">
                        上月对比
                      </div>
                      <div class="float-left" v-if="dateType == 4">
                        上年对比
                      </div>
                      <div
                        class="float-right up-number"
                        v-if="sale_ratio_info.pre_compare > 0"
                      >
                        {{ sale_ratio_info.pre_compare }}% ↑
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.pre_compare < 0"
                      >
                        {{ sale_ratio_info.pre_compare * -1 }}% ↓
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.pre_compare == 0"
                      >
                        {{ sale_ratio_info.pre_compare }}
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.pre_compare == '--'"
                      >
                        {{ sale_ratio_info.pre_compare }}
                      </div>
                    </div>
                    <div class="clearfix compare" style="width: 160px">
                      <div class="float-left">上年同期</div>
                      <div
                        class="float-right up-number"
                        v-if="sale_ratio_info.last_compare > 0"
                      >
                        {{ sale_ratio_info.last_compare }}% ↑
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.last_compare < 0"
                      >
                        {{ sale_ratio_info.last_compare * -1 }}% ↓
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.last_compare == 0"
                      >
                        {{ sale_ratio_info.last_compare }}
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="sale_ratio_info.last_compare == '--'"
                      >
                        {{ sale_ratio_info.last_compare }}
                      </div>
                    </div>
                  </span>
                  <!-- 动销品种数 -->
                  <span
                    :class="
                      typeText == 'on_sale_goods'
                        ? 'data-block float-left active'
                        : 'data-block float-left'
                    "
                    @click="coreTypeChange('on_sale_goods')"
                  >
                    <div>
                      <a-icon type="line-chart" />
                      <span class="secondary-font">动销品种数</span>
                    </div>
                    <div class="data-font" v-if="onsale_goods_info.now">
                      {{ onsale_goods_info.now }}
                    </div>
                    <div class="data-font" v-else>0</div>
                    <div class="clearfix compare" style="width: 160px">
                      <div class="float-left" v-if="dateType == 2">
                        上周对比
                      </div>
                      <div class="float-left" v-if="dateType == 3">
                        上月对比
                      </div>
                      <div class="float-left" v-if="dateType == 4">
                        上年对比
                      </div>
                      <div
                        class="float-right up-number"
                        v-if="onsale_goods_info.pre_compare > 0"
                      >
                        {{ onsale_goods_info.pre_compare }}% ↑
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.pre_compare < 0"
                      >
                        {{ onsale_goods_info.pre_compare * -1 }}% ↓
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.pre_compare == 0"
                      >
                        {{ onsale_goods_info.pre_compare }}
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.pre_compare == '--'"
                      >
                        {{ onsale_goods_info.pre_compare }}
                      </div>
                    </div>
                    <div class="clearfix compare" style="width: 160px">
                      <div class="float-left">上年同期</div>
                      <div
                        class="float-right up-number"
                        v-if="onsale_goods_info.last_compare > 0"
                      >
                        {{ onsale_goods_info.last_compare }}% ↑
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.last_compare < 0"
                      >
                        {{ onsale_goods_info.last_compare * -1 }}% ↓
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.last_compare == 0"
                      >
                        {{ onsale_goods_info.last_compare }}
                      </div>
                      <div
                        class="float-right down-number"
                        v-if="onsale_goods_info.last_compare == '--'"
                      >
                        {{ onsale_goods_info.last_compare }}
                      </div>
                    </div>
                  </span>
                </div>
                <!-- 折线图 -->
                <div style="margin-top: 20px">
                  <div id="broken-line" v-if="brokenLineData.length > 0"></div>
                  <div style="padding: 20px 0" v-else>
                    <a-empty />
                  </div>
                </div>
              </div>
              <div
                class="model-bg"
                style="height: 405px; position: relative"
                v-else
              >
                <ModelNoPower
                  type="noPower"
                  :id="corePowerID"
                  :organizeId="$refs.head.publishInfo.organization_id"
                ></ModelNoPower>
              </div>
            </div>
            <!-- 品种 -->
            <div class="model-container variety">
              <div class="section-title clearfix model-bg">
                <div class="float-left">品种</div>
                <router-link to="/publish/taopu100">
                  <div class="float-right click-font">进入本社品种</div>
                </router-link>
              </div>
              <div class="table model-bg" v-if="goodsPower">
                <table style="table-layout: fixed">
                  <colgroup>
                    <col width="50" />
                    <col width="230" />
                    <col width="150" />
                    <col width="140" />
                    <col width="140" />
                    <col width="100" />
                    <col width="80" />
                    <col width="80" />
                    <col width="80" />
                  </colgroup>
                  <thead>
                    <tr>
                      <td>排名</td>
                      <td>品种</td>
                      <td>作者</td>
                      <td style="text-align: center">出版社</td>
                      <td>类目</td>
                      <td style="text-align: right">销售指数</td>
                      <td style="text-align: right">上期对比</td>
                      <td style="text-align: right">行业排名</td>
                      <td style="text-align: right">类目排名</td>
                    </tr>
                  </thead>
                  <tbody v-if="goodsRankList.length > 0">
                    <tr v-for="(item, index) in goodsRankList" :key="index">
                      <td>{{ item.sale_rank }}</td>
                      <td>
                        <div class="goods-desc">
                          <span class="goods-image" v-if="item.cover_pic">
                            <img
                            :src="item.cover_pic"
                            alt
                            style="width:40px;height:40px;"
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
                        <div class="author">
                          <div
                            class="author-name"
                            v-if="item.authors.length == 0"
                          >
                            {{ item.goods_author }}
                          </div>
                          <div
                            class="author-name click-font"
                            @click.stop="$toAuthor(item.authors[0].author_id)"
                            v-if="item.authors.length == 1"
                          >
                            {{ item.goods_author }}
                          </div>
                          <div
                            v-if="item.authors.length > 1"
                            class="author-name click-font"
                            @click.stop="openAuthor(item, index)"
                          >
                            {{ item.goods_author }}
                          </div>
                          <div class="author-list" v-if="item.active">
                            <div v-if="item.authors.length > 0">
                              <div
                                class="author-item click"
                                v-for="(aitem, aindex) in item.authors"
                                :key="aindex"
                                @click.stop="$toAuthor(aitem.author_id)"
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
                      <td style="text-align: center">
                        {{ item.publisher_name }}
                      </td>
                      <td>
                        <span class="main-font"
                          >{{ item.cate_node_2
                          }}
                          <span v-if="item.cate_node_3">> {{ item.cate_node_3 }}</span></span
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
                      <td style="text-align: right">
                        {{ item.in_all_rank }}
                      </td>
                      <td style="text-align: right">
                        {{ item.in_all_cate_rank }}
                      </td>
                    </tr>
                  </tbody>
                  <tbody v-else>
                    <tr>
                      <td colspan="9">
                        <a-empty />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div
                class="model-bg"
                style="height: 345px; position: relative"
                v-else
              >
                <ModelNoPower
                  type="noPower"
                  :id="goodsPowerID"
                  :organizeId="$refs.head.publishInfo.organization_id"
                ></ModelNoPower>
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
                <div class="clearfix model-bg" v-if="barData.length > 0">
                  <div class="content float-left">
                    <div id="map" style="height: 284px; width: 100%"></div>
                  </div>
                  <div
                    class="content float-left"
                    style="width: 500px; margin-left: 50px"
                  >
                    <p class="desc">地域（省）</p>
                    <!-- <div>
                      <span>排名</span>
                      <span>省份</span>
                    </div>-->
                    <div>
                      <!-- <div class="rank-number">
                        <div class="number" v-for="(item,index) in barData" :key="index">{{index + 1}}</div>
                      </div>-->
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
                <div class="model-bg" v-else>
                  <div class="no-data">基础数据不足，暂无分析</div>
                </div>
              </div>
              <div
                class="model-bg"
                style="height: 340px; position: relative"
                v-else
              >
                <ModelNoPower
                  type="noPower"
                  :id="regionPowerID"
                  :organizeId="$refs.head.publishInfo.organization_id"
                ></ModelNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
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
  MYVIEW_KERNELDATA,
} from "../../apis/publish.js";
import { COMMON_PUBLISHERCATEGORY } from "../../apis/common.js";
export default {
  data() {
    return {
      generalPower: true,
      corePower: true,
      goodsPower: true,
      regionPower: true,
      generalPowerID: 0,
      corePowerID: 0,
      goodsPowerID: 0,
      regionPowerID: 0,
      cowData: [
        { type: "滞销", sold: 0 },
        { type: "一般", sold: 0 },
        { type: "常销", sold: 0 },
        { type: "畅销", sold: 0 },
        { type: "新品", sold: 0 },
      ],
      radarData: [
        { item: "综合评分", 本社: 0 },
        { item: "销售评分", 本社: 0 },
        { item: "读者评分", 本社: 0 },
        { item: "热点评分", 本社: 0 },
        { item: "生命周期评分", 本社: 0 },
      ],
      brokenLineData: [],
      barData: [],
      barMapData: [],
      account: {
        on_sale_num: 2888, // 在售品种数
        reader_num: 28633, // 读者基数
      },
      goodsRankList: [],
      categoryList: [],
      chooseCategory: [0],
      catePopup: false,
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
        // 销售指数
        now: 0, // 当前
        pre_compare: 0, // 上月对比
        last_compare: 0, // 去年同期
      },
      sale_rank_info: {
        // 销售排名
        now: 0,
        pre_compare: 0,
        last_compare: 0,
      },
      sale_ratio_info: {
        // 行业占比
        now: 0,
        pre_compare: 0,
        last_compare: 0,
      },
      onsale_goods_info: {
        // 动销品种数
        now: 0,
        pre_compare: 0,
        last_compare: 0,
      },
      dateType: 0,
      isLoading: true,
    };
  },
  updated() {},
  mounted() {
    this.dateType = this.$refs.time.dateType;
    this.getData();
    this.getGoods();
    this.getRegion();
    this.getFirstCategory();
    this.getCore();
    this.getCoreData();
  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MYVIEW_PUBLISHERINFO(data);
      if (res.code == 0) {
        this.generalPower = true;
        this.account = res.data;
        let _count = this.account.on_sale_num;
        this.cowData = this.cowData.map((value, key) => {
          if (value.type == "滞销") {
            value.sold = res.data.goods_num.num_short
              ? Math.round((res.data.goods_num.num_short/_count)*100)
              : 0;
          } else if (value.type == "一般") {
            value.sold = res.data.goods_num.num_normal
              ? Math.round((res.data.goods_num.num_normal/_count)*100)
              : 0;
          } else if (value.type == "常销") {
            value.sold = res.data.goods_num.num_long
              ? Math.round((res.data.goods_num.num_long/_count)*100)
              : 0;
          } else if (value.type == "畅销") {
            value.sold = res.data.goods_num.num_hot
              ? Math.round((res.data.goods_num.num_hot/_count)*100)
              : 0;
          } else if (value.type == "新品") {
            value.sold = res.data.goods_num.num_new
              ? Math.round((res.data.goods_num.num_new/_count)*100)
              : 0;
          }
          return value;
        });
        this.radarData = this.radarData.map((value, key) => {
          if (value.item == "综合评分") {
            value.本社 = res.data.score.score_all
              ? res.data.score.score_all
              : 0;
          } else if (value.item == "销售评分") {
            value.本社 = res.data.score.score_sale
              ? res.data.score.score_sale
              : 0;
          } else if (value.item == "读者评分") {
            value.本社 = res.data.score.score_reader
              ? res.data.score.score_reader
              : 0;
          } else if (value.item == "热点评分") {
            value.本社 = res.data.score.score_hot
              ? res.data.score.score_hot
              : 0;
          } else if (value.item == "生命周期评分") {
            value.本社 = res.data.score.score_life
              ? res.data.score.score_life
              : 0;
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
        let _this = this;
        if (this.radarFirst) {
          setTimeout(() => {
            _this.initData();
            _this.initRadarData();
          }, 500);
        } else {
          setTimeout(() => {
            _this.cowChart.destroy();
            _this.radarChart.destroy();
            _this.initData();
            _this.initRadarData();
          }, 500);
        }
        this.radarFirst = false;
      } else {
        if (res.code == 1009) {
          this.generalPower = false;
          this.generalPowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 品种排行
    async getGoods() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        goods_cate: this.chooseCategory[this.chooseCategory.length - 1],
        timestamp: tStamp,
      };
      if(this.chooseCategory[0] !== 0){
        data.cate_level = this.chooseCategory.length == 1 ? "one" : "two";
      }
      data.sign = this.$getSign(data);
      let res = await MYVIEW_GOODSRANK(data);
      if (res.code == 0) {
        this.goodsRankList = [];
        res.data.map((value, key) => {
          value.active = false;
          this.goodsRankList.push(value);
        });
        this.goodsPower = true;
      } else {
        if (res.code == 1009) {
          this.goodsPower = false;
          this.goodsPowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 地域排行
    async getRegion() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        goods_cate: this.chooseCategory[this.chooseCategory.length - 1],
        timestamp: tStamp,
      };
      if(this.chooseCategory[0] !== 0){
        data.cate_level = this.chooseCategory.length == 1 ? "one" : "two";
      }
      data.sign = this.$getSign(data);
      let res = await MYVIEW_REGIONRANK(data);
      if (res.code == 0) {
        this.regionPower = true;
        this.barMapData = [];
        this.barData = [];
        this.barData = res.data.splice(0, 10).map((value, key) => {
          this.barMapData.push(value.region_name);
          value.region_name = value.region_name;
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
              this.barChart.destroy();
              this.initBar();
            }
            this.barFirst = false;
            this.initMap();
          }, 500);
        } else {
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.regionPower = false;
          this.regionPowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
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
    // 获取核心数据
    async getCore() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        goods_cate: this.chooseCategory[this.chooseCategory.length - 1],
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      if(this.chooseCategory[0] !== 0){
        data.cate_level = this.chooseCategory.length == 1 ? "one" : "two";
      }
      data.sign = this.$getSign(data);
      let res = await MYVIEW_KERNELDATA(data);
      if (res.code == 0) {
        this.corePower = true;
        this.sale_total_info = res.data.sale_total_info;
        this.sale_rank_info = res.data.sale_rank_info;
        this.sale_ratio_info = res.data.sale_ratio_info;
        this.onsale_goods_info = res.data.onsale_goods_info;
      } else {
        if (res.code == 1009) {
          this.corePower = false;
          this.corePowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 获取核心数据图形
    async getCoreData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        date_type: this.$refs.time.dateType,
        type: this.typeText,
        start_date: this.$refs.time.oneDay,
        goods_cate: this.chooseCategory[this.chooseCategory.length - 1],
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      if(this.chooseCategory[0] !== 0){
        data.cate_level = this.chooseCategory.length == 1 ? "one" : "two";
      }
      data.sign = this.$getSign(data);
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
          if (value.week_range) {
            _obj.range = value.week_range;
          }
          _arr1.unshift(_obj);
        });
        res.data.last_data.map((value, key) => {
          let _obj = {};
          _obj.month = value.date.toString();
          _obj.city = "上年同期";
          _obj.temperature = value.value;
          if (value.week_range) {
            _obj.range = value.week_range;
          }
          _arr2.unshift(_obj);
        });
        _arr1.map((value, key) => {
          if (_arr1.length > key) this.brokenLineData.push(_arr1[key]);
          if (_arr2.length > key) this.brokenLineData.push(_arr2[key]);
        });
        if (this.brokenLineData.length > 0) {
          let _this = this;
          if (_this.isFirst) {
            setTimeout(() => {
              _this.initLineData();
            }, 500);
          } else {
            setTimeout(() => {
              _this.changeChart.destroy();
              _this.initLineData();
            }, 500);
          }
          this.isFirst = false;
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.corePower = false;
          this.corePowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
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
    closeDom() {
      this.catePopup = false;
      this.goodsRankList = this.goodsRankList.map((value, key) => {
        value.active = false;
        return value;
      });
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
    changeTime() {
      this.isLoading = true;
      this.dateType = this.$refs.time.dateType;
      this.getGoods();
      this.getRegion();
      this.getCore();
      this.getCoreData();
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
              path,
            },
          });
        },
      });

      this.cowChart = new Chart({
        container: "cow-chart", // 指定图表容器 ID
        autoFit: true,
        height: 240,
        padding: [0, 0, 10, 0],
      });

      this.cowChart.data(this.cowData);
      this.cowChart.scale("sold", {
        formatter: (val) => {
          // val = val * 100 + "%";
          return val;
        },
      });
      this.cowChart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.6,
      });
      this.cowChart.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}%</li>',
      });
      this.cowChart
        .interval()
        .adjust("stack")
        .position("sold")
        .color("type", (type) => {
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
            value: sold,
          };
        })
        .shape("slice-shape");
      this.cowChart.legend({
        position: "right",
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
        value: "score", // value字段
      });
      this.radarChart = new Chart({
        container: "radar",
        forceFit: false,
        autoFit: true,
        height: 240,
      });
      this.radarChart.legend(false);
      this.radarChart.data(this.radardv.rows);
      this.radarChart.scale("score", {
        min: 0,
        // max: this.radarMax + 2,
        max: 10,
        show: false,
      });
      this.radarChart.coordinate("polar", {
        radius: 0.8,
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
              lineDash: null,
            },
          },
          alternateColor: "rgba(0, 0, 0, 0)",
        },
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
              lineDash: [4],
            },
          },
        },
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
          fillOpacity: 1,
        });
      this.radarChart
        .line()
        .position("item*score")
        .color("user")
        .size(2)
        .style({
          fill: "#5B8DF0",
          fillOpacity: 0.3,
        });
      this.radarChart.render();
    },
    initLineData() {
      let _this = this;
      this.changeChart = new Chart({
        container: "broken-line",
        autoFit: false,
        width: 1050,
        height: 240,
      });

      this.changeChart.data(this.brokenLineData);
      this.changeChart.scale({
        month: {
          range: [0, 1],
        },
        temperature: {
          nice: true,
          min: 0,
        },
      });
      this.changeChart.tooltip({
        showCrosshairs: true,
        shared: true,
      });
      this.changeChart.axis("month", {
        tickLine: null,
        // line: {
        //   style: {
        //     width: 1050,
        //   },
        // },
        // label:{
        //   style:{
        //     width:10
        //   }
        // }
      });
      this.changeChart.axis("temperature", {
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
          formatter: (val) => {
            if (_this.typeText == "sale_ratio") {
              return val + "%";
            } else {
              return val;
            }
          },
        },
      });
      this.changeChart.legend(false);
      this.changeChart
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
        .tooltip(
          "month*temperature*city*range",
          function (month, temperature, city, range) {
            let _title;
            if (_this.$refs.time.dateType == 2) {
              _title = month + "（" + range + "）";
            } else {
              _title = month;
            }
            return {
              title: _title,
              name: city,
              value: _this.typeText == "sale_ratio"?temperature+'%':temperature, 
            };
          }
        );

      this.changeChart
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

      this.changeChart.render();
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
        _height = this.barData.length * 26;
      this.barChart = new Chart({
        container: "bar-chart",
        autoFit: true,
        height: _height,
      });
      this.barChart.data(this.barData);
      this.barChart.scale({
        sale_total_rate: {
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

      this.barChart.axis("sale_total_rate", {
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
        .position("region_name*sale_total_rate")
        .size(8)
        .label("sale_total_rate", {
          style: {
            fill: "#7789af",
            autoHide: false | true,
          },
          // offset: 10,
          content: (originData) => {
            return originData.sale_total_rate + "%";
          },
          remove: false,
        });
      // chart.interaction("element-active");
      this.barChart.render();
    },
    // 选择分类
    selectCategory(value) {
      this.catePopup = false;
      this.isLoading = true;
      this.getGoods();
      this.getRegion();
      this.getCore();
      this.getCoreData();
    },
    coreTypeChange(text) {
      this.typeText = text;
      this.getCoreData();
    },
    publisherChange() {
      this.isLoading = true;
      this.typeText = "sale_total";
      this.chooseCategory = [0];
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText =
        this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.dateType = 2;
      this.dateType = 2;
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      if (!this.corePower) {
        this.isFirst = true;
      }
      if (!this.generalPower) {
        this.radarFirst = true;
      }
      if (!this.regionPower) {
        this.barFirst = true;
      }
      this.getData();
      this.getGoods();
      this.getRegion();
      this.getFirstCategory();
      this.getCore();
      this.getCoreData();
    },
  },
};
</script>
