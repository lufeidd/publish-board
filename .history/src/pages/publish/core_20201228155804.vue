<template>
  <div
    id="corePage"
    style="padding-bottom: 20px"
    @click="$refs.time.showYear = false"
  >
    <HeadNav
      type="publish"
      ref="head"
      :show="1"
      @publisherChange="publisherChange()"
    ></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="core"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container" v-if="pagePower">
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg clearfix" style="padding: 8px 15px">
                  <div class="float-left" style="margin-top: 6px">
                    <a-dropdown :trigger="['click']" placement="bottomLeft">
                      <a
                        class="ant-dropdown-link"
                        @click="(e) => e.preventDefault()"
                        style="font-size: 12px; color: #4576db"
                      >
                        {{ chooseCategory.name }}
                        <a-icon type="down" />
                      </a>
                      <a-menu slot="overlay">
                        <a-menu-item>
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectCategory('one')"
                            >一级类目</a
                          >
                        </a-menu-item>
                        <a-menu-item>
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectCategory('two')"
                            >二级类目</a
                          >
                        </a-menu-item>
                        <a-menu-item>
                          <a
                            href="javascript:;"
                            style="
                              padding: 5px 15px;
                              color: #515a6e;
                              font-size: 12px;
                            "
                            @click="selectCategory('three')"
                            >三级类目</a
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
            <!-- 类目排名 -->
            <div class="model-container">
              <div class="model-bg" style="min-height: 603px">
                <div class="section-title">类目排名</div>
                <div class="table">
                  <table
                    style="table-layout: fixed"
                    v-if="chooseCategory.level != 'one'"
                  >
                    <colgroup>
                      <col width="55" />
                      <col width="160" />
                      <col width="80" />
                      <col width="140" />
                      <col width="140" />
                      <col width="80" />
                      <col width="400" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>类目</td>
                        <td style="text-align: right">占比</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">父级类目</td>
                        <td style="text-align: right">本社排名</td>
                        <td style="text-align: right">说明</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item, index) in list" :key="index">
                        <td style="text-align: center">
                          <div style="line-height: 36px">
                            {{ item.sale_rank }}
                          </div>
                        </td>
                        <td>
                          <span class="main-font">{{
                            item.category_name
                          }}</span>
                        </td>
                        <td style="text-align: right">
                          {{ (item.cate_ratio * 100).toFixed(2) }}%
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.sale_total }}</span>
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.parents.length > 0">{{
                            item.parents.join(">")
                          }}</span>
                          <span v-else>--</span>
                        </td>
                        <td style="text-align: right">
                          {{ item.supplier_rank }}
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.memo.goods_nums">
                            有{{
                              item.memo.goods_nums
                            }}个品种进入类目前100<br /><span
                              @click="$toDetail(item.memo.goods_id)"
                              class="click-font"
                              >《{{ item.memo.goods_name }}》</span
                            >排名第{{ item.memo.goods_rank }}位
                          </span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="7">
                          <div style="margin-top: 150px"><a-empty /></div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot v-if="list.length > 0">
                      <tr>
                        <td colspan="7" style="text-align: right">
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
                  <table style="table-layout: fixed" v-else>
                    <colgroup>
                      <col width="55" />
                      <col width="160" />
                      <col width="80" />
                      <col width="140" />
                      <col width="80" />
                      <col width="540" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>类目</td>
                        <td style="text-align: right">占比</td>
                        <td style="text-align: right">销售指数</td>
                        <td style="text-align: right">本社排名</td>
                        <td style="text-align: right">说明</td>
                      </tr>
                    </thead>
                    <tbody v-if="list.length > 0">
                      <tr v-for="(item, index) in list" :key="index">
                        <td style="text-align: center">
                          <div style="line-height: 36px">
                            {{ item.sale_rank }}
                          </div>
                        </td>
                        <td>
                          <span class="main-font">{{
                            item.category_name
                          }}</span>
                        </td>
                        <td style="text-align: right">
                          {{ (item.cate_ratio * 100).toFixed(2) }}%
                        </td>
                        <td style="text-align: right">
                          <span class="main-font">{{ item.sale_total }}</span>
                        </td>
                        <td style="text-align: right">
                          {{ item.supplier_rank }}
                        </td>
                        <td style="text-align: right">
                          <span v-if="item.memo.goods_nums">
                            <span class="click-font" @click="openPopup(item,index)">有{{
                              item.memo.goods_nums
                            }}个品种进入类目前100</span><br /><span
                              @click="$toDetail(item.memo.goods_id)"
                              class="click-font"
                              >《{{ item.memo.goods_name }}》</span
                            >排名第{{ item.memo.goods_rank }}位
                          </span>
                          <span v-else>--</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody v-else>
                      <tr>
                        <td colspan="6">
                          <div style="margin-top: 150px"><a-empty /></div>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot v-if="list.length > 0">
                      <tr>
                        <td colspan="6" style="text-align: right">
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
    <!-- 品种排名弹层 -->
    <a-modal
      v-model="goodsPopup"
      width="600px"
      :title="popupName"
      :footer="null"
    >
      <div class="table" style="max-height:400px;overflow-y:scroll;">
        <table style="table-layout: fixed">
          <colgroup>
            <col width="380" />
            <col width="100" />
            <col width="80" />
          </colgroup>
          <thead>
            <tr>
              <td>品种名称</td>
              <td style="text-align: right">销售点数</td>
              <td style="text-align: right">类目排名</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in goodsList" :key="index">
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
              <td style="text-align: right">
                <span class="main-font">{{ item.sale_amount }}</span>
              </td>
              <td style="text-align: right">{{ item.rank }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </a-modal>
    <Loading ref="load" :show="1" :isLoading="isLoading"></Loading>
  </div>
</template>
<script>
import { MYCATE_INDEX, MYCATE_GOODS } from "../../apis/publish.js";
export default {
  data() {
    return {
      pagePower: true,
      chooseCategory: {
        name: "一级类目",
        level: "one",
      },
      list: [],
      page: 1,
      pageSize: 20,
      total: 0,
      goodsList: [],
      goodsPopup: false,
      popupName: "",
      isLoading: true,
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
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        category_level: this.chooseCategory.level,
        page: this.page,
        page_size: this.pageSize,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MYCATE_INDEX(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.list = [];
        this.list = res.data.category_ranks;
        this.total = res.data.count;
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
    // 获取优势品种列表
    async getGoodsList(id) {
      var tStamp = this.$getTimeStamp();
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        supplier_id: this.$refs.head.publishInfo.supplier_id,
        period: this.$refs.time.cycle,
        date_type: this.$refs.time.dateType,
        start_date: this.$refs.time.oneDay,
        category_level: this.chooseCategory.level,
        category_id: id,
        timestamp: tStamp,
      };
      data.sign = this.$getSign(data);
      let res = await MYCATE_GOODS(data);
      if (res.code == 0) {
        this.goodsList = [];
        this.goodsList = res.data;
        this.goodsPopup = true;
      } else {
        this.$refs.head.globalTip(1, res.message, res.code);
      }
    },
    openPopup(item,index){
      this.popupName = item
    },
    changeTime() {
      this.isLoading = true;
      this.page = 1;
      this.getData();
    },
    selectCategory(type) {
      this.isLoading = true;
      if (type == "one") {
        this.chooseCategory.name = "一级类目";
        this.chooseCategory.level = type;
      } else if (type == "two") {
        this.chooseCategory.name = "二级类目";
        this.chooseCategory.level = type;
      } else if (type == "three") {
        this.chooseCategory.name = "三级类目";
        this.chooseCategory.level = type;
      }
      this.page = 1;
      this.getData();
    },
    onShowSizeChange(current, pageSize) {
      this.page = current;
      this.getData();
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
      this.$refs.time.dateType = 2;
      this.$refs.time.canAdd = false;
      this.$refs.time.showYear = false;
      this.$refs.time.canSub = true;
      this.chooseCategory.name = "一级类目";
      this.chooseCategory.level = "one";
      this.page = 1;
      this.getData();
    },
  },
};
</script>
