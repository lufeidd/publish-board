<template>
  <div id="detailPage" @click="show1 = false,showYear = false">
    <HeadNav type="publish" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
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
                    <a-tab-pane key="4" tab="详细介绍"></a-tab-pane>
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
                      <div class="data-font" v-else-if="sale_type == 2">畅销品种</div>
                      <div class="data-font" v-else-if="sale_type == 3">常销品种</div>
                      <div class="data-font" v-else-if="sale_type == 4">一般品种</div>
                      <div class="data-font" v-else-if="sale_type == 5">滞销品种</div>
                      <div class="data-font" v-else>--</div>
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
                    <div
                      :class="close1?'set-compare active':'set-compare'"
                      @click.stop="show1 = true"
                    >
                      <div class="names">{{text1}}</div>
                      <a-icon type="close" v-if="close1" @click.stop="delete1" />
                      <div class="search" v-if="show1">
                        <div style="padding:0 10px;">
                          <a-input
                            placeholder="搜索品种名称、ISBN"
                            v-model="inputVal1"
                            @input="onSearch1"
                          />
                        </div>
                        <div class="list">
                          <div
                            class="content"
                            v-for="(item1,index1) in goodshList1"
                            :key="index1"
                            @click.stop="onSelect1(item1,index1)"
                          >
                            <img
                              :src="item1.cover_pic"
                              alt
                              width="20px"
                              height="20px"
                              v-if="item1.cover_pic"
                            />
                            <span v-else class="no-pic" style="min-width:20px;min-height:20px;"></span>
                            <span class="title" :title="item1.title">{{item1.title}}</span>
                          </div>
                        </div>
                        <div style="text-align:center;margin-top:10px;" v-if="searchLoading">
                          <a-spin tip></a-spin>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 折线图 -->
                <div style="padding:15px;">
                  <div id="broken-line2"></div>
                  <!-- <div id="slider"></div> -->
                </div>
              </div>
              <div class="model-bg" v-else style="height:450px;position:relative;">
                <ModelNoPower type="noPower"></ModelNoPower>
              </div>
            </div>
            <!-- 读者画像 -->
            <div v-if="tabKey == '3'">
              <div v-if="readerPower">
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
                        <div class="data-font">{{readerBase}}</div>
                      </span>
                      <span class="data-block">
                        <div>
                          <a-icon type="line-chart" />
                          <span class="secondary-font">人均购买</span>
                        </div>
                        <div class="data-font">{{readerAverage}}本</div>
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
                          <div v-if="ringData1.length > 0">
                            <div id="ring1" style="width:400px;margin-top:20px;"></div>
                          </div>
                          <div style="width:400px;" v-else>
                            <div class="no-data">基础数据不足，暂无分析</div>
                          </div>
                          <div style="margin-top:20px;">消费能力</div>
                          <div v-if="ringData2.length > 0">
                            <div id="ring2" style="width:400px;margin-top:20px;"></div>
                          </div>
                          <div style="width:400px;" v-else>
                            <div class="no-data">基础数据不足，暂无分析</div>
                          </div>
                        </div>
                        <div class="float-left" style="margin-left:100px;">
                          <div>年龄分布</div>
                          <div v-if="columnData1.length > 0">
                            <div id="column1" style="width:400px;margin-left:40px;margin-top:20px;"></div>
                          </div>
                          <div style="width:400px;" v-else>
                            <div class="no-data">基础数据不足，暂无分析</div>
                          </div>
                          <div style="margin-top:20px;">兴趣分布</div>
                          <div v-if="columnData2.length > 0">
                            <div id="column2" style="width:400px;margin-left:40px;margin-top:20px;"></div>
                          </div>
                          <div style="width:400px;" v-else>
                            <div class="no-data">基础数据不足，暂无分析</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 地域 -->
                <div class="model-container">
                  <div class="model-bg">
                    <div class="section-title">地域</div>
                    <div class="clearfix" style="padding-bottom:15px;" v-if="barData1.length > 4">
                      <div class="float-left" style="position:relative;margin-top:15px;">
                        <div id="map" style="height:284px;width:520px;"></div>
                      </div>
                      <div class="float-left" style="width:500px;margin-left:50px;">
                        <p style="margin-top:15px;">地域（省）</p>
                        <div id="bar-chart1"></div>
                      </div>
                    </div>
                    <div class="no-data" v-else>基础数据不足，暂无分析</div>
                  </div>
                </div>
                <!-- 偏好 -->
                <div class="model-container">
                  <div class="model-bg">
                    <div class="section-title">偏好</div>
                    <div class="clearfix" style="padding:10px 15px 15px 15px;">
                      <div class="float-left" style="width:500px;margin-right:50px;">
                        <p>类目偏好</p>
                        <div v-if="barData2.length > 4">
                          <div id="bar-chart2"></div>
                        </div>
                        <div class="no-data" v-else>基础数据不足，暂无分析</div>
                      </div>
                      <div class="float-left" style="width:500px;">
                        <p>作家偏好</p>
                        <div v-if="barData3.length > 4">
                          <div id="bar-chart3"></div>
                        </div>
                        <div class="no-data" v-else>基础数据不足，暂无分析</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="model-container">
                  <div class="model-bg" style="height:450px;position:relative;">
                    <ModelNoPower type="noPower"></ModelNoPower>
                  </div>
                </div>
              </div>
            </div>
            <!-- 详细介绍 -->
            <div v-if="tabKey == '4'">
              <div class="model-container">
                <div class="model-bg">
                  <div class="section-title">出版信息</div>
                  <div class="detail-desc">
                    <div class="content">
                      <span class="title">出版社</span>
                      <span class="desc">{{goodsInfo.publisher_short}}</span>
                    </div>
                    <div class="content">
                      <span class="title">ISBN</span>
                      <span class="desc">{{goodsInfo.isbn}}</span>
                    </div>
                    <div class="content">
                      <span class="title">作者</span>
                      <span class="desc">{{goodsInfo.author}}</span>
                    </div>
                    <div class="content">
                      <span class="title">出版日期</span>
                      <span class="desc">{{goodsInfo.publish_date}}</span>
                    </div>
                    <div class="content">
                      <span class="title">包装</span>
                      <span class="desc">--</span>
                    </div>
                    <div class="content">
                      <span class="title">页数</span>
                      <span class="desc">--</span>
                    </div>
                    <div class="content">
                      <span class="title">开本</span>
                      <span class="desc">{{goodsInfo.format}}</span>
                    </div>
                    <div class="content">
                      <span class="title">字数</span>
                      <span class="desc">--</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/publish/detail.scss"></style>

