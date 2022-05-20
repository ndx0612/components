// js控制宽度变化
function changeUp(dom, time, width_px) {
  var _this = this;
  var width = dom.offsetWidth;
  console.log(width, width_px);
  if (width < width_px) {
    dom.style.width = width + 14 + "px";
    console.log(width, width_px);
    setTimeout(() => {
      _this.changeUp(dom, time, width_px);
    }, time);
  }
};
function changeDown(dom, time, width_px) {
  var _this = this;
  var width = dom.offsetWidth;
  console.log(width, width_px);
  if (width > width_px) {
    dom.style.width = width - 14 + "px";
    console.log(width, width_px);
    setTimeout(() => {
      _this.changeDown(dom, time, width_px);
    }, time);
  }
};
// 点击展开收齐
function packMenu() {
  if (data.packUp) {
    // methods.changeDown(tbody, 10, 180);
    data.packUp = false;
  } else {
    // methods.changeUp(tbody, 10, 320);
    data.packUp = true;
  }
}