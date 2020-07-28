import Vue from 'vue'
import VueRouter from 'vue-router'
const  ShopCar=()=>import('views/ShopCar/ShopCar')
const  Profile=()=>import('views/Profile/Profile')
const  Category=()=>import('views/Category/Category')
const  Home=()=>import('views/Home/Home')
const Detail=()=>import('views/Detail/Detail')
Vue.use(VueRouter)

const routes =[
  {
    path:'',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/shopcar',
    component: ShopCar
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/profile',
    component: Profile
  },
  {
  path: '/detail/:iid',
    component:Detail
  }
]


const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
