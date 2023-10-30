// Timer
const display = document.getElementById('display');
const startTimerBtn = document.getElementById('startTimer');
const stopTimerBtn = document.getElementById('stopTimer');
const pauseTimerBtn = document.getElementById('pauseTimer'); // Added pause button reference
let timer;
let isPaused = false; // Flag to track paused state
let timeLeft = 25 * 60; // Move this outside to make it accessible for pause functionality

startTimerBtn.addEventListener('click', function() {
    timeLeft = 25 * 60; // Reset time left on start
    isPaused = false;
    clearInterval(timer); // Clear any existing timer
    startTimer(); // Start the timer
});

pauseTimerBtn.addEventListener('click', function() {
    if (isPaused) {
        startTimer(); // If paused, resume the timer
        isPaused = false;
    } else {
        clearInterval(timer); // If running, pause the timer
        isPaused = true;
    }
});

stopTimerBtn.addEventListener('click', function() {
    clearInterval(timer);
    display.textContent = "25:00";
    timeLeft = 25 * 60; // Reset time left
});

function startTimer() {
    timer = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            alert('Time is up!');
        }
    }, 1000);
}

// Note-taking
const noteArea = document.getElementById('noteArea');
const saveNoteBtn = document.getElementById('saveNote');

saveNoteBtn.addEventListener('click', function() {
    localStorage.setItem('note', noteArea.value);
});

// Load saved note
noteArea.value = localStorage.getItem('note') || '';

// Study Bot (dummy implementation)
const queryInput = document.getElementById('query');
const askBotBtn = document.getElementById('askBot');
const botResponse = document.getElementById('botResponse');

askBotBtn.addEventListener('click', function() {
    botResponse.textContent = `You asked: ${queryInput.value}`;
});
