// Constants
const SLAVE_COST = 15;
const SUPER_SLAVE_COST = 200; // Ajustado para hacerlo más atractivo
const SLAVE_INTERVAL = 3000;
const SUPER_SLAVE_INTERVAL = 4000;
const SUPER_SLAVE_VALUE = 80; // Ajustado para hacerlo más rentable
const MAX_VISIBLE_SLAVES = 10;

const MEGA_SLAVE_COST = 500; // Ajustado para hacerlo más atractivo
const MEGA_SLAVE_INTERVAL = 5000;
const MEGA_SLAVE_VALUE = 150; // Ajustado para hacerlo más rentable
const MAX_VISIBLE_MEGA_SLAVES = 5;

// Variables
let score = 0;
let slaves = 0;
let superSlaves = 0;
let megaSlaves = 0;
let slaveTimer;
let superSlaveTimer;
let megaSlaveTimer;

// Event listeners and game initialization
function initializeGame() {
  document.getElementById("click-box").addEventListener("click", clickSquare);
  document.getElementById("buy-button").addEventListener("click", buySlave);
  document.getElementById("buy-super-button").addEventListener("click", buySuperSlave);
  document.getElementById("buy-mega-button").addEventListener("click", buyMegaSlave);
}

// Main game functions
function clickSquare() {
  score++;
  updateScore();
}

function buySlave() {
  if (score >= SLAVE_COST) {
    slaves++;
    score -= SLAVE_COST;
    updateScore();
  }
}

function buySuperSlave() {
  if (score >= SUPER_SLAVE_COST) {
    superSlaves++;
    score -= SUPER_SLAVE_COST;
    updateScore();
  }
}

function buyMegaSlave() {
  if (score >= MEGA_SLAVE_COST) {
    megaSlaves++;
    score -= MEGA_SLAVE_COST;
    updateScore();
  }
}

function updateScore() {
  document.getElementById("score").innerText = score;
  document.getElementById("slaves").innerText = slaves;
  document.getElementById("super-slaves").innerText = superSlaves;
  document.getElementById("mega-slaves").innerText = megaSlaves;

  updateSlaveContainer(slaves, ".slave-container", "slave");
  updateSlaveContainer(superSlaves, ".super-slave-container", "super-slave");
  updateMegaSlaveContainer(megaSlaves);
}

function updateSlaveContainer(slaveCount, containerSelector, slaveType) {
  const container = document.querySelector(containerSelector);
  container.innerHTML = "";

  const visibleCount = Math.min(slaveCount, MAX_VISIBLE_SLAVES);

  for (let i = 0; i < visibleCount; i++) {
    createSlaveElement(container, slaveType);
  }

  if (slaveCount > MAX_VISIBLE_SLAVES) {
    const indicator = document.createElement("span");
    indicator.innerText = ` (+${slaveCount - MAX_VISIBLE_SLAVES})`;
    container.appendChild(indicator);
  }

  startSlaveTimers();
}

function updateMegaSlaveContainer(megaSlaveCount) {
  const container = document.querySelector(".mega-slave-container");
  container.innerHTML = "";

  const visibleCount = Math.min(megaSlaveCount, MAX_VISIBLE_MEGA_SLAVES);

  for (let i = 0; i < visibleCount; i++) {
    createSlaveElement(container, "mega-slave");
  }

  if (megaSlaveCount > MAX_VISIBLE_MEGA_SLAVES) {
    const indicator = document.createElement("span");
    indicator.innerText = ` (+${megaSlaveCount - MAX_VISIBLE_MEGA_SLAVES})`;
    container.appendChild(indicator);
  }

  startMegaSlaveTimer();
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
    }, SLAVE_INTERVAL);
  }

  if (!superSlaveTimer) {
    superSlaveTimer = setInterval(function () {
      score += superSlaves * SUPER_SLAVE_VALUE;
      updateScore();
    }, SUPER_SLAVE_INTERVAL);
  }
}

function startMegaSlaveTimer() {
  if (!megaSlaveTimer) {
    megaSlaveTimer = setInterval(function () {
      score += megaSlaves * MEGA_SLAVE_VALUE;
      updateScore();
    }, MEGA_SLAVE_INTERVAL);
  }
}

// Initialize the game
initializeGame();
