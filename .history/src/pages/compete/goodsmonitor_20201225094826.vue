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
          <SlideNav type="compete" sort="goodsmonitor"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg clearfix">
                  <div class="float-left"></div>
                  <div class="float-right" style="padding: 7px 15px">
                    <TimeChoose
                      ref="time"
                      @changeTime="changeTime"
                      @closeDom="closeDom"
                    ></TimeChoose>
                  </div>
                </div>
              </div>
            </a-affix>
            <!-- 列表 -->
            <div class="model-container">
              <div
                class="model-bg"
                style="padding-bottom: 50px; min-height: 604px"
              >
                <div class="section-title">监控列表</div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                      <col width="50" />
                      <col width="230" />
                      <col width="150" />
                      <col width="140" />
                      <col width="140" />
                      <col width="100" />
                      <col width="80" />
                      <col width="80" />
                      <col width="80" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>品种</td>
                        <td>作者</td>
                        <td style="text-align: center">出版社</td>
                        <td>类目</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">上期对比</td>
                        <td style="text-align: right">行业排名</td>
                        <td style="text-align: right">类目排名</td>
                      </tr>
                    </thead>
                    <tbody v-if="goodsList.length > 0">
                      <tr v-for="(item, index) in goodsList" :key="index">
                        <td style="text-align: center">{{ index + 1 }}</td>
                        <td>
                          <div class="goods-desc">
                            <span class="goods-image" v-if="item.cover_pic">
                              <img
                                :src="item.cover_pic"
                                alt
                                style="width: 40px; height: 40px"
                              />
                            </span>
                            <span
                              v-else
                              class="no-pic"
                              style="min-width: 40px; min-height: 40px"
                            ></span>
                            <span
                              class="goods-name click-font"
                              :title="item.goods_name"
                              @click.stop="$toDetail(item.goods_id)"
                              >{{ item.goods_name }}</span
                            >
                          </div>
                        </td>
                        <td>
                          <div class="author">
                            <div
                              class="author-name"
                              v-if="item.authors.length == 0"
                            >
                              {{ item.goods_author }}
                            </div>
                            <div
                              class="author-name click-font"
                              @click.stop="$toAuthor(item.authors[0].author_id)"
                              v-if="item.authors.length == 1"
                            >
                              {{ item.goods_author }}
                            </div>
                            <div
                              v-if="item.authors.length > 1"
                              class="author-name click-font"
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
                          <span>{{ item.supplier_name }}</span>
                          <span>-</span>
                        </td>
                        <td>
                          <span
                            >{{ item.cate_node_2 }}
                            <span v-if="item.cate_node_3"
                              >> {{ item.cate_node_3 }}</span
                            ></span
                          >
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.sale_total" class="main-font">{{
                            item.sale_total
                          }}</span>
                          <span class="main-font" v-else>--</span>
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
                        <td style="text-align: right">
                          <span v-if="item.industry_rank">{{
                            item.industry_rank
                          }}</span>
                          <span v-else>--</span>
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.cate_rank">{{
                            item.cate_rank
                          }}</span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="9">
                          <div style="margin-top: 150px"><a-empty /></div>
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
<style scoped lang="scss" src="@/style/scss/pages/compete/set.scss"></style>
<script>
import { COMPETE_MONITOR_GOODS_LISTS } from "../../apis/compete.js";
export default {
  data() {
    return {
      pagePower: true,
      goodsList: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getData();
  },
  updated() {},
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        period: this.$refs.time.cycle,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await COMPETE_MONITOR_GOODS_LISTS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.goodsList = [];
        res.data.map((value, key) => {
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
    changeTime() {
      this.isLoading = true;
      this.getData();
    },
    openAuthor(item, index) {
      this.$refs.time.showYear = false;
      this.goodsList = this.goodsList.map((value, key) => {
        if (index == key) {
          value.active = true;
        } else {
          value.active = false;
        }
        return value;
      });
    },
    closeDom() {
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    bodyClick(){
      this.$refs.time.showYear = false;
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    publisherChange() {
      this.isLoading = true;
      this.$refs.time.cycle = this.$weekDate().weekth;
      this.$refs.time.oneDay = this.$weekDate().start.replace(/-/g, "");
      this.$refs.time.chooseWeek = this.$weekDate().start;
      this.$refs.time.chooseMonth = this.$weekDate().start;
      this.$refs.time.chooseYear = this.$weekDate().start;
      this.$refs.time.dateText =
        this.$weekDate().start + "~" + this.$weekDate().end;
      this.$refs.time.canAdd = false;
      this.$refs.time.canSub = true;
      this.$refs.time.showYear = false;
      this.$refs.time.dateType = 2;
      this.getData();
    },
  },
};
</script>
