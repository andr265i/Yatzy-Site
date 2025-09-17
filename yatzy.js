import * as logik from "../Logik/Logik.js";

let results = logik.getResults();
let winCount = 0;

let btnRoll = document.getElementById("btnRoll");
logik.throwDice;
btnRoll.addEventListener("click", rollDice);

function rollDice() {
  for (let i = 0; i < 5; i++) {
    let t = document.getElementById("t" + i);
    if (t.classList.contains("locked")) {
      logik.holds[i] = true;
    } else {
      logik.holds[i] = false;
    }
  }

  logik.throwDice(logik.holds);
  for (let i = 0; i < 5; i++) {
    let t = document.getElementById("t" + i);
    t.innerHTML = "<img src='Images/t" + logik.values[i] + ".png' />";
  }
  console.log(logik.values);
  let rollCount = document.getElementById("rollCount");
  rollCount.innerHTML = logik.throwCount;
  if (logik.throwCount >= 3) {
    btnRoll.disabled = true;
  }
  updateResults();
}

let terninger = document.querySelectorAll(".terning");

terninger.forEach((terning) => {
  terning.addEventListener("click", () => {
    if(logik.throwCount > 0) {
       terning.classList.toggle("locked");
    }
  });
});

let score1 = document.querySelectorAll(".score1");
score1.forEach((score) => {
  score.addEventListener("click", () => {
    if (logik.throwCount > 0) {
      score.disabled = true;
      resetTurn();
      updateSum();
      updateBonus();
      updateTotal();
      winCount++;
    }
    let total = document.getElementsByClassName("total")
    if(winCount == 15){
      alert("The game is over you got: " + total[0].value + " Points!")
      location.reload();
    }
  });
});

function updateResults() {
  results = logik.getResults();
  let temp = document.getElementsByClassName("score1");
  for (let i = 0; i < temp.length; i++) {
    if (!temp[i].disabled == true) {
      temp[i].value = results[i];
    }
  }
}

function resetTurn() {
  //Resetter hold så alle er false
  for (let i = 0; i < logik.holds.length; i++) {
    logik.holds[i] = false;
  }
  logik.resetThrowCount();
  let rollCount = document.getElementById("rollCount");
  rollCount.innerHTML = logik.throwCount;
  btnRoll.disabled = false;
  let terninger = document.querySelectorAll(".terning");
  terninger.forEach((terning) => {
    terning.classList.remove("locked");
  });
}

function updateTotal() {
  let total = document.getElementsByClassName("total");
  let temp = document.getElementsByClassName("score1");
  let result = 0;

  for (let i = 0; i < temp.length; i++) {
    if (temp[i].disabled) {
      result += Number(temp[i].value);
    }
  }
  let bonus = document.getElementsByClassName("bonus");
  result += Number(bonus[0].value)
  total[0].value = result;
}

function updateSum() {
  let sum = document.getElementsByClassName("sum");
  let temp = document.getElementsByClassName("score1");
  let result = 0;

  for (let i = 0; i < 6; i++) {
    if (temp[i].disabled) {
      result += Number(temp[i].value);
    }
  }
  sum[0].value = result;
}

function updateBonus() {
  let sum = document.getElementsByClassName("sum");
  if (sum[0].value >= 60) {
    let bonus = document.getElementsByClassName("bonus");
    bonus[0].value = 50;
  }
}
