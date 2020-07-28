<template>
    <div class="check-button" :class="{check : isCheck}" @click="buttonClicked">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
      data(){

      },
      methods:{
          buttonClicked(){
            this.isCheck=! this.isCheck
          }
      },
      props:{
          isCheck:{
            type:Boolean,
            default:true
          }
      }
    }
</script>

<style scoped>
.check-button{
  border-radius: 50%;
  border: 2px solid #aaa;
}
  .check{
    background: red;
    border: 2px solid #aaa;
  }
</style>
