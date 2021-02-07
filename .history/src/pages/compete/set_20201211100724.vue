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
          <SlideNav type="compete" sort="competeset"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">竞争配置</div>
                <div class="set">
                  <div class="data-block">
                    <div>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-monitor" />
                      </svg>
                      <span>监控出版单位</span>
                    </div>
                    <div class="bottom">
                      <span class="num">{{ initPublish.count }}</span>
                      /{{ initPublish.max }}
                    </div>
                  </div>
                  <div class="data-block">
                    <div>
                      <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-monitor" />
                      </svg>
                      <span>监控品种</span>
                    </div>
                    <div class="bottom">
                      <span class="num">{{ initGoods.count }}</span>
                      /{{ initGoods.max }}
                    </div>
                  </div>
                  <div class="tabs">
                    <a-tabs :activeKey="tabKey" @change="callback">
                      <a-tab-pane key="1" tab="竞社配置"></a-tab-pane>
                      <a-tab-pane key="2" tab="竞品配置"></a-tab-pane>
                    </a-tabs>
                  </div>
                </div>
              </div>
            </div>
            <!-- 竞社监控列表 -->
            <div class="model-container" v-if="tabKey == '1'">
              <div class="model-bg" style="min-height: 453px">
                <div class="section-title">竞社监控列表</div>
                <div class="container">
                  <div class="content common" style="text-align: center">
                    <a-auto-complete
                      option-label-prop="value"
                      style="width: 800px"
                      placeholder="搜索出版单位名称，点击添加至监控列表"
                      @search="onChange"
                      @select="selected"
                      v-model="inputVal"
                    >
                      <template slot="dataSource">
                        <a-select-option
                          v-for="(opt, index) in dataSource"
                          :key="index"
                          :value="opt.supplier_name"
                        >
                          <div class="result">
                            <span>{{ opt.supplier_name }}</span>
                          </div>
                        </a-select-option>
                      </template>
                      <a-input style="height: 40px">
                        <div slot="prefix">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-search" />
                          </svg>
                          <span class="rowLine">|</span>
                        </div>
                      </a-input>
                    </a-auto-complete>
                  </div>
                  <!-- 列表 -->
                  <div class="list" v-if="publishList.length > 0">
                    <div
                      class="list-item"
                      v-for="(item, index) in publishList"
                      :key="index"
                    >
                      <div class="name">{{ item.supplier_name }}</div>
                      <div class="time">{{ item.create_time }}</div>
                      <div class="btn">
                        <span class="click-font" @click="$refs.head.noOpen()"
                          >查看详情</span
                        >
                        <span
                          class="click-font"
                          style="margin-left: 10px"
                          @click="cancle(item, index, 0)"
                          >移除监控</span
                        >
                      </div>
                    </div>
                  </div>
                  <div v-else style="margin-top: 80px">
                    <a-empty />
                  </div>
                </div>
              </div>
            </div>
            <!-- 竞品监控列表 -->
            <div class="model-container" v-if="tabKey == '2'">
              <div class="model-bg" style="min-height: 453px">
                <div class="section-title">竞品监控列表</div>
                <div class="goods-container">
                  <div
                    class="content common"
                    style="width: 800px; position: relative; margin: 0 auto"
                  >
                    <a-input
                      placeholder="搜索品种名称、ISBN，点击添加至监控列表"
                      size="large"
                      @input="inputSearch"
                      @focus="inputSearch"
                      @click.stop="inputClick"
                      v-model="inputVal1"
                    >
                      <div slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-search" />
                        </svg>
                        <span class="rowLine">|</span>
                      </div>
                    </a-input>
                    <div class="search-result" v-if="showResult">
                      <div class="list" v-if="dataSource1.length > 0">
                        <div
                          class="result-content"
                          v-for="(item1, index1) in dataSource1"
                          :key="index1"
                          @click.stop="selected1(item1, index1)"
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
                  <!-- 列表 -->
                  <div class="table" style="margin-top: 40px">
                    <table style="table-layout: fixed">
                      <colgroup>
                        <col width="380" />
                        <col width="200" />
                        <col width="140" />
                        <col width="160" />
                        <col width="170" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>品种</td>
                          <td>作者</td>
                          <td style="text-align: center">类目</td>
                          <td style="text-align: right">监控日期</td>
                          <td style="text-align: right">操作</td>
                        </tr>
                      </thead>
                      <tbody v-if="goodsList.length > 0">
                        <tr v-for="(item, index) in goodsList" :key="index">
                          <td>
                            <div class="goods-desc">
                              <span class="goods-image" v-if="item.cover_pic">
                            <img
                            :src="item.cover_pic"
                            alt
                            style="width:40px;height:40px;"
                          />
                          </span>
                              <span
                                v-else
                                class="no-pic"
                                style="min-width: 40px; min-height: 40px"
                              ></span>
                              <span
                                class="click-font goods-name"
                                @click="$toDetail(item.goods_id)"
                                :title="item.goods_name"
                                >{{ item.goods_name }}</span
                              >
                            </div>
                          </td>
                          <td>
                            <div class="author" @click="$refs.head.noOpen()">
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
                            <span v-if="item.cate_node_4"
                              >＞ {{ item.cate_node_4 }}</span
                            >
                          </td>
                          <td style="text-align: right">
                            {{ item.create_time }}
                          </td>
                          <td style="text-align: right">
                            <span
                              class="click-font"
                              @click="cancle(item, index, 1)"
                              >移除监控</span
                            >
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="5">
                            <div<a-empty />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
