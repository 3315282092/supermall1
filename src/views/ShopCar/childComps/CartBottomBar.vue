<template>
  <div class="bottom-bar">
    <div class="bottom-bar-item">
      <check-button class="check-button" :is-check="isSelectAll" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="total">
      合计:{{totalPrice}}
    </div>
    <div class="calculate">
      去计算:{{checkLength}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "../../../components/content/checkButton/CheckButton";
  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottomBar",
    components: {CheckButton},
    computed: {
      totalPrice() {
        return '￥' + this.cartList.filter(item => item.checked)
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0).toFixed(2)
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      ...mapGetters(['cartList']),
      isSelectAll() {
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.checked = false)
        } else {
          this.cartList.forEach(item => item.checked = true)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: relative;
    z-index: 4;
    line-height: 40px;
    background-color: #eee;
    display: flex;
  }

  .bottom-bar-item {
    display: flex;
    align-items: center;
    font-size: 20px;
    width: 60px;
  }

  .check-button {
    line-height: 20px;
    height: 20px;
    width: 20px;
  }

  .total {
    margin-left: 30px;
    font-size: 20px;
    flex: 1;
    text-align: center;
  }

  .calculate {
    font-size: 20px;
    width: 110px;
    text-align: center;
    background-color: red;
    color: white;
  }
</style>
