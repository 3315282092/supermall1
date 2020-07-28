<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null//保存下scroll的配置，只new 一次对象，如果不保存 就会被回收，需要在多个方法中使用，所以我们将他进行保存
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        useTransition:false
      })


      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scrollPosition', position)
        })
      }
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      refresh() {
        console.log('刷新中')
        this.scroll && this.scroll.refresh()
        //存在scroll再调用
      },
      moveBack(x, y, time = 300) {
        console.log(y);
        this.scroll && this.scroll.scrollTo(x, y,time)
      },
      setPullFinished() {
        this.scroll && this.scroll.finishPullUp()
      },
      getY() {
        return this.scroll ? this.scroll.y : 0
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
