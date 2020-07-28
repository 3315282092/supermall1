<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :class="{'high-light': index==currentIndex}"
         @click="onClick(index)" class="tab-control-item">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    data() {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      onClick(index) {
        this.currentIndex = index
        this.$emit('atClick',index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    padding: 5px;
    margin-bottom: 5px;
    line-height: 47px;
    background-color: white;
  }

  .tab-control-item{
    flex: 1;
    font-size: 20px;
  }

  .high-light {
    color: var(--color-high-text);
  }
  .high-light span{
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
