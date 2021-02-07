<template>
  <div id="eventPage">
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
          <div class="main-container">
            <div class="model-container">
              <div
                class="model-bg"
                style="padding-bottom: 20px; min-height: 660px"
              >
                <div class="section-title">
                  事件年历
                  <!-- <span
                    class="click-font"
                    style="margin-left:5px;"
                    @click="changeYear = true"
                  >切换年份</span>-->
                </div>
                <div class="container" v-if="pagePower1">
                  <div class="event-head clearfix">
                    <div class="float-left">
                      <a-dropdown :trigger="['click']" placement="bottomLeft">
                        <a
                          class="ant-dropdown-link"
                          @click="(e) => e.preventDefault()"
                          style="font-size: 12px; color: #4576db"
                        >
                          {{ defaultYear }}年
                          <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
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
                              @click="selectCategory(item, index)"
                              >{{ item }}年</a
                            >
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
                    </div>
                    <div class="float-right">
                      <!-- 公共节日
                      <span class="data-tab data-tab-click data-tab-four">30</span>-->
                      公开事件
                      <span
                        class="data-tab data-tab-click data-tab-five"
                        :class="{ active: isOpen == 0 }"
                        @click="openClick"
                        >{{ openNum }}</span
                      >
                      内部事件
                      <span
                        class="data-tab data-tab-click data-tab-six"
                        :class="{ active: isOwn == 0 }"
                        @click="ownClick"
                        >{{ ownNum }}</span
                      >
                    </div>
                  </div>
                  <div class="event-mid">
                    <div class="left" @click="before">
                      <span class="icont">
                        <a-icon type="left" />
                      </span>
                    </div>
                    <div class="center">
                      <div class="move-box">
                        <div
                          class="model"
                          v-for="(item, index) in showList"
                          :key="index"
                        >
                          <div class="month">{{ item.month }}月</div>
                          <div class="date-content">
                            <div v-if="item.lists.length > 0">
                              <div
                                v-for="(litem, lindex) in item.lists"
                                :key="lindex"
                              >
                                <div
                                  class="date two"
                                  v-if="litem.type == 1"
                                  @click="toEventDetail(litem, lindex)"
                                >
                                  {{
                                    litem.event_month >= 10
                                      ? litem.event_month
                                      : "0" + litem.event_month
                                  }}-{{
                                    litem.event_day >= 10
                                      ? litem.event_day
                                      : "0" + litem.event_day
                                  }}
                                  {{ litem.title }}
                                  <span class="star">
                                    <svg class="icon" aria-hidden="true">
                                      <use xlink:href="#icon-star" />
                                    </svg>
                                  </span>
                                </div>
                                <div
                                  class="date three"
                                  v-if="litem.type == 2"
                                  @click="toEventDetail(litem, lindex)"
                                >
                                  {{
                                    litem.event_month >= 10
                                      ? litem.event_month
                                      : "0" + litem.event_month
                                  }}-{{
                                    litem.event_day >= 10
                                      ? litem.event_day
                                      : "0" + litem.event_day
                                  }}
                                  {{ litem.title }}
                                  <span
                                    class="star"
                                    v-for="(i, j) in litem.event_level"
                                    :key="j"
                                  >
                                    <svg class="icon" aria-hidden="true">
                                      <use xlink:href="#icon-star" />
                                    </svg>
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div v-else class="no-event">暂无事件信息</div>
                            <!-- <div>
                            <div class="date two">
                              08-01 建军节
                              <span class="star">
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-star" />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <div>
                            <div class="date three">
                              08-01 建军节
                              <span class="star">
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-star" />
                                </svg>
                              </span>
                            </div>
                          </div>
                          <div>
                            <div class="date one overdue">
                              08-01 建军节
                              <span class="star">
                                <svg class="icon" aria-hidden="true">
                                  <use xlink:href="#icon-star" />
                                </svg>
                              </span>
                            </div>
                            </div>-->
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="right" @click="after">
                      <span class="icont">
                        <a-icon type="right" />
                      </span>
                    </div>
                  </div>
                </div>
                <div v-else style="height: 590px; position: relative">
                  <ModelNoPower
                    type="noPower"
                    :id="pagePowerId1"
                    :organizeId="$refs.head.publishInfo.organization_id"
                  ></ModelNoPower>
                </div>
              </div>
            </div>
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title clearfix">
                  <div class="float-left">内部事件</div>
                  <div
                    class="float-right click-font"
                    @click="addEvent"
                    v-if="pagePower2"
                  >
                    新建内部事件
                  </div>
                </div>
                <div v-if="pagePower2">
                  <div class="search" style="margin: 50px 0">
                    <div
                      class="content common"
                      style="margin: 0 auto; width: 800px"
                    >
                      <a-input-search
                        placeholder="搜索事件名称"
                        enter-button="搜索"
                        size="large"
                        v-model="inputVal"
                        @search="onSearch"
                      >
                        <div slot="prefix">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-search" />
                          </svg>
                          <span class="rowLine">|</span>
                        </div>
                      </a-input-search>
                    </div>
                  </div>
                  <!-- 列表 -->
                  <div class="table" style="padding-bottom: 20px">
                    <table style="table-layout: fixed">
                      <colgroup>
                        <col width="100" />
                        <col width="200" />
                        <col width="100" />
                        <col width="120" />
                        <col width="100" />
                        <col width="100" />
                        <col width="120" />
                        <col width="80" />
                        <col width="200" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>事件ID</td>
                          <td>事件名称</td>
                          <td style="text-align: center">类型</td>
                          <td style="text-align: center">时间</td>
                          <td style="text-align: center">重要性</td>
                          <td style="text-align: center">关联品种</td>
                          <td style="text-align: center">创建者</td>
                          <td style="text-align: center">状态</td>
                          <td style="text-align: right">操作</td>
                        </tr>
                      </thead>
                      <tbody v-if="eventList.length > 0">
                        <tr v-for="(item, index) in eventList" :key="index">
                          <td>{{ item.event_id }}</td>
                          <td>
                            <div>
                              <span
                                class="click-font"
                                @click="toEventDetail(item, index)"
                                >{{ item.title }}</span
                              >
                                <span
                                  class="data-tab data-tab-seven data-tab-click"
                                  v-for="(litem, lindex) in item.keywords"
                                  :key="lindex"
                                  >{{ litem.value }}</span
                                >
                            </div>
                          </td>
                          <td style="text-align: center">
                            <span class="main-font">{{
                              item.type == 1 ? "公开" : "内部"
                            }}</span>
                          </td>
                          <td style="text-align: center">
                            <span class="main-font" v-if="item.repeat_year == 0"
                              >{{ item.effect_first_year }}-{{
                                item.event_month >= 10
                                  ? item.event_month
                                  : "0" + item.event_month
                              }}-{{
                                item.event_day >= 10
                                  ? item.event_day
                                  : "0" + item.event_day
                              }}</span
                            >
                            <span class="main-font" v-if="item.repeat_year == 1"
                              >每年
                              {{
                                item.event_month >= 10
                                  ? item.event_month
                                  : "0" + item.event_month
                              }}-{{
                                item.event_day >= 10
                                  ? item.event_day
                                  : "0" + item.event_day
                              }}</span
                            >
                            <span class="main-font" v-if="item.repeat_year == 2"
                              >每两年{{
                                item.event_month >= 10
                                  ? item.event_month
                                  : "0" + item.event_month
                              }}-{{
                                item.event_day >= 10
                                  ? item.event_day
                                  : "0" + item.event_day
                              }}</span
                            >
                            <span class="main-font" v-if="item.repeat_year == 4"
                              >每四年{{
                                item.event_month >= 10
                                  ? item.event_month
                                  : "0" + item.event_month
                              }}-{{
                                item.event_day >= 10
                                  ? item.event_day
                                  : "0" + item.event_day
                              }}</span
                            >
                          </td>
                          <td style="text-align: center">
                            <span class="main-font" v-if="item.event_level == 1"
                              >一般</span
                            >
                            <span class="main-font" v-if="item.event_level == 2"
                              >重要</span
                            >
                            <span class="main-font" v-if="item.event_level == 3"
                              >特别重要</span
                            >
                          </td>
                          <td style="text-align: center">
                            <span class="main-font"
                              >{{ item.goods_count }}个品种</span
                            >
                          </td>
                          <td style="text-align: center">
                            <span class="main-font">{{
                              item.creator_name
                            }}</span>
                          </td>
                          <td style="text-align: center">
                            <span class="main-font">{{
                              item.state == 1 ? "正常" : "删除"
                            }}</span>
                          </td>
                          <td style="text-align: right">
                            <span
                              class="click-font"
                              @click="openInfo(item, index)"
                              v-if="item.state == 1"
                              >编辑</span
                            >
                            <span
                              class="click-font"
                              style="margin-left: 10px"
                              v-if="item.state == 1"
                              @click="deleteOrganize(item, index)"
                              >删除</span
                            >
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="9" style="text-align: center">
                            <a-empty />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- 分页 -->
                  <div
                    class="page"
                    style="text-align: right; padding: 15px"
                    v-if="eventList.length > 0"
                  >
                    <a-pagination
                      :show-total="(total) => `共 ${total} 条数据`"
                      :default-current="1"
                      v-model="page"
                      :total="total"
                      :defaultPageSize="pageSize"
                      @change="onShowSizeChange"
                    />
                  </div>
                </div>
                <div v-else style="height: 300px; position: relative">
                  <ModelNoPower
                    type="noPower"
                    :id="pagePowerId2"
                    :organizeId="$refs.head.publishInfo.organization_id"
                  ></ModelNoPower>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新增事件弹层 -->
    <a-modal
      v-model="addOrganize"
      width="600px"
      :title="isAdd ? '编辑事件' : '新增事件'"
      on-ok="handleOk"
    >
      <template slot="footer">
        <div class="clearfix">
          <div class="float-left click-font" style="line-height: 32px">
            不明白？查看大事件功能说明
          </div>
          <div class="float-rigth">
            <a-button key="back" @click="handleCancel">取消</a-button>
            <a-button key="submit" type="primary" @click="handleOk"
              >确定</a-button
            >
          </div>
        </div>
      </template>
      <div class="popup">
        <div class="option">
          <span class="lable event">*事件名称</span>
          <div class="normal event">
            <a-input placeholder="最多15个字" v-model="eventInfo.name" />
          </div>
        </div>
        <div class="option">
          <span class="lable event">*循环规则</span>
          <div class="normal event">
            <a-radio-group
              name="radioGroup"
              v-model="eventInfo.loop"
              size="small"
            >
              <a-radio :value="1">不重复</a-radio>
              <a-radio :value="2">每年重复</a-radio>
              <a-radio :value="3">每两年重复</a-radio>
              <a-radio :value="4">每四年重复</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="option">
          <span class="lable event">*循环日期</span>
          <div class="normal event">
            <span
              class="click-font"
              style="margin-right: 5px"
              @click="eventInfo.timeType = eventInfo.timeType ? 0 : 1"
              >{{ eventInfo.timeType ? "农历" : "公历" }}</span
            >
            <span>
              <a-date-picker
                @change="onChange"
                :allowClear="false"
                v-model="eventInfo.time"
              />
            </span>
          </div>
        </div>
        <div class="option">
          <span class="lable event">*重要级别</span>
          <div class="normal event">
            <a-radio-group
              name="radioGroup"
              v-model="eventInfo.level"
              size="small"
            >
              <a-radio :value="3">特别重要</a-radio>
              <a-radio :value="2">重要</a-radio>
              <a-radio :value="1">一般</a-radio>
            </a-radio-group>
          </div>
        </div>
        <div class="option">
          <span class="lable event">关键字</span>
          <div class="normal event">
            <a-select
              mode="multiple"
              v-model="eventInfo.keyWords"
              style="width: 100%"
              placeholder="选择关键字"
              @change="handleChange"
            >
              <a-select-option
                v-for="(kitem, kindex) in keyList"
                :key="kitem.id"
                >{{ kitem.keywords }}</a-select-option
              >
            </a-select>
          </div>
        </div>
        <div class="option">
          <span class="lable event" style="vertical-align: top">事件描述</span>
          <div class="normal event">
            <a-textarea
              placeholder
              v-model="eventInfo.desc"
              style="height: 96px"
            />
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
  EVENT_ALL,
  EVENT_LISTS,
  EVENT_KEYWORDS_LISTS,
  EVENT_ADD,
  EVENT_UPDATE,
  EVENT_DELETE,
} from "../../apis/admin.js";
export default {
  data() {
    return {
      pagePower1: true,
      pagePower2: true,
      pagePowerId1: 0,
      pagePowerId2: 0,
      changeYear: false,
      defaultYear: 0,
      yearList: [],
      allList: [],
      showList: [],
      openNum: 0,
      ownNum: 0,
      activeIndex: 1,
      isOpen: 1,
      isOwn: 1,
      isLoading: true,
      inputVal: "",
      eventList: [],
      page: 1,
      pageSize: 20,
      total: 0,
      addOrganize: false,
      isAdd: 0,
      keyList: [],
      eventInfo: {
        id: 0,
        name: "",
        loop: 0,
        time: "",
        timeType: 0,
        year: "",
        month: "",
        day: "",
        level: 0,
        keyWords: [],
        desc: "",
      },
      eventPower: true,
      eventPowerId: 1601,
      currentMonth: 0,
    };
  },
  mounted() {
    this.currentMonth = this.$moment().month() + 1;
    this.defaultYear = this.$moment().format("YYYY");
    let _num = Number(this.$moment().format("YYYY")) + 2;
    let _length = _num - 2000;
    for (let i = 0; i < _length + 1; i++) {
      if (i > 0) _num--;
      this.yearList.push(_num);
    }
    if (this.$refs.head.accountInfo.type == 1) {
      this.eventPower = true;
    } else {
      if (this.$refs.head.publishInfo.auth_ids.includes(this.eventPowerId)) {
        this.eventPower = true;
      } else {
        this.eventPower = false;
      }
    }
    this.getData();
    this.getListData();
    // console.log(this.$moment().month() + 1);
  },
  updated() {},
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        year: this.defaultYear,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_ALL(data);
      if (res.code == 0) {
        this.pagePower1 = true;
        this.allList = [];
        this.showList = [];
        this.allList = res.data.events;
        this.activeIndex = 1;
        if(this.currentMonth < 10){
          this.activeIndex = this.currentMonth;
        }else{
          this.activeIndex = 10;
        }
        this.caculate();
        this.isOpen = 1;
        this.isOwn = 1;
        this.showList = res.data.events;
        this.openNum = res.data.public_count;
        this.ownNum = res.data.private_count;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower1 = false;
          this.pagePowerId1 = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async getListData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        page: this.page,
        page_size: this.pageSize,
        type: 2,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_LISTS(data);
      if (res.code == 0) {
        this.pagePower2 = true;
        this.eventList = [];
        this.eventList = res.data.events;
        this.total = res.data.count;
        this.getKeyWords();
      } else {
        if (res.code == 1009) {
          this.pagePower2 = false;
          this.pagePowerId2 = res.data;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async getKeyWords() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_KEYWORDS_LISTS(data);
      if (res.code == 0) {
        this.keyList = res.data;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async addEvents() {
      var tStamp = this.$getTimeStamp();
      let _type;
      if (this.eventInfo.loop == 1) {
        _type = 0;
      } else if (this.eventInfo.loop == 2) {
        _type = 1;
      } else if (this.eventInfo.loop == 3) {
        _type = 2;
      } else if (this.eventInfo.loop == 4) {
        _type = 4;
      }
      let data = {
        title: this.eventInfo.name,
        type: 2,
        repeat_year: _type,
        event_day: this.eventInfo.day,
        event_month: this.eventInfo.month,
        effect_first_year: this.eventInfo.year,
        date_type: this.eventInfo.timeType ? 2 : 1,
        event_level: this.eventInfo.level,
        keywords: this.eventInfo.keyWords.join(","),
        event_desc: this.eventInfo.desc,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_ADD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "新增成功", 0);
        this.getListData();
        this.addOrganize = false;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async editEvent() {
      var tStamp = this.$getTimeStamp();
      let _type;
      if (this.eventInfo.loop == 1) {
        _type = 0;
      } else if (this.eventInfo.loop == 2) {
        _type = 1;
      } else if (this.eventInfo.loop == 3) {
        _type = 2;
      } else if (this.eventInfo.loop == 4) {
        _type = 4;
      }
      let data = {
        event_id: this.eventInfo.id,
        title: this.eventInfo.name,
        type: 2,
        repeat_year: _type,
        event_day: this.eventInfo.day,
        event_month: this.eventInfo.month,
        effect_first_year: this.eventInfo.year,
        date_type: this.eventInfo.timeType ? 2 : 1,
        event_level: this.eventInfo.level,
        keywords: this.eventInfo.keyWords.join(","),
        event_desc: this.eventInfo.desc,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_UPDATE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "编辑成功", 0);
        this.getListData();
        this.addOrganize = false;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async deleteEvent(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        event_id: id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_DELETE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "删除成功", 0);
        this.getListData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    handleCancel() {
      this.changeYear = false;
    },
    handleOk() {
      this.changeYear = false;
    },
    selectCategory(item, index) {
      this.isLoading = true;
      this.defaultYear = item;
      this.getData();
    },
    arrChange() {
      this.showList = [];
      let _arr = [];
      _arr = JSON.parse(JSON.stringify(this.allList));
      // console.log(_arr)
      if (this.isOpen == 0) {
        _arr.map((value, key) => {
          value.lists = value.lists.filter((val, index) => {
            return val.type != 1;
          });
          return value;
        });
      }
      if (this.isOwn == 0) {
        _arr.map((value, key) => {
          value.lists = value.lists.filter((val, index) => {
            return val.type != 2;
          });
          return value;
        });
      }
      this.showList = _arr;
      // console.log(123, this.showList,this.allList);
    },
    before() {
      // console.log(this.activeIndex)
      if (this.activeIndex > 1) {
        this.activeIndex--;
        this.caculate();
      }
    },
    after() {
      if (this.activeIndex < 10) {
        this.activeIndex++;
        this.caculate();
      }
    },
    caculate() {
      let _dom = document.getElementsByClassName("move-box");
      if (this.activeIndex == 1) {
        _dom[0].className = "move-box trans0";
      } else if (this.activeIndex == 2) {
        _dom[0].className = "move-box trans1";
      } else if (this.activeIndex == 3) {
        _dom[0].className = "move-box trans2";
      } else if (this.activeIndex == 4) {
        _dom[0].className = "move-box trans3";
      } else if (this.activeIndex == 5) {
        _dom[0].className = "move-box trans4";
      } else if (this.activeIndex == 6) {
        _dom[0].className = "move-box trans5";
      } else if (this.activeIndex == 7) {
        _dom[0].className = "move-box trans6";
      } else if (this.activeIndex == 8) {
        _dom[0].className = "move-box trans7";
      } else if (this.activeIndex == 9) {
        _dom[0].className = "move-box trans8";
      } else if (this.activeIndex == 10) {
        _dom[0].className = "move-box trans9";
      }
    },
    toEventDetail(litem, lindex) {
      this.$router.push({
        name: "eventdetail",
        query: {
          event_id: litem.event_id,
        },
      });
    },
    openClick() {
      this.isOpen = this.isOpen ? 0 : 1;
      this.arrChange();
    },
    ownClick() {
      this.isOwn = this.isOwn ? 0 : 1;
      this.arrChange();
    },
    onSearch() {
      this.page = 1;
      this.getListData();
    },
    control() {
      this.type = this.type ? 0 : 1;
    },
    onShowSizeChange(page, pageSize) {
      this.page = page;
      this.getListData();
    },
    addEvent() {
      if (this.eventPower) {
        this.isAdd = 0;
        this.eventInfo.id = 0;
        this.eventInfo.name = "";
        this.eventInfo.loop = 0;
        this.eventInfo.time = "";
        this.eventInfo.year = "";
        this.eventInfo.month = "";
        this.eventInfo.day = "";
        this.eventInfo.level = 0;
        this.eventInfo.keyWords = [];
        this.eventInfo.desc = "";
        this.eventInfo.timeType = 0;
        this.addOrganize = true;
      } else {
        this.$refs.head.globalTip(1, "暂无权限", 0);
      }
    },
    openInfo(item, index) {
      // console.log(item);return
      if (this.eventPower) {
        this.isAdd = 1;
        this.eventInfo.id = item.event_id;
        this.eventInfo.name = item.title;
        if (item.repeat_year == 0) {
          this.eventInfo.loop = 1;
        } else if (item.repeat_year == 1) {
          this.eventInfo.loop = 2;
        } else if (item.repeat_year == 2) {
          this.eventInfo.loop = 3;
        } else if (item.repeat_year == 4) {
          this.eventInfo.loop = 4;
        }
        this.eventInfo.year = item.effect_first_year;
        this.eventInfo.month =
          item.event_month >= 10 ? item.event_month : "0" + item.event_month;
        this.eventInfo.day =
          item.event_day >= 10 ? item.event_day : "0" + item.event_day;
        this.eventInfo.time =
          this.eventInfo.year.toString() +
          this.eventInfo.month +
          this.eventInfo.day;
        this.eventInfo.level = item.event_level;
        this.eventInfo.keyWords = item.keywords.map((value, key) => {
          return value.id;
        });
        this.eventInfo.desc = item.event_desc;
        this.eventInfo.timeType = item.date_type == 1 ? 0 : 1;
        this.addOrganize = true;
      } else {
        this.$refs.head.globalTip(1, "暂无权限", 0);
      }
    },
    handleCancel() {
      this.addOrganize = false;
    },
    handleOk() {
      // console.log(this.eventInfo);
      if (this.eventInfo.name.length == 0) {
        this.$refs.head.globalTip(1, "请填写事件名称", 0);
        return;
      }
      if (this.eventInfo.name.length > 15) {
        this.$refs.head.globalTip(1, "事件名称不能超过15个字", 0);
        return;
      }
      if (this.eventInfo.loop == 0) {
        this.$refs.head.globalTip(1, "请选择事件循环规则", 0);
        return;
      }
      if (this.eventInfo.time.length == 0) {
        this.$refs.head.globalTip(1, "请选择事件循环日期", 0);
        return;
      }
      if (this.eventInfo.level == 0) {
        this.$refs.head.globalTip(1, "请选择事件重要级别", 0);
        return;
      }
      if (this.isAdd == 0) {
        this.addEvents();
      } else {
        this.editEvent();
      }
    },
    onChange(date, dateString) {
      // console.log(date,dateString.split('-'));
      this.eventInfo.time = dateString;
      this.eventInfo.year = dateString.split("-")[0];
      this.eventInfo.month = dateString.split("-")[1];
      this.eventInfo.day = dateString.split("-")[2];
    },
    deleteOrganize(item, index) {
      if (this.eventPower) {
        var _this = this;
        this.$confirm({
          title: "确认删除事件",
          content: "请谨慎操作。",
          okText: "删除事件",
          cancelText: "取消",
          okType: "danger",
          onOk() {
            _this.deleteEvent(item.event_id);
          },
          onCancel() {},
        });
      } else {
        this.$refs.head.globalTip(1, "暂无权限", 0);
      }
    },
    handleChange(value) {
      // console.log(value)
      this.eventInfo.keyWords = value;
    },
    publisherChange() {
      this.isLoading = true;
      if (this.$refs.head.accountInfo.type == 1) {
        this.eventPower = true;
      } else {
        if (this.$refs.head.publishInfo.auth_ids.includes(this.eventPowerId)) {
          this.eventPower = true;
        } else {
          this.eventPower = false;
        }
      }
      this.getData();
      this.getListData();
    },
  },
};
</script>
