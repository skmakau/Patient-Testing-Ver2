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
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.status === 'success') {
            alert('Thank you for your ratings!');
            window.close();
        } else {
            throw new Error('Submission failed: ' + data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('There was an error submitting your ratings. Please try again.');
    });
});

