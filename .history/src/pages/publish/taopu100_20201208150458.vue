<template>
  <div id="taopuPage" @click="bodyClick">
    <HeadNav
      type="publish"
      :show="1"
      ref="head"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="taopu"></SlideNav>
          <div
            v-if="!goodsPower"
            style="
              height: 10px;
              margin-right: 10px;
              margin-top: -10px;
              background-color: #fff;
            "
          ></div>
        </div>
        <div class="float-right" v-if="goodsPower">
          <div class="main-container">
            <!-- 搜索品种 -->
            <div class="model-container">
              <div class="model-bg search">
                <p class="title">搜索品种</p>
                <div class="content common" style="position: relative">
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
                        v-for="(item1, index1) in dataSource"
                        :key="index1"
                        @click.stop="selected(item1, index1)"
                      >
                        <img
                          :src="item1.cover_pic"
                          alt
                          width="35px"
                          height="35px"
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
                <p class="curren" v-if="historyList.length > 0">最近搜索</p>
                <div class="history" v-if="historyList.length > 0">
                  <div
                    class="content"
                    v-for="(item, index) in historyList"
                    :key="index"
                    @click.stop="$toDetail(item, index)"
                  >
                    <div>
                      <img
                        :src="item.cover_pic"
                        alt
                        width="100px"
                        height="100px"
                        v-if="item.cover_pic"
                      />
                      <span
                        v-else
                        class="no-pic"
                        style="min-width: 100px; min-height: 100px"
                      ></span>
                    </div>
                    <div class="title" :title="item.title">
                      {{ item.title }}
                    </div>
                    <div class="sale">销售指数 {{ item.sale_total }}</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 时间选择 -->
            <!-- 选择品种，日期 -->
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg choose clearfix">
                  <div class="float-left">
                    <a-cascader
                      :options="sortList"
                      :allowClear="false"
                      v-model="chooseSort"
                      @change="selectSort"
                    />
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
                      @closeDom="closeDom"
                    ></TimeChoose>
                  </div>
                </div>
              </div>
            </a-affix>
            <!-- 品种销售排行 -->
            <div class="model-container sale-rank">
              <div class="section-title model-bg">品种销售排行</div>
              <div v-if="goodsPower">
                <div
                  class="table model-bg"
                  v-if="goodsList.length > 0"
                  style="min-height: 393px"
                >
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
                        <td>排行</td>
                        <td>品种</td>
                        <td>作者</td>
                        <td style="text-align:center;">出版社</td>
                        <td>类目</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">上期对比</td>
                        <td style="text-align: right">行业排名</td>
                        <td style="text-align: right">类目排名</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item, index) in goodsList" :key="index">
                        <td>{{ item.sale_rank }}</td>
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
                              class="click-font goods-name"
                              :title="item.goods_name"
                              @click.stop="$toDetail(item, index)"
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
                        <td style="text-align:center;">{{item.publisher_name}}</td>
                        <td>
                          {{ item.cate_node_2 }} ＞ {{ item.cate_node_3 }}
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.sale_total }}</span>
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
                        <td style="text-align: right">{{ item.in_all_rank }}</td>
                        <td style="text-align: right">{{item.in_all_cate_rank}}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="9" style="text-align: right">
                          <a-pagination
                            :show-total="(total) => `共 ${total} 条数据`"
                            :default-current="1"
                            :total="total"
                            v-model="page"
                            :defaultPageSize="pageSize"
                            @change="onShowSizeChange"
                          />
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div
                  class="model-bg"
                  v-else
                  style="padding: 130px 20px; min-height: 393px"
                >
                  <a-empty />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="float-right" v-else style="width: 1080px">
          <div>
            <div
              class="main-container"
              style="
                min-height: 660px;
                position: relative;
                background-color: #fff;
                margin-top: 10px;
              "
            >
              <PageNoPower></PageNoPower>
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
import { TOP_GOODSRANK, TOP_HISTORY, TOP_SEARCH } from "../../apis/publish.js";
import { COMMON_PUBLISHERCATEGORY } from "../../apis/common.js";
export default {
  data() {
    return {
      goodsPower: true,
      goodsList: [],
      page: 1,
      pageSize: 20,
      total: 0,
      historyList: [],
      categoryList: [],
      sortList: [
        { value: "rank_supplier", label: "本社品种销售排行" },
        { value: "rank_incr_supplier", label: "本社品种涨幅排行" },
        { value: "rank_new_supplier", label: "本社新品销售排行" },
      ],
      chooseSort: ["rank_supplier"],
      chooseCategory: [0],
      catePopup: false,
      inputVal: "",
      dataSource: [],
      showResult: false,
      searchLoading: false,
      showAbout: false,
      isLoading: true,
    };
  },
  mounted() {
    // console.log('aaa',this.$moment().format("YYYY-MM"));
    if(this.$route.query.sort){
      this.chooseSort = [];
      this.chooseSort.push(this.$route.query.sort);
    }
    this.getData();
    this.getFirstCategory();
    this.history();
  },
  updated() {},
  methods: {
    // 获取商品排行
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        goods_cate: this.chooseCategory[this.chooseCategory.length - 1],
        page: this.page,
        page_size: this.pageSize,
        cate_level: this.chooseCategory.length == 1 ? "one" : "two",
        sort: this.chooseSort[0],
        start_date: this.$refs.time.oneDay,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await TOP_GOODSRANK(data);
      if (res.code == 0) {
        this.total = res.data.total;
        this.goodsList = [];
        res.data.list.map((value, key) => {
          value.active = false;
          this.goodsList.push(value);
        });
        this.goodsPower = true;
        this.isLoading = false;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.goodsPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    // 获取搜索历史
    async history() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await TOP_HISTORY(data);
      if (res.code == 0) {
        this.historyList = res.data;
      } else {
        if (res.code == 1009) {
          this.goodsPower = false;
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
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
    // async getNextCate(id, arr) {
    //   var tStamp = this.$getTimeStamp();
    //   let data = {
    //     supplier_id: this.$refs.head.publishInfo.supplier_id,
    //     floor: 3,
    //     pid: id,
    //     timestamp: tStamp,
    //   };
    //   data.sign = this.$getSign(data);
    //   let res = await COMMON_PUBLISHERCATEGORY(data);
    //   if (res.code == 0) {
    //     arr.loading = false;
    //     if (res.data.length > 0) {
    //       arr.isLeaf = false;
    //       let _list = [];
    //       res.data.map((value, key) => {
    //         let _obj = value;
    //         _obj.isLeaf = true;
    //         _list.push(_obj);
    //       });
    //       arr.children = _list;
    //       this.categoryList = [...this.categoryList];
    //     } else {
    //       arr.isLeaf = true;
    //       this.catePopup = false;
    //       this.isLoading = true;
    //       this.page = 1;
    //       this.getData();
    //     }
    //   } else {
    //     this.$refs.head.globalTip(1, res.message, res.code);
    //   }
    // },
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
      this.$router.push({
        name: "detail",
        query: {
          goods_id: item1.goods_id,
        },
      });
    },
    // 选择分类
    selectCategory(value) {
      // console.log(index)
      // if (this.chooseCategory.length > 1 || this.chooseCategory[0] == 0) {
        this.catePopup = false;
        this.isLoading = true;
        this.page = 1;
        this.getData();
      // }
    },
    selectSort(value) {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    cateClick() {
      this.catePopup = true;
      this.$refs.time.showYear = false;
      this.showResult = false;
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    bodyClick() {
      this.$refs.time.showYear = false;
      this.showResult = false;
      this.catePopup = false;
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    closeDom() {
      this.showResult = false;
      this.goodsList = this.goodsList.map((value, key) => {
        value.active = false;
        return value;
      });
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
    changeTime() {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(current, pageSize) {
      this.isLoading = true;
      this.page = current;
      this.getData();
    },
    toAuthor(id) {
      this.$router.push({
        name: "authordetail",
        query: {
          author_id: id,
        },
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
      this.getFirstCategory();
      this.history();
    },
  },
};
</script>
