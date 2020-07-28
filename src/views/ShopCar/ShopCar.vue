<template>
  <div class="shop-cart">
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{cartLength}})</div>
      </template>
    </nav-bar>
    <!--   商品的列表-->
    <cart-list></cart-list>
    <!--  底部的汇总-->
    <CartBottomBar/>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComps/CartList";
  import CartBottomBar from "./childComps/CartBottomBar";
  import {mapGetters} from 'vuex'

  export default {
    name: "ShopCar",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['cartLength','cartList'])
    },

  }
</script>

<style scoped>
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .shop-cart{
    height: 100vh;
    position: relative;
  }
</style>
