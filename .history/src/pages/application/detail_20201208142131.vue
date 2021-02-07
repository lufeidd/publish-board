<template>
  <div id="eventPage" @click="bodyClick">
    <HeadNav
      type="application"
      :show="1"
      ref="head"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="application" sort="event"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="goodsPower">
            <div class="model-container">
              <div class="model-bg">
                <div class="event-desc">
                  <p class="title">{{ eventInfo.title }}</p>
                  <div class="option">
                    <span class="name">事件类型</span>
                    <span class="desc"
                      >{{ eventInfo.type == 1 ? "公共" : "内部" }}节日</span
                    >
                  </div>
                  <div class="option">
                    <span class="name">发生时间</span>
                    <span class="desc" v-if="eventInfo.repeat_year == 0"
                      >{{ eventInfo.effect_first_year }}-{{
                        eventInfo.event_month >= 10
                          ? eventInfo.event_month
                          : "0" + eventInfo.event_month
                      }}-{{
                        eventInfo.event_day >= 10
                          ? eventInfo.event_day
                          : "0" + eventInfo.event_day
                      }}</span
                    >
                    <span class="desc" v-else>
                      <span v-if="eventInfo.repeat_year == 1">每年循环</span>
                      <span v-if="eventInfo.repeat_year == 2">每两年循环</span>
                      <span v-if="eventInfo.repeat_year == 4">每四年循环</span>
                      <span v-if="eventInfo.date_type == 1">公历</span>
                      <span v-if="eventInfo.date_type == 2">农历</span>
                      {{
                        eventInfo.event_month >= 10
                          ? eventInfo.event_month
                          : "0" + eventInfo.event_month
                      }}-{{
                        eventInfo.event_day >= 10
                          ? eventInfo.event_day
                          : "0" + eventInfo.event_day
                      }}
                    </span>
                  </div>
                  <div class="option">
                    <span class="name">重要级别</span>
                    <span class="desc" v-if="eventInfo.event_level == 1"
                      >一般</span
                    >
                    <span class="desc" v-if="eventInfo.event_level == 2"
                      >重要</span
                    >
                    <span class="desc" v-if="eventInfo.event_level == 3"
                      >特别重要</span
                    >
                  </div>
                  <div class="option">
                    <span class="name">关键字</span>
                    <span class="desc" v-if="eventInfo.keywords.length > 0">
                      <span
                        class="data-tab data-tab-click data-tab-seven"
                        v-for="(item, index) in eventInfo.keywords"
                        :key="index"
                        >{{ item.value }}</span
                      >
                    </span>
                    <span class="desc" v-else>--</span>
                  </div>
                  <div class="option">
                    <span class="name">事件描述</span>
                    <span class="desc" v-if="eventInfo.event_desc">{{
                      eventInfo.event_desc
                    }}</span>
                    <span class="desc" v-else>--</span>
                  </div>
                  <div class="option">
                    <span class="name">创建时间</span>
                    <span class="desc"
                      >{{ eventInfo.update_time }} 由{{
                        eventInfo.creator_platform
                      }}创建</span
                    >
                  </div>
                  <div class="option">
                    <span class="name">事件状态</span>
                    <span class="desc" v-if="eventInfo.state == 1">正常</span>
                    <span class="desc" v-if="eventInfo.state == 0">删除</span>
                  </div>
                  <!-- 标签页 -->
                  <div class="tabs">
                    <a-tabs :activeKey="tabKey" @change="callback">
                      <a-tab-pane key="1" tab="关联品种"></a-tab-pane>
                      <a-tab-pane key="2" tab="版本列表"></a-tab-pane>
                    </a-tabs>
                  </div>
                </div>
              </div>
            </div>
            <!-- 关联品种 -->
            <div class="model-container" v-if="tabKey == '1'">
              <div
                class="model-bg"
                style="
                  min-height: 400px;
                  position: relative;
                  padding-bottom: 75px;
                "
              >
                <div class="section-title clearfix">
                  <div class="float-left">关联品种列表</div>
                  <div class="float-right">
                    <span
                      class="click-font"
                      @click="toAdd"
                      v-if="operatPower == 1"
                      >添加关联品种</span
                    >
                  </div>
                </div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="240" />
                      <col width="120" />
                      <col width="160" />
                      <col width="190" />
                      <col width="200" />
                      <col width="130" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>品种</td>
                        <td style="text-align: center">ISBN</td>
                        <td>作者</td>
                        <td>
                          <a-dropdown
                            :trigger="['click']"
                            placement="bottomLeft"
                          >
                            <a
                              class="ant-dropdown-link"
                              @click="(e) => e.preventDefault()"
                              style="font-size: 12px; color: #4576db"
                            >
                              {{ publishType }}
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
                                  @click="selectCategory(1)"
                                  >出版社</a
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
                                  @click="selectCategory(2)"
                                  >仅看本社</a
                                >
                              </a-menu-item>
                            </a-menu>
                          </a-dropdown>
                        </td>
                        <td>
                          <a-dropdown
                            :trigger="['click']"
                            placement="bottomLeft"
                          >
                            <a
                              class="ant-dropdown-link"
                              @click="(e) => e.preventDefault()"
                              style="font-size: 12px; color: #4576db"
                            >
                              {{ chooseYear ? chooseYear : "年份" }}
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
                                  @click="selectYear(null, -1)"
                                  >所有版本</a
                                >
                              </a-menu-item>
                              <a-menu-item
                                v-for="(item, index) in yearList"
                                :key="index"
                              >
                                <a
                                  href="javascript:;"
                                  style="
                                    padding: 5px 15px;
                                    color: #515a6e;
                                    font-size: 12px;
                                  "
                                  @click="selectYear(item, index)"
                                  >{{ item }}{{ eventInfo.title }}</a
                                >
                              </a-menu-item>
                            </a-menu>
                          </a-dropdown>
                        </td>
                        <td style="text-align: right">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="goodsList.length > 0">
                      <tr v-for="(item, index) in goodsList" :key="index">
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
                              class="click-font goods-name"
                              :title="item.goods_name"
                              @click="toDetail(item, index)"
                              >{{ item.goods_name }}</span
                            >
                          </div>
                        </td>
                        <td style="text-align: center">{{ item.isbn }}</td>
                        <td>
                          <div class=" author">
                            <div
                              class="author-name"
                              v-if="item.authors.length == 0"
                              @click.stop="openAuthor(item, index)"
                            >
                              {{ item.goods_author }}
                            </div>
                            <div
                              class="author-name click-font"
                              v-if="item.authors.length == 1"
                              @click.stop="toAuthor(item.authors[0].author_id)"
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
                                  @click.stop="toAuthor(aitem.author_id)"
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
                        <td>{{ item.supplier_name }}</td>
                        <td>
                          {{ item.year }}年{{ item.title }}（{{ item.solar }}）
                        </td>
                        <td style="text-align: right">
                          <span
                            class="click-font"
                            @click="readConnect(item, index)"
                            >查看关联</span
                          >
                          <!-- <span class="click-font" style="margin-left:5px;" @click="deleteConnect(item,index)">移除关联</span> -->
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6" style="text-align: center">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 分页 -->
                <div
                  class="page"
                  style="position: absolute; right: 15px; bottom: 15px"
                >
                  <a-pagination
                    :show-total="(total) => `共 ${total1} 条数据`"
                    :default-current="1"
                    v-model="page1"
                    :total="total1"
                    :defaultPageSize="pageSize"
                    @change="onShowSizeChange1"
                  />
                </div>
              </div>
            </div>
            <!-- 关联版本 -->
            <div class="model-container" v-if="tabKey == '2'">
              <div
                class="model-bg"
                style="
                  min-height: 400px;
                  position: relative;
                  padding-bottom: 75px;
                "
              >
                <div class="section-title clearfix">
                  <div class="float-left">版本列表</div>
                  <div class="float-right">
                    <span
                      class="click-font"
                      @click="toAddVersion"
                      v-if="operatPower == 1"
                      >添加版本</span
                    >
                  </div>
                </div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="240" />
                      <col width="120" />
                      <col width="570" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>版本</td>
                        <td>版本时间</td>
                        <td>版本备注</td>
                        <td style="text-align: right">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="versionList.length > 0">
                      <tr v-for="(item, index) in versionList" :key="index">
                        <td>
                          <span class="main-font"
                            >{{ item.year }}年{{ item.title }}</span
                          >
                        </td>
                        <td>{{ item.solar }}</td>
                        <td>{{ item.remark }}</td>
                        <td style="text-align: right">
                          <span
                            class="click-font"
                            @click="editVersion(item, index)"
                            v-if="operatPower == 1"
                            >编辑</span
                          >
                          <span
                            class="click-font"
                            style="margin-left: 10px"
                            @click="remove(item, index)"
                            v-if="operatPower == 1"
                            >删除</span
                          >
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="4" style="text-align: center">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 分页 -->
                <div
                  class="page"
                  style="position: absolute; right: 15px; bottom: 15px"
                >
                  <a-pagination
                    :show-total="(total) => `共 ${total2} 条数据`"
                    :default-current="1"
                    v-model="page2"
                    :total="total1"
                    :defaultPageSize="pageSize"
                    @change="onShowSizeChange2"
                  />
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
    <!-- 关联说明弹层 -->
    <a-modal
      v-model="connectDesc"
      width="600px"
      title="关联说明"
      on-ok="readhandleOk"
    >
      <template slot="footer">
        <div class="clearfix">
          <div
            class="float-left click-font-warn"
            style="line-height: 32px"
            @click="deleteOrganize()"
            v-if="operatPower == 1"
          >
            取消关联
          </div>
          <div class="float-right">
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" @click="readhandleOk"
              >确定</a-button
            >
          </div>
        </div>
      </template>
      <div style="padding: 24px" class="content">
        {{ readInfo.time }} 由{{ readInfo.name }}关联
      </div>
    </a-modal>
    <!-- 添加关联弹层 -->
    <a-modal
      v-model="addConnect"
      width="600px"
      title="添加关联版本申请"
      on-ok="addhandle"
      @cancel="searchclose"
    >
      <template slot="footer">
        <!-- <a-button key="back" @click="handleCancel">取消</a-button> -->
        <a-button key="submit" type="primary" @click="addhandle">完成</a-button>
      </template>
      <div class="popup" @click="showResult = false">
        <div class="connect">
          <span class="title">*关联年份</span>
          <span style="margin-left: 15px">
            <a-dropdown :trigger="['click']" placement="bottomLeft">
              <a
                class="ant-dropdown-link"
                @click="(e) => e.preventDefault()"
                style="font-size: 12px; color: #4576db"
              >
                {{ popupChooseYear ? popupChooseYear : "年份" }}
                <a-icon type="down" />
              </a>
              <a-menu slot="overlay">
                <a-menu-item
                  v-for="(yitem, yindex) in popupYearList"
                  :key="yindex"
                >
                  <a
                    href="javascript:;"
                    style="padding: 5px 15px; color: #515a6e; font-size: 12px"
                    @click="yearChoose(yitem, yindex)"
                    >{{ yitem }}</a
                  >
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </span>
          <div style="padding: 5px; margin-top: 10px">
            <span class="title" style="margin-right: 5px">选择品种</span>
            <div class="common" style="position: relative">
              <a-input
                placeholder="搜索品种名称、ISBN"
                @input="inputSearch"
                @focus="inputSearch"
                @click.stop="inputClick"
                v-model="inputVal"
              ></a-input>
              <div class="search-result" v-if="showResult">
                <div class="list" v-if="dataSource.length > 0">
                  <div
                    class="result-content"
                    v-for="(item1, index1) in dataSource"
                    :key="index1"
                    @click.stop="selected(item1, index1)"
                  >
                    <img
                      :src="item1.cover_pic"
                      alt
                      width="20px"
                      height="20px"
                      v-if="item1.cover_pic"
                    />
                    <span
                      v-else
                      class="no-pic"
                      style="min-width: 20px; min-height: 20px"
                    ></span>
                    <span class="result-title" :title="item1.title">{{
                      item1.title
                    }}</span>
                  </div>
                </div>
                <div
                  class="no-result"
                  v-if="dataSource.length == 0 && showAbout"
                >
                  没有相关商品
                </div>
                <div
                  style="text-align: center; margin-top: 100px"
                  v-if="searchLoading"
                >
                  <a-spin tip></a-spin>
                </div>
              </div>
            </div>
            <!-- 已选列表 -->
            <div class="choose">
              <div
                class="list"
                v-for="(gitem, gindex) in popupGoodsList"
                :key="gindex"
              >
                <img
                  :src="gitem.cover_pic"
                  alt
                  width="40px"
                  height="40px"
                  v-if="gitem.cover_pic"
                />
                <span
                  v-else
                  class="no-pic"
                  style="min-width: 40px; min-height: 40px"
                ></span>
                <div class="name">{{ gitem.title }}({{ gitem.isbn }})</div>
                <span style="margin-right: 20px">{{ gitem.year }}</span>
                <span class="click-font" @click="listCancel(gitem, gindex)"
                  >移除</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <a-modal
      v-model="versionModel"
      width="600px"
      :title="versionType ? '编辑版本' : '添加版本'"
      on-ok="versionOk"
    >
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="versionhandle"
          >确定</a-button
        >
      </template>
      <div class="popup">
        <div class="option">
          <span class="lable">事件信息</span>
          <div class="normal">{{ eventInfo.title }}</div>
        </div>
        <div class="option">
          <span class="lable">*版本日期</span>
          <div class="normal">
            <span style="margin-right: 5px">公历</span>
            <span>
              <a-date-picker
                @change="onChange"
                :allowClear="false"
                v-model="versionInfo.time"
              />
            </span>
          </div>
        </div>
        <div class="option">
          <span class="lable">版本备注</span>
          <div class="normal">
            <a-input placeholder="最多输入100字" v-model="versionInfo.desc" />
          </div>
        </div>
      </div>
    </a-modal>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style lang="scss" scoped src="@/style/scss/pages/application/event.scss"></style>
