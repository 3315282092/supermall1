<template>
  <div class="detail">
    <detail-navbar @titleClick="titleClick" ref="nav"/>
    <scroll class="content" ref="scroll" :probe-type="3" @scrollPosition="changeNav">
      <detail-swiper :detail-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailImages" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="goodsParam" ref="params"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommends" ref="recommend"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTo"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
  import DetailNavbar from "./childComps/DetailNavbar";
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import Scroll from "../../components/common/scroll/Scroll";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import GoodList from "../../components/content/GoodsList/GoodList";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin,backTopItem} from "../../common/mixin";
  import DetailBottomBar from "./childComps/DetailBottomBar";
  import Toast from "../../components/common/toast/Toast";
  export default {
    name: "Detail",
    data() {
      return {
        iid: 0,
        topImages: [],
        goods: {},
        shop: {},
        detailImages: {},
        goodsParam: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        stepTo:null,
        currentPositionY:0,
        message:'',
        show:false
      }
    },
    created() {
      this.iid = this.$route.params.iid
      //获取商品的iid

      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.data.result
        this.topImages = data.itemInfo.topImages

        //获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        this.shop = new Shop(data.shopInfo)
        //保存商品的详情数据
        this.detailImages = data.detailInfo;
        //导入参数页面
        this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        if (data.rate.cRate != 0) {
          this.commentInfo = data.rate.list[0]
        }
      })
      //获取详情数据
      getRecommend().then(res => {
        console.log(res)
        this.recommends = res.data.data.list
      })

      //获取轮播图的图片

      //获取详情页面的信息
    },
    mixins: [itemListenerMixin,backTopItem],
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      addToCart(){
        const  product={};
        product.image=this.topImages[0];
        product.title=this.goods.title;
        product.desc=this.goods.desc;
        product.price=this.goods.realPrice;
        product.iid=this.iid;
        //2 将商品添加到购物车里
        this.$store.dispatch('addCart',product).then(msg=>{
        this.$toast.show(msg,2000)
        })

        //3 添加到购物车成功
      },
      imageLoad() {
         this.newReflesh()
        this.stepTo=debounce(()=>{
          this.themeTopYs=[]
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          console.log(this.themeTopYs);
        },100)
        this.stepTo()
      },
      titleClick(index) {
        this.$refs.scroll.moveBack(0, -this.themeTopYs[index], 300)
      },
      changeNav(position){
           let length=this.themeTopYs.length
        let positionY=-position.y
           for (let i=0;i<length;i++){
             if (this.currentPositionY!=i &&(i<length-1 && positionY>this.themeTopYs[i] &&
               positionY<this.themeTopYs[i+1]
               || i===this.themeTopYs.length-1 && positionY>this.themeTopYs[i]) ){
               console.log(i);
               this.currentPositionY=i
               this.$refs.nav.currentType=this.currentPositionY
             }
           }

           this.isShowBackTo=(position.y<-1000)


      }
    },
    components: {
      DetailParamInfo,
      DetailBaseInfo,
      DetailNavbar,
      DetailSwiper,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailCommentInfo,
      GoodList,
      DetailBottomBar,
      Toast
    }
  }
</script>

<style scoped>
  .content {
    position: absolute;
    top: 44px;
    bottom: 58px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .detail {
    position: relative;
    height: 100vh;
    background: #fff;
    z-index: 1;
  }
</style>
