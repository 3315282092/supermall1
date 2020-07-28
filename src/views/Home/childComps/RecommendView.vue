<template>
  <div class="recommend">
      <div v-for="item in recommends" class="recommend-item">
        <a :href="item.link">
          <img :src="item.image" alt="" class="image">
          <div>{{item.title}}</div>
        </a>
      </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
.recommend{
  padding: 15px 0 30px;
  border-bottom: 8px solid #eeeeee;
  display: flex;
}
.recommend-item{
  flex: 1;
  text-align: center;
  font-size: 12px;
}
.recommend-item img{
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>
