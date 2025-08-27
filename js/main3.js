// ==========================
// Your existing code above...
// ==========================

// ✅ Contact Form submission to Google Apps Script
document.addEventListener("DOMContentLoaded", function () {
  const scriptURL = 'https://script.google.com/macros/s/AKfycby4rdtVYYsInv-4GF6m0UzC4eWUoaIQ8_VDhxN_sIMV2OC4yJ_-MqCoETZUx7i100YN9g/exec';
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      fetch(scriptURL, { method: "POST", body: new FormData(form) })
        .then(response => {
          alert("✅ Form submitted successfully!");
          form.reset(); // Clear form after submit
        })
        .catch(error => {
          alert("❌ Error submitting form: " + error.message);
        });
    });
  }
});
