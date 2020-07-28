<template>
  <div class="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @atClick="tagClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-show="isTabFixed"></tab-control>

    <scroll class="scroll" ref="scroll"
            :probe-type="3"
            @scrollPosition="scrollPosition"
            :pull-up-load="true"
            @pullingUp="pullingUp"
    >
      <home-swiper :Banner="banners" @swiperImageLoad="swiperLoad" ref="swiper"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']" @atClick="tagClick" ref="tabControl2"></tab-control>
      <good-list :goods="goods[currentType].list"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTo"></back-top>
  </div>

</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import {getHomeMultidata, getGoodsMutidata} from "network/home";

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodList from "../../components/content/GoodsList/GoodList";
  import Scroll from "../../components/common/scroll/Scroll";
  import {debounce} from "../../common/utils";
  import {itemListenerMixin,backTopItem} from "../../common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodList,
      Scroll,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        currentType: 'pop',
        topOffset: 0,
        isTabFixed: false,
        saveY: 0,
      }

    },
    mixins:[itemListenerMixin,backTopItem],
    created() {

      this.getHomeData();
      this.getGoodsData('pop')
      this.getGoodsData('new')
      this.getGoodsData('sell')


      console.log(12312)

    },
    mounted() {
      // console.log(1);
      // const refresh = debounce(this.$refs.scroll.refresh, 500)
      // this.itemImgListener=()=>{
      //   refresh()
      // }
      // this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    activated() {

      this.$refs.scroll.moveBack(0, this.saveY, 0)
      this.$refs.scroll.refresh()
      const refresh = debounce(this.$refs.scroll.refresh, 500)
      this.itemImgListener=()=>{
        refresh()
      }
      this.$bus.$on('itemImageLoad', this.itemImgListener)
    },
    deactivated() {
      this.saveY= this.$refs.scroll.getY()
      this.$bus.$off('itemImageLoad',this.itemImgListener)
      console.log(this.saveY)
    },
    methods: {
      scrollPosition(position) {
        //判断BackTop是否显示
        this.isShowBackTo = (-position.y) > 1000
        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.topOffset
      },
      getHomeData() {
        getHomeMultidata().then(res => {
            this.banners = res.data.data.banner.list
            this.recommends = res.data.data.recommend.list
          }
        )
      },
      swiperLoad() {
        this.topOffset = this.$refs.tabControl2.$el.offsetTop
        //等到轮播图加载完以后  再找到这个tabcontrol的位置然后赋值，然后用这个位置 来对tabcontrol什么时候固定
      },
      pullingUp() {
        this.getGoodsData(this.currentType)
        setTimeout(() => {
          this.$refs.scroll.setPullFinished()
        }, 2000)
      },
      getGoodsData(type) {
        const page = this.goods[type].page + 1;
        getGoodsMutidata(type, page).then(res => {
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1
        })

      },
      tagClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
        }
        this.$refs.tabControl2.currentIndex = index
        this.$refs.tabControl1.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
    display: flex;
    line-height: 44px;
    z-index: 9;
  }

  .home {
    position: relative;
    height: 100vh;
  }

  .scroll {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 999;
  }
</style>
