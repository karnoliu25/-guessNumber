"use strict";
// 获取元素
const ruleButton = document.querySelector("#rule-button");
const rule = document.querySelector(".rule");
const backButton = document.querySelectorAll(".back");
const recordButton = document.querySelector("#record-button");
const historyRecord = document.querySelector(".history-record");
const userInput = document.querySelector(".user-input-area");
const numberKey = document.querySelector(".number-key");

// 用户数据对象
const userData = {
  userInputData: 0,
  challenge: 0,
  challengeTime: 0,
};

// 规则按钮事件
ruleButton.addEventListener("click", () => {
  rule.style.display = "block";
});
// 历史记录按钮事件
recordButton.addEventListener("click", () => {
  historyRecord.style.display = "block";
});
// 返回按钮事件
for (let i = 0; i < backButton.length; i++) {
  backButton[i].addEventListener("click", () => {
    rule.style.display = "none";
    historyRecord.style.display = "none";
    numberKey.style.display = "none";
  });
}
// 用户输入按钮
userInput.addEventListener("click", () => {
  numberKey.style.display = "flex";
  userInput.innerHTML = "";
});
const numberKeyValue = document.querySelectorAll(".number-key ul li");
let numberArray = [];
for (let i = 0; i < numberKeyValue.length; i++) {
  numberKeyValue[i].addEventListener("click", () => {
    if (numberKeyValue[i].className == "clicked") {
      numberKeyValue[i].className = "";
      numberArray = numberArray.filter(
        (item) => item !== numberKeyValue[i].innerText
      );
    } else {
      numberKeyValue[i].className = "clicked";

      numberArray.push(numberKeyValue[i].innerText);
    }
    // FIXME:这里需要修改
    if (numberArray.length > 4) {
      console.log("wrong");

      return;
    }
    console.log("获取的数组" + numberArray);
  });
}
