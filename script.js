document.addEventListener("DOMContentLoaded", function () {
    const scheduleButton = document.getElementById("schedule-button");
    const scheduleResult = document.getElementById("schedule-result");
    let requestCount = 0;

    // Define rate limits based on the maximum RPM
    const maxRequests = 3; // Maximum RPM for your specific model
    const requestDelay = 60000 / maxRequests; // Delay between requests in milliseconds

    scheduleButton.addEventListener("click", function () {
        if (requestCount >= maxRequests) {
            console.error('Rate limit reached. Please try again later.');
            return;
        }

        const dueDate = document.getElementById("due-date").value;
        const sleepHours = parseInt(document.getElementById("sleep-hours").value);
        const eveningPlans = document.getElementById("evening-plans").value;

        const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
        const apiKey = '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';
        const inputText = `Given a due date of ${dueDate}, ${sleepHours} hours of sleep, and the following evening plans: ${eveningPlans}, suggest a study schedule.`;

        const requestData = {
            prompt: inputText,
            max_tokens: 50,
        };

        // Compress the request data using TextEncoder
        const textEncoder = new TextEncoder();
        const compressedData = textEncoder.encode(JSON.stringify(requestData));

        // Make a POST request to the API with compressed data
        makeDelayedApiRequest(apiUrl, apiKey, compressedData, (response) => {
            if (response) {
                const generatedSchedule = JSON.parse(response).choices[0].text;
                scheduleResult.innerText = generatedSchedule;
            } else {
                console.error('API Request Error');
            }
        });
    });

    function makeDelayedApiRequest(apiUrl, apiKey, compressedData, callback) {
        setTimeout(() => {
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
                body: compressedData,
            })
            .then(response => {
                requestCount++;
                if (response.status === 200) {
                    return response.json();
                } else {
                    console.error('API Request Error:', response.status);
                    throw new Error('API Request Error');
                }
            })
            .then(responseData => {
                callback(responseData);
            })
            .catch(error => {
                console.error('API Request Error:', error);
                callback(null);
            });
        }, requestCount * requestDelay);
    }
});

