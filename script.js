document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch('https://script.google.com/macros/s/AKfycbzIZ0gq2g3VAgHB0aah22l0-eWsWs8p7-tbRN6eg7nWE2uzOIN1lj05NyriOqBsZs5x/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        return response.json().then(data => ({
            status: response.status,
            statusText: response.statusText,
            data
        }));
    })
    .then(result => {
        if (result.status === 200 && result.data.status === 'success') {
            alert('Thank you for your ratings!');
            window.close();
        } else {
            throw new Error('Submission failed: ' + result.data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting your ratings. Please try again.');
    });
});



