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
                <div style="padding:15px;">
                  <div>
                    <span style="margin-right:10">销售周期</span>
                    <a-cascader
                      :options="dayList"
                      :allowClear="false"
                      v-model="chooseDay"
                      @change="selectDay"
                    />
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
<style scoped lang="scss" src="@/style/scss/pages/publish/taopu100.scss"></style>
<script>
import { TOP_SEARCH } from "../../apis/publish.js";
import { FORECAST_DMS } from "../../apis/application.js";
export default {
  data() {
    return {
      pagePower: false,
      inputVal: "",
      dataSource: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
      goodsList: [],
      chooseDay:[15],
      dayList: [
        {value:15,label:"15天"},
        {value:30,label:"30天"},
        {value:60,label:"60天"},
        {value:90,label:"90天"},
        {value:120,label:"120天"},
      ],
      ratioList: [
        { id: 1, name: "双十一", value: 1.75 },
        { id: 2, name: "电商活动", value: 0.75 },
        { id: 3, name: "网络热搜", value: 0.15 },
        { id: 4, name: "获得奖项", value: 0.85 },
        { id: 5, name: "影视热播", value: 0.85 },
      ],
      activeIndex: 0,
      indicator: <a-icon type="loading" style="font-size: 16px" spin />,
      isLoading:true,
    };
  },
  mounted() {
    this.getPower();
  },
  updated() {

  },
  methods: {
    async getPower() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        goods_id: 1,
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
    async getDms(_item) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        goods_id: _item.goods_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
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
        // console.log(this.goodsList);
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
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
      var _this = this;
      this.showResult = false;
    },
    selectDay(value,selectedOptions){

    },
    publisherChange(){
      this.isLoading = true;
      this.goodsList = [];
      this.dataSource = [];
      this.inputVal = "";
      this.showResult = false;
      this.getPower();
    }
  },
};
</script>
