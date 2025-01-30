"use strict";
// 获取元素
const ruleButton = document.querySelector("#rule-button");
const rule = document.querySelector(".rule");
const backButton = document.querySelectorAll(".back");
const recordButton = document.querySelector("#record-button");
const historyRecord = document.querySelector(".history-record");
const historyRecordList = document.querySelector(".history-record ul");
const userInput = document.querySelector(".user-input-area");
// 获取游戏内记录区域元素
const recordArea = document.querySelector(".record ul");
// 获取游戏结果区域元素
const resultArea = document.querySelector(".result");
// 获取数字键盘/数字键盘提交按钮/数字键盘返回按钮元素
const numberKey = document.querySelector(".number-key");
const keyCommit = document.querySelector(".key-commit");
const keyBack = document.querySelector(".key-back");
// 获取数字键盘数字按钮元素
const numberKeyValue = document.querySelectorAll(".number-key ul li");
// 获取提交/重新玩按钮元素
const commitBtn = document.querySelectorAll(".commit")[0];
const resetBtn = document.querySelectorAll(".reset")[0];

// 用户数据对象
const userData = {
  userInputData: 0,
  challenge: 0,
  challengeDate: 0,
  rightNumberCount: 0,
  rightPositionCount: 0,
};

// 随机四位数字谜底
let gameSolution = 0;
const gamePlay = function () {
  let solution = [];
  while (solution.length >= 0 && solution.length < 4) {
    let solutionNumber = Math.floor(Math.random() * 10);
    if (solution.indexOf(solutionNumber) == -1) {
      solution.push(solutionNumber);
    }
  }
  gameSolution = solution.join("");
  console.log(gameSolution);
};
gamePlay();
// 获取挑战成功年月日
function getDate() {
  let dateValue = new Date();
  let year = dateValue.getFullYear();
  let month = dateValue.getMonth() + 1;
  let date = dateValue.getDate();
  const dateString = year + "-" + month + "-" + date;
  userData.challengeDate = dateString;
}
// 保存数据至浏览器
const saveData = function () {
  const storedData = localStorage.getItem("saveUserData");
  const saveArray = storedData ? JSON.parse(storedData) : [];
  saveArray.push(userData);
  localStorage.setItem("saveUserData", JSON.stringify(saveArray));
};
// 加载历史记录
function historyList() {
  const storeHistory = localStorage.getItem("saveUserData");
  const historyData = storeHistory ? JSON.parse(storeHistory) : [];
  for (const key in historyData) {
    historyRecordList.innerHTML += `<li style="font-weight:bold">
    ${historyData[key].challengeDate} 答案${historyData[key].userInputData} 使用${historyData[key].challenge}次机会
    </li>`;
  }
}
// historyRecordList
// 重置按钮事件
const resetGame = function () {
  userData.userInputData = 0;
  userData.challenge = 0;
  userData.challengeTime = 0;
  userInput.innerText = "点击输入";
  recordArea.innerHTML = "";
  resultArea.innerHTML = "?";
  numberArray = [];
  for (let i = 0; i < numberKeyValue.length; i++) {
    numberKeyValue[i].className = "";
  }
  gamePlay();
};
resetBtn.addEventListener("click", () => {
  resetGame();
});
// 提交按钮事件
const recordLi = document.createElement("li");
commitBtn.addEventListener("click", () => {
  if (resultArea.innerText == gameSolution) {
    if (confirm(`您要重新挑战游戏吗?`)) {
      resetGame();
      return;
    } else {
      return;
    }
  }
  userData.rightNumberCount = 0;
  userData.rightPositionCount = 0;
  userData.challenge += 1;
  const recordLi = document.createElement("li");
  if (userData.userInputData == 0) {
    alert(`请选择4位数字哦`);
    if (userData.challenge == 1) {
      userData.challenge = 0;
      return;
    } else {
      userData.challenge -= 1;
      return;
    }
  }
  for (let i = 0; i < 4; i++) {
    if (userData.userInputData[i] == gameSolution[i]) {
      userData.rightNumberCount += 1;
      userData.rightPositionCount += 1;
    } else if (gameSolution.indexOf(userData.userInputData[i]) != -1) {
      userData.rightNumberCount += 1;
    } else {
      continue;
    }
  }
  // 成功
  if (userData.rightPositionCount == 4) {
    resultArea.innerHTML = `${gameSolution}`;
    recordLi.innerHTML = `<span style="color: rgb(6, 229, 6)"> 挑战成功! </span>一共使用<span style="color: rgb(6, 229, 6)"> ${userData.challenge}  </span>次机会.`;
    // 将成功记录到本地浏览器中
    getDate();
    saveData();
    alert(`恭喜你猜对了！答案是${gameSolution}`);
  } else {
    recordLi.innerHTML = `<span style="color: rgb(6, 229, 6)">${userData.userInputData}</span> 挑战 <span style="color: rgb(6, 229, 6)"> ${userData.challenge}次 </span>数字正确:<span style="color: rgb(6, 229, 6)"> ${userData.rightNumberCount} </span>位，位置正确:<span style="color: rgb(6, 229, 6)"> ${userData.rightPositionCount} </span>位`;
  }
  recordArea.appendChild(recordLi);
});

// 规则按钮事件
ruleButton.addEventListener("click", () => {
  rule.style.display = "block";
});
// 历史记录按钮事件
recordButton.addEventListener("click", () => {
  historyList();
  historyRecord.style.display = "block";
});
// 返回按钮事件
for (let i = 0; i < backButton.length; i++) {
  backButton[i].addEventListener("click", () => {
    rule.style.display = "none";
    historyRecord.style.display = "none";
    historyRecordList.innerHTML = "";
  });
}

// 用户输入按钮
userInput.addEventListener("click", () => {
  numberKey.style.display = "flex";
  commitBtn.style.display = "none";
  resetBtn.style.display = "none";
});
// 数字键盘输入事件
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
    userData.userInputData = userInputNumber;
    numberKey.style.display = "none";
    userInput.style.color = "white";
    commitBtn.style.display = "block";
    resetBtn.style.display = "block";
  }
});
// 数字键盘返回
keyBack.addEventListener("click", () => {
  let userInputNumber = userInput.innerText;
  if (userInputNumber.length != 4 || userData.userInputData.length != 4) {
    userData.userInputData = 0;
    userInput.innerText = "点击输入";
    numberArray = [];
    for (let i = 0; i < numberKeyValue.length; i++) {
      numberKeyValue[i].className = "";
    }
  }
  numberKey.style.display = "none";
  commitBtn.style.display = "block";
  resetBtn.style.display = "block";
});
