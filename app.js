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
  } else if (
    value === "*" ||
    value === "+" ||
    value === "-" ||
    value === "/" ||
    value === "%" ||
    value === "Power" ||
    value === "Max"
  ) {
    if (firstNum !== "") {
      opr = value;
      display.innerText = firstNum + " " + opr;
      isOprClicked = true;
    }
  } else if (value === "=") {
    if (firstNum !== "" || secondNum !== "" || opr !== "") {
      let result = 0;
      let num1 = parseFloat(firstNum);
      let num2 = parseFloat(secondNum);
      if (opr === "/" && parseFloat(secondNum) === 0) {
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

        let answerNum = result; // number
        let pretty;
        if (Number.isInteger(answerNum)) {
          pretty = String(answerNum);
        } else {
          // fix to 10 decimals then remove trailing zeros
          pretty = parseFloat(answerNum.toFixed(10)).toString();
        }
        display.innerText = pretty;
        firstNum = pretty;
      }
      opr = "";
      secondNum = "";
      isOprClicked = false;
    }
  } else {
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
