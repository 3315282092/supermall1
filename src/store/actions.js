import {ADD_COUNT,Add_TO_CART} from "./mutation-types";
export default {
  addCart(context,payload){
    return new Promise(((resolve, reject) => {
      let oldProduct=context.state.cartList.find(item => payload.iid===item.iid)
      if (oldProduct){
        context.commit(ADD_COUNT,oldProduct)
        resolve('当前商品数量+1')
      }else {
        payload.count=1
        context.commit(Add_TO_CART,payload)
        resolve('添加了新的商品')
      }
    }))
  }
}
