<template>
    <div class="tab-bar-item" @click="update">
        <slot name="img" v-if="!isClick"></slot>
        <slot name="active-img" v-else></slot>
        <slot name="text"></slot>

    </div>
</template>

<script>
    export default {
        name: "TabBarItem",
        computed:{
            isClick(){
                return  this.$route.path.includes(this.path)
            }
        },
        methods:{
           update(){
               this.$router.push(this.path)
           }
        },
        props:['path']

    }
</script>

<style scoped>
.tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
}
    .tab-bar-item img{
        width: 24px;
        height: 24px;
    }
</style>
