// Timer
const display = document.getElementById('display');
const startTimerBtn = document.getElementById('startTimer');
const resetTimerBtn = document.getElementById('resetTimer'); // Renamed for clarity
const pauseTimerBtn = document.getElementById('pauseTimer');
let timer;
let isPaused = false;
let isWorkTime = true; // flag to track if it's work time or break time
let timeLeft = 25 * 60;

startTimerBtn.addEventListener('click', function() {
    if (!timer || isPaused) {
        isPaused = false;
        clearInterval(timer);
        startTimer();
    }
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

resetTimerBtn.addEventListener('click', function() {
    clearInterval(timer);
    isPaused = false;
    // reset to the start of the current phase
    timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
    updateDisplay(timeLeft);
    isWorkTime = true; // pptional: Reset to work time if desired
});

function startTimer() {
    timer = setInterval(function() {
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        updateDisplay(timeLeft);
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            isWorkTime = !isWorkTime;
            timeLeft = isWorkTime ? 25 * 60 : 5 * 60;
            startTimer();
        }
    }, 1000);
}

function updateDisplay(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    display.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// note-taking
const noteArea = document.getElementById('noteArea');
const saveNoteBtn = document.getElementById('saveNote');

saveNoteBtn.addEventListener('click', function() {
    localStorage.setItem('note', noteArea.value);
});

// load saved note
noteArea.value = localStorage.getItem('note') || '';

let flashcards = [];
const questionInput = document.getElementById('questionInput');
const answerInput = document.getElementById('answerInput');
const addFlashcardBtn = document.getElementById('addFlashcard');
const flashcardDisplay = document.getElementById('flashcardDisplay');
const nextFlashcardBtn = document.getElementById('nextFlashcard');
let currentFlashcardIndex = 0;

addFlashcardBtn.addEventListener('click', function() {
    addFlashcard(questionInput.value, answerInput.value);
    questionInput.value = '';
    answerInput.value = '';
});

nextFlashcardBtn.addEventListener('click', function() {
    showNextFlashcard();
});

function addFlashcard(question, answer) {
    flashcards.push({ question, answer });
}

function showNextFlashcard() {
    if (flashcards.length > 0) {
        if (currentFlashcardIndex >= flashcards.length) {
            currentFlashcardIndex = 0;
        }
        flashcardDisplay.textContent = flashcards[currentFlashcardIndex].question;
        currentFlashcardIndex++;
    }
}