<script>
import {
  EVENT_DETAIL,
  EVENT_GOODS_LISTS,
  EVENT_GOODS_ADD,
  EVENT_GOODS_DELETE,
  EVENT_VERSION_LISTS,
  EVENT_VERSION_ADD,
  EVENT_VERSION_UPDATE,
  EVENT_VERSION_DELETE,
} from "../../apis/admin.js";
import { TOP_SEARCH } from "../../apis/publish.js";
export default {
  data() {
    return {
      goodsPower: true,
      versionPower: true,
      operatPower: 0,
      tabKey: "1",
      publishType: "出版社",
      goodsList: [],
      connectDesc: false,
      addConnect: false,
      inputVal: "",
      dataSource: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
      eventId: 0,
      eventInfo: {
        keywords: [],
      },
      chooseYear: 0,
      yearList: [],
      popupYearList: [],
      popupChooseYear: 0,
      popupGoodsList: [],
      publisherId: 0,
      page1: 1,
      total1: 0,
      page2: 1,
      total2: 0,
      pageSize: 20,
      readInfo: {
        time: "",
        name: "",
        id: 0,
        goodsName: "",
        eventName: "",
      },
      versionList: [],
      versionModel: false,
      versionType: 0,
      versionInfo: {
        id: 0,
        time: "",
        desc: "",
        date: "",
        year: 0,
      },
      isLoading: true,
    };
  },
  mounted() {
    this.eventId = this.$route.query.event_id;
    let _num = Number(this.$moment().format("YYYY")) + 2;
    let _length = _num - 2000;
    for (let i = 0; i < _length + 1; i++) {
      if (i > 0) _num--;
      this.popupYearList.push(_num);
    }
    if (this.$refs.head.accountInfo.type == 1) {
      this.operatPower = 1;
    } else {
      if (this.$refs.head.publishInfo.user_organization_type == 1) {
        this.operatPower = 1;
      }
    }
    this.getData();
    this.getGoods();
    this.getVersionData();
  },
  updated() {
    this.isLoading = false;
  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        event_id: this.eventId,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_DETAIL(data);
      if (res.code == 0) {
        this.goodsPower = true;
        this.eventInfo = res.data;
      } else {
        if (res.code == 1009) {
          this.goodsPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async getGoods() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        event_id: this.eventId,
        supplier_id: this.publisherId ? this.publisherId : "",
        year: this.chooseYear ? this.chooseYear : "",
        page: this.page1,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_GOODS_LISTS(data);
      if (res.code == 0) {
        this.goodsPower = true;
        this.goodsList = [];
        this.yearList = [];
        res.data.goods.map((value, key) => {
          value.active = false;
          this.goodsList.push(value);
        });
        this.total1 = res.data.count;
        this.yearList = res.data.years;
      } else {
        if (res.code == 1009) {
          this.goodsPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async search(_value) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        search: _value,
        page: 1,
        page_size: 100,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await TOP_SEARCH(data);
      if (res.code == 0) {
        if (res.data.search == this.inputVal) {
          this.dataSource = res.data.lists.map((value, key) => {
            return value;
          });
        }
        this.searchLoading = false;
        this.showAbout = true;
      } else {
        this.searchLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async addGoods(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        event_id: this.eventId,
        goods_ids: id,
        year: this.popupChooseYear,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_GOODS_ADD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "关联成功", 0);
        this.getGoods();
        this.addConnect = false;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async cancelGoods(type, id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        connect_id: type == 1 ? this.readInfo.id : id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_GOODS_DELETE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "取消关联成功", 0);
        this.getGoods();
        if (type == 1) {
          this.connectDesc = false;
        } else {
        }
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async getVersionData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        event_id: this.eventId,
        page: this.page2,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_VERSION_LISTS(data);
      if (res.code == 0) {
        this.goodsPower = true;
        this.versionList = [];
        this.versionList = res.data.versions;
        this.total2 = res.data.count;
      } else {
        if (res.code == 1009) {
          this.goodsPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async addVersion() {
      var tStamp = this.$getTimeStamp();
      let data = {
        event_id: this.eventId,
        year: this.versionInfo.year,
        version_date: this.versionInfo.date,
        remark: this.versionInfo.desc,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_VERSION_ADD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "添加版本成功", 0);
        this.getVersionData();
        this.versionModel = false;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async updateVersion() {
      var tStamp = this.$getTimeStamp();
      let data = {
        version_id: this.versionInfo.id,
        version_date: this.versionInfo.date,
        remark: this.versionInfo.desc,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_VERSION_UPDATE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "编辑成功", 0);
        this.getVersionData();
        this.versionModel = false;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async deleteVersion(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        version_id: id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_VERSION_DELETE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "删除成功", 0);
        this.getVersionData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    openAuthor(item, index) {
      this.goodsList = this.goodsList.map((value, key) => {
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
    bodyClick() {
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    callback(key) {
      this.tabKey = key;
    },
    selectCategory(type) {
      if (type == 1) {
        this.publishType = "出版社";
        this.publisherId = 0;
      } else if (type == 2) {
        this.publishType = "仅看本社";
        this.publisherId = this.$refs.head.publishInfo.supplier_id;
      }
      this.page1 = 1;
      this.getGoods();
    },
    selectYear(item, index) {
      if (index < 0) {
        this.chooseYear = 0;
      } else {
        this.chooseYear = item;
      }
      this.page1 = 1;
      this.getGoods();
    },
    yearChoose(yitem, yindex) {
      this.popupChooseYear = yitem;
    },
    handleCancel() {
      this.connectDesc = false;
      this.addConnect = false;
      this.versionModel = false;
    },
    readhandleOk() {
      this.connectDesc = false;
    },
    readConnect(item, index) {
      this.readInfo.time = item.create_time;
      this.readInfo.name = item.organization_name;
      this.readInfo.id = item.connect_id;
      this.readInfo.goodsName = item.goods_name;
      this.readInfo.eventName = item.title;
      this.connectDesc = true;
    },
    deleteOrganize() {
      var _this = this;
      this.$confirm({
        title: "确认取消品种关联",
        content:
          "确认取消《" +
          _this.readInfo.goodsName +
          "》与{" +
          _this.readInfo.eventName +
          "}的关联吗？确定后将会立即删除关联关系。",
        okText: "删除",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.cancelGoods(1, _this.readInfo.id);
        },
        onCancel() {},
      });
    },
    deleteConnect(item, index) {
      var _this = this;
      this.$confirm({
        title: "确认取消品种关联",
        content:
          "确认取消《" +
          item.goods_name +
          "》与{" +
          item.title +
          "}的关联吗？确定后将会立即删除关联关系。",
        okText: "删除",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.cancelGoods(2, item.connect_id);
        },
        onCancel() {},
      });
    },
    listCancel(gitem, gindex) {
      this.popupGoodsList = this.popupGoodsList.filter((value, key) => {
        return gitem.goods_id != value.goods_id;
      });
      // this.cancelGoods(2, gitem.connect_id);
    },
    addhandle() {
      if (this.popupChooseYear == 0) {
        this.$refs.head.globalTip(1, "请选择关联年份", 0);
        return;
      }
      let _ids = [];
      this.popupGoodsList.map((value, key) => {
        _ids.push(value.goods_id);
      });
      _ids = _ids.join(",");
      this.addGoods(_ids);
      // this.addConnect = false;
    },
    toAdd() {
      this.popupChooseYear = 0;
      this.popupGoodsList = [];
      this.inputVal = "";
      this.addConnect = true;
    },
    inputClick() {},
    inputSearch() {
      // console.log(111);
      this.dataSource = [];
      if (this.inputVal.length > 0) {
        this.showResult = true;
        this.searchLoading = true;
        this.showAbout = false;
        this.search(this.inputVal);
      } else {
        this.showResult = false;
      }
    },
    selected(item1, index1) {
      // console.log(111);
      let _check = 0;
      if (this.popupChooseYear == 0) {
        this.$refs.head.globalTip(1, "请选择关联年份", 0);
        return;
      }
      this.popupGoodsList.map((value, key) => {
        // console.log(item1.goods_id,value.goods_id);
        if (item1.goods_id == value.goods_id) {
          _check++;
        }
      });
      if (_check) {
        this.$refs.head.globalTip(1, "请勿重复选择", 0);
      } else {
        let _obj = item1;
        _obj.year = this.popupChooseYear;
        this.popupGoodsList.push(_obj);
        // this.addGoods(item1.goods_id, item1);
        this.showResult = false;
      }
    },
    searchclose() {
      this.showResult = false;
    },
    onShowSizeChange1(page, pageSize) {
      this.page1 = page;
      this.getData();
    },
    onShowSizeChange2(page, pageSize) {
      this.page2 = page;
      this.getVersionData();
    },
    toAddVersion() {
      this.versionType = 0;
      this.versionInfo.time = "";
      this.versionInfo.date = "";
      this.versionInfo.id = 0;
      this.versionInfo.year = 0;
      this.versionModel = true;
    },
    editVersion(item, index) {
      this.versionType = 1;
      this.versionInfo.time = item.solar;
      this.versionInfo.date = item.version_date;
      this.versionInfo.id = item.version_id;
      this.versionInfo.desc = item.remark;
      this.versionInfo.year = item.year;
      this.versionModel = true;
    },
    versionhandle() {
      if (this.versionInfo.time.length == 0) {
        this.$refs.head.globalTip(1, "请选择版本日期", 0);
        return;
      }
      if (this.versionInfo.desc.length > 100) {
        this.$refs.head.globalTip(1, "备注不能超过100字", 0);
        return;
      }
      if (this.versionType == 0) {
        this.addVersion();
      } else {
        this.updateVersion();
      }
    },
    remove(item, index) {
      var _this = this;
      this.$confirm({
        title: "删除版本",
        content:
          "确认删除{" + item.year + "年" + item.title + "}吗？删除后无法恢复。",
        okText: "删除",
        cancelText: "取消",
        okType: "danger",
        onOk() {
          _this.deleteVersion(item.version_id);
        },
        onCancel() {},
      });
    },
    onChange(date, dateString) {
      // console.log(date,dateString.split('-'));
      this.versionInfo.time = dateString;
      this.versionInfo.year = Number(dateString.split("-")[0]);
      this.versionInfo.date =
        dateString.split("-")[1] + "-" + dateString.split("-")[2];
    },
    publisherChange() {
      this.isLoading = true;
      if (this.$refs.head.accountInfo.type == 1) {
        this.operatPower = 1;
      } else {
        if (this.$refs.head.publishInfo.user_organization_type == 1) {
          this.operatPower = 1;
        }
      }
      this.tabKey = "1";
      this.publishType = "出版社";
      this.publisherId = 0;
      this.chooseYear = 0;
      this.getData();
      this.getGoods();
      this.getVersionData();
    },
  },
};
</script>
