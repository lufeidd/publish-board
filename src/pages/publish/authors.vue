<template>
  <div id="taopuPage" style="padding-bottom:20px;">
    <HeadNav type="publish" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="authors"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container" v-if="pagePower">
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">
                  作者库
                  <span class="desc">共{{total}}名</span>
                </div>
                <div class="table">
                  <table style="table-layout:fixed;">
                    <colgroup>
                      <col width="55" />
                      <col width="255" />
                      <col width="140" />
                      <col width="140" />
                      <col width="240" />
                      <col width="120" />
                      <col width="120" />
                    </colgroup>
                    <thead>
                      <tr>
                        <td>排名</td>
                        <td>作者</td>
                        <td style="text-align:center;">作品</td>
                        <td style="text-align:center;">出版社</td>
                        <td style="text-align:right;">生日</td>
                        <td style="text-align:right;">国家</td>
                        <td style="text-align:right;">操作</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(item,index) in list" :key="index">
                        <td>{{index+1+((pageSize*page)-pageSize)}}</td>
                        <td>
                          <div class="goods-desc">
                            <img :src="item.photo" alt width="40px" height="40px" v-if="item.photo" />
                            <span v-else class="no-pic" style="min-width:40px;min-height:40px;"></span>
                            <span
                              class="click-font goods-name"
                              :title="item.name"
                              @click="authorDetail(item,index)"
                            >{{item.name}}</span>
                          </div>
                        </td>
                        <td style="text-align:center;">
                          <span class="click-font">{{item.goods_count}}个品种</span>
                        </td>
                        <td style="text-align:center;">
                          <span class="click-font">{{item.publisher_count}}个出版社</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font" v-if="item.birth_date">{{item.birth_date}}</span>
                          <span class="main-font" v-else>--</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font" v-if="item.country">{{item.country}}</span>
                          <span class="main-font" v-else>--</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="click-dark">编辑</span>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colspan="7" style="text-align:right;">
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
    <Loading ref="load"></Loading>
  </div>
</template>
<script>
import { MYAUTHOR_LISTS } from "../../apis/publish.js";
export default {
  data() {
    return {
      pagePower: true,
      total: 0,
      page: 1,
      pageSize: 20,
      list: []
    };
  },
  mounted() {
    this.getData();
  },
  updated() {
    this.$setSlideHeight();
  },
  methods: {
    async getData() {
      let data = {
        organization_id: this.$refs.head.publishInfo.organization_id,
        publisher_id: this.$refs.head.publishInfo.publisher_id,
        page: this.page,
        page_size: this.pageSize
      };
      let res = await MYAUTHOR_LISTS(data);
      if (res.code == 0) {
        this.pagePower = true;
        this.list = [];
        this.list = res.data.list;
        this.total = res.data.count;
        this.$refs.load.isLoading = false;
      } else {
        this.$refs.load.isLoading = false;
        if (res.code == 1008) {
          this.$router.push({ name: "loginindex" });
        } else if (res.code == 1009) {
          this.pagePower = false;
        }else if(this.$systemCode.test(res.code)){
          this.$refs.head.globalTip(1, "系统错误");
        } else {
          this.$refs.head.globalTip(1, res.message);
        }
      }
    },
    onShowSizeChange(current, pageSize) {
      this.$refs.load.isLoading = true;
      this.page = current;
      this.getData();
    },
    authorDetail(item, index) {
      this.$router.push({
        name: "authordetail",
        query: {
          author_id: item.author_id
        }
      });
    },
    publisherChange() {
      this.$refs.load.isLoading = true;
      this.page = 1;
      this.getData();
    }
  }
};
</script>
