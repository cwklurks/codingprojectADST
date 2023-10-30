// Timer
const display = document.getElementById('display');
const startTimerBtn = document.getElementById('startTimer');
const stopTimerBtn = document.getElementById('stopTimer');
const pauseTimerBtn = document.getElementById('pauseTimer');
let timer;
let isPaused = false;
let isWorkTime = true; // Flag to track if it's work time or break time
let timeLeft = 25 * 60;

startTimerBtn.addEventListener('click', function() {
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60; // Set the initial timer based on work/break status
    isPaused = false;
    clearInterval(timer);
    startTimer();
});

pauseTimerBtn.addEventListener('click', function() {
    if (isPaused) {
        startTimer();
        isPaused = false;
    } else {
        clearInterval(timer);
        isPaused = true;
    }
});

stopTimerBtn.addEventListener('click', function() {
    clearInterval(timer);
    display.textContent = "25:00";
    timeLeft = 25 * 60;
    isWorkTime = true; // Reset to work time
});

function startTimer() {
    timer = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            if (isWorkTime) {
                // If it was work time, switch to break time
                isWorkTime = false;
                timeLeft = 5 * 60;
                start


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
    
