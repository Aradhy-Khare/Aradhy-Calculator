let display = document.querySelector(".screen");

let boxes = document.querySelectorAll(".num");

let firstNum = "";
let secondNum = "";
let opr = "";
let isOprClicked = false;

for (let i = 0; i < boxes.length; i++) {
  boxes[i].addEventListener("click", function () {
    calculate(boxes[i].innerText);
  });
}

const calculate = (box) => {
  const value = box;
  if (value === "C") {
    firstNum = "";
    secondNum = "";
    opr = "";
    isOprClicked = false;
    display.innerText = "0";
    display.style.fontSize = "30px";
  } else if (
    value === "*" ||
    value === "+" ||
    value === "-" ||
    value === "/" ||
    value === "%" ||
    value === "Power" ||
    value === "Max"
  ) {
    display.style.fontSize = "30px";
    if (firstNum !== "") {
      opr = value;
      display.innerText = firstNum + " " + opr;
      isOprClicked = true;
    }
  } else if (value === "=") {
    display.style.fontSize = "30px";
    if (firstNum !== "" || secondNum !== "" || opr !== "") {
      let result = 0;
      let num1 = parseFloat(firstNum);
      let num2 = parseFloat(secondNum);
      if (opr === "/" && secondNum === "0") {
        display.style.fontSize = "50px";
        display.innerText = "∞";
        firstNum = 0;
      } else {
        if (opr === "+") result = num1 + num2;
        if (opr === "-") result = num1 - num2;
        if (opr === "*") result = num1 * num2;
        if (opr === "/") result = num1 / num2;
        if (opr === "%") result = num1 % num2;
        if (opr === "Power") result = Math.pow(num1, num2);
        if (opr === "Max") result = Math.max(num1, num2);
        let answer = result.toFixed(10);
        let pretty;
        if(answer % 1 == 0){
          pretty = parseInt(answer);
        } else {
          pretty = answer;
        }
        display.innerText = pretty;
        firstNum = pretty;
      }
      opr = "";
      secondNum = "";
      isOprClicked = false;
    }
  } else {
    display.style.fontSize = "30px";
    if (isOprClicked) {
      if (value === "." && secondNum.includes(".")) return;
      secondNum += value;
      display.innerText = firstNum + " " + opr + " " + secondNum;
    } else {
      if (value === "." && firstNum.includes(".")) return;
      firstNum += value;
      display.innerText = firstNum;
    }
  }
};
