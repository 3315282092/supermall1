<template>
  <div>
    <keep-alive exclude="Detail">
      <RouterView/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/MainTabBar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar,
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
