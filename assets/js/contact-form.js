// Gyanu Notes — contact form submission via Web3Forms

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('contact-submit');
  var msg = document.getElementById('form-message');

  if (!form) return;

  function showMessage(text, type) {
    msg.textContent = text;
    msg.className = 'form-message ' + type;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var accessKey = form.querySelector('input[name="access_key"]').value;
    if (!accessKey || accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY') {
      showMessage('Contact form is not fully set up yet — missing Web3Forms access key.', 'error');
      return;
    }

    var formData = new FormData(form);
    var payload = Object.fromEntries(formData.entries());

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          showMessage("Message sent! We'll get back to you soon.", 'success');
          form.reset();
        } else {
          showMessage('Something went wrong sending your message. Please try again.', 'error');
        }
      })
      .catch(function () {
        showMessage('Something went wrong sending your message. Please try again.', 'error');
      })
      .finally(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send message';
      });
  });
});