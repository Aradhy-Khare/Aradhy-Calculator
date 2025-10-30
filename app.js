let display = document.querySelector(".screen");

let boxes = document.querySelectorAll(".num");

const validInput = [...Array(10).keys()].map(String).concat(["."]);

let firstNum = "";
let secondNum = "";
let opr = "";
let isOprClicked = false;

document.addEventListener("keydown", (event) => {
  calculate(event.key);
});

const changeColor = (box) => {
  if (box.innerText === "=") {
    box.style.background = "linear-gradient(135deg, #FFD700 60%, #FF9800 100%)";
    box.style.color = "#222";
    box.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  } else if (box.innerText === "Max") {
    box.style.background = "linear-gradient(135deg, #00c6ff 60%, #0072ff 100%)";
    box.style.color = "#fff";
    box.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  } else if (box.innerText === "^") {
    box.style.background =
      "linear-gradient(135deg, #52c903ff 60%, #035310ff 100%)";
    box.style.color = "#fff";
    box.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  } else if (box.innerText === "C") {
    box.style.background = "linear-gradient(135deg, #ff6a00 60%, #ee0979 100%)";
    box.style.color = "#fff";
    box.style.boxShadow = "0 2px 8px rgba(0,0,0,0.3)";
  }
};

const themeBtn = document.getElementById("themeToggle");
if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("alt-theme");
    const isAlt = document.body.classList.contains("alt-theme");
    themeBtn.innerText = isAlt ? "🌞" : "🌗";
  });
}

boxes.forEach((box) => {
  changeColor(box);
  box.addEventListener("click", () => {
    calculate(box.innerText);
  });
});
const calculate = (value) => {
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
    value === "^" ||
    value === "Max"
  ) {
    if (firstNum !== "") {
      opr = value;
      display.innerText = firstNum + " " + opr;
      isOprClicked = true;
    }
  } else if (value === "=" || value === "Enter") {
    if (firstNum !== "" && secondNum !== "" && opr !== "") {
      let result = 0;
      let num1 = parseFloat(firstNum);
      let num2 = parseFloat(secondNum);
      if (opr === "/" && parseFloat(secondNum) === 0) {
        display.innerText = "∞";
        firstNum = "0";
        opr = "";
        secondNum = "";
      } else {
        if (opr === "+") result = num1 + num2;
        if (opr === "-") result = num1 - num2;
        if (opr === "*") result = num1 * num2;
        if (opr === "/") result = num1 / num2;
        if (opr === "%") result = num1 % num2;
        if (opr === "^") result = Math.pow(num1, num2);
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
  } else if (validInput.includes(value)) {
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
