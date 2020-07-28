export function //实际防抖函数
//原理：通过对timer，有的timer没有生效就被移除了，所以生效的会很少
//如果没有设置delay时间的话执行一次 移除一次 执行一次移除一次  ！注意这里没有else 意思就是所有的timer都会执行移除的同时也会执行的
//所以没有设置delay时间，还能起到防抖作用的原理是：setTimeout函数中的回调函数，是在有空余时间的时候才进行回调的，所以移除的时候可能回调函数还是没有被回调的
debounce(func,delay){
  let timer=null;
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer=setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};

function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