<script>
import DataSet from "@antv/data-set";
// import G2 from "@antv/g2";
import { Chart, registerShape, registerComponentController } from "@antv/g2";
import Slider from "@antv/g2/lib/chart/controller/slider";
registerComponentController("slider", Slider);
// import Slider from '@antv/g2-plugin-slider';
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
import {
  TOP_GOODS_INFO,
  TOP_GOODS_KERNELDATA,
  TOP_GOODS_HISTORYCHART,
  TOP_GOODS_HISTORY,
  TOP_SEARCH,
  TOP_GOODS_READER_BASE
} from "../../apis/publish.js";
export default {
  data() {
    return {
      goodsDetailPower: true,
      salePower: true,
      lifePower: true,
      readerPower: true,
      isOwnPublish: true,
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
      lineFirst1: true,
      lineFirst2: true,
      lineChart1: null,
      lineChart2: null,
      sliderChart: null,
      searchLoading: false,
      readerBase: 0,
      readerAverage: 0,
      ringData1: [],
      ringData2: [],
      columnData1: [],
      columnData2: [],
      barData1: [],
      barData2: [],
      barData3: [],
      barMapData: [],
      readerFirst: true,
      text1: "+设置对比",
      close1: false,
      inputVal1: "",
      show1: false,
      goodshList1: []
    };
  },
  updated() {
    this.$refs.load.isLoading = false;
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
    // console.log(666,G2);
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
        if (this.$refs.head.publishInfo.publisher_id != res.data.publisher_id) {
          this.isOwnPublish = false;
          this.tabKey = "4";
        } else {
          this.isOwnPublish = true;
        }
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
          }, 500);
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
          }, 500);
        }
        this.radarFirst = false;
        this.$setSlideHeight();
      } else {
        if (res.code == 1009) {
          this.goodsDetailPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
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
        // console.log(777, this.brokenLineData1);
        if (this.lineFirst1) {
          setTimeout(() => {
            this.initLineData1();
          }, 500);
        } else {
          setTimeout(() => {
            this.lineChart1.changeData(this.brokenLineData1);
          }, 500);
        }
        this.lineFirst1 = false;
      } else {
        if (res.code == 1009) {
          this.salePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
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
        if (res.code == 1009) {
          this.lifePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
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
            }, 500);
          } else {
            setTimeout(() => {
              this.lineChart2.changeData(this.brokenLineData2);
            }, 500);
          }
          this.lineFirst2 = false;
        }
        this.$setSlideHeight();
      } else {
        if (res.code == 1009) {
          this.lifePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
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
        this.lineArr();
        // console.log(666, this.brokenLineData2);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
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
        if (res.data.search == this.inputVal1) {
          this.goodshList1 = res.data.lists;
        }
        this.searchLoading = false;
      } else {
        this.searchLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 读者画像
    async getReaderData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        goods_id: this.goods_id
      };
      let res = await TOP_GOODS_READER_BASE(data);
      if (res.code == 0) {
        this.readerPower = true;
        this.ringData1 = [];
        this.ringData2 = [];
        this.columnData1 = [];
        this.columnData2 = [];
        this.barData1 = [];
        this.barData2 = [];
        this.barData3 = [];
        if (Object.keys(res.data).length > 0) {
          this.readerBase = res.data.reader_num;
          this.readerAverage = res.data.reader_avg_buy;
          this.ringData1 = res.data.persona_sex;
          this.ringData2 = res.data.persona_money;
          this.columnData1 = res.data.persona_age;
          this.columnData2 = res.data.persona_role;
          this.barData1 = res.data.persona_region.map((value, key) => {
            this.barMapData.push(value.name);
            value.name = value.name;
            return value;
          });
          this.barData2 = res.data.persona_cate.map((value, key) => {
            value.name = value.name;
            return value;
          });
          this.barData3 = res.data.persona_author.map((value, key) => {
            value.name = value.name;
            return value;
          });
          let _this = this;
          setTimeout(() => {
            if (_this.ringData1.length > 0) _this.initRing1();
            if (_this.columnData1.length > 0) _this.initColumn1();
            if (_this.ringData2.length > 0) _this.initRing2();
            if (_this.columnData2.length > 0) _this.initColumn2();
            if (_this.barData1.length > 4) _this.initMap();
            if (_this.barData1.length > 4)
              _this.inintBar1(_this.barData1[0].value);
            if (_this.barData2.length > 4)
              _this.inintBar2(_this.barData2[0].value);
            if (_this.barData3.length > 4)
              _this.inintBar3(_this.barData3[0].value);
            this.$setSlideHeight();
          }, 500);
        }
      } else {
        if (res.code == 1009) {
          this.readerPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
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
      if (this.isOwnPublish) {
        this.tabKey = key;
      } else {
        this.tabKey = "4";
        this.$refs.head.globalTip(1, "暂无权限", 0);
      }
      var _this = this;
      if (this.tabKey == "1") {
        setTimeout(function() {
          _this.initLineData1();
        }, 500);
      } else if (this.tabKey == "2") {
        setTimeout(function() {
          _this.initLineData2();
        }, 500);
      } else if (this.tabKey == "3") {
        this.getReaderData();
      }
      setTimeout(() => {
        this.$setSlideHeight();
      }, 500);
      // console.log(this.tabKey);
    },
    onSelect1(item1, index1) {
      console.log("onSelect");
      this.show1 = false;
      this.close1 = true;
      this.inputVal1 = "";
      this.goodshList1 = [];
      this.text1 = item1.title;
      this.selectOther(item1.goods_id);
    },
    onSearch1() {
      // console.log("onChange", value);
      this.dataSource = [];
      if (this.inputVal1.length > 0) {
        this.searchLoading = true;
        this.search(this.inputVal1);
      } else {
        this.goodshList1 = [];
      }
    },
    delete1() {
      this.show1 = false;
      this.close1 = false;
      this.text1 = "+设置对比";
      this.otherGoods = [];
      this.lineArr();
    },
    lineArr() {
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
      console.log(1, this.brokenLineData2);
      setTimeout(() => {
        this.lineChart2.option("slider", {
          start: 0,
          end: 1,
          data: this.brokenLineData2,
          trendCfg: {
            isArea: false
          }
        });
        this.lineChart2.changeData(this.brokenLineData2);
      }, 500);
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
      this.lineChart2.option("slider", {
        start: 0,
        end: 1,
        data: this.brokenLineData2,
        trendCfg: {
          isArea: false
        }
      });
      console.log(this.lineChart2);
      // this.sliderChart = new slider({
      //   container: 'slider',
      //   width:1000,
      //   height:26,
      //   data:this.brokenLineData2,
      //   start:0,
      //   end:1,

      // })
      // this.sliderChart.render();
      this.lineChart2.scale({
        month: {
          range: [0, 1]
        },
        temperature: {
          nice: true,
          min: 0
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
      this.lineChart2.legend({
        position: "top"
      });
      this.lineChart2
        .line()
        .position("month*temperature")
        .color("city")
        .shape("smooth")
        .style({ lineWidth: 1 });

      // this.lineChart2
      //   .line()
      //   // .point()
      //   .position("month*temperature")
      //   .color("city")
      //   .shape("circle");

      this.lineChart2.render();
      this.$setSlideHeight();
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
          min: 0
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
      this.$setSlideHeight();
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
        .color("name", name => {
          if (name == "女") {
            return "#2F6CE4";
          } else if (name == "男") {
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
        .color("name", name => {
          if (name == "高消费") {
            return "#2F6CE4";
          } else if (name == "中高消费") {
            return "#F3D145";
          } else if (name == "中低消费") {
            return "#E4966A";
          } else {
            return "#5ABAFC";
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
      chart.axis("name", {
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
        .position("name*value")
        .color("name", val => {
          if (val == this.columnData1[0].name) {
            return "#2665E3";
          } else if (val == this.columnData1[1].name) {
            return "#F2CF30";
          } else if (val == this.columnData1[2].name) {
            return "#FE8540";
          } else if (val == this.columnData1[3].name) {
            return "#51B6FC";
          } else if (val == this.columnData1[4].name) {
            return "#BB65E1";
          } else if (val == this.columnData1[5].name) {
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
      chart.axis("name", {
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
        .position("name*value")
        .color("name", val => {
          if (val == this.columnData2[0].name) {
            return "#2665E3";
          } else if (val == this.columnData2[1].name) {
            return "#F2CF30";
          } else if (val == this.columnData2[2].name) {
            return "#FE8540";
          } else if (val == this.columnData2[3].name) {
            return "#51B6FC";
          } else if (val == this.columnData2[4].name) {
            return "#BB65E1";
          } else if (val == this.columnData2[5].name) {
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
                  let _arr = _this.barMapData;
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
                  } else if (value.indexOf(_arr[5]) > -1 && _arr[5]) {
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
    inintBar1(_max) {
      console.log("max", _max);
      const chart = new Chart({
        container: "bar-chart1",
        autoFit: true,
        height: 254
      });
      chart.data(this.barData1.reverse());
      chart.scale({
        value: {
          max: 120,
          min: 0,
          alias: " "
        }
      });
      chart.axis("name", {
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

      chart.axis("value", {
        label: null,
        line: null,
        tickLine: null,
        grid: null,
        title: null
      });
      chart.legend(false);
      chart.coordinate().transpose();
      chart.tooltip(false);
      chart
        .interval()
        .position("name*value")
        .size(8)
        .label("value", {
          style: {
            fill: "#7789af",
            autoHide: false | true
          },
          offset: 10,
          content: originData => {
            return originData.value + "%";
          },
          remove: false
        });
      // chart.interaction("element-active");
      chart.render();
      this.$setSlideHeight();
    },
    inintBar2(_max) {
      console.log("max", _max);
      const chart = new Chart({
        container: "bar-chart2",
        autoFit: true,
        autoHide: false,
        height: 254
      });
      chart.data(this.barData2.reverse());
      chart.scale({
        value: {
          max: 150,
          min: 0,
          alias: " "
        }
      });
      chart.axis("name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null
        // label: {
        // textStyle: {
        // textAlign: "start"
        // }
        // }
      });

      chart.axis("value", {
        label: null,
        line: null,
        tickLine: null,
        grid: null,
        title: null
      });
      chart.legend(false);
      chart.coordinate().transpose();
      chart.tooltip(false);
      chart
        .interval()
        .position("name*value")
        .size(8)
        .label("name", {
          style: {
            textAlign: "left"
          }
        })
        .label("value", {
          style: {
            fill: "#7789af",
            autoHide: false | true
          },
          offset: 10,
          content: originData => {
            return originData.value + "%";
          },
          remove: false
        });
      // chart.interaction("element-active");
      chart.render();
      this.$setSlideHeight();
    },
    inintBar3(_max) {
      console.log("max", _max);
      const chart = new Chart({
        container: "bar-chart3",
        autoFit: true,
        autoHide: false,
        height: 254
      });
      chart.data(this.barData3.reverse());
      chart.scale({
        value: {
          max: 150,
          min: 0,
          alias: " "
        }
      });
      chart.axis("name", {
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

      chart.axis("value", {
        label: null,
        line: null,
        tickLine: null,
        grid: null,
        title: null
      });
      chart.legend(false);
      chart.coordinate().transpose();
      chart.tooltip(false);
      chart
        .interval()
        .position("name*value")
        .size(8)
        .label("name", {
          style: {
            textAlign: "left"
          }
        })
        .label("value", {
          style: {
            fill: "#7789af",
            autoHide: false | true
          },
          offset: 10,
          content: originData => {
            return originData.value + "%";
          },
          autoHide: false | true,
          remove: false
        });
      // chart.interaction("element-active");
      chart.render();
      this.$setSlideHeight();
    },
    publisherChange() {
      // location.reload();
      this.$refs.load.isLoading = true;
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
