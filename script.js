// Timer
const display = document.getElementById('display');
const startTimerBtn = document.getElementById('startTimer');
const stopTimerBtn = document.getElementById('stopTimer'); // Added stop button reference
let timer;

startTimerBtn.addEventListener('click', function() {
    let timeLeft = 25 * 60; // 25 minutes in seconds

    clearInterval(timer);
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
});

// Added stop timer functionality
stopTimerBtn.addEventListener('click', function() {
    clearInterval(timer);
    display.textContent = "25:00"; // Reset the display to 25 minutes
});

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
    // for now, just echo back the question
    botResponse.textContent = `You asked: ${queryInput.value}`;
});
