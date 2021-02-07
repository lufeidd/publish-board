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
                    v-if="selectList.length == 0"
                    style="margin-top: 10px"
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
                              >浙江摄影</span
                            >
                          </td>
                          <td style="text-align: right">销售指数</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td></td>
                          <td style="text-align: right">
                            <span class="main-font">100000</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div
                    class="clearfix"
                    v-if="selectList.length == 1"
                    style="margin-top: 10px"
                  >
                    <div class="table float-left" style="width: 520px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="360" />
                          <col width="160" />
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
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="table float-right" style="width: 520px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="360" />
                          <col width="160" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span class="publish-block one"></span>
                              <span
                                class="main-font"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                "
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    class="clearfix"
                    v-if="selectList.length == 2"
                    style="margin-top: 10px"
                  >
                    <div class="table float-left" style="width: 360px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="220" />
                          <col width="140" />
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
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="table float-left" style="width: 360px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="220" />
                          <col width="140" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span class="publish-block one"></span>
                              <span
                                class="main-font"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                "
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="table float-right" style="width: 360px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="220" />
                          <col width="140" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span class="publish-block two"></span>
                              <span
                                class="main-font"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                "
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    class="clearfix"
                    v-if="selectList.length == 3"
                    style="margin-top: 10px"
                  >
                    <div class="table float-left" style="width: 270px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="170" />
                          <col width="100" />
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
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="table float-left" style="width: 270px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="170" />
                          <col width="100" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span class="publish-block one"></span>
                              <span
                                class="main-font"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                "
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="table float-left" style="width: 270px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="170" />
                          <col width="100" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span class="publish-block two"></span>
                              <span
                                class="main-font"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                "
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="table float-right" style="width: 270px">
                      <table style="table-layout: fixed">
                        <colgroup>
                          <col width="170" />
                          <col width="100" />
                        </colgroup>
                        <thead>
                          <tr>
                            <td>
                              <span class="publish-block three"></span>
                              <span
                                class="main-font"
                                style="
                                  display: inline-block;
                                  vertical-align: middle;
                                  margin-left: 10px;
                                "
                                >浙江摄影</span
                              >
                            </td>
                            <td style="text-align: right">销售指数</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td></td>
                            <td style="text-align: right">
                              <span class="main-font">100000</span>
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
                  <div class="float-right" style="font-weight:normal;">
                    <a-radio-group name="radioGroup" :default-value="1">
                      <a-radio :value="1" style="font-siz">堆积图</a-radio>
                      <a-radio :value="2">对比图</a-radio>
                    </a-radio-group>
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
                      <col width="345" />
                      <col width="160" />
                      <col width="160" />
                      <col width="320" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td style="text-align: center">排名</td>
                        <td>出版单位</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">行业排名</td>
                        <td style="text-align: right"></td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item, index) in list" :key="index">
                        <td style="text-align: center">{{ index + 1 }}</td>
                        <td>
                          <span class="main-font">{{
                            item.supplier_name
                          }}</span>
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.sale_total">{{
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
                        <td style="text-align: right"></td>
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
    };
  },
  mounted() {
    this.getData();
    this.getCore(this.$refs.head.publishInfo.supplier_id, 0);
    this.getTrend(this.$refs.head.publishInfo.supplier_id, 0);
  },
  updated() {},
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        date_type: this.$refs.time.dateType,
        // start_date: this.oneDay,
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMPETE_MONITOR_PUBLISHER_LISTS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.list = [];
        this.list = res.data;
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
    changeTime() {
      this.isLoading = true;
      this.getData();
      this.getCore(this.$refs.head.publishInfo.supplier_id, 0);
      this.getTrend(this.$refs.head.publishInfo.supplier_id, 0);
      if (this.publishId1 > 0) {
        this.getCore(this.publishId1, 1);
        this.getTrend(this.publishId1, 1);
      }
      if (this.publishId2 > 0) {
        this.getCore(this.publishId2, 2);
        this.getTrend(this.publishId2, 2);
      }
      if (this.publishId3 > 0) {
        this.getCore(this.publishId3, 3);
        this.getTrend(this.publishId3, 3);
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
            if (this.typeText == "sale_ratio") {
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
              value: temperature, // 这里也可以通过调用其他自定义函数的方式，去对数据进行更深层次的变换。但要注意this的指向问题！
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
        .shape("circle");

      this.changeChart.render();
    },
    lineArr() {
      console.log(this.selectList);
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
        if (!this.selectList.includes(this.list[i].supplier_name)) {
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
        if (!this.selectList.includes(this.list[i].supplier_name)) {
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
        if (!this.selectList.includes(this.list[i].supplier_name)) {
          this.publishList3.push(this.list[i]);
        }
      }
    },
    onSearch1() {
      // console.log(this.inputVal1);
      // this.getPublishList(this.inputVal1, 1);
      this.publishList1 = [];
      this.list.map((value, key) => {
        if (value.supplier_name.indexOf(this.inputVal1) > -1) {
          this.publishList1.push(value);
        }
      });
    },
    onSearch2() {
      // this.getPublishList(this.inputVal2, 2);
      this.publishList2 = [];
      this.list.map((value, key) => {
        if (value.supplier_name.indexOf(this.inputVal2) > -1) {
          this.publishList2.push(value);
        }
      });
    },
    onSearch3() {
      // this.getPublishList(this.inputVal3, 3);
      this.publishList3 = [];
      this.list.map((value, key) => {
        if (value.supplier_name.indexOf(this.inputVal3) > -1) {
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
      if (this.selectList.includes(item1.supplier_name)) {
      } else {
        this.selectList.push(item1.supplier_name);
      }
      this.getCore(this.publishId1, 1);
      this.getTrend(this.publishId1, 1);
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
      if (this.selectList.includes(item2.supplier_name)) {
      } else {
        this.selectList.push(item2.supplier_name);
      }
      this.getCore(this.publishId2, 2);
      this.getTrend(this.publishId2, 2);
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
      if (this.selectList.includes(item3.supplier_name)) {
      } else {
        this.selectList.push(item3.supplier_name);
      }
      this.getCore(this.publishId3, 3);
      this.getTrend(this.publishId3, 3);
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
      this.$refs.time.showYear = false;
    },
    closeDom() {
      this.show1 = false;
      this.show2 = false;
      this.show3 = false;
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
      if (!this.pagePower) {
        this.isFirst = true;
      }
      this.getCore(this.$refs.head.publishInfo.supplier_id, 0);
      this.getTrend(this.$refs.head.publishInfo.supplier_id, 0);
    },
  },
};
</script>
