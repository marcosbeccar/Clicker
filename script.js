const slaveCost = 15;
const superSlaveCost = 150;
const slaveInterval = 3000;
const superSlaveValue = 5;
const maxVisibleSlaves = 10; // Cantidad máxima de esclavos visibles antes de mostrar el indicador

let score = 0;
let slaves = 0;
let superSlaves = 0;
let slaveTimers = [];
let superSlaveTimers = [];

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
    // Mostrar indicador de cantidad
    const indicator = document.createElement("span");
    indicator.innerText = ` (+${slaveCount - maxVisibleSlaves})`;
    container.appendChild(indicator);
  }

  startSlaveTimers(container, slaveCount, slaveType, visibleCount);
}

function createSlaveElement(container, slaveType) {
  const slaveElement = document.createElement("div");
  slaveElement.className = slaveType;
  container.appendChild(slaveElement);
}

function startSlaveTimers(container, slaveCount, slaveType, visibleCount) {
  const countToStart = Math.min(slaveCount, maxVisibleSlaves);
  const timers = slaveType === "super-slave" ? superSlaveTimers : slaveTimers;

  for (let i = 0; i < countToStart; i++) {
    const slaveElement = container.children[i];
    if (!timers[i]) {
      timers[i] = startSlaveTimer(slaveElement, slaveInterval, slaveType === "super-slave" ? superSlaveValue : 1);
    }
  }
}

function startSlaveTimer(slaveElement, interval, value) {
  return setInterval(function () {
    score += value;
    updateScore();
  }, interval);
}

function initializeGame() {
  document.getElementById("click-box").addEventListener("click", clickSquare);
  document.getElementById("buy-button").addEventListener("click", buySlave);
  document.getElementById("buy-super-button").addEventListener("click", buySuperSlave);
}

initializeGame();
