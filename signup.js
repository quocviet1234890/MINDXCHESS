document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("signup-username").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    // Regex kiểm tra username: ít nhất 1 chữ cái và 1 số, độ dài 3-20 ký tự, cho phép ký tự đặc biệt
    const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]{3,20}$/;

    // Kiểm tra định dạng username
    if (!usernameRegex.test(username)) {
        document.getElementById("signup-error").style.display = "block";
        document.getElementById("signup-error-message").innerText = 
            "Username phải dài 3-20 ký tự, chứa ít nhất 1 chữ cái và 1 số!";
        return;
    }

    // Kiểm tra email cơ bản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById("signup-error").style.display = "block";
        document.getElementById("signup-error-message").innerText = "Email không hợp lệ!";
        return;
    }

    // Kiểm tra password không rỗng
    if (password.length < 6) {
        document.getElementById("signup-error").style.display = "block";
        document.getElementById("signup-error-message").innerText = "Mật khẩu phải dài ít nhất 6 ký tự!";
        return;
    }

    // Kiểm tra username đã tồn tại
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
        document.getElementById("signup-error").style.display = "block";
        document.getElementById("signup-error-message").innerText = "Username đã tồn tại! Vui lòng chọn tên khác.";
        return;
    }

    // Lưu thông tin người dùng
    const userData = { 
        username, 
        email, 
        password,
        avatar: 'https://via.placeholder.com/32' // Avatar mặc định
    };
    localStorage.setItem(username, JSON.stringify(userData));
    localStorage.setItem('loggedInUser', username); // Tự động đăng nhập sau khi đăng ký

    // Hiển thị thông báo thành công
    document.getElementById("signup-success").style.display = "block";
    setTimeout(() => {
        window.location.href = "index.html"; // Chuyển về trang chính sau khi đăng ký
    }, 2000);
});