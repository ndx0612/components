var timediffer = function (last, now) {
  const options = {
    day: '天前',
    hour: '小时前',
    minute: '分钟前',
    second: '秒前',
    just: '刚刚',
  }
  const timer = (now - last) / 1000;
  let tip = '';
  if (timer <= 0 || Math.floor(timer / 60) <= 0) {
    tip = options.just;
  } else if (timer < 3600) {
    tip = Math.floor(timer / 60) + `${options.minute}`;
  } else if (timer >= 3600 && timer <= 86400) {
    tip = Math.floor(timer / 3600) + `${options.hour}`;
  } else {
    tip = Math.ceil(timer / 86400) + `${options.day}`;
  }
  return tip;
}
var t1 = new Date("2021-11-29 19:59:57");
var t2 = new Date();
console.log((t2 - t1) / 1000);
console.log(timediffer(t1, t2));