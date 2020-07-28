import {debounce} from "./utils";
import BackTop from "../components/content/backTop/BackTop";
export const itemListenerMixin={
  data(){
    return {
      itemImgListener:null,
      newReflesh:null
    }
  },
  mounted(){
    this.newReflesh=debounce(this.$refs.scroll.refresh,100)

    this.itemImgListener=()=>{
      this.newReflesh()
    }
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  }
}
export const  backTopItem={
  data() {
    return {
      isShowBackTo:false
    };
  },
  components:{
    BackTop
  },
  methods:{
     backClick(){
       this.$refs.scroll.moveBack(0,0)
     }
  }
}
