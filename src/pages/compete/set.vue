<template>
  <div id="competePage">
    <HeadNav type="compete" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="compete" sort="competeset"></SlideNav>
        </div>
        <div class="float-left">
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
                      <span>监控出版社</span>
                    </div>
                    <div class="bottom">
                      <span class="num">{{initPublish.count}}</span>
                      /{{initPublish.max}}
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
                      <span class="num">{{initGoods.count}}</span>
                      /{{initGoods.max}}
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
              <div class="model-bg">
                <div class="section-title">竞社监控列表</div>
                <div class="container">
                  <div class="content common" style="text-align:center;">
                    <a-auto-complete
                      option-label-prop="value"
                      style="width: 800px"
                      placeholder="搜索出版社名称，点击添加至监控列表"
                      @search="onChange"
                      @select="selected"
                      v-model="inputVal"
                    >
                      <template slot="dataSource">
                        <a-select-option
                          v-for="(opt,index) in dataSource"
                          :key="index"
                          :value="opt.publisher_name"
                        >
                          <div class="result">
                            <span>{{opt.publisher_name}}</span>
                          </div>
                        </a-select-option>
                      </template>
                      <a-input style="height:40px;">
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
                  <div class="list">
                    <div class="list-item" v-for="(item,index) in publishList" :key="index">
                      <div class="name">{{item.publisher_name}}</div>
                      <div class="time">{{item.create_time}}</div>
                      <div class="btn">
                        <span class="click-font" @click="$refs.head.noOpen()">查看详情</span>
                        <span
                          class="click-font"
                          style="margin-left:10px;"
                          @click="cancle(item,index)"
                        >取消监控</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 竞品监控列表 -->
            <div class="model-container" v-if="tabKey == '2'">
              <div class="model-bg">
                <div class="section-title">竞社监控列表</div>
                <div class="goods-container">
                  <div class="content common" style="text-align:center;">
                    <a-auto-complete
                      option-label-prop="value"
                      style="width: 800px"
                      placeholder="搜索品种名称、ISBN，点击添加至监控列表"
                      @search="onChange1"
                      @select="selected1"
                      v-model="inputVal1"
                    >
                      <template slot="dataSource">
                        <a-select-option
                          v-for="(opt1,index1) in dataSource1"
                          :key="index1"
                          :value="opt1.title"
                        >
                          <div class="result">
                            <img
                              :src="opt1.cover_pic"
                              alt
                              width="35px"
                              height="35px"
                              v-if="opt1.cover_pic"
                            />
                            <span v-else class="no-pic" style="min-width:35px;min-height:35px;"></span>
                            <span>{{opt1.title}}</span>
                          </div>
                        </a-select-option>
                      </template>
                      <a-input style="height:40px;">
                        <div slot="prefix">
                          <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-search" />
                          </svg>
                          <span class="rowLine">|</span>
                        </div>
                      </a-input>
                    </a-auto-complete>
                    <div style="text-align:center;margin-top:10px;" v-if="searchLoading">
                      <a-spin tip></a-spin>
                    </div>
                  </div>
                  <!-- 列表 -->
                  <div class="table" style="margin-top:40px;">
                    <table style="table-layout:fixed;">
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
                          <td style="text-align:center;">作者</td>
                          <td style="text-align:center;">类目</td>
                          <td style="text-align:right;">监控日期</td>
                          <td style="text-align:right;">操作</td>
                        </tr>
                      </thead>
                      <tbody v-if="goodsList.length > 0">
                        <tr v-for="(item,index) in goodsList" :key="index">
                          <td>
                            <div class="goods-desc">
                              <img
                                :src="item.cover_pic"
                                alt
                                width="40px"
                                height="40px"
                                v-if="item.cover_pic"
                              />
                              <span v-else class="no-pic" style="min-width:40px;min-height:40px;"></span>
                              <span
                                class="click-font goods-name"
                                @click="$refs.head.noOpen()"
                                :title="item.goods_name"
                              >{{item.goods_name}}</span>
                            </div>
                          </td>
                          <td style="text-align:center;">
                            <span
                              class="click-font author"
                              @click="$refs.head.noOpen()"
                              :title="item.authors[0].name"
                            >{{item.authors[0].name}}</span>
                          </td>
                          <td
                            style="text-align:center;"
                          >{{item.cate_node_2}} ＞ {{item.cate_node_3}} ＞ {{item.cate_node_4}}</td>
                          <td style="text-align:right;">{{item.create_time}}</td>
                          <td style="text-align:right;">
                            <span class="click-font" @click="cancle(item,index)">取消监控</span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="5">
                            <a-empty />
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
              <div class="model-bg" style="min-height:650px;padding-bottom:75px;position:relative">
                <PageNoPower></PageNoPower>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/compete/set.scss"></style>
