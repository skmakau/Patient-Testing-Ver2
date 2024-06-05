document.getElementById('surveyForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate the form manually to ensure all required fields are filled
    const form = document.getElementById('surveyForm');
    const requiredFields = form.querySelectorAll('input[required]');
    let allFieldsFilled = true;

    requiredFields.forEach(field => {
        if (!field.checked && field.type === 'radio') {
            const name = field.name;
            const radioButtons = form.querySelectorAll(`input[name="${name}"]`);
            const isChecked = Array.from(radioButtons).some(radio => radio.checked);
            if (!isChecked) {
                allFieldsFilled = false;
            }
        } else if (!field.value && field.type !== 'radio') {
            allFieldsFilled = false;
        }
    });

    if (!allFieldsFilled) {
        alert('Please fill out all ratings before submitting.');
        return;
    }

    const formData = new FormData(form);
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

