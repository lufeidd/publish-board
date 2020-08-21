<template>
  <div id="taopuPage">
    <HeadNav type="publish" ref="head" @publisherChange="publisherChange()"></HeadNav>
    <div class="wd-1220">
      <div class="clearfix">
        <div class="float-left">
          <SlideNav type="publish" sort="authors"></SlideNav>
        </div>
        <div class="float-left">
          <div class="main-container">
            <div class="model-container">
              <div class="model-bg">
                <div class="section-title">
                  作者库
                  <span class="desc">共2000名</span>
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
                      <tr v-for="(item,index) in 10" :key="index">
                        <td>{{index+1}}</td>
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
                            <span class="click-font goods-name" :title="item.name">东野</span>
                          </div>
                        </td>
                        <td style="text-align:center;">
                          <span class="click-font">32个品种</span>
                        </td>
                        <td style="text-align:center;">
                          <span class="click-font">7个出版社</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">1988-08-08</span>
                        </td>
                        <td style="text-align:right;">
                          <span class="main-font">日本</span>
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 0,
      page: 1,
      pageSize: 20
    };
  },
  mounted() {
    this.$setSlideHeight();
  },
  updated() {},
  methods: {},
  onShowSizeChange(current, pageSize) {}
};
</script>
