<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <div class="show-list">
      <cart-list-item v-for="(item,index) in cartList" :item-info="item"></cart-list-item>
      </div>
    </scroll>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Scroll from "../../../components/common/scroll/Scroll";
  import CartListItem from "./CartListItem";

  export default {
    name: "CartList",
    computed: {
      ...mapGetters(['cartList']),
    },
    components:{
      Scroll,
      CartListItem
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
.content{
  position: absolute;
  bottom: 89px;
  top: 44px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.cart-list{
  height:calc(100% - 44px - 49px - 40px);
}
  .show-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
