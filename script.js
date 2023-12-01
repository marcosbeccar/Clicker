const slaveCost = 15;
const superSlaveCost = 150;
const slaveInterval = 3000;
const superSlaveInterval = 4000;
const superSlaveValue = 5;
const maxVisibleSlaves = 10;

let score = 0;
let slaves = 0;
let superSlaves = 0;
let slaveTimer;
let superSlaveTimer;

function clickSquare() {
  score++;
  updateScore();
}

function buySlave() {
  if (score >= slaveCost) {
    slaves++;
    score -= slaveCost;
    updateScore();
  }
}

function buySuperSlave() {
  if (score >= superSlaveCost) {
    superSlaves++;
    score -= superSlaveCost;
    updateScore();
  }
}

function updateScore() {
  document.getElementById("score").innerText = score;
  document.getElementById("slaves").innerText = slaves;
  document.getElementById("super-slaves").innerText = superSlaves;

  updateSlaveContainer(slaves, ".slave-container", "slave");
  updateSlaveContainer(superSlaves, ".super-slave-container", "super-slave");
}

function updateSlaveContainer(slaveCount, containerSelector, slaveType) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";

  const visibleCount = Math.min(slaveCount, maxVisibleSlaves);

  for (let i = 0; i < visibleCount; i++) {
    createSlaveElement(container, slaveType);
  }

  if (slaveCount > maxVisibleSlaves) {
    const indicator = document.createElement("span");
    indicator.innerText = ` (+${slaveCount - maxVisibleSlaves})`;
    container.appendChild(indicator);
  }

  startSlaveTimers();
}

function createSlaveElement(container, slaveType) {
  const slaveElement = document.createElement("div");
  slaveElement.className = slaveType;
  container.appendChild(slaveElement);
}

function startSlaveTimers() {
  if (!slaveTimer) {
    slaveTimer = setInterval(function () {
      score += slaves;
      updateScore();
    }, slaveInterval);
  }

  if (!superSlaveTimer) {
    superSlaveTimer = setInterval(function () {
      score += superSlaves * superSlaveValue;
      updateScore();
    }, superSlaveInterval);
  }
}

function initializeGame() {
  document.getElementById("click-box").addEventListener("click", clickSquare);
  document.getElementById("buy-button").addEventListener("click", buySlave);
  document.getElementById("buy-super-button").addEventListener("click", buySuperSlave);
}

initializeGame();
