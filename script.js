// Timer
const display = document.getElementById('display');
const startTimerBtn = document.getElementById('startTimer');
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
// ... (rest of your code)

// Study Bot with ChatGPT API Integration
const queryInput = document.getElementById('query');
const askBotBtn = document.getElementById('askBot');
const botResponse = document.getElementById('botResponse');

askBotBtn.addEventListener('click', function() {
    const query = queryInput.value;

    // make an API call to get the response from ChatGPT
    fetch("https://api.openai.com/v1/engines/davinci/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer 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
", //
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            prompt: query,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        botResponse.textContent = data.choices[0].text.trim();
    })
    .catch(error => {
        console.error("Error:", error);
        botResponse.textContent = "Sorry, there was an error.";
    });
});


askBotBtn.addEventListener('click', function() {
    // for now, just echo back the question
    botResponse.textContent = `You asked: ${queryInput.value}`;
});
