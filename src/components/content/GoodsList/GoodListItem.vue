<template>
  <div class="good-item-list" @click="itemClicked">
    <img :src="showImage" alt="" @load="imageLoad">
    <div class="title"><span>{{good.title}}</span></div>
    <div class="good-item"><span class="price">{{good.price}}</span> <span class="collect">{{good.cfav}}</span></div>
  </div>
</template>

<script>
  export default {
    name: "GoodListItem",
    props: {
      good: {
        type: Object,
        default() {
          return null
        }
      }
    },
    methods: {
      imageLoad() {
        this.$bus.$emit('itemImageLoad')
        //每加载完一次图片调用一次这个方法
      },
      itemClicked() {
        this.$router.push('/detail/' + this.good.iid)
      }
    },
    computed: {
      showImage() {
        return   this.good.image || this.good.show.img
      }
      }
  }
</script>

<style scoped>
  .good-item-list {
    width: 48%;
    padding: 2px;
  }

  .price {
    color: var(--color-high-text);
  }

  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .good-item-list img {
    width: 100%;
    border-radius: 20px;
  }

  .collect:before {
    white-space: pre;
    content: "   ";
    background: url("~assets/img/common/collect.svg") 0 0/14px 15px;
    background-repeat: no-repeat;
  }

  .collect {
    position: relative;
  }

  .good-item {
    text-align: center;
  }
</style>

