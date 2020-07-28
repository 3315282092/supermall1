<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <template v-slot:left>
        <div class="back-icon" @click="backClicked"><img src="~assets/img/common/back.svg" alt=""></div>
      </template>
      <template v-slot:center>
        <div class="title">
          <span v-for="(item,index) in titles" class="item-center" :class="{active:currentType==index}" @click="changeItem(index)">{{item}}</span>
        </div>
      </template>
      <template v-slot:right></template>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";

  export default {
    name: "navbar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentType: 0
      }
    },
    methods: {
      changeItem(index) {
     this.currentType=index;
     this.$emit('titleClick',index)
      },
      backClicked(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .item-center {
    flex: 1;
  }

  .title {
    display: flex;
  }

  .active {
    color: var(--color-high-text)
  }
  .back-icon img{
    margin-top:10px
  }
</style>
