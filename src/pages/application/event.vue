<template>
  <div id="eventPage">
    <HeadNav type="application" :show="1" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="application" sort="event"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg" style="padding-bottom:20px;min-height:660px;">
                <div class="section-title">
                  事件年历
                  <!-- <span
                    class="click-font"
                    style="margin-left:5px;"
                    @click="changeYear = true"
                  >切换年份</span>-->
                </div>
                <div class="container">
                  <div class="event-head clearfix">
                    <div class="float-left">
                      <a-dropdown :trigger="['click']" placement="bottomLeft">
                        <a
                          class="ant-dropdown-link"
                          @click="e => e.preventDefault()"
                          style="font-size:12px;color:#4576DB;"
                        >
                          {{defaultYear}}年
                          <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                          <a-menu-item v-for="(item,index) in yearList" :key="index">
                            <a
                              href="javascript:;"
                              style="padding:5px 15px;color:#515A6E;font-size:12px;"
                              @click="selectCategory(item,index)"
                            >{{item}}年</a>
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
                        :class="{'active':isOpen == 0}"
                        @click="openClick"
                      >{{openNum}}</span>
                      内部事件
                      <span
                        class="data-tab data-tab-click data-tab-six"
                        :class="{'active':isOwn == 0}"
                        @click="ownClick"
                      >{{ownNum}}</span>
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
                        <div class="model" v-for="(item,index) in showList" :key="index">
                          <div class="month">{{item.month}}月</div>
                          <div class="date-content">
                            <div v-if="item.lists.length > 0">
                              <div v-for="(litem,lindex) in item.lists" :key="lindex">
                                <div
                                  class="date two"
                                  v-if="litem.type == 1"
                                  @click="toDetail(litem,lindex)"
                                >
                                  {{litem.event_month>=10?litem.event_month:'0'+litem.event_month}}-{{litem.event_day>=10?litem.event_day:'0'+litem.event_day}} {{litem.title}}
                                  <span
                                    class="star"
                                  >
                                    <svg class="icon" aria-hidden="true">
                                      <use xlink:href="#icon-star" />
                                    </svg>
                                  </span>
                                </div>
                                <div
                                  class="date three"
                                  v-if="litem.type == 2"
                                  @click="toDetail(litem,lindex)"
                                >
                                  {{litem.event_month>=10?litem.event_month:'0'+litem.event_month}}-{{litem.event_day>=10?litem.event_day:'0'+litem.event_day}} {{litem.title}}
                                  <span
                                    class="star"
                                    v-for="(i,j) in litem.event_level"
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
              </div>
            </div>
          </div>
          <div class="main-container" v-else>
            <div class="model-container">
              <div class="model-bg" style="min-height:660px;padding-bottom:75px;position:relative">
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 切换年份弹层 -->
    <!-- <a-modal v-model="changeYear" width="600px" title="切换年份" on-ok="handleOk">
      <template slot="footer">
        <a-button key="back" @click="handleCancel">取消</a-button>
        <a-button key="submit" type="primary" @click="handleOk">确定</a-button>
      </template>
      <div class="popup">
        <div class="content clearfix">
          <div class="float-left year">2015年</div>
          <div class="float-right total">
            <span class="title">公共节日</span>
            <span class="one">30</span>
            <span class="title">公开事件</span>
            <span class="two">120</span>
            <span class="title">内部事件</span>
            <span class="three">70</span>
          </div>
        </div>
      </div>
    </a-modal>-->
    <Loading ref="load" :show="1"></Loading>
  </div>
</template>
<style lang="scss" scoped src="@/style/scss/pages/application/event.scss"></style>
<script>
import { EVENT_ALL } from "../../apis/admin.js";
export default {
  data() {
    return {
      pagePower: true,
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
    };
  },
  mounted() {
    this.defaultYear = this.$moment().format("YYYY");
    let _num = Number(this.$moment().format("YYYY")) + 2;
    let _length = _num - 2000;
    for (let i = 0; i < _length + 1; i++) {
      if (i > 0) _num--;
      this.yearList.push(_num);
    }
    this.getData();
    // console.log(this.yearList)
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    async getData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        year: this.defaultYear,
      };
      let res = await EVENT_ALL(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.allList = [];
        this.showList = [];
        this.allList = res.data.events;
        this.activeIndex = 1;
        this.isOpen = 1;
        this.isOwn = 1;
        this.showList = res.data.events;
        this.openNum = res.data.public_count;
        this.ownNum = res.data.private_count;
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    handleCancel() {
      this.changeYear = false;
    },
    handleOk() {
      this.changeYear = false;
    },
    selectCategory(item, index) {
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
      let _dom = document.getElementsByClassName("move-box");
      if (this.activeIndex > 1) {
        this.activeIndex--;
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
      }
    },
    after() {
      let _dom = document.getElementsByClassName("move-box");
      if (this.activeIndex < 10) {
        this.activeIndex++;
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
      }
    },
    toDetail(litem, lindex) {
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
    publisherChange() {
      this.$refs.load.isLoading = true;
      this.getData();
    },
  },
};
</script>
