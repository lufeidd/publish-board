<template>
  <div id="industryPage" @click="bodyClick">
    <HeadNav
      type="industry"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="goods"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
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
                      expand-trigger="hover"
                      :popupVisible="catePopup"
                      v-model="chooseCategory"
                      @click.stop="cateClick"
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
              <div
                class="model-bg"
                style="min-height: 603px; padding-bottom: 20px"
              >
                <div class="section-title">行业全品种销售排行</div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="55" />
                      <col width="240" />
                      <col width="160" />
                      <col width="160" />
                      <col width="160" />
                      <col width="100" />
                      <col width="100" />
                      <col width="80" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>品种</td>
                        <td>作者</td>
                        <td style="text-align: center">出版社</td>
                        <td style="text-align: center">类目</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">上期对比</td>
                        <td style="text-align: right">类目排名</td>
                      </tr>
                    </thead>
                    <tbody v-if="goodsList.length > 0">
                      <tr v-for="(item, index) in goodsList" :key="index">
                        <td>{{ item.rank }}</td>
                        <td>
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
                              class="goods-name click-font"
                              :title="item.goods_name"
                              @click="toDetail(item.goods_id)"
                              >{{ item.goods_name }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <div class=" author">
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
                              @click.stop="toAuthor(item.authors[0].author_id)"
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
                                  @click.stop="toAuthor(aitem.author_id)"
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
                          {{ item.publisher_name }}
                        </td>
                        <td style="text-align: center">
                          <span>{{ item.cate_node_2 }}</span>
                          <span v-if="item.cate_node_3"
                            >>{{ item.cate_node_3 }}</span
                          >
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.sale_amount }}</span>
                        </td>
                        <td style="text-align: right">
                          <span class="percent" v-if="item.compare_rate > 0"
                            >+{{ item.compare_rate }}%</span
                          >
                          <span class="green" v-else-if="item.compare_rate < 0"
                            >{{ item.compare_rate }}%</span
                          >
                          <span v-else>--</span>
                        </td>
                        <td style="text-align: right">{{ item.rank_cate }}</td>
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
<script>
import { COMMON_CATEGORY } from "../../apis/common.js";
import { INDUSTRY_RANK_GOODS } from "../../apis/industry.js";
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
      let res = await INDUSTRY_RANK_GOODS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.goodsList = [];
        res.data.result.map((value, key) => {
          value.active = false;
          this.goodsList.push(value);
        });
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
    // 选择分类
    selectCategory(value, selectedOptions) {
      // console.log(value,selectedOptions)
      this.catePopup = false;
      this.isLoading = true;
      this.getData();
    },
    cateClick() {
      this.catePopup = true;
      this.$refs.time.showYear = false;
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    changeTime() {
      this.isLoading = true;
      this.getData();
    },
    openAuthor(item, index) {
      this.$refs.time.showYear = false;
      this.catePopup = false;
      this.goodsList = this.goodsList.map((value, key) => {
        if (index == key) {
          value.active = true;
        } else {
          value.active = false;
        }
        return value;
      });
    },
    toAuthor(id) {
      this.$router.push({
        name: "authordetail",
        query: {
          author_id: id,
        },
      });
    },
    bodyClick() {
      this.$refs.time.showYear = false;
      this.catePopup = false;
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
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