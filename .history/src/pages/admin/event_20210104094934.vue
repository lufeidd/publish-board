<template>
  <div id="organizePage">
    <HeadNav type="admin" ref="head" :show="1"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="admin" sort="event"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="powerType == 1">
            <div class="model-container">
              <div
                class="model-bg"
                style="padding-bottom: 75px; min-height: 660px"
              >
                <div class="section-title clearfix">
                  <div class="float-left">大事件管理</div>
                  <div class="float-right">
                    <span class="click-font" @click="addEvent">新增事件</span>
                  </div>
                </div>
                <div class="search">
                  <div class="content common">
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
                <!-- 高级搜素 -->
                <div class="high-search" v-if="type == 1">
                  <div class="option">
                    <span class="title">事件类型</span>
                    <span
                      class="high-tab"
                      v-for="(item, index) in eventTypeList"
                      :key="index"
                      :class="{ active: eventType == index }"
                      @click="change(index, 'event')"
                      >{{ item.name }}</span
                    >
                  </div>
                  <div class="option">
                    <span class="title">发生时间</span>
                    <span
                      class="high-tab"
                      v-for="(item, index) in timeList"
                      :key="index"
                      :class="{ active: timeType == index }"
                      @click="change(index, 'time')"
                      >{{ item.name }}</span
                    >
                  </div>
                  <div class="option">
                    <span class="title">循环类型</span>
                    <span
                      class="high-tab"
                      v-for="(item, index) in loopList"
                      :key="index"
                      :class="{ active: loopType == index }"
                      @click="change(index, 'loop')"
                      >{{ item.name }}</span
                    >
                  </div>
                  <div class="option">
                    <span class="title">排序方式</span>
                    <span
                      class="high-tab"
                      v-for="(item, index) in sortList"
                      :key="index"
                      :class="{ active: sortType == index }"
                      @click="change(index, 'sort')"
                      >{{ item.name }}</span
                    >
                  </div>
                </div>
                <div class="search-switch click-font">
                  <span @click="control">
                    <span v-if="type == 0">展开高级搜索</span>
                    <span v-if="type == 1">收起高级搜索</span>
                    <svg class="icon" aria-hidden="true" v-if="type == 0">
                      <use xlink:href="#icon-open" />
                    </svg>
                    <svg class="icon" aria-hidden="true" v-if="type == 1">
                      <use xlink:href="#icon-shrink" />
                    </svg>
                  </span>
                </div>
                <!-- 列表 -->
                <div class="table" style="margin-top: 50px">
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
                      <col width="120" />
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
                    <tbody v-if="list.length == 0">
                      <tr v-for="(item, index) in list" :key="index">
                        <td>{{ item.event_id }}</td>
                        <td>
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
                          <span class="main-font">{{ item.creator_name }}</span>
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
                          <div><a-empty /></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <!-- 分页 -->
                <div class="page">
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
          <span class="lable event">*公开性</span>
          <div class="normal event">
            <a-radio-group
              name="radioGroup"
              v-model="eventInfo.type"
              size="small"
            >
              <a-radio :value="1" v-if="eventInfo.type == 1">公开</a-radio>
              <a-radio :value="1" v-if="eventInfo.type == 2" disabled
                >公开</a-radio
              >
              <a-radio :value="2" disabled>内部</a-radio>
            </a-radio-group>
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
<style scoped lang="scss" src="@/style/scss/pages/admin/index.scss"></style>
<script>
import {
  EVENT_LISTS,
  EVENT_KEYWORDS_LISTS,
  EVENT_ADD,
  EVENT_UPDATE,
  EVENT_DELETE,
} from "../../apis/admin.js";
export default {
  data() {
    return {
      powerType: 2,
      type: 0,
      eventType: 0,
      timeType: 0,
      loopType: 0,
      sortType: 0,
      eventTypeList: [
        { name: "全部", type: 0 },
        // {name:"公共节日",type:1},
        { name: "公开事件", type: 1 },
        { name: "内部事件", type: 2 },
      ],
      timeList: [
        { name: "全部", type: 0 },
        { name: "1月", type: 1 },
        { name: "2月", type: 2 },
        { name: "3月", type: 3 },
        { name: "4月", type: 4 },
        { name: "5月", type: 5 },
        { name: "6月", type: 6 },
        { name: "7月", type: 7 },
        { name: "8月", type: 8 },
        { name: "9月", type: 9 },
        { name: "10月", type: 10 },
        { name: "11月", type: 11 },
        { name: "12月", type: 12 },
      ],
      loopList: [
        { name: "全部", type: 0 },
        { name: "每年循环", type: 1 },
        { name: "仅有一次", type: 2 },
      ],
      sortList: [
        { name: "默认", type: 0 },
        { name: "时间正序", type: 1 },
        { name: "时间倒序", type: 2 },
        { name: "关联品种数正序", type: 3 },
        { name: "关联品种数倒序", type: 4 },
      ],
      inputVal: "",
      page: 1,
      pageSize: 20,
      total: 0,
      list: [],
      addOrganize: false,
      isAdd: 0,
      keyList: [],
      eventInfo: {
        id: 0,
        name: "",
        type: 1,
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
      isLoading: true,
    };
  },
  mounted() {
    this.powerType = this.$refs.head.accountInfo.type;
    if (this.powerType == 1) {
      this.getData();
      this.getKeyWords();
    } else {
      this.isLoading = false;
    }
  },
  updated() {},
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let _reapt, _sort, data;
      if (this.loopType == 0) {
        _reapt = "";
      } else if (this.loopType == 1) {
        _reapt = 1;
      } else if (this.loopType == 2) {
        _reapt = 0;
      }
      if (this.sortType == 0) {
        _sort = "";
      } else if (this.sortType == 1) {
        _sort = "time,asc";
      } else if (this.sortType == 2) {
        _sort = "time,desc";
      } else if (this.sortType == 3) {
        _sort = "goods_count,asc";
      } else if (this.sortType == 4) {
        _sort = "goods_count,desc";
      }
      if (this.type == 0) {
        data = {
          title: this.inputVal,
          page: this.page,
          page_size: this.pageSize,
          timestamp: tStamp,
        };
      } else {
        data = {
          title: this.inputVal,
          page: this.page,
          page_size: this.pageSize,
          type: this.eventType ? this.eventType : "",
          event_month: this.timeType ? this.timeType : "",
          repeat_year: _reapt,
          sort: _sort,
          timestamp: tStamp,
        };
      }
      data.sign = this.$getSign(data);
      let res = await EVENT_LISTS(data);
      if (res.code == 0) {
        this.powerType == 1;
        this.list = [];
        this.total = res.data.count;
        this.list = res.data.events;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.powerType == 0;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    async getKeyWords() {
      var tStamp = this.$getTimeStamp();
      let data = {
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_KEYWORDS_LISTS(data);
      if (res.code == 0) {
        this.powerType == 1;
        this.keyList = res.data;
      } else {
        if (res.code == 1009) {
          this.powerType == 0;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
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
        type: this.eventInfo.type,
        repeat_year: _type,
        event_day: this.eventInfo.day,
        event_month: this.eventInfo.month,
        effect_first_year: this.eventInfo.year,
        date_type: this.eventInfo.timeType ? 2 : 1,
        event_level: this.eventInfo.level,
        keywords: this.eventInfo.keyWords.join(","),
        event_desc: this.eventInfo.desc,
        // organization_id: 0,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_ADD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "新增成功", 0);
        this.getData();
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
        type: this.eventInfo.type,
        repeat_year: _type,
        event_day: this.eventInfo.day,
        event_month: this.eventInfo.month,
        effect_first_year: this.eventInfo.year,
        date_type: this.eventInfo.timeType ? 2 : 1,
        event_level: this.eventInfo.level,
        keywords: this.eventInfo.keyWords.join(","),
        event_desc: this.eventInfo.desc,
        // organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_UPDATE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "编辑成功", 0);
        this.getData();
        this.addOrganize = false;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async deleteEvent(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        event_id: id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await EVENT_DELETE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "删除成功", 0);
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    onSearch(value) {
      this.isLoading = true;
      this.page = 1;
      // this.searchVal = value;
      this.getData();
    },
    control() {
      this.type = this.type ? 0 : 1;
    },
    change(index, type) {
      this.isLoading = true;
      if (type == "event") {
        this.eventType = index;
      } else if (type == "time") {
        this.timeType = index;
      } else if (type == "loop") {
        this.loopType = index;
      } else if (type == "sort") {
        this.sortType = index;
      }
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(page, pageSize) {
      this.isLoading = true;
      this.page = page;
      this.getData();
    },
    addEvent() {
      this.isAdd = 0;
      this.eventInfo.id = 0;
      this.eventInfo.name = "";
      this.eventInfo.type = 1;
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
    },
    openInfo(item, index) {
      // console.log(item);return
      this.isAdd = 1;
      this.eventInfo.id = item.event_id;
      this.eventInfo.name = item.title;
      this.eventInfo.type = item.type;
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
      if (this.eventInfo.type == 0) {
        this.$refs.head.globalTip(1, "请选择事件公开性", 0);
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
    handleChange(value) {
      // console.log(value)
      this.eventInfo.keyWords = value;
    },
    deleteOrganize(item, index) {
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
    },
    toEventDetail(item, index) {
      this.$router.push({
        name: "eventdetail",
        query: {
          event_id: item.event_id,
        },
      });
    },
  },
};
</script>
