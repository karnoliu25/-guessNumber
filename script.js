"use strict";
// 获取元素
const ruleButton = document.querySelector("#rule-button");
const rule = document.querySelector(".rule");
const backButton = document.querySelectorAll(".back");
const recordButton = document.querySelector("#record-button");
const historyRecord = document.querySelector(".history-record");
const userInput = document.querySelector(".user-input-area");
const numberKey = document.querySelector(".number-key");
const keyCommit = document.querySelector(".key-commit");

// 用户数据对象
const userData = {
  userInputData: 0,
  challenge: 0,
  challengeTime: 0,
};

// 随机四位数字谜底

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
// 数字键盘输入事件
const numberKeyValue = document.querySelectorAll(".number-key ul li");
let numberArray = [];
for (let i = 0; i < numberKeyValue.length; i++) {
  let clickedNumber = document.getElementsByClassName("clicked");

  numberKeyValue[i].addEventListener("click", () => {
    if (numberKeyValue[i].className == "") {
      numberKeyValue[i].className = "clicked";
      if (clickedNumber.length >= 5) {
        numberKeyValue[i].className = "";
        alert(`只能选择4位数字哦`);
        return;
      }
      numberArray.push(numberKeyValue[i].innerText);
    } else if (numberKeyValue[i].className == "clicked") {
      numberKeyValue[i].className = "";
      numberArray = numberArray.filter(
        (item) => item !== numberKeyValue[i].innerText
      );
    }

    userInput.innerText = numberArray.join("");

    console.log("获取的数组:" + numberArray);
  });
}
// 数字键盘提交按钮事件
keyCommit.addEventListener("click", () => {
  let userInputNumber = userInput.innerText;
  if (userInputNumber.length == 0) {
    alert(`请选择4位数字哦`);
    return;
  } else if (userInputNumber.length < 4) {
    alert(`还没选够4位数字哦`);
    return;
  } else if (userInputNumber.length == 4) {
    numberKey.style.display = "none";
  }
  userData.userInputData = userInputNumber;
  console.log("获取数字" + userData.userInputData);
});
