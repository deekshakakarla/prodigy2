let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval = null;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const start = document.getElementById('start');
const pause = document.getElementById('pause');
const reset= document.getElementById('reset');
const lap = document.getElementById('lap'); // New Lap Button
const lapsList = document.getElementById('laps'); // Lap list element

// Start the stopwatch
start.addEventListener('click', function() {
    if (!running) {
        startTime = Date.now() - difference;
        interval = setInterval(updateTime, 1000);
        running = true;
    }
});

// Pause the stopwatch
pause.addEventListener('click', function() {
    if (running) {
        clearInterval(interval);
        difference = Date.now() - startTime;
        running = false;
    }
});

// Reset the stopwatch and laps
reset.addEventListener('click', function() {
    clearInterval(interval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00";
    lapsList.innerHTML = ""; // Clear laps list
    lapCount = 0; // Reset lap counter
});

// Record a lap
lap.addEventListener('click', function() {
    if (running) {
        lapCount++;
        const lapTime = display.textContent;
        const lapItem = document.createElement('li');
        lapItem.textContent =`Lap ${lapCount}: ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
});

// Update the display with the current time
function updateTime() {
    updatedTime = Date.now() - startTime;

    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((updatedTime / 1000) % 60);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;
}