document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();

    // Lấy thông tin người dùng từ localStorage
    const storedUser = localStorage.getItem(username);

    if (storedUser) {
        const userData = JSON.parse(storedUser);

        if (userData.password === password) {
            localStorage.setItem('loggedInUser', username);
            document.getElementById("login-notification").style.display = "block";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            document.getElementById("login-error").style.display = "block";
            document.getElementById("login-error-message").innerText = "Mật khẩu không đúng!";
        }
    } else {
        document.getElementById("login-error").style.display = "block";
        document.getElementById("login-error-message").innerText = "Tên người dùng không tồn tại!";
    }
});