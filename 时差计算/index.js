// 1、小于60s，显示刚刚
// 2、大于60s，小于1个小时，？分钟前
// 3、大于1小时，小于24小时，？小时前
// 4、大于24小时，小于一个月，？天前
// 5、大于一个月，小于12个月，？个月前
// 6、大于12个月，？年前
var timediffer = function (last, now) {
  const options = {
    year: '年前',
    month: '个月前',
    day: '天前',
    hour: '小时前',
    minute: '分钟前',
    second: '秒前',
    just: '刚刚',
  }
  const timer = (now - last) / 1000; // 获取秒数
  let tip = '';
  if (timer <= 0 || Math.floor(timer / 60) <= 0) { // 小于60s,刚刚
    tip = options.just;
  } else if (timer < 60 * 60) {
    tip = Math.floor(timer / 60) + `${options.minute}`;
  } else if (timer < 60 * 60 * 24) {
    tip = Math.floor(timer / 3600) + `${options.hour}`;
  } else if (timer < 60 * 60 * 24 * 30) {
    tip = Math.ceil(timer / 86400) + `${options.day}`;
  } else {
    tip = Math.floor(timer / (86400 * 24)) + `${options.month}`;
  }
  return tip;
}
var t1 = new Date("2020-10-11 15:21:57");
var t2 = new Date();
console.log(timediffer(t1, t2));