<script>
import {
  PUBLISHER_COMPETE_INIT,
  PUBLISHER_COMPETE_GETS,
  PUBLISHER_COMPETE_ADD,
  PUBLISHER_COMPETE_DELETE
} from "../../apis/compete.js";
import { TOP_SEARCH } from "../../apis/publish.js";
import { PUBLISHER_GETS } from "../../apis/common.js";
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
      searchLoading: false
    };
  },
  mounted() {
    this.getInit();
    this.getData();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    async getInit() {
      let data = {
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        organization_id: this.$refs.head.publishInfo.organization_id
      };
      let res = await PUBLISHER_COMPETE_INIT(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.initPublish = res.data.publisher;
        this.initGoods = res.data.goods;
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.pagePower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 监控列表获取
    async getData() {
      let data = {
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        type: Number(this.tabKey)
      };
      let res = await PUBLISHER_COMPETE_GETS(data);
      if (res.code == 0) {
        if (this.tabKey == "1") {
          this.publishList = [];
          this.publishList = res.data;
        } else {
          this.pagePower = true;
          this.goodsList = [];
          this.goodsList = res.data;
        }
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.pagePower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 新增监控
    async addMonitor(id) {
      let data = {
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        type: Number(this.tabKey),
        target_id: id
      };
      let res = await PUBLISHER_COMPETE_ADD(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "添加成功");
        this.getInit();
        this.getData();
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 105) {
          this.$refs.head.globalTip(1, "竞争监控已存在，请勿重复添加");
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 取消监控
    async deleteMonitor(id) {
      let data = {
        compete_id: id,
        organization_id: this.$refs.head.publishInfo.organization_id
      };
      let res = await PUBLISHER_COMPETE_DELETE(data);
      if (res.code == 0) {
        this.$refs.head.globalTip(2, "取消成功");
        this.getInit();
        this.getData();
      } else {
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 出版社列表获取
    async getPublishList(val) {
      let data = {
        publisher_name: val,
        page: 1,
        page_size: 1000
      };
      let res = await PUBLISHER_GETS(data);
      if (res.code == 0) {
        this.dataSource = res.data.list;
      } else {
        // this.$refs.head.globalTip(1, res.message);
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    // 品种列表获取
    async goodsearch(_value) {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        // publisher_id: this.$refs.head.publishInfo.publisher_id,
        search: _value,
        page: 1,
        page_size: 100
      };
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
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
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
          if (val.publisher_name == value) {
            _id = val.publisher_id;
          }
        });
        this.$confirm({
          title: "确认添加监控",
          content: "确认将{" + value + "}设为竞社监控？",
          okText: "确定",
          cancelText: "取消",
          okType: "danger",
          onOk() {
            _this.addMonitor(_id);
          },
          onCancel() {}
        });
      } else {
        this.$refs.head.globalTip(1, "监控对象已达到数量上限");
      }
    },
    onChange1(value) {
      // let _val = value.toString();
      this.inputVal1 = value;
      this.dataSource1 = [];
      if (value.length > 0) {
        this.searchLoading = true;
        this.goodsearch(value);
      }
    },
    selected1(value) {
      if (this.initGoods.count < this.initGoods.max) {
        let _this = this,
          _id = 0;
        this.dataSource1.map((val, key) => {
          if (val.title == value) {
            _id = val.goods_id;
          }
        });
        this.$confirm({
          title: "确认添加监控",
          content: "确认将{" + value + "}设为竞社监控？",
          okText: "确定",
          cancelText: "取消",
          okType: "danger",
          onOk() {
            _this.addMonitor(_id);
          },
          onCancel() {}
        });
      } else {
        this.$refs.head.globalTip(1, "监控对象已达到数量上限");
      }
    },
    cancle(item, index) {
      this.deleteMonitor(item.id);
    },
    publisherChange() {
      this.$refs.load.isLoading = true;
      this.tabKey = "1";
      this.getInit();
      this.getData();
    }
  }
};
</script>
