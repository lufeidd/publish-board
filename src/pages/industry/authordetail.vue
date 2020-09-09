<template>
  <div id="detailPage">
    <HeadNav type="industry" ref="head" :show="1" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="industry" sort="authors"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg goods-detail">
                <div>
                  <img
                    :src="authorInfo.photo"
                    alt
                    width="175px"
                    height="175px"
                    v-if="authorInfo.photo"
                    style="border-radius:10px;"
                  />
                  <span
                    v-else
                    class="no-pic"
                    style="min-width:175px;min-height:175px;border-radius:10px;"
                  ></span>
                  <div class="goods-desc author">
                    <div class="authors" :title="authorInfo.name">{{authorInfo.name}}</div>
                    <div class>
                      <span>国家</span>
                      <span class="value">{{authorInfo.country}}</span>
                    </div>
                    <div class="money">
                      <span>生日</span>
                      <span class="value" v-if="authorInfo.birthday">{{authorInfo.birthday}}</span>
                      <span class="value" v-else>--</span>
                    </div>
                    <!-- <div class="description">
                      <span style="vertical-align:top;">获奖</span>
                      <span class="value" :title="authorInfo.description">{{authorInfo.description}}</span>
                    </div> -->
                    <div class="cate">
                      <span>类目</span>
                      <span class="value">{{authorInfo.category_name}}</span>
                    </div>
                  </div>
                </div>
                <!-- 标签页 -->
                <div class="tabs">
                  <a-tabs :activeKey="tabKey" @change="callback">
                    <a-tab-pane key="1" tab="作品列表"></a-tab-pane>
                    <a-tab-pane key="2" tab="详细信息"></a-tab-pane>
                  </a-tabs>
                </div>
              </div>
            </div>
            <!-- 作品列表 -->
            <div class="model-container" v-if="tabKey == '1'">
              <div class="model-bg">
                <div class="section-title">作品列表</div>
                <div class="table">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="55" />
                      <col width="240" />
                      <col width="140" />
                      <col width="140" />
                      <col width="120" />
                      <col width="100" />
                      <col width="120" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td style="text-align:center;">排名</td>
                        <td>品种</td>
                        <td style="text-align:center;">作者</td>
                        <td style="text-align:center;">类目</td>
                        <td style="text-align:center;">ISBN</td>
                        <td style="text-align:right;">定价</td>
                        <td style="text-align:right;">出版社</td>
                        <td style="text-align:right;">上月销售点数</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in goodsList" :key="index">
                        <td style="text-align:center;">{{index+1+((pageSize*page)-pageSize)}}</td>
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
                              :title="item.name"
                            >{{item.name}}</span>
                          </div>
                        </td>
                        <td style="text-align:center;">
                          <span class="click-font">{{item.author}}</span>
                        </td>
                        <td style="text-align:center;">{{item.cate_node_2}}>{{item.cate_node_3}}>{{item.cate_node_4}}</td>
                        <td style="text-align:center;">{{item.isbn}}</td>
                        <td style="text-align:right;">￥{{item.fixed_price.toFixed(2)}}</td>
                        <td style="text-align:right;">{{item.publisher}}</td>
                        <td style="text-align:right;">
                          <span class="main-font">{{item.pre_month_sale_total}}</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="8" style="text-align:right;">
                          <a-pagination
                            :show-total="total => `共 ${total} 条数据`"
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
              </div>
            </div>
            <!-- 详细信息 -->
            <div class="model-container" v-if="tabKey == '2'">
              <div class="model-bg">
                <div class="section-title">作者介绍</div>
                <div style="padding:15px;">
                  {{authorInfo.description}}
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
    <Loading ref="load" :show="1"></Loading>
  </div>
</template>
<style scoped lang="scss" src="@/style/scss/pages/publish/detail.scss"></style>
<script>
import {
  INDUSTRY_AUTHOR_INFO,
  INDUSTRY_AUTHOR_GOODS
} from "../../apis/industry.js";
export default {
  data() {
    return {
      pagePower: true,
      authorInfo: {},
      tabKey: "1",
      author_id: 0,
      page: 1,
      pageSize: 20,
      total: 0,
      goodsList: []
    };
  },
  mounted() {
    this.author_id = this.$route.query.author_id;
    this.getData();
    this.getList();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    async getData() {
      let data = {
        author_id: this.author_id,
        organization_id: this.$refs.head.publishInfo.organization_id
      };
      let res = await INDUSTRY_AUTHOR_INFO(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.authorInfo = res.data;
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message,res.code);
        }
      }
    },
    async getList() {
      let data = {
        author_id: this.author_id,
        organization_id: this.$refs.head.publishInfo.organization_id,
        page: this.page,
        page_size: this.pageSize
      };
      let res = await INDUSTRY_AUTHOR_GOODS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.goodsList = [];
        this.goodsList = res.data.list;
        this.total = res.data.total;
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1009) {
          this.pagePower = false;
        } else {
          this.$refs.head.globalTip(1, res.message,res.code);
        }
      }
    },
    callback(key) {
      this.tabKey = key;
    },
    onShowSizeChange(current, pageSize) {
      console.log(current);
      this.$refs.load.isLoading = true;
      this.page = current;
      this.getList();
    },
  }
};
</script>
