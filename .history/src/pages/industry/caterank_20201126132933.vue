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
          <SlideNav type="industry" sort="caterank"></SlideNav>
        </div>
        <div class="float-right">
          <div class="main-container">
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg clearfix">
                  <div class="float-right" style="padding: 7px 15px">
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
              <div class="model-bg" style="min-height:603px;">
                <div class="section-title">行业全类目销售排行</div>
                <div class="table">
                  <table style="table-layout: fixed">
                    <colgroup>
                        <col width="55" />
                        <col width="20" />
                        <col width="160" />
                        <col width="160" />
                        <col width="160" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td>排名</td>
                            <td style="text-align:center;">类目</td>
                            <td style="text-align:right;">销售指数</td>
                            <td style="text-align:right;">占比</td>
                            <td style="text-align:right;">上期对比</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>100</td>
                            <td style="text-align:center;"></td>
                            <td style="text-align:right;"></td>
                            <td style="text-align:right;"></td>
                            <td style="text-align:right;"></td>
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
  </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    mounted(){

    },
    methods:{
        changeTime(){
            
        }
    }
}
</script>