<style scoped lang="scss" src="@/style/scss/pages/compete/set.scss"></style>
<script>
import {
  PUBLISHER_COMPETE_INIT,
  PUBLISHER_COMPETE_GETS,
  PUBLISHER_COMPETE_ADD,
  PUBLISHER_COMPETE_DELETE,
} from "../../apis/compete.js";
import { TOP_SEARCH } from "../../apis/publish.js";
import { SUPPLIER_GETS } from "../../apis/common.js";
export default {
  data() {
    return {
      pagePower: true,
      tabKey: "1",
      initPublish: {},
      initGoods: {},
      inputVal: "",
      inputVal1: "",
      dataSource: [],
      dataSource1: [],
      publishList: [],
      goodsList: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
      isLoading: true,
    };
  },
  mounted() {
    this.getInit();
    this.getData();
  },
  updated() {},
  methods: {
    async getInit() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await PUBLISHER_COMPETE_INIT(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.initPublish = res.data.supplier;
        this.initGoods = res.data.goods;
      } else {
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 监控列表获取
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        type: Number(this.tabKey),
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await PUBLISHER_COMPETE_GETS(data);
      if (res.code == 0) {
        if (this.tabKey == "1") {
          this.publishList = [];
          this.publishList = res.data;
        } else {
          this.pagePower = true;
          this.goodsList = [];
          res.data.map((value, key) => {
            value.active = false;
            this.goodsList.push(value);
          });
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
    // 新增监控
    async addMonitor(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        type: Number(this.tabKey),
        target_id: id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await PUBLISHER_COMPETE_ADD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "添加成功", 0);
        this.showResult = false;
        this.getInit();
        this.getData();
      } else {
        if (res.code == 105) {
          this.$refs.head.globalTip(1, "竞争监控已存在，请勿重复添加", 0);
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 取消监控
    async deleteMonitor(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        compete_id: id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await PUBLISHER_COMPETE_DELETE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "取消成功", 0);
        this.getInit();
        this.getData();
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 出版社列表获取
    async getPublishList(val) {
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
        this.dataSource = res.data.list;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    // 品种列表获取
    async goodsearch(_value) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        // supplier_id: this.$refs.head.publishInfo.supplier_id,
        search: _value,
        page: 1,
        page_size: 100,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await TOP_SEARCH(data);
      if (res.code == 0) {
        // console.log(66, this.inputVal1);
        if (res.data.search == this.inputVal1) {
          this.dataSource1 = res.data.lists.map((value, key) => {
            return value;
          });
        }
        // console.log(777, this.dataSource1);
        this.searchLoading = false;
      } else {
        this.searchLoading = false;
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    callback(key) {
      this.tabKey = key;
      this.getData();
    },
    onChange(value) {
      let _val = value.toString();
      this.dataSource = [];
      this.getPublishList(_val);
    },
    selected(value) {
      if (this.initPublish.count < this.initPublish.max) {
        let _this = this,
          _id = 0;
        this.dataSource.map((val, key) => {
          if (val.supplier_name == value) {
            _id = val.supplier_id;
          }
        });
        this.$confirm({
          title: "确认添加监控",
          content: "确认将{" + value + "}设为竞社监控？",
          okText: "确定",
          cancelText: "取消",
          okType: "primary",
          onOk() {
            _this.addMonitor(_id);
          },
          onCancel() {},
        });
      } else {
        this.$refs.head.globalTip(1, "监控对象已达到数量上限", 0);
      }
    },
    inputClick() {
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    inputSearch() {
      this.dataSource1 = [];
      if (this.inputVal1.length > 0) {
        this.showResult = true;
        this.searchLoading = true;
        this.showAbout = false;
        this.goodsearch(this.inputVal1);
      } else {
        this.showResult = false;
      }
    },
    selected1(item1, index1) {
      if (this.initGoods.count < this.initGoods.max) {
        let _this = this;
        this.$confirm({
          title: "确认添加监控",
          content: "确认将《" + item1.title + "》设为竞品监控？",
          okText: "确定",
          cancelText: "取消",
          okType: "primary",
          onOk() {
            _this.addMonitor(item1.goods_id);
          },
          onCancel() {},
        });
      } else {
        this.$refs.head.globalTip(1, "监控对象已达到数量上限", 0);
      }
    },
    cancle(item, index, type) {
      let _this = this;
      let _text;
      if (type) {
        _text = "确认将《" + item.goods_name + "》移除竞品监控？";
      } else {
        _text = "确认将{" + item.supplier_name + "}移除竞社监控？";
      }
      this.$confirm({
        title: "确认移除监控",
        content: _text,
        okText: "移除",
        cancelText: "取消",
        okType: "primary",
        onOk() {
          _this.deleteMonitor(item.id);
        },
        onCancel() {},
      });
    },
    bodyClick() {
      this.showResult = false;
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    openAuthor(item, index) {
      this.showResult = false;
      this.goodsList = this.goodsList.map((value, key) => {
        if (index == key) {
          value.active = true;
        } else {
          value.active = false;
        }
        return value;
      });
    },
    publisherChange() {
      this.isLoading = true;
      this.tabKey = "1";
      this.getInit();
      this.getData();
    },
  },
};
</script>
