<template>
  <div id="taopuPage" @click="showResult = false">
    <HeadNav
      type="application"
      :show="1"
      ref="head"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="application" sort="saleforcast"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">销量预测</div>
                <div style="padding: 15px">
                  <div>
                    <span style="margin-right: 5px">销售周期</span>
                    <a-cascader
                      :options="dayList"
                      :allowClear="false"
                      v-model="chooseDay"
                      @change="selectDay"
                    />
                  </div>
                  <div style="margin-top: 10px">
                    <span style="margin-right: 5px">事件影响</span>
                    <a-select
                      mode="multiple"
                      v-model="influence"
                      placeholder="选择事件影响"
                      style="width: 306px"
                      @change="handleChange"
                    >
                      <a-select-option
                        v-for="(ritem, rindex) in ratioList"
                        :key="ritem.id"
                        >{{ ritem.name }}</a-select-option
                      >
                    </a-select>
                  </div>
                  <div style="text-align: center; margin-top: 15px">
                    <a-button type="primary" @click="startForcast"
                      >开始预测</a-button
                    >
                  </div>
                </div>
              </div>
            </div>
            <!-- 列表 -->
            <div class="model-container">
              <div class="model-bg" style="min-height: 460px">
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="800" />
                      <col width="160" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>品种</td>
                        <td style="text-align: right">预测销量</td>
                        <td style="text-align: right">操作</td>
                      </tr>
                    </thead>
                    <tbody v-if="goodsList.length > 0">
                      <tr>
                        <td colspan="3">
                          <div class="saleforcast" @click="openPoup">
                            +添加预测品种
                          </div>
                        </td>
                      </tr>
                      <tr v-for="(item, index) in goodsList" :key="index">
                        <td :style="index == 0 ? 'border-top:0;' : ''">
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
                              :title="item.title"
                              @click="$toDetail(item.goods_id)"
                              >{{ item.title }}</span
                            >
                          </div>
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.result }}</span>
                        </td>
                        <td style="text-align: right">
                          <span
                            class="click-font"
                            @click="deleteOut(item, index)"
                            >移出</span
                          >
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="3">
                          <div class="saleforcast" @click="openPoup">
                            +添加预测品种
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td colspan="3" style="border-top: 0">
                          <a-empty />
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
    <!-- 添加预测品种 -->
    <a-modal
      v-model="addConnect"
      width="600px"
      title="添加预测品种"
      on-ok="addhandle"
      @cancel="searchclose"
    >
      <template slot="footer">
        <span
          class="click-font"
          @click="handleCancel"
          style="margin-right: 10px"
          >取消</span
        >
        <a-button key="submit" type="primary" @click="addhandle"
          >添加预测</a-button
        >
      </template>
      <div class="popup" @click="showResult = false">
        <div class="connect">
          <div style="padding: 5px">
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
                <div class="name" style="width: 455px">
                  {{ gitem.title }}({{ gitem.isbn }})
                </div>
                <span class="click-font" @click="listCancel(gitem, gindex)"
                  >移除</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </a-modal>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/application/event.scss"></style>
<script>
import { TOP_SEARCH } from "../../apis/publish.js";
import { FORECAST_DMS } from "../../apis/application.js";
export default {
  data() {
    return {
      pagePower: true,
      inputVal: "",
      dataSource: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
      goodsList: [],
      chooseDay: [30],
      dayList: [
        { value: 15, label: "15天" },
        { value: 30, label: "30天" },
        { value: 60, label: "60天" },
        { value: 90, label: "90天" },
        { value: 120, label: "120天" },
      ],
      ratioList: [
        { id: 1, name: "双十一", value: 1.75 },
        { id: 2, name: "电商活动", value: 0.75 },
        { id: 3, name: "网络热搜", value: 0.15 },
        { id: 4, name: "获得奖项", value: 0.85 },
        { id: 5, name: "影视热播", value: 0.85 },
      ],
      indicator: <a-icon type="loading" style="font-size: 16px" spin />,
      isLoading: true,
      influence: [],
      addConnect: false,
      popupGoodsList: [],
    };
  },
  mounted() {
    this.getPower();
  },
  updated() {},
  methods: {
    async getPower() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        goods_ids: 1,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await FORECAST_DMS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    async getDms(_id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        goods_ids: _id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await FORECAST_DMS(data);
      if (res.code == 0) {
        this.pagePower = true;
        let _this = this;
        setTimeout(() => {
          let _nums = 1;
          _this.influence.map((val, key) => {
            _this.ratioList.map((opt, index) => {
              if (opt.id == val) {
                _nums += opt.value;
              }
            });
          });
          _this.goodsList = _this.goodsList.map((value, key) => {
            if (value.goods_id == res.data[key].goods_id) {
              let _result = Math.round(res.data[key].goods_dms * _nums * _this.chooseDay[0]);
              if(_result < 10){
                _result = "少于10册";
              }else if(10 <= _result && _result <= 100){
                _result = "10~100册"
              }else if(100 < _result && _result <= 200){
                _result = "100~200册"
              }else if(200 < _result && _result)
              value.result = _result;
            }
            return value;
          });
          _this.isLoading = false;
        }, 3000);
      } else {
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message);
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
      }
    },
    selected(item1, index1) {
      // console.log(222);
      var _this = this,
        _check = 0;
      this.popupGoodsList.map((value, key) => {
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
    selectDay(value, selectedOptions) {},
    handleChange(value) {
      // console.log(this.influence, value);
    },
    startForcast() {
      if (this.chooseDay.length == 0) {
        this.$refs.head.globalTip(1, "请选择销售周期", 0);
        return;
      }
      // if (this.influence.length == 0) {
      //   this.$refs.head.globalTip(1, "请选择事件影响", 0);
      //   return;
      // }
      if (this.goodsList.length == 0) {
        this.$refs.head.globalTip(1, "请添加预测品种", 0);
        return;
      }
      let ids = [],
        _this = this;
      this.$confirm({
        title: "销量预测确认",
        content: "销量预测基于品种销量与大盘走势进行计算，预测效果仅供参考。",
        okText: "开始预测",
        cancelText: "取消",
        okType: "primary",
        onOk() {
          _this.isLoading = true;
          _this.goodsList.map((value, key) => {
            ids.push(value.goods_id);
          });
          _this.getDms(ids.join(","));
        },
        onCancel() {},
      });
    },
    deleteOut(item, index) {
      this.goodsList = this.goodsList.filter((value, key) => {
        return item.goods_id != value.goods_id;
      });
    },
    // 弹层相关
    openPoup() {
      this.popupGoodsList = [];
      this.inputVal = "";
      this.addConnect = true;
    },
    searchclose() {
      this.showResult = false;
    },
    handleCancel() {
      this.addConnect = false;
    },
    addhandle() {
      this.popupGoodsList.map((value, index) => {
        let _obj = value;
        _obj.dms = 0;
        _obj.day = 30;
        _obj.result = 0;
        this.goodsList.push(_obj);
      });
      this.addConnect = false;
    },
    listCancel(gitem, gindex) {
      this.popupGoodsList = this.popupGoodsList.filter((value, key) => {
        return gitem.goods_id != value.goods_id;
      });
    },
    publisherChange() {
      this.isLoading = true;
      this.goodsList = [];
      this.dataSource = [];
      this.inputVal = "";
      this.showResult = false;
      this.getPower();
    },
  },
};
</script>
