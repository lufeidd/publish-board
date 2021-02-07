<template>
  <div>
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
              <div class="float-left model-bg" style="width: 535px"></div>
              <div class="float-right model-bg" style="width: 535px"></div>
            </div>
            <!-- 选择品种，日期 -->
            <a-affix :offset-top="36">
              <div class="model-container">
                <div class="model-bg clearfix" style="padding: 7px 15px;">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Chart, Util, registerShape } from "@antv/g2";
import { COMMON_PUBLISHERCATEGORY } from "../../apis/common.js";
export default {
  
  data() {
    return {};
  },
  mounted() {},
  methods: {
    publisherChange() {},
  },
};
</script>