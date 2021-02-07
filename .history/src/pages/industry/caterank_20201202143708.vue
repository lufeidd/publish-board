<template>
  <div id="industryPage">
    <HeadNav
      type="industry"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="cate"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container">
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg clearfix" style="padding: 7px 15px">
                  <div class="float-left">
                    <a-cascader
                      :field-names="{
                        label: 'name',
                        value: 'category_id',
                        children: 'child_list',
                      }"
                      :options="categoryList"
                      :load-data="loadData"
                      placeholder="所有类目"
                      :allowClear="false"
                      expand-trigger="hover"
                      change-on-select
                      :popupVisible="catePopup"
                      v-model="chooseCategory"
                      @blur="catePopup = false"
                      @click="catePopup = true"
                      @change="selectCategory"
                    />
                  </div>
                  <div class="float-right">
                    <TimeChoose
                      ref="time"
                      @changeTime="changeTime"
                    ></TimeChoose>
                  </div>
                </div>
              </div>
            </a-affix>
            <!-- 列表 -->
            <div class="model-container">
              <div class="model-bg" style="min-height: 603px">
                <div class="section-title">行业全类目销售排行</div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="55" />
                      <col width="210" />
                      <col width="100" />
                      <col width="100" />
                      <col width="160" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>类目</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">占比</td>
                        <td style="text-align: right">上期对比</td>
                      </tr>
                    </thead>
                    <tbody v-if="goodsList.length > 0">
                      <tr v-for="(item, index) in goodsList" :key="index">
                        <td>{{item.sale_rank}}</td>
                        <td style="text-align: center">
                            <span class="main-font">{{item.name}}</span>
                        </td>
                        <td style="text-align: right">
                            <span class="main-font">{{item.sale_total}}</span>
                        </td>
                        <td style="text-align: right">{{item.ratio}}%</td>
                        <td style="text-align: right">
                            <span class="percent" v-if="item.compare_rate > 0"
                            >+{{ item.compare_rate }}%</span
                          >
                          <span class="green" v-else-if="item.compare_rate < 0"
                            >{{ item.compare_rate }}%</span
                          >
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="8" style="text-align: center">
                          <div style="margin-top: 100px">
                            <a-empty />
                          </div>
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
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<script>
import { COMMON_CATEGORY } from "../../apis/common.js";
import { INDUSTRY_RANK_CATE } from "../../apis/industry.js";
export default {
  data() {
    return {
      pagePower: true,
      categoryList: [],
      chooseCategory: [0],
      catePopup: false,
      isLoading: true,
      goodsList: [],
    };
  },
  mounted() {
    this.getData();
    this.getFirstCategory();
  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        period: this.$refs.time.cycle,
        cate_level: this.chooseCategory.length == 1 ? "one" : "two",
        goods_cate: this.chooseCategory[this.chooseCategory.length - 1],
        page: 1,
        page_size: 100,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await INDUSTRY_RANK_CATE(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.goodsList = [];
        this.goodsList = res.data;
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
    // 获取初级分类列表
    async getFirstCategory() {
      var tStamp = this.$getTimeStamp();
      let data = {
        // floor: 2,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMMON_CATEGORY(data);
      if (res.code == 0) {
        this.categoryList = [];
        let _data = {
          category_id: 0,
          name: "所有类目",
          pid: 0,
        };
        this.categoryList.push(_data);
        res.data.map((value, key) => {
          this.categoryList.push(value);
        });
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    loadData() {},
    // 选择分类
    selectCategory(value, selectedOptions) {
      // console.log(value,selectedOptions)
      this.catePopup = false;
      this.isLoading = true;
      this.getData();
    },
    changeTime() {
      this.isLoading = true;
      this.getData();
    },
    publisherChange() {
      this.isLoading = true;
      this.chooseCategory = [0];
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText =
        this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.dateType = 2;
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      this.getData();
    },
  },
};
</script>