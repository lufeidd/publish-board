<template>
  <div id="competePage" @click="bodyClick">
    <HeadNav
      type="compete"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="compete" sort="publishmonitor"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg clearfix">
                  <div class="float-left"></div>
                  <div class="float-right" style="padding: 7px 15px">
                    <TimeChoose
                      ref="time"
                      @changeTime="changeTime"
                      @closeDom="closeDom"
                    ></TimeChoose>
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
                    <span style="margin: 0 8px">对比</span>
                    <!-- 对比一 -->
                    <div
                      :class="
                        close1 ? 'compete-publish active' : 'compete-publish'
                      "
                      @click.stop="showCompete1"
                    >
                      {{ text1 }}
                      <a-icon
                        type="close"
                        v-if="close1"
                        @click.stop="delete1"
                      />
                      <div class="search" v-if="show1">
                        <!-- <div style="padding:0 10px;">
                          <a-input placeholder="搜索出版社名称" v-model="inputVal1" @input="onSearch1" />
                        </div>-->
                        <div v-if="list.length > 0">
                          <div class="list" v-if="publishList1.length > 0">
                            <div
                              class="content"
                              v-for="(item1, index1) in publishList1"
                              :key="index1"
                              @click.stop="onSelect1(item1, index1, 1)"
                            >
                              {{ item1.supplier_name }}
                            </div>
                          </div>
                          <div class="no-choose" v-else>无可选择的出版单位</div>
                        </div>
                        <div class="no-set" v-else>
                          <div style="margin-bottom: 10px">
                            尚未设置竞社监控
                          </div>
                          <div class="modelNoPower">
                            <a-button
                              type="primary"
                              shape="round"
                              @click="$router.push({ name: 'competeset' })"
                              >前去设置</a-button
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <span style="margin: 0 8px">对比</span>
                    <!-- 对比二 -->
                    <div
                      :class="
                        close2 ? 'compete-publish active' : 'compete-publish'
                      "
                      @click.stop="showCompete2"
                    >
                      {{ text2 }}
                      <a-icon
                        type="close"
                        v-if="close2"
                        @click.stop="delete2"
                      />
                      <div class="search" v-if="show2">
                        <!-- <div style="padding:0 10px;">
                          <a-input placeholder="搜索出版社名称" v-model="inputVal2" @input="onSearch2" />
                        </div>-->
                        <div v-if="list.length > 0">
                          <div class="list" v-if="publishList2.length > 0">
                            <div
                              class="content"
                              v-for="(item2, index2) in publishList2"
                              :key="index2"
                              @click.stop="onSelect2(item2, index2, 2)"
                            >
                              {{ item2.supplier_name }}
                            </div>
                          </div>
                          <div class="no-choose" v-else>无可选择的出版单位</div>
                        </div>
                        <div class="no-set" v-else>
                          <div style="margin-bottom: 10px">
                            尚未设置竞社监控
                          </div>
                          <div class="modelNoPower">
                            <a-button
                              type="primary"
                              shape="round"
                              @click="$router.push({ name: 'competeset' })"
                              >前去设置</a-button
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                    <span style="margin: 0 8px">对比</span>
                    <!-- 对比三 -->
                    <div
                      :class="
                        close3 ? 'compete-publish active' : 'compete-publish'
                      "
                      @click.stop="showCompete3"
                    >
                      {{ text3 }}
                      <a-icon
                        type="close"
                        v-if="close3"
                        @click.stop="delete3"
                      />
                      <div class="search" v-if="show3">
                        <!-- <div style="padding:0 10px;">
                          <a-input placeholder="搜索出版社名称" v-model="inputVal3" @input="onSearch3" />
                        </div>-->
                        <div v-if="list.length > 0">
                          <div class="list" v-if="publishList3.length > 0">
                            <div
                              class="content"
                              v-for="(item3, index3) in publishList3"
                              :key="index3"
                              @click.stop="onSelect3(item3, index3, 3)"
                            >
                              {{ item3.supplier_name }}
                            </div>
                          </div>
                          <div class="no-choose" v-else>无可选择的出版单位</div>
                        </div>
                        <div class="no-set" v-else>
                          <div style="margin-bottom: 10px">
                            尚未设置竞社监控
                          </div>
                          <div class="modelNoPower">
                            <a-button
                              type="primary"
                              shape="round"
                              @click="$router.push({ name: 'competeset' })"
                              >前去设置</a-button
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 销售走势 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">销售走势</div>
                <div class="compete">
                  <!-- 核心数据 -->
                  <div class="middle clearfix">
                    <!-- 销售指数 -->
                    <span
                      :class="
                        typeText == 'sale_total'
                          ? 'data-block float-left active'
                          : 'data-block float-left'
                      "
                      @click="coreTypeChange('sale_total')"
                    >
                      <div style="margin-bottom: 10px">
                        <a-icon type="line-chart" />
                        <span class="secondary-font">销售指数</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left own">本社</span>
                        <span
                          class="value float-right"
                          v-if="ownInfo.sale_total"
                          >{{ ownInfo.sale_total }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left one">竞社1</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo1.sale_total"
                          >{{ chooseInfo1.sale_total }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left two">竞社2</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo2.sale_total"
                          >{{ chooseInfo2.sale_total }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left three">竞社3</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo3.sale_total"
                          >{{ chooseInfo3.sale_total }}</span
                        >
                        <span class="value float-right" v-else>--</span>
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
                      <div style="margin-bottom: 10px">
                        <a-icon type="line-chart" />
                        <span class="secondary-font">销售排名</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left own">本社</span>
                        <span
                          class="value float-right"
                          v-if="ownInfo.sale_rank"
                          >{{ ownInfo.sale_rank }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left one">竞社1</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo1.sale_rank"
                          >{{ chooseInfo1.sale_rank }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left two">竞社2</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo2.sale_rank"
                          >{{ chooseInfo2.sale_rank }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left three">竞社3</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo3.sale_rank"
                          >{{ chooseInfo3.sale_rank }}</span
                        >
                        <span class="value float-right" v-else>--</span>
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
                      <div style="margin-bottom: 10px">
                        <a-icon type="line-chart" />
                        <span class="secondary-font">市场占有率</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left own">本社</span>
                        <span
                          class="value float-right"
                          v-if="ownInfo.market_share"
                          >{{ ownInfo.market_share }}%</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left one">竞社1</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo1.market_share"
                          >{{ chooseInfo1.market_share }}%</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left two">竞社2</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo2.market_share"
                          >{{ chooseInfo2.market_share }}%</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left three">竞社3</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo3.market_share"
                          >{{ chooseInfo3.market_share }}%</span
                        >
                        <span class="value float-right" v-else>--</span>
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
                      <div style="margin-bottom: 10px">
                        <a-icon type="line-chart" />
                        <span class="secondary-font">动销品种数</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left own">本社</span>
                        <span
                          class="value float-right"
                          v-if="ownInfo.cate_count"
                          >{{ ownInfo.cate_count }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left one">竞社1</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo1.cate_count"
                          >{{ chooseInfo1.cate_count }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left two">竞社2</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo2.cate_count"
                          >{{ chooseInfo2.cate_count }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                      <div class="clearfix" style="line-height: normal">
                        <span class="name float-left three">竞社3</span>
                        <span
                          class="value float-right"
                          v-if="chooseInfo3.cate_count"
                          >{{ chooseInfo3.cate_count }}</span
                        >
                        <span class="value float-right" v-else>--</span>
                      </div>
                    </span>
                  </div>
                  <!-- 折线图 -->
                  <div style="margin-top: 20px">
                    <div id="brokenLine"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 品种对比 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">品种对比</div>
                <div class="goods-compare">
                  <div
                    class="table"
                    v-if="allGoodsList.length == 1"
                    style="margin-top: 10px; height: 651px"
                  >
                    <table style="table-layout: fixed">
                      <colgroup>
                        <col width="600" />
                        <col width="450" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>
                            <span class="publish-block own"></span>
                            <span
                              class="main-font"
                              style="
                                display: inline-block;
                                vertical-align: middle;
                                margin-left: 10px;
                              "
                              >{{ ownName }}</span
                            >
                          </td>
                          <td style="text-align: right">销售指数</td>
                        </tr>
                      </thead>
                      <tbody v-if="goodsList1.length > 0">
                        <tr v-for="(item, index) in goodsList1" :key="index">
                          <td>
                            <div class="goods-desc">
                              <span class="goods-image" v-if="item.cover_pic">
                                <img
                                  :src="item.cover_pic"
                                  alt
                                  style="width: 40px; height: 40px"
                                />
                                <div
                                  class="goods-logo prev"
                                  v-if="item.is_presale == 1"
                                >
                                  预
                                </div>
                                <div
                                  class="goods-logo group"
                                  v-else-if="item.have_presale == 1"
                                >
                                  组
                                </div>
                              </span>
                              <span
                                v-else
                                class="no-pic"
                                style="min-width: 40px; min-height: 40px"
                              ></span>
                              <span
                                class="click-font goods-name"
                                @click.stop="$toDetail(item.goods_id)"
                                >{{ item.name }}</span
                              >
                            </div>
                          </td>
                          <td style="text-align: right">
                            <span class="main-font">{{ item.sale_total }}</span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="2">
                            <div style="margin-top: 200px"><a-empty /></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="clearfix"
                    v-if="allGoodsList.length == 2"
                    style="margin-top: 10px"
                  >
                    <div
                      :class="
                        index == 0 ? 'table float-left' : 'table float-right'
                      "
                      style="width: 520px; height: 651px"
                      v-for="(item, index) in allGoodsList"
                      :key="index"
                    >
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="360" />
                          <col width="160" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span :class="item.class"></span>
                              <span
                                class="main-font"
                                :title="item.name"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                  white-space: nowrap;
                                  text-overflow: ellipsis;
                                  overflow: hidden;
                                  width: 310px;
                                "
                                >{{ item.name }}</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody v-if="item.arr.length > 0">
                          <tr v-for="(litem, lindex) in item.arr" :key="lindex">
                            <td>
                              <div class="goods-desc">
                                <span
                                  class="goods-image"
                                  v-if="litem.cover_pic"
                                >
                                  <img
                                    :src="litem.cover_pic"
                                    alt
                                    style="width: 40px; height: 40px"
                                  />
                                  <div
                            class="goods-logo prev"
                            v-if="litem.is_presale == 1"
                          >
                            预
                          </div>
                          <div
                            class="goods-logo group"
                            v-else-if="item.have_presale == 1"
                          >
                            组
                          </div>
                                </span>
                                <span
                                  v-else
                                  class="no-pic"
                                  style="min-width: 40px; min-height: 40px"
                                ></span>
                                <span
                                  class="click-font goods-name"
                                  @click.stop="$toDetail(litem.goods_id)"
                                  >{{ litem.name }}</span
                                >
                              </div>
                            </td>
                            <td style="text-align: right">
                              <span class="main-font">{{
                                litem.sale_total
                              }}</span>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="2">
                              <div style="margin-top: 200px"><a-empty /></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    class="clearfix"
                    v-if="allGoodsList.length == 3"
                    style="margin-top: 10px"
                  >
                    <div
                      class="table float-left"
                      style="width: 360px; height: 651px"
                      v-for="(item, index) in allGoodsList"
                      :key="index"
                    >
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="220" />
                          <col width="140" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span :class="item.class"></span>
                              <span
                                class="main-font"
                                :title="item.name"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                  white-space: nowrap;
                                  text-overflow: ellipsis;
                                  overflow: hidden;
                                  width: 160px;
                                "
                                >{{ item.name }}</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody v-if="item.arr.length > 0">
                          <tr v-for="(litem, lindex) in item.arr" :key="lindex">
                            <td>
                              <div class="goods-desc">
                                <span
                                  class="goods-image"
                                  v-if="litem.cover_pic"
                                >
                                  <img
                                    :src="litem.cover_pic"
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
                                  @click.stop="$toDetail(litem.goods_id)"
                                  >{{ litem.name }}</span
                                >
                              </div>
                            </td>
                            <td style="text-align: right">
                              <span class="main-font">{{
                                litem.sale_total
                              }}</span>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="2">
                              <div style="margin-top: 200px"><a-empty /></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    class="clearfix"
                    v-if="allGoodsList.length == 4"
                    style="margin-top: 10px"
                  >
                    <div
                      class="table float-left"
                      style="width: 270px; height: 651px"
                      v-for="(item, index) in allGoodsList"
                      :key="index"
                    >
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="150" />
                          <col width="80" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span :class="item.class"></span>
                              <span
                                class="main-font"
                                :title="item.name"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                  white-space: nowrap;
                                  text-overflow: ellipsis;
                                  overflow: hidden;
                                  width: 108px;
                                "
                                >{{ item.name }}</span
                              >
                            </td>
                            <td style="text-align: right; white-space: nowrap">
                              销售指数
                            </td>
                          </tr>
                        </thead>
                        <tbody v-if="item.arr.length > 0">
                          <tr v-for="(litem, lindex) in item.arr" :key="lindex">
                            <td>
                              <div class="goods-desc">
                                <span
                                  class="goods-image"
                                  v-if="litem.cover_pic"
                                >
                                  <img
                                    :src="litem.cover_pic"
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
                                  @click.stop="$toDetail(litem.goods_id)"
                                  >{{ litem.name }}</span
                                >
                              </div>
                            </td>
                            <td style="text-align: right">
                              <span class="main-font">{{
                                litem.sale_total
                              }}</span>
                            </td>
                          </tr>
                        </tbody>
                        <tbody v-else>
                          <tr>
                            <td colspan="2">
                              <div style="margin-top: 200px"><a-empty /></div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 类目对比 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">类目对比</div>
                  <div class="float-right" style="font-weight: normal">
                    <a-radio-group
                      name="radioGroup"
                      v-model="cateRadio"
                      @change="cateChange"
                    >
                      <a-radio :value="1" style="font-size: 12px"
                        >堆积图</a-radio
                      >
                      <a-radio :value="2" style="font-size: 12px"
                        >对比图</a-radio
                      >
                    </a-radio-group>
                  </div>
                </div>
                <div style="padding: 15px">
                  <div v-show="cateRadio == 1">
                    <div id="stacking1" style="width: 1050px"></div>
                  </div>
                  <div v-show="cateRadio == 2">
                    <div id="contrast1" style="width: 1050px"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 地域对比 -->
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">地域对比</div>
                  <div class="float-right" style="font-weight: normal">
                    <a-radio-group
                      name="radioGroup"
                      v-model="regionRadio"
                      @change="regionChange"
                    >
                      <a-radio :value="1" style="font-size: 12px"
                        >堆积图</a-radio
                      >
                      <a-radio :value="2" style="font-size: 12px"
                        >对比图</a-radio
                      >
                    </a-radio-group>
                  </div>
                </div>
                <div style="padding: 15px">
                  <div v-show="regionRadio == 1">
                    <div id="stacking2" style="width: 1050px"></div>
                  </div>
                  <div v-show="regionRadio == 2">
                    <div id="contrast2" style="width: 1050px"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 监控列表 -->
            <div class="model-container">
              <div
                class="model-bg"
                style="min-height: 300px; padding-bottom: 20px"
              >
                <div class="section-title">监控列表</div>
                <div class="table">
                  <table style="table-layou: fixed">
                    <colgroup>
                      <col width="60" />
                      <col width="665" />
                      <col width="160" />
                      <col width="160" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td style="text-align: center">排名</td>
                        <td>出版单位</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">行业排名</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item, index) in list" :key="index">
                        <td style="text-align: center">{{ index + 1 }}</td>
                        <td>
                          <span class="main-font">{{
                            item.supplier_name
                          }}</span>
                          <span
                            class="data-tab data-tab-seven"
                            v-if="
                              item.supplier_id ==
                              $refs.head.publishInfo.supplier_id
                            "
                            >本社</span
                          >
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.sale_total" class="main-font">{{
                            item.sale_total
                          }}</span>
                          <span v-else>--</span>
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.industry_rank">{{
                            item.industry_rank
                          }}</span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6">
                          <div style="margin-top: 30px"><a-empty /></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <!-- 无权限 -->
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
<style scoped lang="scss" src="@/style/scss/pages/compete/set.scss"></style>
<script>
import {
  COMPETE_MONITOR_PUBLISHER_LISTS,
  COMPETE_MONITOR_PUBLISHER_TREND,
  COMPETE_MONITOR_PUBLISHER_INFO,
  COMPETE_MONITOR_PUBLISHER_GOODS,
  COMPETE_MONITOR_PUBLISHER_CATEGORY,
  COMPETE_MONITOR_PUBLISHER_REGION,
} from "../../apis/compete.js";
import { SUPPLIER_GETS } from "../../apis/common.js";
import { Chart } from "@antv/g2";
export default {
  data() {
    return {
      pagePower: true,
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
      ownName: "",
      ownList: [],
      chooseList1: [],
      chooseList2: [],
      chooseList3: [],
      selectList: [],
      text1: "+设置对比",
      text2: "+设置对比",
      text3: "+设置对比",
      publishId1: 0,
      publishId2: 0,
      publishId3: 0,
      ownInfo: {
        sale_total: 0, // 销售指数
        sale_rank: 0, // 销售排名
        market_share: 0, // 市场占有率
        cate_count: 0, // 动销品种数
      },
      chooseInfo1: {
        sale_total: 0, // 销售指数
        sale_rank: 0, // 销售排名
        market_share: 0, // 市场占有率
        cate_count: 0, // 动销品种数
      },
      chooseInfo2: {
        sale_total: 0, // 销售指数
        sale_rank: 0, // 销售排名
        market_share: 0, // 市场占有率
        cate_count: 0, // 动销品种数
      },
      chooseInfo3: {
        sale_total: 0, // 销售指数
        sale_rank: 0, // 销售排名
        market_share: 0, // 市场占有率
        cate_count: 0, // 动销品种数
      },
      isLoading: true,
      allGoodsList: [],
      goodsList1: [],
      goodsList2: [],
      goodsList3: [],
      goodsList4: [],
      cateRadio: 1,
      regionRadio: 1,
      stackingChart1: null,
      contrastChart1: null,
      stackingChart2: null,
      contrastChart2: null,
      cateFirst: true,
      regionFirst: true,
      cateList1: [],
      cateList2: [],
      regionList1: [],
      regionList2: [],
    };
  },
  mounted() {
    this.getData();
    this.getCore(this.$refs.head.publishInfo.supplier_id, 0);
    this.getTrend(this.$refs.head.publishInfo.supplier_id, 0);
    this.getGoodsList(this.$refs.head.publishInfo.supplier_id, 0);
    this.getCate();
    this.getRegion();
  },
  updated() {},
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMPETE_MONITOR_PUBLISHER_LISTS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.list = [];
        this.list = res.data;
        this.list.map((value, key) => {
          if (value.supplier_id == this.$refs.head.publishInfo.supplier_id) {
            this.ownName = value.supplier_name;
          }
        });
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
    // 竞争数据信息
    async getCore(id, _index) {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMPETE_MONITOR_PUBLISHER_INFO(data);
      if (res.code == 0) {
        this.pagePower = true;
        if (_index == 0) {
          this.ownInfo = res.data;
        } else if (_index == 1) {
          this.chooseInfo1 = res.data;
        } else if (_index == 2) {
          this.chooseInfo2 = res.data;
        } else if (_index == 3) {
          this.chooseInfo3 = res.data;
        }
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
    // 竞争趋势
    async getTrend(id, _index) {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: id,
        start_date: this.$refs.time.oneDay,
        date_type: this.$refs.time.dateType,
        type: this.typeText,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
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
              if (value.week_range) {
                _obj.range = value.week_range;
              }
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
              if (value.week_range) {
                _obj.range = value.week_range;
              }
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
              if (value.week_range) {
                _obj.range = value.week_range;
              }
              this.chooseList2.unshift(_obj);
            });
          }
        } else if (_index == 3) {
          this.chooseList3 = [];
          if (res.data.length > 0) {
            res.data.map((value, key) => {
              let _obj = {};
              _obj.month = value.date.toString();
              _obj.city = "竞社3";
              _obj.temperature = value.value;
              if (value.week_range) {
                _obj.range = value.week_range;
              }
              this.chooseList3.unshift(_obj);
            });
          }
        }
        this.lineArr();
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 品种对比列表
    async getGoodsList(id, _index) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: id,
        date_type: this.$refs.time.dateType,
        period: this.$refs.time.cycle,
        start_date: this.$refs.time.oneDay,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMPETE_MONITOR_PUBLISHER_GOODS(data);
      if (res.code == 0) {
        this.pagePower = true;
        if (_index == 0) {
          this.goodsList1 = [];
          this.goodsList1 = res.data;
        } else if (_index == 1) {
          this.goodsList2 = [];
          this.goodsList2 = res.data;
        } else if (_index == 2) {
          this.goodsList3 = [];
          this.goodsList3 = res.data;
        } else if (_index == 3) {
          this.goodsList4 = [];
          this.goodsList4 = res.data;
        }
        this.goodsArr();
      } else {
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 类目对比
    async getCate() {
      let _arr = [];
      _arr.push(this.$refs.head.publishInfo.supplier_id);
      if (this.publishId1) {
        _arr.push(this.publishId1);
      }
      if (this.publishId2) {
        _arr.push(this.publishId2);
      }
      if (this.publishId3) {
        _arr.push(this.publishId3);
      }
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_ids: _arr.join(","),
        date_type: this.$refs.time.dateType,
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMPETE_MONITOR_PUBLISHER_CATEGORY(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.cateList1 = [];
        this.cateList2 = [];
        let _arr1 = [],
          _arr2 = [];
        res.data.map((value, key) => {
          _arr1.unshift(value);
          _arr2.push(value);
        });
        _arr1.map((value, key) => {
          let _obj1 = {},
            _obj2 = {},
            _obj3 = {},
            _obj4 = {};
          this.list.map((val, key) => {
            if (val.supplier_id == this.$refs.head.publishInfo.supplier_id) {
              _obj1.type = val.supplier_name;
            }
          });
          _obj1.name = value.category_name;
          _obj1.value = value.details[0].sale_amount;
          this.cateList1.push(_obj1);
          if (this.publishId1) {
            this.list.map((val, key) => {
              if (val.supplier_id == this.publishId1) {
                _obj2.type = val.supplier_name;
              }
            });
            _obj2.name = value.category_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId1) {
                _obj2.value = val.sale_amount;
              }
            });
            this.cateList1.push(_obj2);
          }
          if (this.publishId2) {
            this.list.map((val, key) => {
              if (val.supplier_id == this.publishId2) {
                _obj3.type = val.supplier_name;
              }
            });
            _obj3.name = value.category_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId2) {
                _obj3.value = val.sale_amount;
              }
            });
            this.cateList1.push(_obj3);
          }
          if (this.publishId3) {
            this.list.map((value, key) => {
              if (value.supplier_id == this.publishId3) {
                _obj4.type = value.supplier_name;
              }
            });
            _obj4.name = value.category_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId3) {
                _obj4.value = val.sale_amount;
              }
            });
            this.cateList1.push(_obj4);
          }
        });
        _arr2.map((value, key) => {
          let _obj1 = {},
            _obj2 = {},
            _obj3 = {},
            _obj4 = {};
          this.list.map((val, key) => {
            if (val.supplier_id == this.$refs.head.publishInfo.supplier_id) {
              _obj1.type = val.supplier_name;
            }
          });
          _obj1.name = value.category_name;
          _obj1.value = value.details[0].sale_amount;
          this.cateList2.push(_obj1);
          if (this.publishId1) {
            this.list.map((val, key) => {
              if (val.supplier_id == this.publishId1) {
                _obj2.type = val.supplier_name;
              }
            });
            _obj2.name = value.category_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId1) {
                _obj2.value = val.sale_amount;
              }
            });
            this.cateList2.push(_obj2);
          }
          if (this.publishId2) {
            this.list.map((val, key) => {
              if (val.supplier_id == this.publishId2) {
                _obj3.type = val.supplier_name;
              }
            });
            _obj3.name = value.category_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId2) {
                _obj3.value = val.sale_amount;
              }
            });
            this.cateList2.push(_obj3);
          }
          if (this.publishId3) {
            this.list.map((value, key) => {
              if (value.supplier_id == this.publishId3) {
                _obj4.type = value.supplier_name;
              }
            });
            _obj4.name = value.category_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId3) {
                _obj4.value = val.sale_amount;
              }
            });
            this.cateList2.push(_obj4);
          }
        });
        // console.log(111,this.cateList1);
        let _this = this;
        setTimeout(() => {
          if (this.cateFirst) {
            _this.initStacking1();
            _this.initContrast1();
          } else {
            _this.stackingChart1.destroy();
            _this.contrastChart1.destroy();
            _this.initStacking1();
            _this.initContrast1();
          }
          _this.cateFirst = false;
        }, 500);
      } else {
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 地域对比
    async getRegion() {
      let _arr = [];
      _arr.push(this.$refs.head.publishInfo.supplier_id);
      if (this.publishId1) {
        _arr.push(this.publishId1);
      }
      if (this.publishId2) {
        _arr.push(this.publishId2);
      }
      if (this.publishId3) {
        _arr.push(this.publishId3);
      }
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_ids: _arr.join(","),
        date_type: this.$refs.time.dateType,
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMPETE_MONITOR_PUBLISHER_REGION(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.regionList1 = [];
        this.regionList2 = [];
        let _arr1 = [],
          _arr2 = [];
        res.data.map((value, key) => {
          _arr1.unshift(value);
          _arr2.push(value);
        });
        _arr1.map((value, key) => {
          let _obj1 = {},
            _obj2 = {},
            _obj3 = {},
            _obj4 = {};
          this.list.map((val, key) => {
            if (val.supplier_id == this.$refs.head.publishInfo.supplier_id) {
              _obj1.type = val.supplier_name;
            }
          });
          _obj1.name = value.region_name;
          _obj1.value = value.details[0].sale_amount;
          this.regionList1.push(_obj1);
          if (this.publishId1) {
            this.list.map((val, key) => {
              if (val.supplier_id == this.publishId1) {
                _obj2.type = val.supplier_name;
              }
            });
            _obj2.name = value.region_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId1) {
                _obj2.value = val.sale_amount;
              }
            });
            this.regionList1.push(_obj2);
          }
          if (this.publishId2) {
            this.list.map((val, key) => {
              if (val.supplier_id == this.publishId2) {
                _obj3.type = val.supplier_name;
              }
            });
            _obj3.name = value.region_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId2) {
                _obj3.value = val.sale_amount;
              }
            });
            this.regionList1.push(_obj3);
          }
          if (this.publishId3) {
            this.list.map((value, key) => {
              if (value.supplier_id == this.publishId3) {
                _obj4.type = value.supplier_name;
              }
            });
            _obj4.name = value.region_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId3) {
                _obj4.value = val.sale_amount;
              }
            });
            this.regionList1.push(_obj4);
          }
        });
        _arr2.map((value, key) => {
          let _obj1 = {},
            _obj2 = {},
            _obj3 = {},
            _obj4 = {};
          this.list.map((val, key) => {
            if (val.supplier_id == this.$refs.head.publishInfo.supplier_id) {
              _obj1.type = val.supplier_name;
            }
          });
          _obj1.name = value.region_name;
          _obj1.value = value.details[0].sale_amount;
          this.regionList2.push(_obj1);
          if (this.publishId1) {
            this.list.map((val, key) => {
              if (val.supplier_id == this.publishId1) {
                _obj2.type = val.supplier_name;
              }
            });
            _obj2.name = value.region_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId1) {
                _obj2.value = val.sale_amount;
              }
            });
            this.regionList2.push(_obj2);
          }
          if (this.publishId2) {
            this.list.map((val, key) => {
              if (val.supplier_id == this.publishId2) {
                _obj3.type = val.supplier_name;
              }
            });
            _obj3.name = value.region_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId2) {
                _obj3.value = val.sale_amount;
              }
            });
            this.regionList2.push(_obj3);
          }
          if (this.publishId3) {
            this.list.map((value, key) => {
              if (value.supplier_id == this.publishId3) {
                _obj4.type = value.supplier_name;
              }
            });
            _obj4.name = value.region_name;
            value.details.map((val, index) => {
              if (val.supplier_id == this.publishId3) {
                _obj4.value = val.sale_amount;
              }
            });
            this.regionList2.push(_obj4);
          }
        });
        // console.log(111,this.regionList1,this.regionList2);
        let _this = this;
        setTimeout(() => {
          if (this.regionFirst) {
            _this.initStacking2();
            _this.initContrast2();
          } else {
            _this.stackingChart2.destroy();
            _this.contrastChart2.destroy();
            _this.initStacking2();
            _this.initContrast2();
          }
          _this.regionFirst = false;
        }, 500);
      } else {
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 出版社列表获取
    async getPublishList(val, _index) {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_name: val,
        page: 1,
        page_size: 1000,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await SUPPLIER_GETS(data);
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
    goodsArr() {
      this.allGoodsList = [];
      let _obj1 = {},
        _obj2 = {},
        _obj3 = {},
        _obj4 = {};
      _obj1.arr = this.goodsList1;
      _obj1.name = this.ownName;
      _obj1.class = "publish-block own";
      this.allGoodsList.push(_obj1);
      if (this.publishId1) {
        _obj2.arr = this.goodsList2;
        _obj2.class = "publish-block one";
        this.list.map((val, key) => {
          if (val.supplier_id == this.publishId1) {
            _obj2.name = val.supplier_name;
          }
        });
        this.allGoodsList.push(_obj2);
      }
      if (this.publishId2) {
        _obj3.arr = this.goodsList3;
        _obj3.class = "publish-block two";
        this.list.map((val, key) => {
          if (val.supplier_id == this.publishId2) {
            _obj3.name = val.supplier_name;
          }
        });
        this.allGoodsList.push(_obj3);
      }
      if (this.publishId3) {
        _obj4.arr = this.goodsList4;
        _obj4.class = "publish-block three";
        this.list.map((val, key) => {
          if (val.supplier_id == this.publishId3) {
            _obj4.name = val.supplier_name;
          }
        });
        this.allGoodsList.push(_obj4);
      }
      // console.log(this.allGoodsList);
    },
    cateChange(e) {},
    regionChange(e) {},
    changeTime() {
      this.isLoading = true;
      this.getData();
      this.getCore(this.$refs.head.publishInfo.supplier_id, 0);
      this.getTrend(this.$refs.head.publishInfo.supplier_id, 0);
      this.getGoodsList(this.$refs.head.publishInfo.supplier_id, 0);
      this.getCate();
      this.getRegion();
      if (this.publishId1 > 0) {
        this.getCore(this.publishId1, 1);
        this.getTrend(this.publishId1, 1);
        this.getGoodsList(this.publishId1, 1);
      }
      if (this.publishId2 > 0) {
        this.getCore(this.publishId2, 2);
        this.getTrend(this.publishId2, 2);
        this.getGoodsList(this.publishId2, 2);
      }
      if (this.publishId3 > 0) {
        this.getCore(this.publishId3, 3);
        this.getTrend(this.publishId3, 3);
        this.getGoodsList(this.publishId3, 3);
      }
    },
    initLineBrokenData() {
      let _this = this;
      this.changeChart = new Chart({
        container: "brokenLine",
        autoFit: true,
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
      this.changeChart.axis("temperature", {
        label: {
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
          if (city == "本社") {
            return "#5A8BEE";
          } else if (city == "竞社1") {
            return "#5FD9A9";
          } else if (city == "竞社2") {
            return "#5B6E8E";
          } else if (city == "竞社3") {
            return "#F0B830";
          }
        })
        .shape("circle")
        .style({ lineWidth: 2 })
        .tooltip(
          "month*temperature*city*range",
          function (month, temperature, city, range) {
            // tooltip的第一个参数写上需要显示的字段'item1*item2*...'；第二个参数为一个函数，该函数的参数为需要显示的字段。
            let _title;
            if (_this.$refs.time.dateType == 2) {
              _title = month + "（" + range + "）";
            } else {
              _title = month;
            }
            return {
              title: _title,
              name: city,
              value:
                _this.typeText == "sale_ratio"
                  ? temperature + "%"
                  : temperature,
            };
          }
        );

      this.changeChart
        .point()
        .position("month*temperature")
        .color("city", (city) => {
          if (city == "本社") {
            return "#5A8BEE";
          } else if (city == "竞社1") {
            return "#5FD9A9";
          } else if (city == "竞社2") {
            return "#5B6E8E";
          } else if (city == "竞社3") {
            return "#F0B830";
          }
        })
        .tooltip(false)
        .shape("circle");

      this.changeChart.render();
    },
    lineArr() {
      // console.log(this.selectList);
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
      let _this = this;
      setTimeout(() => {
        if (_this.isFirst) {
          _this.initLineBrokenData();
        } else {
          _this.changeChart.changeData(_this.brokenLineData);
        }
        // console.log(this.brokenLineData);
        _this.isFirst = false;
      }, 500);
      this.isLoading = false;
    },
    showCompete1() {
      this.show1 = true;
      this.show2 = false;
      this.show3 = false;
      this.$refs.time.showYear = false;
      this.publishList1 = [];
      for (let i = 0; i < this.list.length; i++) {
        if (
          !this.selectList.includes(this.list[i].supplier_name) &&
          this.list[i].supplier_name !== this.ownName
        ) {
          this.publishList1.push(this.list[i]);
        }
      }
    },
    showCompete2() {
      this.show1 = false;
      this.show2 = true;
      this.show3 = false;
      this.$refs.time.showYear = false;
      this.publishList2 = [];
      for (let i = 0; i < this.list.length; i++) {
        if (
          !this.selectList.includes(this.list[i].supplier_name) &&
          this.list[i].supplier_name !== this.ownName
        ) {
          this.publishList2.push(this.list[i]);
        }
      }
    },
    showCompete3() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = true;
      this.$refs.time.showYear = false;
      this.publishList3 = [];
      for (let i = 0; i < this.list.length; i++) {
        if (
          !this.selectList.includes(this.list[i].supplier_name) &&
          this.list[i].supplier_name !== this.ownName
        ) {
          this.publishList3.push(this.list[i]);
        }
      }
    },
    onSearch1() {
      this.publishList1 = [];
      this.list.map((value, key) => {
        if (
          value.supplier_name.indexOf(this.inputVal1) > -1 &&
          value.supplier_name !== this.ownName
        ) {
          this.publishList1.push(value);
        }
      });
    },
    onSearch2() {
      this.publishList2 = [];
      this.list.map((value, key) => {
        if (
          value.supplier_name.indexOf(this.inputVal2) > -1 &&
          value.supplier_name !== this.ownName
        ) {
          this.publishList2.push(value);
        }
      });
    },
    onSearch3() {
      // this.getPublishList(this.inputVal3, 3);
      this.publishList3 = [];
      this.list.map((value, key) => {
        if (
          value.supplier_name.indexOf(this.inputVal3) > -1 &&
          value.supplier_name !== this.ownName
        ) {
          this.publishList3.push(value);
        }
      });
    },
    onSelect1(item1, index1, _index) {
      this.show1 = false;
      this.close1 = true;
      this.publishId1 = item1.supplier_id;
      this.inputVal1 = "";
      this.publishList1 = [];
      let _name = this.text1;
      if (this.selectList.includes(_name)) {
        this.selectList = this.selectList.filter((value, key) => {
          return value != _name;
        });
      }
      this.text1 = item1.supplier_name;
      if (
        this.selectList.includes(item1.supplier_name) &&
        item1.supplier_name !== this.ownName
      ) {
      } else {
        this.selectList.push(item1.supplier_name);
      }
      this.getCore(this.publishId1, 1);
      this.getTrend(this.publishId1, 1);
      this.getGoodsList(this.publishId1, 1);
      this.getCate();
      this.getRegion();
    },
    onSelect2(item2, index2, _index) {
      this.show2 = false;
      this.close2 = true;
      this.publishId2 = item2.supplier_id;
      this.inputVal2 = "";
      this.publishList2 = [];
      let _name = this.text2;
      if (this.selectList.includes(_name)) {
        this.selectList = this.selectList.filter((value, key) => {
          return value != _name;
        });
      }
      this.text2 = item2.supplier_name;
      if (
        this.selectList.includes(item2.supplier_name) &&
        item2.supplier_name !== this.ownName
      ) {
      } else {
        this.selectList.push(item2.supplier_name);
      }
      this.getCore(this.publishId2, 2);
      this.getTrend(this.publishId2, 2);
      this.getGoodsList(this.publishId2, 2);
      this.getCate();
      this.getRegion();
    },
    onSelect3(item3, index3, _index) {
      this.show3 = false;
      this.close3 = true;
      this.publishId3 = item3.supplier_id;
      this.inputVal3 = "";
      this.publishList3 = [];
      let _name = this.text3;
      if (this.selectList.includes(_name)) {
        this.selectList = this.selectList.filter((value, key) => {
          return value != _name;
        });
      }
      this.text3 = item3.supplier_name;
      if (
        this.selectList.includes(item3.supplier_name) &&
        item3.supplier_name !== this.ownName
      ) {
      } else {
        this.selectList.push(item3.supplier_name);
      }
      this.getCore(this.publishId3, 3);
      this.getTrend(this.publishId3, 3);
      this.getGoodsList(this.publishId3, 3);
      this.getCate();
      this.getRegion();
    },
    delete1() {
      this.close1 = false;
      this.show1 = false;
      this.publishId1 = 0;
      this.selectList = this.selectList.filter((value, key) => {
        return value != this.text1;
      });
      this.text1 = "+设置对比";
      this.chooseInfo1.sale_total = 0;
      this.chooseInfo1.sale_rank = 0;
      this.chooseInfo1.market_share = 0;
      this.chooseInfo1.cate_count = 0;
      this.chooseList1 = [];
      this.$refs.time.showYear = false;
      this.lineArr();
      this.goodsList2 = [];
      this.goodsArr();
      this.getCate();
      this.getRegion();
    },
    delete2() {
      this.close2 = false;
      this.show2 = false;
      this.publishId2 = 0;
      this.selectList = this.selectList.filter((value, key) => {
        return value != this.text2;
      });
      this.text2 = "+设置对比";
      this.chooseInfo2.sale_total = 0;
      this.chooseInfo2.sale_rank = 0;
      this.chooseInfo2.market_share = 0;
      this.chooseInfo2.cate_count = 0;
      this.chooseList2 = [];
      this.$refs.time.showYear = false;
      this.lineArr();
      this.goodsList3 = [];
      this.goodsArr();
      this.getCate();
      this.getRegion();
    },
    delete3() {
      this.close3 = false;
      this.show3 = false;
      this.publishId3 = 0;
      this.selectList = this.selectList.filter((value, key) => {
        return value != this.text3;
      });
      this.text3 = "+设置对比";
      this.chooseInfo3.sale_total = 0;
      this.chooseInfo3.sale_rank = 0;
      this.chooseInfo3.market_share = 0;
      this.chooseInfo3.cate_count = 0;
      this.chooseList3 = [];
      this.$refs.time.showYear = false;
      this.lineArr();
      this.goodsList4 = [];
      this.goodsArr();
      this.getCate();
      this.getRegion();
    },
    coreTypeChange(text) {
      this.typeText = text;
      this.getTrend(this.$refs.head.publishInfo.supplier_id, 0);
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
    bodyClick() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
      if (this.pagePower) this.$refs.time.showYear = false;
    },
    closeDom() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
    },
    initStacking1() {
      let _this = this;
      this.stackingChart1 = new Chart({
        container: "stacking1",
        autoFit: true,
        height: 420,
      });
      this.stackingChart1.data(this.cateList1);
      this.stackingChart1.scale("value", {
        alias: " ",
      });
      this.stackingChart1.axis("name", {
        // tickLine: null,
        // line: null,
      });
      this.stackingChart1.axis("value", {
        // label: null,
        title: {
          style: {
            fontSize: 14,
            fontWeight: 300,
          },
        },
      });
      this.stackingChart1.legend({
        position: "bottom",
      });
      this.stackingChart1.coordinate("rect").transpose();
      this.stackingChart1.tooltip({
        shared: true,
        showMarkers: false,
      });
      this.stackingChart1.interaction("active-region");
      this.stackingChart1
        .interval()
        .adjust("stack")
        .position("name*value")
        .color("type", (type) => {
          let _name1, _name2, _name3, _name4;
          _this.list.map((val, index) => {
            if (val.supplier_id == _this.publishId1) {
              _name1 = val.supplier_name;
            } else if (val.supplier_id == _this.publishId2) {
              _name2 = val.supplier_name;
            } else if (val.supplier_id == _this.publishId3) {
              _name3 = val.supplier_name;
            } else if (
              val.supplier_id == _this.$refs.head.publishInfo.supplier_id
            ) {
              _name4 = val.supplier_name;
            }
          });
          // console.log(type,_name1, _name2, _name3,_name4);
          if (type == _name4) {
            return "#5A8BEE";
          } else if (type == _name1) {
            return "#5FD9A9";
          } else if (type == _name2) {
            return "#5B6E8E";
          } else if (type == _name3) {
            return "#F0B830";
          } else {
            return "#5A8BEE";
          }
        })
        .size(20);
      this.stackingChart1.render();
    },
    initContrast1() {
      let _this = this;
      this.contrastChart1 = new Chart({
        container: "contrast1",
        autoFit: true,
        height: 420,
      });

      this.contrastChart1.data(this.cateList2);

      this.contrastChart1.scale("value", { nice: true });

      this.contrastChart1.legend({
        position: "bottom",
      });

      this.contrastChart1.tooltip({
        showMarkers: false,
      });

      this.contrastChart1
        .interval()
        .position("name*value")
        .color("type", (type) => {
          let _name1, _name2, _name3, _name4;
          _this.list.map((val, index) => {
            if (val.supplier_id == _this.publishId1) {
              _name1 = val.supplier_name;
            } else if (val.supplier_id == _this.publishId2) {
              _name2 = val.supplier_name;
            } else if (val.supplier_id == _this.publishId3) {
              _name3 = val.supplier_name;
            } else if (
              val.supplier_id == _this.$refs.head.publishInfo.supplier_id
            ) {
              _name4 = val.supplier_name;
            }
          });
          if (type == _name4) {
            return "#5A8BEE";
          } else if (type == _name1) {
            return "#5FD9A9";
          } else if (type == _name2) {
            return "#5B6E8E";
          } else if (type == _name3) {
            return "#F0B830";
          } else {
            return "#5A8BEE";
          }
        })
        // .size(20)
        .adjust([
          {
            type: "dodge",
            marginRatio: 0,
          },
        ]);

      this.contrastChart1.interaction("element-list-highlight");

      this.contrastChart1.render();
    },
    initStacking2() {
      let _this = this;
      this.stackingChart2 = new Chart({
        container: "stacking2",
        autoFit: true,
        height: 420,
      });
      this.stackingChart2.data(this.regionList1);
      this.stackingChart2.scale("value", {
        alias: " ",
      });
      this.stackingChart2.axis("name", {
        // tickLine: null,
        // line: null,
      });
      this.stackingChart2.axis("value", {
        // label: null,
        title: {
          style: {
            fontSize: 14,
            fontWeight: 300,
          },
        },
      });
      this.stackingChart2.legend({
        position: "bottom",
      });
      this.stackingChart2.coordinate("rect").transpose();
      this.stackingChart2.tooltip({
        shared: true,
        showMarkers: false,
      });
      this.stackingChart2.interaction("active-region");
      this.stackingChart2
        .interval()
        .adjust("stack")
        .position("name*value")
        .color("type", (type) => {
          let _name1, _name2, _name3, _name4;
          _this.list.map((val, index) => {
            if (val.supplier_id == _this.publishId1) {
              _name1 = val.supplier_name;
            } else if (val.supplier_id == _this.publishId2) {
              _name2 = val.supplier_name;
            } else if (val.supplier_id == _this.publishId3) {
              _name3 = val.supplier_name;
            } else if (
              val.supplier_id == _this.$refs.head.publishInfo.supplier_id
            ) {
              _name4 = val.supplier_name;
            }
          });
          if (type == _name4) {
            return "#5A8BEE";
          } else if (type == _name1) {
            return "#5FD9A9";
          } else if (type == _name2) {
            return "#5B6E8E";
          } else if (type == _name3) {
            return "#F0B830";
          } else {
            return "#5A8BEE";
          }
        })
        .size(20);
      this.stackingChart2.render();
    },
    initContrast2() {
      let _this = this;
      this.contrastChart2 = new Chart({
        container: "contrast2",
        autoFit: true,
        height: 420,
      });

      this.contrastChart2.data(this.regionList2);

      this.contrastChart2.scale("value", { nice: true });

      this.contrastChart2.legend({
        position: "bottom",
      });

      this.contrastChart2.tooltip({
        showMarkers: false,
      });

      this.contrastChart2
        .interval()
        .position("name*value")
        .color("type", (type) => {
          let _name1, _name2, _name3, _name4;
          _this.list.map((val, index) => {
            if (val.supplier_id == _this.publishId1) {
              _name1 = val.supplier_name;
            } else if (val.supplier_id == _this.publishId2) {
              _name2 = val.supplier_name;
            } else if (val.supplier_id == _this.publishId3) {
              _name3 = val.supplier_name;
            } else if (
              val.supplier_id == _this.$refs.head.publishInfo.supplier_id
            ) {
              _name4 = val.supplier_name;
            }
          });
          if (type == _name4) {
            return "#5A8BEE";
          } else if (type == _name1) {
            return "#5FD9A9";
          } else if (type == _name2) {
            return "#5B6E8E";
          } else if (type == _name3) {
            return "#F0B830";
          } else {
            return "#5A8BEE";
          }
        })
        // .size(20)
        .adjust([
          {
            type: "dodge",
            marginRatio: 0,
          },
        ]);

      this.contrastChart2.interaction("element-list-highlight");

      this.contrastChart2.render();
    },
    publisherChange() {
      this.isLoading = true;
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText =
        this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.dateType = 2;
      this.typeText = "sale_total";
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      this.delete1();
      this.delete2();
      this.delete3();
      this.getData();
      this.selectList = [];
      this.cateRadio = 1;
      this.regionRadio = 1;
      if (!this.pagePower) {
        this.isFirst = true;
      }
      this.getCore(this.$refs.head.publishInfo.supplier_id, 0);
      this.getTrend(this.$refs.head.publishInfo.supplier_id, 0);
      this.getGoodsList(this.$refs.head.publishInfo.supplier_id, 0);
      this.getCate();
      this.getRegion();
    },
  },
};
</script>
