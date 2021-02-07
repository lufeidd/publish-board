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
                        <div class="float-left model-bg" styl></div>
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
        publisherChange(){

        }
    }
}
</script>