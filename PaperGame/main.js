const win = {
  scissors: "rock",
  rock: "paper",
  paper: "scissors"
};

const choices = ["scissors", "paper", "rock"];

const compChoice = () => choices[Math.floor(Math.random() * choices.length)];

const compButton = document.getElementById("computer-button");

const choiceButtons = [...document.getElementsByClassName("choice")];
const compButtons = [...document.getElementsByClassName("computer")];
const resultDisplay = document.getElementById("results-display");
const resultData = {
  win: 0,
  draw: 0,
  lose: 0
};
choiceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const comp = compChoice();
    let result = "";
    if (win[comp] === btn.value) {
      result = "win";
    } else if (btn.value === comp) {
      result = "draw";
    } else {
      result = "lose";
    }
    compButtons.forEach((element) => {
      if (element.value === comp) {
        if (!element.classList.contains(comp)) {
          element.classList.add("selected");
        }
      } else {
        element.classList.remove("selected");
      }
    });
    resultData[result] += 1;
    document.getElementById(`${result}-count`).innerText = resultData[result];
    resultDisplay.innerText = `Result: ${result}`;
  });
});
