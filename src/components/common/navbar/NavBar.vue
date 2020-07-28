<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
  }

  .nav-bar {
    margin: 0;
    display: flex;
    line-height: 44px;
    z-index: 9;
  }


</style>
