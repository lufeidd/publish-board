<template>
  <div id="rankPage" style="padding-bottom: 20px" @click="bodyClick">
    <div>
      <HeadNav
        type="inquire"
        ref="head"
        :show="1"
        @publisherChange="publisherChange()"
      ></HeadNav>
      <div class="wd-1220">
        <div class="clearfix">
          <div class="float-left">
            <SlideNav type="inquire" sort="rank"></SlideNav>
          </div>
          <div class="float-right">
            <div class="main-container" v-if="pagePower">
              <!-- 选择品种，日期 -->
              <a-affix :offset-top="36">
                <div class="model-container">
                  <div class="model-bg clearfix" style="padding: 7px 15px">
                    <div class="float-left" style="margin-top: 7px">
                      <a-dropdown :trigger="['click']" placement="bottomLeft">
                        <a
                          class="ant-dropdown-link"
                          @click="(e) => e.preventDefault()"
                          style="font-size: 12px; color: #4576db"
                        >
                          {{ categoryTitle }}
                          <a-icon type="down" />
                        </a>
                        <a-menu slot="overlay">
                          <a-menu-item
                            v-for="(item, index) in categoryList"
                            :key="index"
                          >
                            <a
                              href="javascript:;"
                              style="
                                padding: 5px 15px;
                                color: #515a6e;
                                font-size: 12px;
                              "
                              @click="selectCategory(item, index)"
                              >{{ item.title }}</a
                            >
                          </a-menu-item>
                        </a-menu>
                      </a-dropdown>
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
              <div class="model-container">
                <div class="model-bg" style="min-height: 603px">
                  <div class="section-title">{{ categoryTitle }}</div>
                  <div class="table" style="margin-bottom: 20px">
                    <table v-if="type == 3" style="table-layout: fixed">
                      <colgroup>
                        <col width="50" />
                        <col width="300" />
                        <col width="300" />
                        <col width="205" />
                        <col width="205" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>排名</td>
                          <td>出版单位</td>
                          <td style="text-align: right">销售指数</td>
                          <td style="text-align: right">动销品种</td>
                          <td style="text-align: right">主营类目</td>
                        </tr>
                      </thead>
                      <tbody v-if="list.length > 0">
                        <tr v-for="(item, index) in list" :key="index">
                          <td>{{ item.sale_rank }}</td>
                          <td>
                            <span class="click-font">{{ item.name }}</span>
                          </td>
                          <td style="text-align: right">
                            {{ item.sale_total }}
                          </td>
                          <td style="text-align: right">
                            {{ item.onsale_num }}
                          </td>
                          <td style="text-align: right">{{ item.top_cate }}</td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="5" style="text-align: center">
                            <a-empty />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table style="table-layout: fixed" v-else>
                      <colgroup>
                        <col width="50" />
                        <col width="280" />
                        <col width="160" />
                        <col width="140" />
                        <col width="140" />
                        <col width="100" />
                        <col width="100" />
                        <col width="80" />
                      </colgroup>
                      <thead>
                        <tr>
                          <td>排名</td>
                          <td>品种</td>
                          <td>作者</td>
                          <td>出版社</td>
                          <td>类目</td>
                          <td style="text-align: right">销售指数</td>
                          <td style="text-align: right">上期对比</td>
                          <td style="text-align: right" v-if="type == 2">
                            上市时长
                          </td>
                          <td style="text-align: right" v-else>类目排名</td>
                        </tr>
                      </thead>
                      <tbody v-if="list.length > 0">
                        <tr v-for="(item, index) in list" :key="index">
                          <td>{{ item.rank }}</td>
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
                                class="click-font goods-name"
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
                          <td>{{ item.publisher_name }}</td>
                          <td>
                            <span v-if="item.cate_node_2">{{
                              item.cate_node_2
                            }}</span>
                            <span v-if="item.cate_node_3"
                              >> {{ item.cate_node_3 }}</span
                            >
                          </td>
                          <td style="text-align: right">
                            {{ item.sale_amount }}
                          </td>
                          <td style="text-align: right">
                            <span class="percent" v-if="item.compare_rate > 0"
                              >+{{ item.compare_rate }}%</span
                            >
                            <span
                              class="green"
                              v-else-if="item.compare_rate < 0"
                              >{{ item.compare_rate }}%</span
                            >
                            <span v-else>--</span>
                          </td>
                          <td style="text-align: right">
                            <span v-if="type == 2"
                              >{{ item.publish_duration }}个月</span
                            >
                            <span v-else>{{ item.rank_cate }}</span>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else>
                        <tr>
                          <td colspan="8" style="text-align: center">
                            <div><a-empty /></
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <!-- 分页 -->
                  <div
                    class="page"
                    style="padding: 15px; text-align: right"
                    v-if="list.length > 0"
                  >
                    <a-pagination
                      :show-total="(total) => `共 ${total} 条数据`"
                      :default-current="1"
                      v-model="page"
                      :total="total"
                      :defaultPageSize="pageSize"
                      @change="onShowSizeChange"
                    />
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
    </div>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<script>
import {
  QUERY_GOODS_SALE,
  QUERY_GOODS_INCR,
  QUERY_GOODS_GOODSNEW,
} from "../../apis/inquire.js";
export default {
  data() {
    return {
      pagePower: true,
      categoryTitle: "行业全品种销售排行",
      type: 0,
      categoryList: [
        { title: "行业全品种销售排行", id: 0 },
        { title: "行业全品种涨幅排行", id: 1 },
        { title: "行业新品销售排行", id: 2 },
        // { title: "出版单位排行", id: 3 },
      ],
      isLoading: true,
      page: 1,
      pageSize: 50,
      total: 0,
      isLoading: true,
      list: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        period: this.$refs.time.cycle,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res;
      if (this.type == 0) {
        res = await QUERY_GOODS_SALE(data);
      } else if (this.type == 1) {
        res = await QUERY_GOODS_INCR(data);
      } else if (this.type == 2) {
        res = await QUERY_GOODS_GOODSNEW(data);
      }
      if (res.code == 0) {
        this.pagePower = true;
        this.isLoading = false;
        this.list = [];
        res.data.result.map((value, key) => {
          value.active = false;
          this.list.push(value);
        });
        // this.list = res.data.result;
        this.total = res.data.total_count;
      } else {
        this.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message, res.code);
        }
      }
    },
    selectCategory(item, index) {
      this.isLoading = true;
      this.categoryTitle = item.title;
      this.type = item.id;
      this.page = 1;
      this.getData();
    },
    changeTime() {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    bodyClick() {
      this.$refs.time.showYear = false;
      this.list = this.list.map((value, key) => {
        value.active = false;
        return value;
      });
    },
    openAuthor(item, index) {
      this.$refs.time.showYear = false;
      this.list = this.list.map((value, key) => {
        if (index == key) {
          value.active = true;
        } else {
          value.active = false;
        }
        return value;
      });
    },
    onShowSizeChange(page, pageSize) {
      this.isLoading = true;
      this.page = page;
      this.getData();
    },
    publisherChange() {
      // this.isLoading = true;
      // this.page = 1;
      // this.getData();
    },
  },
};
</script>
