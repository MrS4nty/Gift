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
  Win: 0,
  Empate: 0,
  Lose: 0
};
choiceButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const comp = compChoice();
    let result = "";
    if (win[comp] === btn.value) {
      result = "Win";
    } else if (btn.value === comp) {
      result = "Empate";
    } else {
      result = "Lose";
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
