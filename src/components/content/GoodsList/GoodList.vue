<template>
    <div class="good-list">
      <GoodListItem v-for="item in goods" :good="item"></GoodListItem>
    </div>
</template>

<script>
  import GoodListItem from "./GoodListItem";
    export default {
        name: "GoodList",
      props:{
          goods:{
            type:Array,
            default(){
              return []
            }
          }
      },components:{
          GoodListItem
      },created() {
        console.log(this.goods);
      }
    }
</script>

<style scoped>
.good-list{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>
