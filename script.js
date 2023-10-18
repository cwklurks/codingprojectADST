// Timer
const startTimerButton = document.getElementById('start-timer');
const timer = document.getElementById('timer');

let time = null;

startTimerButton.addEventListener('click', () => {
    if (time === null) {
        time = new Date().getTime() + (25 * 60 * 1000);
    }

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = time - now;

        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / (1000));

        timer.innerHTML = `${minutes}m ${seconds}s`;

        if (distance <= 0) {
            clearInterval(interval);
            time = null;
            timer.innerHTML = 'Time is up!';
        }
    }, 1000);
});

// Notes
const noteForm = document.getElementById('note-form');
const notesList = document.getElementById('notes-list');

noteForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const noteInput = document.getElementById('note');
    const noteValue = noteInput.value;

    if (noteValue !== '') {
        localStorage.setItem(`note-${new Date().getTime()}`, noteValue);
        noteInput.value = '';
        displayNotes();
    }
});

function displayNotes() {
    notesList.innerHTML = '';

    for (let i = localStorage.length -1; i >=0; i--) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        notesList.innerHTML += `<div>${value}</div>`;
    }
}

displayNotes();

// Study Bot
const botForm = document.getElementById('bot-form');
const botResponse = document.getElementById('bot-response');

botForm.addEventListener('
