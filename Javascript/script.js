document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const submitButton = document.getElementById("submitButton");
  const confirmationMessage = document.getElementById("confirmationMessage");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault(); 


    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
      alert("Please fill in all fields.");
      return;
    }


    const formData = new FormData(contactForm);


    fetch('http://localhost:8080/submit-form', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Server is not available or an error occurred.');
        }
      })
      .then(data => {

        confirmationMessage.innerHTML = "Thank you, " + name + "! Your message has been received.";
        confirmationMessage.style.display = "block";
        contactForm.style.display = "none";
      })
      .catch(error => {

        console.error('Error:', error);
        alert('There was an error submitting the form: ' + error.message);
      });
  });
});

function darkmode() {
  const wasDarkmode = localStorage.getItem('darkmode') === 'true';
  localStorage.setItem('darkmode', !wasDarkmode);
  const element = document.body;
  element.classList.toggle('dark-mode', !wasDarkmode);
}

function onload() {
  document.body.classList.toggle('dark-mode', localStorage.getItem('darkmode') === 'true');
}