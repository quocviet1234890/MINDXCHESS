document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const emailOrUsername = document.getElementById('login-username').value.trim();
  const password = document.getElementById('login-password').value;

  if (!emailOrUsername || !password) {
    showError('Vui lòng nhập đầy đủ thông tin!');
    return;
  }

  auth.signInWithEmailAndPassword(emailOrUsername, password)
    .then(userCredential => {
      showSuccess();
      setTimeout(() => {
        window.location.href = 'index.html';
      }, 1500);
    })
    .catch(error => {
      showError(error.message || 'Đăng nhập thất bại!');
    });
});

function showError(message) {
  const errorBox = document.getElementById('login-error');
  errorBox.style.display = 'block';
  errorBox.querySelector('p').textContent = message;

  const successBox = document.getElementById('login-notification');
  successBox.style.display = 'none';
}

function showSuccess() {
  const successBox = document.getElementById('login-notification');
  successBox.style.display = 'block';

  const errorBox = document.getElementById('login-error');
  errorBox.style.display = 'none';
}
