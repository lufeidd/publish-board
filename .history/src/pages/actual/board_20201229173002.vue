<template>
  <div id="indexPage" @click="bodyClick">
    <HeadNav
      type="actual"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="actual" sort="board"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container">
            <div class="model-container clearfix">
              <div
                class="float-left model-bg real-data"
                style="width: 535px; padding: 15px"
              >
                <div class="real-data-block" style="width: 200px; cursor: auto">
                  <div>
                    <a-icon type="line-chart" />
                    <span class="secondary-font">本社销售指数</span>
                  </div>
                  <div class="data-font">{{ publishData.today }}</div>
                  <div class="before">
                    <span>昨日全天</span>
                    <span class="num">{{ publishData.yesterday }}</span>
                  </div>
                  <div class="before">
                    <span>同时段对比</span>
                    <span class="num red" v-if="publishData.compare_rate > 0"
                      >+{{ publishData.compare_rate }}%</span
                    >
                    <span
                      class="num green"
                      v-else-if="publishData.compare_rate <= 0"
                      >{{ publishData.compare_rate }}%</span
                    >
                    <span class="num" v-else>--</span>
                  </div>
                </div>
              </div>
              <div
                class="model-bg real-data float-right"
                style="width: 535px; padding: 15px"
              >
                <div
                  class="real-data-block"
                  style="width: 200px; cursor: auto"
                >
                  <div>
                    <a-icon type="line-chart" />
                    <span class="secondary-font">大盘销售指数</span>
                  </div>
                  <div class="data-font">{{ allData.today }}</div>
                  <div class="before">
                    <span>昨日全天</span>
                    <span class="num">{{ allData.yesterday }}</span>
                  </div>
                  <div class="before">
                    <span>同时段对比</span>
                    <span class="num red" v-if="allData.compare_rate > 0"
                      >+{{ allData.compare_rate }}%</span
                    >
                    <span
                      class="num green"
                      v-else-if="allData.compare_rate <= 0"
                      >{{ allData.compare_rate }}%</span
                    >
                    <span class="num" v-else>--</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 选择品种，日期 -->
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
                      placeholder="所有类目"
                      change-on-select
                      :allowClear="false"
                      :popupVisible="catePopup"
                      expand-trigger="hover"
                      v-model="chooseCategory"
                      @click.stop="cateClick"
                      @change="selectCategory"
                    />
                  </div>
                </div>
              </div>
            </a-affix>
            <div class="model-container clearfix">
              <div class="float-left model-bg" style="width: 535px;min-height:430px;">
                <div class="section-title">本社品种实时排行</div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="45" />
                      <col width="160" />
                      <col width="140" />
                      <col width="80" />
                      <col width="80" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>品种</td>
                        <td>类目</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">同时段对比</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td style="text-align: right">
                          <span class="main-font"></span>
                        </td>
                        <td style="text-align: right"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="float-right model-bg" style="width: 535px">
                <div class="section-title">全品种实时排行</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<style lang="scss" scoped src="@/style/scss/pages/index.scss"></style>
<script>
import { Chart } from "@antv/g2";
import { COMMON_PUBLISHERCATEGORY } from "../../apis/common.js";
import {INDEX_REALTIME,INDEX_REALTIMEGOODS} from "../../apis/index.js";
export default {
  data() {
    return {
      pagePower: true,
      categoryList: [],
      chooseCategory: [0],
      catePopup: false,
      publishData: {
        today: 0,
        yesterday: 0,
        compare_rate: 0,
      },
      allData: {
        today: 0,
        yesterday: 0,
        compare_rate: 0,
      },
      plist:[],
      alist:[],
      isLoading: false,
    };
  },
  mounted() {
    this.getFirstCategory();
  },
  methods: {
    // 获取本社品种
    asy
    // 获取初级分类列表
    async getFirstCategory() {
      var tStamp = this.$getTimeStamp();
      let data = {
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        // floor: 2,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMMON_PUBLISHERCATEGORY(data);
      if (res.code == 0) {
        this.categoryList = [];
        // this.categoryList = res.data;
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
    cateClick() {
      this.catePopup = true;
    },
    bodyClick() {
      this.catePopup = false;
    },
    // 选择分类
    selectCategory(value) {
      this.catePopup = false;
      //   this.isLoading = true;
    },
    publisherChange() {
      // this.isLoading = true;
      this.chooseCategory = [0];
      this.getFirstCategory();
    },
  },
};
</script>