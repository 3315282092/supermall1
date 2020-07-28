import {ADD_COUNT,Add_TO_CART} from "./mutation-types";
export default {
  [ADD_COUNT](state,payload){
    payload.count+=1
  },
  [Add_TO_CART](state,payload){
    payload.checked=true
    state.cartList.push(payload)
  }
}
