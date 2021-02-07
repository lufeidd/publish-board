<template>
    <div id="">
        <HeadNav type="inquire" ref="head" :show="1"></HeadNav>
        <div class="wd-1220">
            <div class="clearfix">
                <div class="float-left">
                    <SlideNav type="inquire" sort="goods"></SlideNav>
                </div>
                <div class="float-right">
                    <div class="main-container" v-if="powerType == 1">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return
    }
}
</script>