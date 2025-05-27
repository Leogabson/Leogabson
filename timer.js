let initialSeconds = 15 * 60 + 30;
let totalSeconds = initialSeconds;
let interval;

function formatTime(sec) {
  const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
  const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const secs = String(sec % 60).padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
  document.getElementById("countdown").textContent = formatTime(totalSeconds);
}

function startTimer() {
  clearInterval(interval);
  interval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(interval);
      alert("⏰ Time is up!");
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(interval);
}

function resetTimer() {
  clearInterval(interval);
  totalSeconds = initialSeconds;
  updateDisplay();
}

updateDisplay();
