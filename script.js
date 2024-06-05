document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Check if all required fields are filled
    const requiredFields = document.querySelectorAll('input[required]');
    let allFieldsFilled = true;
    requiredFields.forEach(field => {
        if (!field.checked) {
            allFieldsFilled = false;
        }
    });

    if (!allFieldsFilled) {
        alert('Please fill out all ratings before submitting.');
        return;
    }

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
    .then(response => response.json())
    .then(data => {
        alert('Thank you for your ratings!');
        window.close();
    })
    .catch((error) => {
        console.error('Submission error:', error);
        alert('Thank you for your ratings!');
        window.close();
    });
});

