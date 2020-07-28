<template>
  <div>
  <swiper>
    <swiper-item v-for="item in Banner">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad">
      </a>
    </swiper-item>
  </swiper>
  </div>
</template>
<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    components: {
      SwiperItem, Swiper
    },
    data(){
      return {
        isLoad:false
      }
    },
    props: {
      Banner: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods:{
      imgLoad(){
        if (!this.isLoad){
       this.$emit('swiperImageLoad')
        this.isLoad=true
        }
        }
    }
  }

</script>

<style scoped>

</style>

