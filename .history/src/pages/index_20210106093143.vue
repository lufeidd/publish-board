<template>
  <div id="indexPage">
    <HeadNav
      type="index"
      :show="1"
      ref="head"
      @publisherChange="publisherChange()"
      @initPage="initPage()"
      @noInitPage="noInitPage()"
    ></HeadNav>
    <div class="wd-1220">
      <!-- 数据简报 -->
      <div class="data-paper model-container">
        <div class="model-bg">
          <div class="section-title">
            数据简报
            <span class="time" v-if="show">昨日 {{ $beforeDate() }}</span>
            <span class="time" v-else
              >上周 {{ $weekDate().start }} ~ {{ $weekDate().end }}</span
            >
            <span
              class="click-font"
              style="margin-left: 15px"
              @click="change"
              v-if="dataNewPower"
              >{{ show ? "查看上周" : "查看昨日" }}</span
            >
          </div>
          <div class="content" v-if="dataNewPower">
            <div class="left">
              <div style="margin-bottom: 20px">
                <div class="data-block">
                  <div>
                    <a-icon type="line-chart" />
                    <span class="secondary-font">本社销售指数</span>
                  </div>
                  <div class="data-font" v-if="publishInfos.sale_total">
                    {{ publishInfos.sale_total }}
                  </div>
                  <div class="data-font" v-else>--</div>
                </div>
                <div class="data-block">
                  <div>
                    <a-icon type="line-chart" />
                    <span class="secondary-font">本社行业占比</span>
                  </div>
                  <div class="data-font" v-if="publishInfos.sale_ratio">
                    {{ publishInfos.sale_ratio }}%
                  </div>
                  <div class="data-font" v-else>--</div>
                </div>
                <div class="data-block">
                  <div>
                    <a-icon type="line-chart" />
                    <span class="secondary-font">本社行业排名</span>
                  </div>
                  <div class="data-font" v-if="publishInfos.sale_rank">
                    {{ publishInfos.sale_rank }}
                  </div>
                  <div class="data-font" v-else>--</div>
                </div>
              </div>
              <div id="container"></div>
            </div>
            <div class="right">
              <!-- 主营类目 -->
              <div class="main-category">
                <!-- 主营类目 -->
                <div
                  class="category-content"
                  v-if="publishSummaryInfo && publishSummaryInfo.main_cate"
                >
                  <div class="category-left">主营类目</div>
                  <div class="category-right">
                    本社主营类目为
                    <span class="data-tab data-tab-one">{{
                      publishSummaryInfo.main_cate.name
                        ? publishSummaryInfo.main_cate.name
                        : "--"
                    }}</span
                    >，本社在该类目下，排名第
                    <span class="data-tab data-tab-one">{{
                      publishSummaryInfo.main_cate.rank
                        ? publishSummaryInfo.main_cate.rank
                        : "--"
                    }}</span
                    >位
                  </div>
                </div>
                <!-- 本社最佳 -->
                <div
                  class="category-content"
                  v-if="publishSummaryInfo && publishSummaryInfo.best_rank"
                >
                  <div class="category-left">本社最佳</div>
                  <div class="category-right">
                    <div class="category-content">
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.best_rank.goods_name
                          ? publishSummaryInfo.best_rank.goods_name
                          : "--"
                      }}</span
                      >总计销售指数为
                      <!-- </div> -->
                      <!-- <div> -->
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.best_rank.sale_total
                          ? publishSummaryInfo.best_rank.sale_total
                          : "--"
                      }}</span
                      >，在总榜排名第
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.best_rank.all_rank
                          ? publishSummaryInfo.best_rank.all_rank
                          : "--"
                      }}</span
                      >位，在
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.best_rank.cate_name
                          ? publishSummaryInfo.best_rank.cate_name
                          : "--"
                      }}</span
                      >类目排名第
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.best_rank.cate_rank
                          ? publishSummaryInfo.best_rank.cate_rank
                          : "--"
                      }}</span
                      >位
                    </div>
                  </div>
                </div>
                <!-- 涨幅较高 -->
                <div
                  class="category-content"
                  v-if="publishSummaryInfo && publishSummaryInfo.best_incr"
                >
                  <div class="category-left">涨幅较高</div>
                  <div class="category-right">
                    <div class="category-content">
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.best_incr.goods_name
                          ? publishSummaryInfo.best_incr.goods_name
                          : "--"
                      }}</span
                      >总销售指数较上一周期增长
                      <span
                        class="data-tab data-tab-two"
                        v-if="publishSummaryInfo.best_incr.incr_rate > 0"
                        >+{{ publishSummaryInfo.best_incr.incr_rate }}%</span
                      >
                      <span v-else class="data-tab data-tab-three">{{
                        publishSummaryInfo.best_incr.incr_rate
                          ? publishSummaryInfo.best_incr.incr_rate
                          : "--"
                      }}</span>
                      <!-- </div> -->
                      <!-- <div> -->
                    </div>
                  </div>
                </div>
                <!-- 大盘销售 -->
                <div
                  class="category-content"
                  v-if="publishSummaryInfo && publishSummaryInfo.sale_all"
                >
                  <div class="category-left">大盘销售</div>
                  <div class="category-right">
                    <div class="category-content">
                      本周期内行业销售指数为
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.sale_all.points
                          ? publishSummaryInfo.sale_all.points
                          : "--"
                      }}</span
                      >较上个周期<span
                        v-if="publishSummaryInfo.sale_all.incr_rate > 0"
                        >增长</span
                      ><span v-if="publishSummaryInfo.sale_all.incr_rate < 0"
                        >下降</span
                      >
                      <!-- </div> -->
                      <!-- <div> -->
                      <span
                        class="data-tab data-tab-two"
                        v-if="publishSummaryInfo.sale_all.incr_rate > 0"
                        >{{ publishSummaryInfo.sale_all.incr_rate }}%</span
                      >
                      <span
                        class="data-tab data-tab-three"
                        v-else-if="publishSummaryInfo.sale_all.incr_rate < 0"
                        >{{ publishSummaryInfo.sale_all.incr_rate }}%</span
                      >
                      <span class="data-tab data-tab-three" v-else>--</span>
                    </div>
                  </div>
                </div>
                <!-- 大盘新品 -->
                <div
                  class="category-content"
                  v-if="publishSummaryInfo && publishSummaryInfo.goods_all"
                >
                  <div class="category-left">大盘新品</div>
                  <div class="category-right">
                    <div class="category-content">
                      本周期内行业动销新品
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.goods_all.new_total
                          ? publishSummaryInfo.goods_all.new_total
                          : "--"
                      }}</span
                      >个，总销售指数为
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.goods_all.sale_new_total
                          ? publishSummaryInfo.goods_all.sale_new_total
                          : "--"
                      }}</span
                      >，占行业销售
                      <span class="data-tab data-tab-one">{{
                        publishSummaryInfo.goods_all.rate
                          ? publishSummaryInfo.goods_all.rate
                          : "--"
                      }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="content" style="height: 357px; position: relative" v-else>
            <ModelNoPower
              type="noPower"
              :id="dataNewPowerID"
              :organizeId="$refs.head.publishInfo.organization_id"
            ></ModelNoPower>
          </div>
        </div>
      </div>
      <div class="model-container clearfix">
        <!-- 今日实时数据 -->
        <div class="float-left model-bg" style="height: 336px">
          <div class="real-data">
            <div class="section-title clearfix">
              <div class="float-left">今日实时数据</div>
            </div>
            <div v-if="measurePower">
              <div style="padding: 15px" class="clearfix">
                <div
                  class="real-data-block float-left"
                  :class="{ active: measureType == 0 }"
                  @click="changeMeasure(0)"
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
                  class="real-data-block float-left"
                  :class="{ active: measureType == 1 }"
                  @click="changeMeasure(1)"
                >
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
              </div>
              <div style="padding: 0 15px 15px 15px">
                <div
                  id="measure"
                  v-show="measureType == 0"
                  style="width: 570px"
                ></div>
                <div
                  id="measure1"
                  v-show="measureType == 1"
                  style="width: 570px"
                ></div>
              </div>
            </div>
            <div
              class="content"
              style="height: 294px; position: relative"
              v-else
            >
              <ModelNoPower
                type="noPower"
                :id="measurePowerID"
                :organizeId="$refs.head.publishInfo.organization_id"
              ></ModelNoPower>
            </div>
          </div>
        </div>
        <!-- 临期事件 -->
        <div class="impend-event float-right">
          <!-- 快捷入口 -->
          <div class="quick-enter model-bg">
            <div class="section-title">快捷入口</div>
            <div class="enter-content">
              <span
                class="enter-click"
                @click="$router.push({ name: 'industrymarket' })"
                >行业大盘</span
              >
              <span
                class="enter-click"
                @click="$router.push({ name: 'publishreader' })"
                >读者画像</span
              >
              <span
                class="enter-click"
                @click="$router.push({ name: 'saleforcast' })"
                >销量预测</span
              >
              <span class="enter-click" @click="$router.push({ name: 'newproduct' })"
                >新品追踪</span
              >
              <span
                class="enter-click"
                @click="$router.push({ name: 'publishauthors' })"
                >作者库</span
              >
            </div>
          </div>
          <div class="model-bg">
            <div class="section-title clearfix">
              <span class="float-left">临期事件</span>
              <span
                class="click-font float-right"
                @click="$router.push({ name: 'applicationevent' })"
                >前往事件年历</span
              >
            </div>
            <div class="animation" style="padding:5px 15px;overflow-y:scroll;">
              <div class="animation-container" v-if="recentList.length > 0">
                <div
                  class="list clearfix"
                  v-for="(aitem, aindex) in recentList"
                  :key="aindex"
                >
                  <div class="float-left">
                    <span class="name">{{ aitem.title }}</span>
                    <span
                      class="data-tab data-tab-seven"
                      v-for="(kitem, kindex) in aitem.keywords"
                      :key="kindex"
                      >{{ kitem.value }}</span
                    >
                    <!-- <span class="data-tab data-tab-seven">电商</span> -->
                  </div>
                  <div class="float-right">
                    <span class="name"
                      >{{
                        aitem.event_month >= 10
                          ? aitem.event_month
                          : "0" + aitem.event_month
                      }}-{{
                        aitem.event_day >= 10
                          ? aitem.event_day
                          : "0" + aitem.event_day
                      }}</span
                    >
                  </div>
                </div>
              </div>
              <div v-else style="height: 134px; position: relative">
                <div class="no-data">暂无数据</div>
              </div>
            </div>
            <!-- 暂未开放 -->
            <!-- <div class="no-open" style="position:relative;">
              <ModelNoPower type="noOpen"></ModelNoPower>
            </div>-->
          </div>
        </div>
      </div>
      <div class="model-container">
        <div class="model-bg last-week">
          上周排行数据 {{ $weekDate().start }} ~ {{ $weekDate().end }}
        </div>
      </div>
      <!-- 品种排行 -->
      <div class="model-container clearfix">
        <!-- 全品种销售排行 -->
        <div class="float-left sale-rank model-bg">
          <div class="section-title clearfix">
            <span class="float-left">本社品种销售排行</span>
            <span
              class="click-font float-right"
              @click="
                $router.push({
                  name: 'taopu100',
                  query: { sort: 'rank_supplier' },
                })
              "
              >前往完整排行</span
            >
          </div>
          <div class="table-data" v-if="dataRankPower">
            <div class="table small" v-if="allGoodsRank.length > 0">
              <table style="table-layout: fixed">
                <colgroup>
                  <col width="45" />
                  <col width="175" />
                  <col width="74" />
                  <col width="74" />
                </colgroup>
                <thead>
                  <tr>
                    <td>排行</td>
                    <td>品种</td>
                    <td style="text-align: right">销售指数</td>
                    <td style="text-align: right">较上周期</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in allGoodsRank" :key="index">
                    <td style="text-align: center">{{ item.sale_rank }}</td>
                    <td>
                      <div class="goods-desc">
                        <span class="goods-image" v-if="item.cover_pic">
                          <img
                            :src="item.cover_pic"
                            alt
                            style="width: 40px; height: 40px"
                          />
                          <div class="goods-logo prev" v-if="item.is_presale == 1">预</div>
                          <div class="goods-logo group" v-else-if="item.have_presale == 1">组</div>
                        </span>
                        <span
                          v-else
                          class="no-pic"
                          style="min-width: 40px; min-height: 40px"
                        ></span>
                        <span
                          class="goods-name click-font"
                          :title="item.goods_name"
                          @click="$toDetail(item.goods_id)"
                          >{{ item.goods_name }}</span
                        >
                      </div>
                    </td>
                    <td style="text-align: right">{{ item.sale_total }}</td>
                    <td style="text-align: right">
                      <span class="percent" v-if="item.compare_rate > 0"
                        >+{{ item.compare_rate }}%</span
                      >
                      <span class="green" v-else-if="item.compare_rate <= 0"
                        >{{ item.compare_rate }}%</span
                      >
                      <span v-else>--</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="wrong-status">
              <a-empty />
            </div>
          </div>
          <div class="table-data" v-else>
            <ModelNoPower
              type="noPower"
              :id="dataRankPowerID"
              :organizeId="$refs.head.publishInfo.organization_id"
            ></ModelNoPower>
          </div>
        </div>
        <!-- 全品种销售涨幅排行 -->
        <div class="float-left up-rank model-bg">
          <div class="section-title clearfix">
            <span class="float-left">本社品种涨幅排行</span>
            <span
              class="click-font float-right"
              @click="
                $router.push({
                  name: 'taopu100',
                  query: { sort: 'rank_incr_supplier' },
                })
              "
              >前往完整排行</span
            >
          </div>
          <div class="table-data" v-if="dataRankPower">
            <div class="table small" v-if="allUpRank.length > 0">
              <table style="table-layout: fixed">
                <colgroup>
                  <col width="45" />
                  <col width="175" />
                  <col width="74" />
                  <col width="74" />
                </colgroup>
                <thead>
                  <tr>
                    <td>排行</td>
                    <td>品种</td>
                    <td style="text-align: right">销售指数</td>
                    <td style="text-align: right">较上周期</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in allUpRank" :key="index">
                    <td style="text-align: center">{{ item.sale_rank }}</td>
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
                          @click="$toDetail(item.goods_id)"
                          >{{ item.goods_name }}</span
                        >
                      </div>
                    </td>
                    <td style="text-align: right">{{ item.sale_total }}</td>
                    <td style="text-align: right">
                      <span class="percent" v-if="item.compare_rate > 0"
                        >+{{ item.compare_rate }}%</span
                      >
                      <span class="green" v-else-if="item.compare_rate <= 0"
                        >{{ item.compare_rate }}%</span
                      >
                      <span v-else>--</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="wrong-status">
              <a-empty />
            </div>
          </div>
          <div class="table-data" v-else>
            <ModelNoPower
              type="noPower"
              :id="dataRankPowerID"
              :organizeId="$refs.head.publishInfo.organization_id"
            ></ModelNoPower>
          </div>
        </div>
        <!-- 新品销售排行 -->
        <div class="float-left new-rank model-bg">
          <div class="section-title clearfix">
            <span class="float-left">本社新品销售排行</span>
            <span
              class="click-font float-right"
              @click="
                $router.push({
                  name: 'taopu100',
                  query: { sort: 'rank_new_supplier' },
                })
              "
              >前往完整排行</span
            >
          </div>
          <div class="table-data" v-if="dataRankPower">
            <div class="table small" v-if="newGoodsRank.length > 0">
              <table style="table-layout: fixed">
                <colgroup>
                  <col width="45" />
                  <col width="175" />
                  <col width="74" />
                  <col width="74" />
                </colgroup>
                <thead>
                  <tr>
                    <td>排行</td>
                    <td>品种</td>
                    <td style="text-align: right">销售指数</td>
                    <td style="text-align: right">上市天数</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in newGoodsRank" :key="index">
                    <td style="text-align: center">{{ item.sale_rank }}</td>
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
                          class="goods-name click-font"
                          :title="item.goods_name"
                          @click="$toDetail(item.goods_id)"
                          >{{ item.goods_name }}</span
                        >
                      </div>
                    </td>
                    <td style="text-align: right">{{ item.sale_total }}</td>
                    <td style="text-align: right">{{ item.onsale_days }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="wrong-status">
              <a-empty />
            </div>
          </div>
          <div class="table-data" v-else>
            <ModelNoPower
              type="noPower"
              :id="dataRankPowerID"
              :organizeId="$refs.head.publishInfo.organization_id"
            ></ModelNoPower>
          </div>
        </div>
      </div>
      <!-- 出版社top -->
      <div class="model-container clearfix">
        <!--出版社TOP 5-->
        <div class="publish-top float-left model-bg">
          <div class="section-title clearfix">
            <span class="float-left">出版单位TOP 5</span>
          </div>
          <div class="table-data" v-if="dataRankPower">
            <div class="table small" v-if="publishTopList.length > 0">
              <table style="table-layout: fixed">
                <colgroup>
                  <col width="45" />
                  <col width="190" />
                  <col width="140" />
                  <col width="100" />
                  <col width="100" />
                </colgroup>
                <thead>
                  <tr>
                    <td style="text-align: center">排行</td>
                    <td>出版单位</td>
                    <td style="text-align: right">主营类目</td>
                    <td style="text-align: right">销售指数</td>
                    <td style="text-align: right">较上周期</td>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in publishTopList" :key="index">
                    <td style="text-align: center">{{ item.sale_rank }}</td>
                    <td>
                      <div class="goods">
                        <span
                          class="goods-title"
                          style="line-height: 40px; width: 190px"
                          >{{ item.name }}</span
                        >
                      </div>
                    </td>
                    <td style="text-align: right">{{ item.top_cate }}</td>
                    <td style="text-align: right">{{ item.sale_total }}</td>
                    <td style="text-align: right">
                      <span class="percent" v-if="item.compare_rate > 0"
                        >+{{ item.compare_rate }}%</span
                      >
                      <span class="green" v-else-if="item.compare_rate <= 0"
                        >{{ item.compare_rate }}%</span
                      >
                      <span v-else>--</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-else class="wrong-status">
              <a-empty />
            </div>
          </div>
          <div class="table-data" v-else>
            <ModelNoPower
              type="noPower"
              :id="dataRankPowerID"
              :organizeId="$refs.head.publishInfo.organization_id"
            ></ModelNoPower>
          </div>
        </div>
        <!-- 竞社 -->
        <div class="compete-publish float-left model-bg">
          <div class="section-title clearfix">
            <span class="float-left">竞社</span>
            <span
              class="click-font float-right"
              @click="$router.push({ name: 'publishmonitor' })"
              >前往竞社监控</span
            >
          </div>
          <div class="table-data" v-if="competePower">
            <div
              class="compete-container"
              v-if="Object.keys(competeInfo).length > 0"
            >
              <div>
                <span class="name">{{
                  competeInfo.compete_publisher_name
                }}</span>
                <span>上周销售指数</span>
                <span class="num">{{ competeInfo.sale_total }}</span>
                <span>行业排名</span>
                <span class="num">{{ competeInfo.sale_rank }}</span>
              </div>
              <div class="clearfix" style="margin-top: 20px; padding: 0 5px">
                <div class="float-left" style="width: 180px">
                  <div id="ring1"></div>
                </div>
                <div class="float-left" style="width: 180px">
                  <div id="ring2"></div>
                </div>
                <div class="float-left" style="width: 180px">
                  <div id="ring3"></div>
                </div>
              </div>
              <div style="text-align: center; margin-top: 50px">
                <span class="point pub"></span>
                <span style="margin-right: 15px">本社</span>
                <span class="point comp"></span>
                <span>竞社</span>
              </div>
            </div>
            <div v-else class="wrong-status">
              <a-empty />
            </div>
          </div>
          <div class="table-data" v-else>
            <ModelNoPower
              type="noPower"
              :id="competePowerID"
              :organizeId="$refs.head.publishInfo.organization_id"
            ></ModelNoPower>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/index.scss"></style>
<script>
import {
  INDEX_PUBLISHERINFO,
  INDEX_RANKS,
  INDEX_COMPETE,
  INDEX_REALTIME,
  EVENT_RECENT,
} from "../apis/index.js";
import { Chart, registerShape } from "@antv/g2";
import DataSet from "@antv/data-set";
export default {
  data() {
    return {
      show: false,
      changeChart: null,
      data: [
        // { date: "06-01", value: 300 },
        // { date: "06-02", value: 300 },
        // { date: "06-03", value: 300 },
        // { date: "06-04", value: 300 },
        // { date: "06-05", value: 300 },
        // { date: "06-06", value: 300 },
        // { date: "06-07", value: 900 },
        // { date: "06-08", value: 500 },
        // { date: "06-09", value: 200 },
        // { date: "06-10", value: 1200 },
        // { date: "06-11", value: 200 },
        // { date: "06-12", value: 400 },
        // { date: "06-13", value: 800 },
        // { date: "06-14", value: 400 },
        // { date: "06-15", value: 100 },
        // { date: "06-16", value: 200 },
        // { date: "06-17", value: 600 },
        // { date: "06-18", value: 700 },
        // { date: "06-19", value: 800 },
        // { date: "06-20", value: 1000 },
        // { date: "06-21", value: 500 },
        // { date: "06-22", value: 200 },
        // { date: "06-23", value: 700 },
        // { date: "06-24", value: 900 },
        // { date: "06-25", value: 300 },
        // { date: "06-26", value: 900 },
        // { date: "06-27", value: 800 },
        // { date: "06-28", value: 300 },
        // { date: "06-29", value: 300 },
        // { date: "06-30", value: 300 },
        // { date: "06-31", value: 300 }
      ],
      beforeData: [
        // { date: "01:00", value: 300 },
        // { date: "02:00", value: 600 },
        // { date: "03:00", value: 800 },
        // { date: "04:00", value: 1300 },
        // { date: "05:00", value: 1500 },
        // { date: "06:00", value: 500 }
      ],
      publishInfos: {
        sale_rank: 0,
        sale_ratio: 0,
        sale_total: 0,
      },
      publishSummaryInfo: {
        main_cate: {
          // 主营类目
          name: "",
          rank: 0,
        },
        best_rank: {
          // 本社最佳
          goods_name: "",
          sale_total: 0,
          all_rank: 0,
          cate_name: "",
          cate_rank: 0,
        },
        best_incr: {
          // 涨幅较高
          goods_name: "",
          incr_rate: "",
        },
        sale_all: {
          // 大盘销售
          points: 0,
          incr_rate: "",
        },
        goods_all: {
          // 大盘新品
          new_total: 0,
          sale_new_total: 0,
          rate: "",
        },
      },
      // 全品种销售排行
      allGoodsRank: [],
      // 涨幅排行
      allUpRank: [],
      // 新品排行
      newGoodsRank: [],
      // 出版社top排行
      publishTopList: [],
      // 竞社监控
      competeInfo: {},
      isFirst: true,
      // 接口权限
      dataNewPower: true,
      dataRankPower: true,
      competePower: true,
      measurePower: true,
      recentPower: false,
      // 权限ID
      dataNewPowerID: 0,
      dataRankPowerID: 0,
      competePowerID: 0,
      measurePowerID: 0,
      recentPowerID: 0,
      ringData1: [
        { type: "本社", value: 0 },
        { type: "竞社", value: 0 },
      ],
      ringData2: [
        { type: "本社", value: 0 },
        { type: "竞社", value: 0 },
      ],
      ringData3: [
        { type: "本社", value: 0 },
        { type: "竞社", value: 0 },
      ],
      ringChange: [null, null, null],
      ringFirst: true,
      measureData: [
        // { time: "00时", 昨日: 502, 今日: 430 },
        // { time: "02时", 昨日: 635, 今日: 600 },
        // { time: "04时", 昨日: 809, 今日: 700 },
        // { time: "06时", 昨日: 1200, 今日: 1000 },
        // { time: "08时", 昨日: 1600, 今日: 1200 },
        // { time: "10时", 昨日: 2000 },
        // { time: "12时", 昨日: 2200 },
        // { time: "14时", 昨日: 2100 },
        // { time: "16时", 昨日: 2500 },
        // { time: "18时", 昨日: 2700 },
        // { time: "20时", 昨日: 3000 },
        // { time: "22时", 昨日: 3100 },
        // { time: "24时", 昨日: 3600 },
      ],
      measureChart: null,
      measureChart1: null,
      measureFirst: true,
      publishMeasure: [],
      allMeasure: [],
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
      intervalId: null,
      measureChartDv: null,
      measureChartDv1: null,
      measureType: 0,
      recentList: [],
      isLoading: true,
    };
  },
  mounted() {
    // console.log('刚进来',this.$weekDate().weekth);
    // setTimeout(() => {
    //   this.getData();
    //   this.getRankData();
    //   this.getCompeteData();
    // }, 500);
    // this.initMeasure();
  },
  updated() {
    this.isLoading = false;
  },
  destroyed() {
    this.clear();
  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.show
          ? this.$beforeDate().replace(/-/g, "")
          : this.$weekDate().weekth,
        date_type: this.show ? 1 : 2,
        start_date: this.show
          ? this.$beforeDate().replace(/-/g, "")
          : this.$weekDate().start.replace(/-/g, ""),
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDEX_PUBLISHERINFO(data);
      if (res.code == 0) {
        this.dataNewPower = true;
        let _this = this;
        this.data = res.data.sale_total_list.reverse();
        setTimeout(() => {
          if (_this.isFirst) {
            _this.initData();
          } else {
            _this.changeChart.destroy();
            _this.initData();
          }
          _this.isFirst = false;
        }, 500);
        this.publishSummaryInfo = res.data.supplier_summary_info;
        if (res.data.supplier_info.sale_rank) {
          this.publishInfos.sale_rank = res.data.supplier_info.sale_rank;
        } else {
          this.publishInfos.sale_rank = 0;
        }
        if (res.data.supplier_info.sale_ratio) {
          this.publishInfos.sale_ratio = res.data.supplier_info.sale_ratio;
        } else {
          this.publishInfos.sale_ratio = 0;
        }
        if (res.data.supplier_info.sale_total) {
          this.publishInfos.sale_total = res.data.supplier_info.sale_total;
        } else {
          this.publishInfos.sale_total = 0;
        }
        if (
          Object.keys(this.publishSummaryInfo).length > 0 &&
          this.publishSummaryInfo.best_incr.incr_rate
        ) {
          this.publishSummaryInfo.best_incr.incr_rate = Number(
            this.publishSummaryInfo.best_incr.incr_rate.replace(/%/, "")
          );
        }
        if (
          Object.keys(this.publishSummaryInfo).length > 0 &&
          this.publishSummaryInfo.sale_all.incr_rate
        ) {
          this.publishSummaryInfo.sale_all.incr_rate = Number(
            this.publishSummaryInfo.sale_all.incr_rate.replace(/%/, "")
          );
        }
        // console.log(231, this.publishSummaryInfo.sale_all.incr_rate);
      } else {
        if (res.code == 1009) {
          this.dataNewPower = false;
          this.dataNewPowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async getRankData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.$weekDate().weekth,
        start_date: this.$weekDate().start.replace(/-/g, ""),
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDEX_RANKS(data);
      if (res.code == 0) {
        this.dataRankPower = true;
        this.allGoodsRank = [];
        this.allUpRank = [];
        this.newGoodsRank = [];
        this.publishTopList = [];
        this.allGoodsRank = res.data.rank_all;
        this.allUpRank = res.data.rank_incr;
        this.newGoodsRank = res.data.rank_new;
        this.publishTopList = res.data.supplier_ranks;
      } else {
        if (res.code == 1009) {
          this.dataRankPower = false;
          this.dataRankPowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async getCompeteData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        // supplier_id: 438,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.$weekDate().weekth,
        date_type: 2,
        start_date: this.$weekDate().start.replace(/-/g, ""),
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDEX_COMPETE(data);
      if (res.code == 0) {
        this.competePower = true;
        if (Object.keys(res.data).length > 0) {
          this.competeInfo = res.data;
          this.ringData1[0].value = res.data.sale_total_compare.my;
          this.ringData1[1].value = res.data.sale_total_compare.compete;
          this.ringData2[0].value =
            res.data.sale_compare.my > 0
              ? res.data.sale_compare.my
              : res.data.sale_compare.my * -1;
          this.ringData2[1].value =
            res.data.sale_compare.compete > 0
              ? res.data.sale_compare.compete
              : res.data.sale_compare.compete * -1;
          this.ringData3[0].value = res.data.onsale_goods.my;
          this.ringData3[1].value = res.data.onsale_goods.compete;
          let _this = this;
          setTimeout(() => {
            if (_this.ringFirst) {
              _this.initRing();
            } else {
              _this.ringChange[0].changeData(_this.ringData1);
              _this.ringChange[1].changeData(_this.ringData2);
              _this.ringChange[2].changeData(_this.ringData3);
            }
            _this.ringFirst = false;
          }, 500);
        } else {
          this.competeInfo = {};
          this.ringFirst = true;
        }
      } else {
        if (res.code == 1009) {
          this.competePower = false;
          this.competePowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 实时数据获取
    async getMeasureData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDEX_REALTIME(data);
      if (res.code == 0) {
        this.measurePower = true;
        this.publishData.today = res.data.supplier.today.total;
        this.publishData.yesterday = res.data.supplier.yesterday.total;
        this.allData.today = res.data.all.today.total;
        this.allData.yesterday = res.data.all.yesterday.total;
        this.publishData.compare_rate = res.data.supplier.compare_rate;
        this.allData.compare_rate = res.data.all.compare_rate;
        this.publishMeasure = [];
        this.allMeasure = [];
        res.data.supplier.yesterday.chart_data.map((value, key) => {
          let _obj = {};
          _obj.time = value.time;
          _obj.昨日 = value.value;
          this.publishMeasure.push(_obj);
        });
        res.data.supplier.today.chart_data.map((value, key) => {
          this.publishMeasure[key].今日 = value.value;
        });
        res.data.all.yesterday.chart_data.map((value, key) => {
          let _obj = {};
          _obj.time = value.time;
          _obj.昨日 = value.value;
          this.allMeasure.push(_obj);
        });
        res.data.all.today.chart_data.map((value, key) => {
          this.allMeasure[key].今日 = value.value;
        });
        // this.measureData = [];
        // if (this.measureType == 0) {
        //   this.measureData = this.publishMeasure;
        // } else {
        //   this.measureData = this.allMeasure;
        // }
        let _this = this;
        setTimeout(() => {
          if (_this.measureFirst) {
            _this.initMeasure();
            _this.initMeasure1();
            _this.dataRefreh();
          } else {
            _this.measureChart.destroy();
            _this.measureChart1.destroy();
            _this.initMeasure();
            _this.initMeasure1();
          }
          _this.measureFirst = false;
        }, 500);
        // console.log(this.measureData);
      } else {
        if (res.code == 1009) {
          this.measurePower = false;
          this.measurePowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async getRecentData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_RECENT(data);
      if (res.code == 0) {
        this.recentPower = true;
        this.recentList = [];
        this.recentList = res.data;
        // let _dom = document.getElementById("animationMove");
        // if (_dom) _dom.remove();
        // if (this.recentList.length > 0) {
        //   let _height;
        //   if (this.recentList.length > 3) {
        //     _height = this.recentList.length * 31 - 80 + "px";
        //   } else {
        //     _height = this.recentList.length * 31 + "px";
        //   }
        //   let _second = this.recentList.length * 4 + "s";
        //   let _css =
        //     ".animation-container{position: absolute;left: 15px;right: 15px;top: 112px;animation: move " +
        //     _second +
        //     "linear infinite;-webkit-animation: move " +
        //     _second +
        //     " linear infinite;-moz-animation: move " +
        //     _second +
        //     " linear infinite;-ms-animation: move " +
        //     _second +
        //     " linear infinite;-o-animation: move " +
        //     _second +
        //     " linear infinite;}.animation-container:hover{animation-play-state: paused;-webkit-animation-play-state: paused;-moz-animation-play-state: paused;-ms-animation-play-state: paused;-o-animation-play-state: paused;}@keyframes move{from{top:110px}to{top:-" +
        //     _height +
        //     ";}}@-webkitkeyframes move{from{top:110px}to{top:-" +
        //     _height +
        //     ";}}@-moz-keyframes move{from{top:110px}to{top:-" +
        //     _height +
        //     ";}}@-ms-keyframes move{from{top:110px}to{top:-" +
        //     _height +
        //     ";}}@-o-keyframes move{from{top:110px}to{top:-" +
        //     _height +
        //     ";}}";
        //   let _style = document.createElement("style");
        //   _style.type = "text/css";
        //   _style.id = "animationMove";
        //   _style.innerHTML = _css;
        //   document.getElementsByTagName("head")[0].appendChild(_style);
        // }
        // console.log(_height)
      } else {
        if (res.code == 1009) {
          this.recentPower = false;
          this.recentPowerID = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    change() {
      this.show ? (this.show = false) : (this.show = true);
      this.getData();
    },
    changeMeasure(_type) {
      this.measureType = _type;
    },
    initData() {
      let _this = this;
      this.changeChart = new Chart({
        container: "container",
        autoFit: true,
        autoHide: false,
        height: 220,
      });
      this.changeChart.data(this.data);
      this.changeChart.scale("value", {
        alias: "本社销售：",
        nice: true,
      });

      this.changeChart.axis("date", {
        tickLine: null,
        label: {
          formatter: function (value) {
            // console.log(value)
            if (
              value == _this.data[0].date ||
              value == _this.data[2].date ||
              value == _this.data[4].date ||
              value == _this.data[6].date ||
              value == _this.data[8].date ||
              value == _this.data[10].date ||
              value == _this.data[12].date ||
              value == _this.data[14].date ||
              value == _this.data[16].date ||
              value == _this.data[18].date ||
              value == _this.data[20].date
            ) {
              return value;
            } else {
              return "";
            }
          },
          autoHide: false | true,
          autoRotate: false,
        },
      });
      this.changeChart.tooltip({
        showMarkers: false,
      });
      this.changeChart.interaction("active-region");
      this.changeChart
        .interval()
        .position("date*value")
        .style("date", (val) => {
          let _date1, _date2, _date3, _date4, _date5, _date6, _date7;
          if (_this.show) {
            _date1 = _this.$beforeDate().substring(5);
          } else {
            _date1 = _this.$weekDate().start.substring(5);
            _date2 = _this
              .$moment(_this.$weekDate().start)
              .day(2)
              .format("YYYY-MM-DD")
              .substring(5);
            _date3 = _this
              .$moment(_this.$weekDate().start)
              .day(3)
              .format("YYYY-MM-DD")
              .substring(5);
            _date4 = _this
              .$moment(_this.$weekDate().start)
              .day(4)
              .format("YYYY-MM-DD")
              .substring(5);
            _date5 = _this
              .$moment(_this.$weekDate().start)
              .day(5)
              .format("YYYY-MM-DD")
              .substring(5);
            _date6 = _this
              .$moment(_this.$weekDate().start)
              .day(6)
              .format("YYYY-MM-DD")
              .substring(5);
            _date7 = _this
              .$moment(_this.$weekDate().start)
              .day(7)
              .format("YYYY-MM-DD")
              .substring(5);
          }
          // console.log(val)
          if (
            val == _date1 ||
            val == _date2 ||
            val == _date3 ||
            val == _date4 ||
            val == _date5 ||
            val == _date6 ||
            val == _date7
          ) {
            return {
              fillOpacity: 1,
              lineWidth: 0,
              stroke: "#437AE7",
              fill: "#FF9900",
            };
          }
        })
        .size(20);

      this.changeChart.render();
    },
    initRing() {
      let _data, _text;
      for (let i = 0; i < 3; i++) {
        if (i == 0) {
          _data = this.ringData1;
          _text = "销售指数";
        } else if (i == 1) {
          _data = this.ringData2;
          _text = "涨跌幅";
        } else if (i == 2) {
          _data = this.ringData3;
          _text = "动销品种数";
        }
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

        this.ringChange[i] = new Chart({
          container: "ring" + (i + 1),
          autoFit: true,
          height: 180,
        });

        this.ringChange[i].data(_data);
        this.ringChange[i].coordinate("theta", {
          radius: 0.8,
          innerRadius: 0.95,
        });
        this.ringChange[i].legend(false);
        this.ringChange[i].tooltip(false);
        // 辅助文本
        this.ringChange[i]
          .annotation()
          .text({
            position: ["50%", "50%"],
            content: "VS",
            style: {
              fontSize: 16,
              fill: "#07193f",
              textAlign: "center",
            },
            offsetY: -10,
          })
          .text({
            position: ["50%", "50%"],
            content: _text,
            style: {
              fontSize: 12,
              fill: "#7789af",
              textAlign: "center",
            },
            offsetY: 15,
          });
        this.ringChange[i]
          .interval()
          .adjust("stack")
          .position("value")
          .color("type", (type) => {
            if (type == "本社") {
              return "#4576DB";
            } else if (type == "竞社") {
              return "#FF9900";
            }
          })
          .shape("slice-shape");

        this.ringChange[i].render();
      }
    },
    initMeasure() {
      this.measureChartDv = new DataSet.DataView().source(this.publishMeasure);
      this.measureChartDv.transform({
        type: "fold",
        fields: ["昨日", "今日"], // 展开字段集
        key: "type", // key字段
        value: "value", // value字段
      });

      this.measureChart = new Chart({
        container: "measure",
        autoFit: true,
        height: 120,
      });

      this.measureChart.data(this.measureChartDv.rows);
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
            // let _time = Number(value.replace(/-/g,""));
            // console.log(_time)
            if (value == "00:00") {
              return "00时";
            } else if (value == "02:00") {
              return "02时";
            } else if (value == "04:00") {
              return "04时";
            } else if (value == "06:00") {
              return "06时";
            } else if (value == "08:00") {
              return "08时";
            } else if (value == "10:00") {
              return "10时";
            } else if (value == "12:00") {
              return "12时";
            } else if (value == "14:00") {
              return "14时";
            } else if (value == "16:00") {
              return "16时";
            } else if (value == "18:00") {
              return "18时";
            } else if (value == "20:00") {
              return "20时";
            } else if (value == "22:00") {
              return "22时";
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
    initMeasure1() {
      this.measureChartDv1 = new DataSet.DataView().source(this.allMeasure);
      this.measureChartDv1.transform({
        type: "fold",
        fields: ["昨日", "今日"], // 展开字段集
        key: "type", // key字段
        value: "value", // value字段
      });

      this.measureChart1 = new Chart({
        container: "measure1",
        autoFit: true,
        height: 120,
      });

      this.measureChart1.data(this.measureChartDv1.rows);
      this.measureChart1.scale("time", {
        range: [0, 1],
      });
      this.measureChart1.scale("value", {
        nice: true,
      });
      this.measureChart1.axis("time", {
        tickLine: null,
        label: {
          formatter: function (value) {
            // let _time = Number(value.replace(/-/g,""));
            // console.log(_time)
            if (value == "00:00") {
              return "00时";
            } else if (value == "02:00") {
              return "02时";
            } else if (value == "04:00") {
              return "04时";
            } else if (value == "06:00") {
              return "06时";
            } else if (value == "08:00") {
              return "08时";
            } else if (value == "10:00") {
              return "10时";
            } else if (value == "12:00") {
              return "12时";
            } else if (value == "14:00") {
              return "14时";
            } else if (value == "16:00") {
              return "16时";
            } else if (value == "18:00") {
              return "18时";
            } else if (value == "20:00") {
              return "20时";
            } else if (value == "22:00") {
              return "22时";
            } else {
              return "";
            }
          },
          autoHide: false | true,
          autoRotate: false,
        },
      });
      this.measureChart1.legend(false);
      this.measureChart1.tooltip({
        shared: true,
        showCrosshairs: true,
      });
      this.measureChart1
        .area()
        .position("time*value")
        .color("type", (type) => {
          if (type == "昨日") {
            return "#D1DDF6";
          }
        })
        .shape("smooth");
      this.measureChart1
        .line()
        .position("time*value")
        .color("type", (type) => {
          if (type == "昨日") {
            return "#D1DDF6";
          }
        })
        .shape("smooth")
        .size(1);
      this.measureChart1.render();
    },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        // console.log("刷新" + new Date());
        this.getMeasureData(); //加载数据函数
      }, 60000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },
    initPage() {
      this.getData();
      this.getRankData();
      this.getCompeteData();
      this.getMeasureData();
      this.getRecentData();
      // this.dataRefreh();
    },
    noInitPage() {
      this.isLoading = false;
    },
    publisherChange() {
      // console.log('hahah')
      this.isLoading = true;
      if (!this.dataNewPower) {
        this.isFirst = true;
      }
      if (!this.competePower) {
        this.ringFirst = true;
      }
      if (!this.measurePower) {
        this.measureFirst = true;
      }
      this.getData();
      this.getRankData();
      this.getCompeteData();
      this.getMeasureData();
      this.getRecentData();
    },
  },
};
</script>
