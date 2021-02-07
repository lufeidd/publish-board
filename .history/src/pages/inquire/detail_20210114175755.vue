<template>
  <div id="ownIndexPage" @click="bodyClick">
    <HeadNav
      type="inquire"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="inquire" sort="search"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container">
            <div class="model-container general-descrip">
              <div
                class="model-bg general-container"
                style="padding-bottom: 0"
                v-if="generalPower"
              >
                <div class="company">{{ supplier_name }}</div>
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
                <!-- 标签 -->
                <div class="tabs">
                  <a-tabs :activeKey="tabKey" @change="callback">
                    <a-tab-pane key="1" tab="销售走势"></a-tab-pane>
                    <a-tab-pane key="2" tab="品种列表"></a-tab-pane>
                    <a-tab-pane key="3" tab="核心类目"></a-tab-pane>
                    <a-tab-pane key="4" tab="读者画像"></a-tab-pane>
                  </a-tabs>
                </div>
              </div>
              <div
                class="model-bg"
                style="height: 322px; position: relative"
                v-else
              >
                <div
                  style="
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    font-size: 12px;
                    margin-left: -36px;
                    margin-top: -9px;
                  "
                >
                  暂无权限查看
                </div>
              </div>
            </div>
            <!-- 核心数据 -->
            <div v-if="corePower">
              <div class="model-container" v-if="tabKey == '1'">
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
                      v-model="chooseCategory1"
                      @click.stop="cateClick"
                      @change="selectCategory1"
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
              <!-- 核心数据监控 -->
              <div class="model-container core-data" v-if="tabKey == '1'">
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
                    <div
                      id="broken-line"
                      v-if="brokenLineData.length > 0"
                    ></div>
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
            </div>
            <!-- 核心数据监控无权限 -->
            <div class="model-container" v-if="tabKey == '1' && !goodsPower">
              <div class="model-bg">
                <div class="section-title">核心数据监控</div>
                <div style="height: 287px; position: relative">
                  <div
                    style="
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      font-size: 12px;
                      margin-left: -36px;
                      margin-top: -9px;
                    "
                  >
                    暂无权限查看
                  </div>
                </div>
              </div>
            </div>
            <!-- 品种列表时间选择 -->
            <div v-if="goodsPower">
              <div class="model-container" v-if="tabKey == '2'">
                <div class="model-bg clearfix choose">
                  <div class="float-left"></div>
                  <div class="float-right">
                    <TimeChoose
                      ref="time"
                      @changeTime="changeTime"
                      @closeDom="closeDom"
                    ></TimeChoose>
                  </div>
                </div>
              </div>
              <!-- 品种列表 -->
              <div class="model-container" v-if="tabKey == '2'">
                <div class="model-bg" style="min-height: 271px">
                  <div class="section-title">品种列表</div>
                  <div class="table" style="margin-bottom: 20px">
                    <table style="table-layout: fixed">
                      <colgroup>
                        <col width="80" />
                        <col width="240" />
                        <col width="160" />
                        <col width="150" />
                        <col width="120" />
                        <col width="100" />
                        <col width="100" />
                        <col width="100" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>排名</td>
                          <td>品种</td>
                          <td>作者</td>
                          <td style="text-align: center">类目</td>
                          <td style="text-align: right">销售指数</td>
                          <td style="text-align: right">类目排名</td>
                          <td style="text-align: right">行业排名</td>
                          <td style="text-align: right">操作</td>
                        </tr>
                      </thead>
                      <tbody v-if="goodsList.length > 0">
                        <tr v-for="(item, index) in goodsList" :key="index">
                          <td>{{ item.sale_rank }}</td>
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
                                v-if="item.authors.length == 1"
                                @click.stop="
                                  $toAuthor(item.authors[0].author_id)
                                "
                              >
                                {{ item.goods_author }}
                              </div>
                              <div
                                class="author-name click-font"
                                v-if="item.authors.length > 1"
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
                            {{ item.cate_node_2 }}
                            <span v-if="item.cate_node_3"
                              >＞ {{ item.cate_node_3 }}</span
                            >
                          </td>
                          <td style="text-align: right">
                            {{ item.sale_total }}
                          </td>
                          <td style="text-align: right">
                            {{ item.in_all_cate_rank }}
                          </td>
                          <td style="text-align: right">
                            {{ item.in_all_rank }}
                          </td>
                          <td style="text-align: right">
                            <span
                              class="click-font"
                              @click="$toDetail(item.goods_id)"
                              >查看</span
                            >
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="8">
                            <a-empty />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- 分页 -->
                  <div class="page" style="text-align: right; padding: 15px">
                    <a-pagination
                      :show-total="(total) => `共 ${total} 条数据`"
                      :default-current="1"
                      v-model="page1"
                      :total="total1"
                      :defaultPageSize="pageSize1"
                      @change="onShowSizeChange1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 品种列表无权限 -->
            <div class="model-container" v-if="tabKey == '2' && !goodsPower">
              <div class="model-bg">
                <div class="section-title">品种列表</div>
                <div style="height: 287px; position: relative">
                  <div
                    style="
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      font-size: 12px;
                      margin-left: -36px;
                      margin-top: -9px;
                    "
                  >
                    暂无权限查看
                  </div>
                </div>
              </div>
            </div>
            <div v-if="catePower">
              <!-- 核心类目选择时间 -->
              <div class="model-container" v-if="tabKey == '3'">
                <div class="model-bg clearfix" style="padding: 8px 15px">
                  <div class="float-left" style="margin-top: 6px">
                    <a-dropdown :trigger="['click']" placement="bottomLeft">
                      <a
                        class="ant-dropdown-link"
                        @click="(e) => e.preventDefault()"
                        style="font-size: 12px; color: #4576db"
                      >
                        {{ chooseCategory.name }}
                        <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay">
                        <a-menu-item>
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectCategory('one')"
                            >一级类目</a
                          >
                        </a-menu-item>
                        <a-menu-item>
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectCategory('two')"
                            >二级类目</a
                          >
                        </a-menu-item>
                        <a-menu-item>
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectCategory('three')"
                            >三级类目</a
                          >
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </div>
                  <div class="float-right">
                    <TimeChoose
                      ref="time"
                      @changeTime="changeTime"
                    ></TimeChoose>
                  </div>
                </div>
              </div>
              <!-- 核心类目 -->
              <div class="model-container" v-if="tabKey == '3'">
                <div class="model-bg" style="min-height: 271px">
                  <div class="section-title">核心类目</div>
                  <div class="table" style="margin-bottom: 20px">
                    <table style="table-layout: fixed">
                      <colgroup>
                        <col width="60" />
                        <col width="160" />
                        <col width="100" />
                        <col width="260" />
                        <col width="80" />
                        <col width="80" />
                        <col width="320" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>排名</td>
                          <td>类目</td>
                          <td style="text-align: right">销售指数</td>
                          <td style="text-align: right">完整类目</td>
                          <td style="text-align: right">本社排名</td>
                          <td style="text-align: right">类目占有率</td>
                          <td>说明</td>
                        </tr>
                      </thead>
                      <tbody v-if="cateList.length > 0">
                        <tr v-for="(item, index) in cateList" :key="index">
                          <td>{{ item.sale_rank }}</td>
                          <td>
                            <span class="main-font">{{
                              item.category_name
                            }}</span>
                          </td>
                          <td style="text-align: right">
                            <span class="main-font">{{ item.sale_total }}</span>
                          </td>
                          <td style="text-align: right">
                            <span v-if="item.parents.length > 0"
                              >{{ item.parents.join(">") }}></span
                            >{{ item.category_name }}
                          </td>
                          <td style="text-align: right">
                            {{ item.supplier_rank }}
                          </td>
                          <td style="text-align: right">
                            {{ (item.cate_ratio * 100).toFixed(2) }}%
                          </td>
                          <td>
                            <span v-if="item.memo.goods_nums">
                              有{{
                                item.memo.goods_nums
                              }}个品种进入类目前100，《
                              <span>{{ item.memo.goods_name }}</span>
                              》排名第{{ item.memo.goods_rank }}位
                            </span>
                            <span v-else>--</span>
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
                  <!-- 分页 -->
                  <div class="page" style="text-align: right; padding: 15px">
                    <a-pagination
                      :show-total="(total) => `共 ${total} 条数据`"
                      :default-current="1"
                      v-model="page2"
                      :total="total2"
                      :defaultPageSize="pageSize2"
                      @change="onShowSizeChange2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- 核心类目无权限 -->
            <div class="model-container" v-if="tabKey == '3' && !catePower">
              <div class="model-bg">
                <div class="section-title">核心类目</div>
                <div style="height: 287px; position: relative">
                  <div
                    style="
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      font-size: 12px;
                      margin-left: -36px;
                      margin-top: -9px;
                    "
                  >
                    暂无权限查看
                  </div>
                </div>
              </div>
            </div>
            <div v-if="readerPower">
              <!-- 读者画像 -->
              <div class="model-container" v-if="tabKey == '4'">
                <div class="model-bg">
                  <div class="section-title">读者概况</div>
                  <div class="clearfix" style="padding: 15px">
                    <div class="float-left">
                      <div class="reader-block">
                        <div>
                          <a-icon type="line-chart" />
                          <span class="secondary-font">读者基数</span>
                        </div>
                        <div class="data-font">
                          {{ readerBase }}
                        </div>
                      </div>
                    </div>
                    <div class="float-left">
                      <div class="reader-block">
                        <div>
                          <a-icon type="line-chart" />
                          <span class="secondary-font">人均购买</span>
                        </div>
                        <div class="data-font">{{ readerAverage }}本</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 基础特征 -->
              <div class="model-container basic" v-if="tabKey == '4'">
                <div class="model-bg">
                  <div class="section-title">基础特征</div>
                  <div class="feature" style="padding: 15px">
                    <div class="clearfix">
                      <div class="float-left" style="width: 500px">
                        <div>性别分布</div>
                        <div v-if="ringData1.length > 0">
                          <div
                            id="ring1"
                            style="width: 400px; margin-top: 20px"
                          ></div>
                        </div>
                        <div style="width: 500px" v-else>
                          <div class="no-data">数据量较小，暂不支持分析</div>
                        </div>
                        <div style="margin-top: 20px">消费能力</div>
                        <div v-if="ringData2.length > 0">
                          <div
                            id="ring2"
                            style="width: 400px; margin-top: 20px"
                          ></div>
                        </div>
                        <div style="width: 500px" v-else>
                          <div class="no-data">数据量较小，暂不支持分析</div>
                        </div>
                      </div>
                      <div
                        class="float-left"
                        style="margin-left: 10px; width: 500px"
                      >
                        <div style="margin-left: 40px">年龄分布</div>
                        <div v-if="columnData1.length > 0">
                          <div
                            id="column1"
                            style="
                              width: 400px;
                              margin-left: 90px;
                              margin-top: 20px;
                            "
                          ></div>
                        </div>
                        <div style="width: 500px; margin-left: 38px" v-else>
                          <div class="no-data">数据量较小，暂不支持分析</div>
                        </div>
                        <div style="margin-top: 20px; margin-left: 40px">
                          兴趣分布
                        </div>
                        <div v-if="columnData2.length > 0">
                          <div
                            id="column2"
                            style="
                              width: 400px;
                              margin-left: 90px;
                              margin-top: 20px;
                            "
                          ></div>
                        </div>
                        <div style="width: 500px; margin-left: 38px" v-else>
                          <div class="no-data">数据量较小，暂不支持分析</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 地域 -->
              <div class="model-container" v-if="tabKey == '4'">
                <div class="model-bg">
                  <div class="section-title">地域</div>
                  <div
                    class="clearfix"
                    style="padding-bottom: 15px"
                    v-if="barData1.length > 0"
                  >
                    <div
                      class="float-left"
                      style="position: relative; margin-top: 15px"
                    >
                      <div id="map" style="height: 284px; width: 520px"></div>
                    </div>
                    <div
                      class="float-left"
                      style="width: 500px; margin-left: 50px"
                    >
                      <p style="margin-top: 15px">地域（省）</p>
                      <div id="bar-chart1"></div>
                    </div>
                  </div>
                  <div class="no-data" v-else>数据量较小，暂不支持分析</div>
                </div>
              </div>
              <!-- 偏好 -->
              <div class="model-container" v-if="tabKey == '4'">
                <div class="model-bg">
                  <div class="section-title">偏好</div>
                  <div class="clearfix" style="padding: 10px 15px 15px 15px">
                    <div
                      class="float-left"
                      style="width: 500px; margin-right: 45px"
                    >
                      <p>类目偏好</p>
                      <div v-if="barData2.length > 0">
                        <div id="bar-chart2"></div>
                      </div>
                      <div class="no-data" v-else>数据量较小，暂不支持分析</div>
                    </div>
                    <div class="float-left" style="width: 500px">
                      <p>作家偏好</p>
                      <div v-if="barData3.length > 0">
                        <div id="bar-chart3"></div>
                      </div>
                      <div class="no-data" v-else>数据量较小，暂不支持分析</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 读者画像无权限 -->
            <div class="model-container" v-if="tabKey == '4' && !readerPower">
              <div class="model-bg">
                <div class="section-title">读者画像</div>
                <div style="height: 287px; position: relative">
                  <div
                    style="
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      font-size: 12px;
                      margin-left: -36px;
                      margin-top: -9px;
                    "
                  >
                    暂无权限查看
                  </div>
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
<style lang="scss" scoped src="@/style/scss/pages/publish/index.scss"></style>
<script>
import { Chart, registerShape } from "@antv/g2";
import DataSet from "@antv/data-set";
import { Scene } from "@antv/l7";
import { CountryLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";
import {
  QUERY_SUPPLIER_INFO,
  QUERY_SUPPLIER_GOODSRANK,
  QUERY_SUPPLIER_CATERANK,
  QUERY_SUPPLIER_READER,
  QUERY_SUPPLIER_KERNELDATA,
  QUERY_SUPPLIER_KERNELCHART,
} from "../../apis/inquire.js";
import { COMMON_PUBLISHERCATEGORY } from "../../apis/common.js";
export default {
  data() {
    return {
      corePower: true,
      generalPower: true,
      goodsPower: true,
      catePower: true,
      readerPower: true,
      supplier_id: 3202,
      supplier_name: "",
      account: {
        on_sale_num: 2888, // 在售品种数
        reader_num: 28633, // 读者基数
      },
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
      tabKey: "1",
      isLoading: true,
      page1: 1,
      pageSize1: 20,
      total1: 0,
      page2: 1,
      pageSize2: 20,
      total2: 0,
      goodsList: [],
      cateList: [],
      chooseCategory: {
        name: "一级类目",
        level: "one",
      },
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
      categoryList: [],
      chooseCategory1: [0],
      catePopup: false,
      brokenLineData: [],
      changeChart: null,
      isFirst:true,
      typeText: "sale_total",
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
    };
  },
  mounted() {
    this.supplier_id = this.$route.query.id;
    this.supplier_name = this.$route.query.name;
    this.dateType = this.$refs.time.dateType;
    this.getData();
    this.getFirstCategory();
    this.getCore();
    this.getCoreData();
  },
  methods: {
    // 获取核心数据
    async getCore() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.supplier_id,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        goods_cate: this.chooseCategory1[this.chooseCategory1.length - 1],
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      if (this.chooseCategory1[0] !== 0) {
        data.cate_level = this.chooseCategory1.length == 1 ? "one" : "two";
      }
      data.sign = this.$getSign(data);
      let res = await QUERY_SUPPLIER_KERNELDATA(data);
      if (res.code == 0) {
        this.corePower = true;
        this.sale_total_info = res.data.sale_total_info;
        this.sale_rank_info = res.data.sale_rank_info;
        this.sale_ratio_info = res.data.sale_ratio_info;
        this.onsale_goods_info = res.data.onsale_goods_info;
      } else {
        if (res.code == 1009) {
          this.corePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 获取核心数据图形
    async getCoreData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.supplier_id,
        date_type: this.$refs.time.dateType,
        type: this.typeText,
        start_date: this.$refs.time.oneDay,
        goods_cate: this.chooseCategory1[this.chooseCategory1.length - 1],
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      if (this.chooseCategory1[0] !== 0) {
        data.cate_level = this.chooseCategory1.length == 1 ? "one" : "two";
      }
      data.sign = this.$getSign(data);
      let res = await QUERY_SUPPLIER_KERNELCHART(data);
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
          setTimeout(() => {
            if(_this.isFirst){
              _this.initLineData();
            } else{
              _this.changeChart.destroy();
              _this.initLineData();
            }       
            _this.isFirst = false;
          }, 500);
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.corePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 获取初级分类列表
    async getFirstCategory() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.supplier_id,
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
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.supplier_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await QUERY_SUPPLIER_INFO(data);
      if (res.code == 0) {
        this.generalPower = true;
        this.account = res.data;
        let _count = this.account.on_sale_num;
        this.cowData = this.cowData.map((value, key) => {
          if (value.type == "滞销") {
            value.sold = res.data.goods_num.num_short
              ? Math.round((res.data.goods_num.num_short / _count) * 100)
              : 0;
          } else if (value.type == "一般") {
            value.sold = res.data.goods_num.num_normal
              ? Math.round((res.data.goods_num.num_normal / _count) * 100)
              : 0;
          } else if (value.type == "常销") {
            value.sold = res.data.goods_num.num_long
              ? Math.round((res.data.goods_num.num_long / _count) * 100)
              : 0;
          } else if (value.type == "畅销") {
            value.sold = res.data.goods_num.num_hot
              ? Math.round((res.data.goods_num.num_hot / _count) * 100)
              : 0;
          } else if (value.type == "新品") {
            value.sold = res.data.goods_num.num_new
              ? Math.round((res.data.goods_num.num_new / _count) * 100)
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
        setTimeout(() => {
          this.initData();
          this.initRadarData();
        }, 500);
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.generalPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 品种列表
    async getGoodsData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.supplier_id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        page: this.page1,
        page_size: this.pageSize1,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await QUERY_SUPPLIER_GOODSRANK(data);
      if (res.code == 0) {
        this.goodsPower = true;
        this.goodsList = [];
        this.total1 = res.data.total_count;
        res.data.list.map((value, key) => {
          value.active = false;
          this.goodsList.push(value);
        });
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.goodsPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 核心类目
    async getCateData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.supplier_id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        category_level: this.chooseCategory.level,
        page: this.page2,
        page_size: this.pageSize2,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await QUERY_SUPPLIER_CATERANK(data);
      if (res.code == 0) {
        this.catePower = true;
        this.cateList = [];
        this.cateList = res.data.category_ranks;
        this.total2 = res.data.count;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.catePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 读者画像
    async getReaderData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.supplier_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await QUERY_SUPPLIER_READER(data);
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
            if (_this.ringData1.length > 0) {
              _this.initRing1();
            }
            if (_this.columnData1.length > 0) {
              _this.initColumn1();
            }
            if (_this.ringData2.length > 0) {
              _this.initRing2();
            }
            if (_this.columnData2.length > 0) {
              _this.initColumn2();
            }
            if (_this.barData1.length > 0) {
              _this.initMap();
            }
            if (_this.barData1.length > 0) {
              _this.inintBar1(_this.barData1[0].value);
            }
            if (_this.barData2.length > 0) {
              _this.inintBar2(_this.barData2[0].value);
            }
            if (_this.barData3.length > 0) {
              _this.inintBar3(_this.barData3[0].value);
            }
          }, 500);
        }
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.readerPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    callback(key) {
      this.isLoading = true;
      this.tabKey = key;
      let _this = this;
      this.$nextTick(() => {
        if (key == "1" || key == "2" || key == "3") {
          _this.$refs.time.cycle = _this.$weekDate().weekth;
          _this.$refs.time.oneDay = _this.$weekDate().start.replace(/-/g, "");
          _this.$refs.time.chooseWeek = _this.$weekDate().start;
          _this.$refs.time.chooseMonth = _this.$weekDate().start;
          _this.$refs.time.chooseYear = _this.$weekDate().start;
          _this.$refs.time.dateText =
            _this.$weekDate().start + "~" + _this.$weekDate().end;
          _this.$refs.time.dateType = 2;
          _this.$refs.time.canAdd = false;
          _this.$refs.time.showYear = false;
          _this.$refs.time.canSub = true;
        }
        if (key == "1") {
          _this.typeText = "sale_total";
          _this.chooseCategory1 = [0];
          _this.dateType = 2;
          this.getCore();
          this.getCoreData();
        } else if (key == "2") {
          _this.page1 = 1;
          _this.getGoodsData();
        } else if (key == "3") {
          _this.page2 = 1;
          _this.chooseCategory.name = "一级类目";
          _this.chooseCategory.level = "one";
          _this.getCateData();
        } else if (key == "4") {
          _this.getReaderData();
        }
      })
    },
    coreTypeChange(text) {
      this.typeText = text;
      this.getCoreData();
    },
    changeTime() {
      this.isLoading = true;
      if (this.tabKey == "1") {
        this.dateType = this.$refs.time.dateType;
        this.getCore();
        this.getCoreData();
      } else if (this.tabKey == "2") {
        this.page1 = 1;
        this.getGoodsData();
      } else if (this.tabKey == "3") {
        this.page2 = 1;
        this.getCateData();
      }
    },
    closeDom() {
      if(this.tabKey == "1"){
        this.catePopup = false;
      }
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    cateClick() {
      this.catePopup = true;
      this.$refs.time.showYear = false;
    },
    // 选择分类
    selectCategory1(value) {
      this.catePopup = false;
      this.isLoading = true;
      this.getCore();
      this.getCoreData();
    },
    onShowSizeChange1(page, pageSize) {
      this.isLoading = true;
      this.page1 = page;
      this.getGoodsData();
    },
    onShowSizeChange2(page, pageSize) {
      this.isLoading = true;
      this.page2 = page;
      this.getCateData();
    },
    openAuthor(item, index) {
      this.$refs.time.showYear = false;
      this.goodsList = this.goodsList.map((value, key) => {
        if (index == key) {
          value.active = true;
        } else {
          value.active = false;
        }
        return value;
      });
    },
    selectCategory(type) {
      this.isLoading = true;
      if (type == "one") {
        this.chooseCategory.name = "一级类目";
        this.chooseCategory.level = type;
      } else if (type == "two") {
        this.chooseCategory.name = "二级类目";
        this.chooseCategory.level = type;
      } else if (type == "three") {
        this.chooseCategory.name = "三级类目";
        this.chooseCategory.level = type;
      }
      this.page2 = 1;
      this.getCateData();
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
              path,
            },
          });
        },
      });

      const chart = new Chart({
        container: "ring1",
        autoFit: true,
        height: 234,
      });

      chart.data(this.ringData1);
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.4,
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart.legend({
        position: "right",
      });
      chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("name", (name) => {
          if (name == "女") {
            return "#2F6CE4";
          } else if (name == "男") {
            return "#F3D145";
          } else {
            return "#FE8B4A";
          }
        })
        .shape("slice-shape");
      chart.interaction("element-active");
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
              path,
            },
          });
        },
      });

      const chart = new Chart({
        container: "ring2",
        autoFit: true,
        height: 234,
      });

      chart.data(this.ringData2);
      chart.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.4,
      });
      chart.tooltip({
        showTitle: false,
        showMarkers: false,
      });
      chart.legend({
        position: "right",
      });
      chart
        .interval()
        .adjust("stack")
        .position("value")
        .color("name", (name) => {
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
      chart.interaction("element-active");
      chart.render();
    },
    // 柱状图
    initColumn1() {
      let _this = this;
      const chart = new Chart({
        container: "column1",
        autoFit: true,
        autoHide: false,
        height: 234,
      });
      chart.data(this.columnData1);
      chart.scale("value", {
        nice: true,
      });
      chart.axis("name", {
        tickLine: null,
        autoHide: false,
        autoRotate: false,
      });
      chart.axis("value", {
        label: {
          formatter: (val) => {
            return val;
          },
        },
      });
      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction("active-region");
      chart.legend(false);
      chart
        .interval()
        .position("name*value")
        .color("name", (val) => {
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
        autoHide: false,
        height: 234,
      });
      chart.data(this.columnData2);
      chart.scale("value", {
        nice: true,
      });
      chart.axis("name", {
        tickLine: null,
        autoHide: false,
        autoRotate: false,
      });
      chart.axis("value", {
        label: {
          formatter: (val) => {
            return val;
          },
        },
      });
      chart.tooltip({
        showMarkers: false,
      });
      chart.interaction("active-region");
      chart.legend(false);
      chart
        .interval()
        .position("name*value")
        .color("name", (val) => {
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
    inintBar1(_max) {
      let _height = this.barData1.length * 26;
      const chart = new Chart({
        container: "bar-chart1",
        autoFit: true,
        height: _height,
      });
      chart.data(this.barData1.reverse());
      chart.scale({
        value: {
          max: 150,
          min: 0,
          alias: " ",
        },
      });
      chart.axis("name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null,
      });

      chart.axis("value", {
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
            autoHide: false,
          },
          // offset: 10,
          content: (originData) => {
            return originData.value + "%";
          },
          remove: false,
        });
      // chart.interaction("element-active");
      chart.render();
    },
    inintBar2(_max) {
      let _height = this.barData2.length * 26;
      const chart = new Chart({
        container: "bar-chart2",
        autoFit: true,
        autoHide: false,
        height: _height,
      });
      chart.data(this.barData2.reverse());
      chart.scale({
        value: {
          max: 150,
          min: 0,
          alias: " ",
        },
      });
      chart.axis("name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null,
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
            autoHide: false,
          },
          // offset: 10,
          content: (originData) => {
            return originData.value + "%";
          },
          remove: false,
        });
      // chart.interaction("element-active");
      chart.render();
    },
    inintBar3(_max) {
      let _height = this.barData3.length * 26;
      const chart = new Chart({
        container: "bar-chart3",
        autoFit: true,
        autoHide: false,
        height: _height,
      });
      chart.data(this.barData3.reverse());
      chart.scale({
        value: {
          max: 150,
          min: 0,
          alias: " ",
        },
      });
      chart.axis("name", {
        title: null,
        tickLine: null,
        grid: null,
        line: null,
      });

      chart.axis("value", {
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
            autoHide: false,
          },
          // offset: 10,
          content: (originData) => {
            return originData.value + "%";
          },
          remove: false,
        });
      // chart.interaction("element-active");
      chart.render();
    },
    bodyClick() {
      if (this.tabKey == "1") {
        this.catePopup = false;
      }
      if (this.tabKey == "1" || this.tabKey == "2") {
        this.$refs.time.showYear = false;
        this.goodsList = this.goodsList.map((value, key) => {
          value.active = false;
          return value;
        });
      }
    },
    publisherChange() {},
  },
};
</script>
