'use strict';

(function () {
  // ゼロ埋め
  var zeroPadding = function (number, digit) {
    var numberLength = String(number).length;
    if (digit > numberLength) {
      return new Array(digit - numberLength + 1).join(0) + number;
    } else {
      return number;
    }
  };

  window.addEventListener("DOMContentLoaded", function () {
    var stageElem = document.querySelector(".analog-clock"),
      boardElem = stageElem.querySelector(".movement-board"),
      dialsElem = boardElem.querySelector(".dial"),
      dialItemElems = dialsElem.querySelectorAll("li"),
      handsElem = boardElem.querySelector(".hands"),
      hourHandElem = handsElem.querySelector(".hour-hand"),
      minuteHandElem = handsElem.querySelector(".minute-hand"),
      secondHandElem = handsElem.querySelector(".second-hand"),
      digitalTimeElem = boardElem.querySelector(".digital-time"),
      timeHourElem = digitalTimeElem.querySelector(".hour"),
      timeMinuteElem = digitalTimeElem.querySelector(".minute"),
      timeSecondElem = digitalTimeElem.querySelector(".second"),
      radius = stageElem.clientWidth / 2 - 20, // 半径 - 内側に寄せる値
      smoothRotate = false; // スムーズに秒針を動かすかどうか

    // ダイヤルの配置
    Array.prototype.forEach.call(dialItemElems, function (element, index) {
      var angle = (index + 1) * 30,
        radian = ((angle - 90) / 180) * Math.PI,
        x = radius * Math.cos(radian),
        y = radius * Math.sin(radian);

      element.style.transform =
        "translate(" + x.toFixed(2) + "px, " + y.toFixed(2) + "px)";
    });

    // レンダリング
    var render = function () {
      var dateObj = new Date(),
        timeHour = dateObj.getHours(),
        timeMinute = dateObj.getMinutes(),
        timeSeconds = dateObj.getSeconds(),
        timeMilliseconds = dateObj.getMilliseconds(),
        hourHandAngle = (timeHour / 12) * 360,
        minuteHandAngle = (timeMinute / 60) * 360;

      if (smoothRotate) {
        secondHandAngle =
          (Number(
            (timeSeconds + timeMilliseconds / 1000).toFixed(3).replace(".", "")
          ) /
            60000) *
          360;
      } else {
        secondHandAngle = (timeSeconds / 60) * 360;
      }

      hourHandElem.style.transform = "rotate(" + hourHandAngle + "deg)";
      minuteHandElem.style.transform = "rotate(" + minuteHandAngle + "deg)";
      secondHandElem.style.transform = "rotate(" + secondHandAngle + "deg)";

      timeHourElem.textContent = zeroPadding(timeHour, 2);
      timeMinuteElem.textContent = zeroPadding(timeMinute, 2);
      timeSecondElem.textContent = zeroPadding(timeSeconds, 2);
    };

    setInterval(render, 10);
    render();
  });
})();