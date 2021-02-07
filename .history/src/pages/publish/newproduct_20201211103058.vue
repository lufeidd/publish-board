<template>
  <div id="newProductPage" @click="showResult = false">
    <HeadNav
      type="publish"
      :show="1"
      ref="head"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="newproduct"></SlideNav>
        </div>
        <div class="float-right">
          <div
            class="main-container"
            style="min-height: 660px"
            v-if="pagePower"
          >
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">新品追踪</div>
                <div class="new-data clearfix">
                  <div class="float-left">
                    <div class="data-block">
                      <div>
                        <a-icon type="line-chart" />
                        <span class="secondary-font">本社新品种数</span>
                      </div>
                      <div class="data-font">{{ goodsTotal }}</div>
                    </div>
                  </div>
                  <div
                    class="float-left"
                    style="width: 320px; margin-left: 25px"
                  >
                    <div id="ring-chart1"></div>
                  </div>
                  <div
                    class="float-left"
                    style="width: 320px; margin-left: 25px"
                  >
                    <div id="ring-chart2"></div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 选择条件 -->
            <div class="model-container">
              <div class="model-bg clearfix choose">
                <div class="float-left" style="line-height: 32px">
                  <span>
                    <a-dropdown :trigger="['click']" placement="bottomLeft">
                      <a
                        class="ant-dropdown-link"
                        @click="(e) => e.preventDefault()"
                        style="font-size: 12px; color: #4576db"
                      >
                        <span v-if="chooseTime == 0">全部上市时长</span>
                        <span v-if="chooseTime == 1">1~3个月</span>
                        <span v-if="chooseTime == 2">4~6个月</span>
                        <span v-if="chooseTime == 3">7~9个月</span>
                        <span v-if="chooseTime == 4">10~12个月</span>
                        <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay">
                        <a-menu-item
                          v-for="(item, index) in timeList"
                          :key="index"
                        >
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectTime(item, index)"
                            >{{ item.name }}</a
                          >
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </span>
                  <span style="margin-left: 25px">
                    <a-dropdown :trigger="['click']" placement="bottomLeft">
                      <a
                        class="ant-dropdown-link"
                        @click="(e) => e.preventDefault()"
                        style="font-size: 12px; color: #4576db"
                      >
                        <span v-if="chooseTrend == 0">全部新品趋势</span>
                        <span v-if="chooseTrend == 1">逐步下降</span>
                        <span v-if="chooseTrend == 2">持续增长</span>
                        <span v-if="chooseTrend == 3">平稳销售</span>
                        <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay">
                        <a-menu-item
                          v-for="(item, index) in trendList"
                          :key="index"
                        >
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectTrend(item, index)"
                            >{{ item.name }}</a
                          >
                        </a-menu-item>
                      </a-menu>
                    </a-dropdown>
                  </span>
                </div>
                <div class="float-right">
                  <div class="common" style="position: relative">
                    <a-input
                      placeholder="搜索品种名称、ISBN"
                      @input="inputSearch"
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
                            style="width:35px;height:35px;"
                            v-if="item1.cover_pic"
                          />
                          <span
                            v-else
                            class="no-pic"
                            style="min-width: 35px; min-height: 35px"
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
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div v-if="goodsList.length > 0">
              <div
                class="model-container"
                v-for="(item, index) in goodsList"
                :key="index"
              >
                <div class="model-bg">
                  <div class="goods-list clearfix">
                    <div class="float-left">
                      <div class="goods">
                        <img
                          :src="item.cover_pic"
                          alt
                          style="width:63px;height:63px;"
                          v-if="item.cover_pic"
                        />
                        <span
                          v-else
                          class="no-pic"
                          style="min-width: 63px; min-height: 63px"
                        ></span>
                        <div
                          class="title click-font"
                          :title="item.goods_name"
                          @click="$toDetail(item.goods_id)"
                        >
                          {{ item.goods_name }}
                        </div>
                        <span class="data-tab data-tab-three data-tab-click" v-if="item.trend == 1">逐步下降
                        </span>
                        <span class="data-tab data-tab-two data-tab-click" v-if="item.trend == 2">持续增长
                        </span>
                        <span class="data-tab data-tab-seven data-tab-click" v-if="item.trend == 3">平稳销售
                        </span>
                        <span class="data-tab data-tab-seven data-tab-click">{{
                          item.strategy
                        }}</span>
                      </div>
                    </div>
                    <div class="float-right">
                      <div class="data-block">
                        <div>
                          <a-icon type="line-chart" />
                          <span class="secondary-font">上市时长</span>
                        </div>
                        <div class="font" v-if="item.publish_duration > 0">{{ item.publish_duration }}个月</div>
                        <div class="font" v-else>预售中</div>
                      </div>
                      <div class="data-block">
                        <div>
                          <a-icon type="line-chart" />
                          <span class="secondary-font">上周销售指数</span>
                        </div>
                        <div class="font">{{ item.last_week_sale_total }}</div>
                      </div>
                      <div class="data-block">
                        <div>
                          <a-icon type="line-chart" />
                          <span class="secondary-font">累计销售指数</span>
                        </div>
                        <div class="font">{{ item.sale_total }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 分页 -->
              <div class="model-container">
                <div class="model-bg">
                  <div class="page">
                    <a-pagination
                      :show-total="(total) => `共 ${total} 条数据`"
                      :default-current="1"
                      :total="total"
                      v-model="page"
                      :defaultPageSize="pageSize"
                      @change="onShowSizeChange"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="model-container">
                <div class="model-bg">
                  <div class="no-data">暂无数据</div>
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
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style lang="scss" scoped src="@/style/scss/pages/publish/other.scss"></style>
<script>
import { Chart, registerShape } from "@antv/g2";
import { TOP_SEARCH, TRACE_NEWGOODS } from "../../apis/publish.js";
export default {
  data() {
    return {
      pagePower: true,
      ringData1: [
        { type: "1~3个月", sold: 0 },
        { type: "4~6个月", sold: 0 },
        { type: "7~9个月", sold: 0 },
        { type: "10~12个月", sold: 0 },
      ],
      ringData2: [
        { type: "逐步下降", sold: 0 },
        { type: "持续增长", sold: 0 },
        { type: "平稳销售", sold: 0 },
      ],
      ringChart1: null,
      ringChart2: null,
      chooseTime: 0,
      chooseTrend: 0,
      chooseId: 0,
      timeList: [
        { name: "全部上市时长", id: 0 },
        { name: "1~3个月", id: 1 },
        { name: "4~6个月", id: 2 },
        { name: "7~9个月", id: 3 },
        { name: "10~12个月", id: 4 },
      ],
      trendList: [
        { name: "全部新品趋势", id: 0 },
        { name: "逐步下降", id: 1 },
        { name: "持续增长", id: 2 },
        { name: "平稳销售", id: 3 },
      ],
      inputVal: "",
      dataSource: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
      goodsList: [],
      goodsTotal: 0,
      isFirst: true,
      chartFirst: true,
      page: 1,
      total: 0,
      pageSize: 10,
      isLoading: true,
    };
  },
  mounted() {
    this.getData();
  },
  updated() {

  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        publish_time: this.chooseTime,
        trend: this.chooseTrend,
        goods_id: this.chooseId,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await TRACE_NEWGOODS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.total = res.data.total;
        this.isLoading = false;
        this.ringData1 = this.ringData1.map((value, key) => {
          value.sold = res.data.publish_time_info[key + 1];
          return value;
        });
        this.ringData2 = this.ringData2.map((value, key) => {
          value.sold = res.data.trend_info[key + 1];
          return value;
        });
        let _this = this;
        setTimeout(() => {
          if (_this.isFirst) {
            _this.goodsTotal = res.data.total;
          }
          if (_this.chartFirst) {
            _this.initData1();
            _this.initData2();
          } else {
            _this.ringChart1.changeData(_this.ringData1);
            _this.ringChart2.changeData(_this.ringData2);
          }
          _this.isFirst = false;
          _this.chartFirst = false;
        }, 500);
        this.goodsList = [];
        this.goodsList = res.data.list;
        this.showResult = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
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
    inputClick() {},
    inputSearch() {
      this.dataSource = [];
      if (this.inputVal.length > 0) {
        this.showResult = true;
        this.searchLoading = true;
        this.showAbout = false;
        this.search(this.inputVal);
      } else {
        this.showResult = false;
        this.chooseId = 0;
        this.page = 1;
        this.getData();
      }
    },
    selected(item1, index1) {
      this.chooseId = item1.goods_id;
      this.changeData();
    },
    selectTime(item, index) {
      this.chooseTime = item.id;
      this.changeData();
    },
    selectTrend(item, index) {
      this.chooseTrend = item.id;
      this.changeData();
    },
    changeData() {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(page, pageSize) {
      this.page = page;
      this.isLoading = true;
      this.getData();
    },
    initData1() {
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

      this.ringChart1 = new Chart({
        container: "ring-chart1", // 指定图表容器 ID
        autoFit: true,
        height: 160,
        padding: [0, 0, 10, 0],
      });

      this.ringChart1.data(this.ringData1);
      this.ringChart1.scale("sold", {
        formatter: (val) => {
          // val = val * 100 + "%";
          return val;
        },
      });
      this.ringChart1.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.5,
      });
      this.ringChart1.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
      });
      this.ringChart1
        .interval()
        .adjust("stack")
        .position("sold")
        .color("type", (type) => {
          if (type == "1~3个月") {
            return "#D3DFF5";
          } else if (type == "4~6个月") {
            return "#275FD1";
          } else if (type == "7~9个月") {
            return "#FE9D31";
          } else if (type == "10~12个月") {
            return "#E36867";
          }
          // else if (type == "新品") {
          //   return "#59B87A";
          // }
        })
        .tooltip("type*sold", (type, sold) => {
          // sold = sold * 100 + "%";
          return {
            name: type,
            value: sold,
          };
        })
        .shape("slice-shape");
      this.ringChart1.legend({
        position: "right",
      });
      this.ringChart1.interaction("element-active");

      this.ringChart1.render();

    },
    initData2() {
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

      this.ringChart2 = new Chart({
        container: "ring-chart2", // 指定图表容器 ID
        autoFit: true,
        height: 160,
        padding: [0, 0, 10, 0],
      });

      this.ringChart2.data(this.ringData2);
      this.ringChart2.scale("sold", {
        formatter: (val) => {
          // val = val * 100 + "%";
          return val;
        },
      });
      this.ringChart2.coordinate("theta", {
        radius: 0.75,
        innerRadius: 0.5,
      });
      this.ringChart2.tooltip({
        showTitle: false,
        showMarkers: false,
        itemTpl:
          '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
      });
      this.ringChart2
        .interval()
        .adjust("stack")
        .position("sold")
        .color("type", (type) => {
          if (type == "逐步下降") {
            return "#57B878";
          } else if (type == "持续增长") {
            return "#275FD1";
          } else if (type == "平稳销售") {
            return "#FE9D31";
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
      this.ringChart2.legend({
        position: "right",
      });
      this.ringChart2.interaction("element-active");

      this.ringChart2.render();

    },
    publisherChange() {
      this.page = 1;
      this.chooseTime = 0;
      this.chooseTrend = 0;
      this.chooseId = 0;
      this.isLoading = true;
      if(!this.pagePower){
        this.isFirst = true;
        this.chartFirst = true;
      }
      this.getData();
    },
  },
};
</script>
