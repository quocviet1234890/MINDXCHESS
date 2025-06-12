document.getElementById('signup-btn').addEventListener('click', function () {

  const username = document.getElementById('signup-username').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const password = document.getElementById('signup-password').value;

  if (!username || !email || !password) {
    alert('Vui lòng điền đầy đủ thông tin!');
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      return userCredential.user.updateProfile({
        displayName: username
      });
    })
    .then(() => {

      document.getElementById('signup-success').style.display = 'block';
      document.getElementById('signup-error').style.display = 'none';
      
      setTimeout(() => {
        window.location.href = './login.html';
      }, 2000);
    })
    .catch((error) => {

      document.getElementById('signup-error-message').innerText = error.message;
      document.getElementById('signup-error').style.display = 'block';
      document.getElementById('signup-success').style.display = 'none';
    });
});
