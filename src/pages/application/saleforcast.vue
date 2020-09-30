<template>
  <div id="taopuPage" @click="showResult = false;">
    <HeadNav type="application" :show="1" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="application" sort="saleforcast"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container">
            <div class="model-container">
              <div class="model-bg" style="padding-bottom:20px;min-height:660px;">
                <!-- <div class="section-title">
                  <div class="float-right">
                    <span class="click-font">导入Excel</span>
                  </div>
                </div>-->
                <div class="search">
                  <p class="title">选择品种</p>
                  <div class="content common" style="position:relative;">
                    <a-input
                      placeholder="搜索品种名称、ISBN"
                      size="large"
                      @input="inputSearch"
                      @focus="inputSearch"
                      @click.stop="inputClick"
                      v-model="inputVal"
                    >
                      <div slot="prefix">
                        <svg class="icon" aria-hidden="true">
                          <use xlink:href="#icon-search" />
                        </svg>
                        <span class="rowLine">|</span>
                      </div>
                    </a-input>
                    <div class="search-result" v-if="showResult">
                      <div class="list" v-if="dataSource.length > 0">
                        <div
                          class="result-content"
                          v-for="(item1,index1) in dataSource"
                          :key="index1"
                          @click.stop="selected(item1,index1)"
                        >
                          <img
                            :src="item1.cover_pic"
                            alt
                            width="35px"
                            height="35px"
                            v-if="item1.cover_pic"
                          />
                          <span v-else class="no-pic" style="min-width:35px;min-height:35px;"></span>
                          <span class="result-title" :title="item1.title">{{item1.title}}</span>
                        </div>
                      </div>
                      <div class="no-result" v-if="dataSource.length == 0 && showAbout">没有相关商品</div>
                      <div style="text-align:center;margin-top:100px;" v-if="searchLoading">
                        <a-spin tip></a-spin>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 列表 -->
                <div class="table">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="240" />
                      <col width="120" />
                      <col width="330" />
                      <col width="240" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>品种</td>
                        <td>预测周期</td>
                        <td>事件影响</td>
                        <td style="text-align:center;">结果</td>
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
                              :title="item.title"
                              @click="toDetail(item,index)"
                            >{{item.title}}</span>
                          </div>
                        </td>
                        <td>
                          <a-dropdown :trigger="['click']" placement="bottomLeft">
                            <a
                              class="ant-dropdown-link"
                              @click="e => e.preventDefault()"
                              style="font-size:12px;color:#4576DB;"
                            >
                              {{item.day}}天
                              <a-icon type="down" />
                            </a>
                            <a-menu slot="overlay">
                              <a-menu-item v-for="(ditem,dindex) in dayList" :key="dindex">
                                <a
                                  href="javascript:;"
                                  style="padding:5px 15px;color:#515A6E;font-size:12px;"
                                  @click="selectCategory(ditem,dindex,item,index)"
                                >{{ditem}}天</a>
                              </a-menu-item>
                            </a-menu>
                          </a-dropdown>
                        </td>
                        <td>
                          <a-select
                            mode="multiple"
                            v-model="item.influence"
                            style="width: 100%"
                            placeholder="选择事件影响"
                            @change="handleChange"
                            @focus="onFocus(item,index)"
                          >
                            <a-select-option
                              v-for="(ritem,rindex) in ratioList"
                              :key="ritem.id"
                            >{{ritem.name}}</a-select-option>
                          </a-select>
                        </td>
                        <td style="text-align:center;">
                          <span v-if="item.isLoading">
                            <a-spin :indicator="indicator" tip="预测中" />
                          </span>
                          <span
                            class="main-font"
                            v-else
                          >预估销量{{(item.dms*item.day*item.inums).toFixed(0)}}</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="click-font" @click="adelete(item,index)">删除</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="5" style="text-align:center;">
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
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/publish/taopu100.scss"></style>
<script>
import { TOP_SEARCH } from "../../apis/publish.js";
import { FORECAST_DMS } from "../../apis/application.js";
export default {
  data() {
    return {
      inputVal: "",
      dataSource: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
      goodsList: [],
      dayList: [15, 30, 60, 90, 120],
      ratioList: [
        { id: 1, name: "双十一", value: 1.75 },
        { id: 2, name: "电商活动", value: 0.75 },
        { id: 3, name: "网络热搜", value: 0.15 },
        { id: 4, name: "获得奖项", value: 0.85 },
        { id: 5, name: "影视热播", value: 0.85 },
      ],
      activeIndex: 0,
      indicator: <a-icon type="loading" style="font-size: 16px" spin />,
    }
  },
  mounted() {
    this.$setSlideHeight();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    async getDms(_item) {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        goods_id: _item.goods_id,
      };
      let res = await FORECAST_DMS(data);
      if (res.code == 0) {
        let _obj = _item,
          _this = this;
        _obj.dms = res.data.goods_dms;
        _obj.day = 30;
        _obj.inums = 1;
        _obj.influence = [];
        _obj.isLoading = 0;
        // setTimeout(()=>{
        _this.goodsList.push(_obj);
        // },500)
        console.log(this.goodsList);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    async search(_value) {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        search: _value,
        page: 1,
        page_size: 100,
      };
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
      }
    },
    selected(item1, index1) {
      console.log(222);
      var _this = this;
      this.showResult = false;
      this.$confirm({
        title: "销量预测确认",
        content: "销量预测基于品种销量与大盘走势进行计算，预测效果仅供参考。",
        okText: "开始预测",
        cancelText: "取消",
        okType: "primary",
        onOk() {
          _this.getDms(item1);
        },
        onCancel() {},
      });
    },
    selectCategory(ditem, dindex, item, index) {
      // console.log(ditem, dindex,item,index);
      let _this = this;
      this.goodsList = this.goodsList.map((value, key) => {
        if (index == key) {
          value.isLoading = 1;
        }
        return value;
      });
      setTimeout(() => {
        _this.goodsList = _this.goodsList.map((value, key) => {
          if (index == key) {
            value.day = ditem;
            value.isLoading = 0;
          }
          return value;
        });
      }, 2000);
    },
    handleChange(value) {
      console.log(value);
      let _this = this,
        _arr = value,
        _nums = 1;
      this.goodsList = this.goodsList.map((value, key) => {
        if (this.activeIndex == key) {
          value.isLoading = 1;
        }
        return value;
      });
      setTimeout(() => {
        if (_arr.length > 0) {
          _arr.map((val, key) => {
            _this.ratioList.map((opt, index) => {
              if (opt.id == val) {
                _nums += opt.value;
              }
            });
          });
        }
        _this.goodsList = _this.goodsList.map((val, key) => {
          if (key == _this.activeIndex) {
            val.influence = value;
            val.inums = _nums;
            val.isLoading = 0;
          }
          return val;
        });
      }, 2000);
      // console.log('相加',_nums)
    },
    onFocus(item, index) {
      // console.log(item,index)
      this.activeIndex = index;
    },
    toDetail(item, index) {
      this.$router.push({
        name: "detail",
        query: {
          goods_id: item.goods_id,
        },
      });
    },
    adelete(item, index) {
      this.goodsList = this.goodsList.filter((value, key) => {
        return index != key;
      });
    },
  },
};
</script>
