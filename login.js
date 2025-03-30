// Lắng nghe sự kiện "submit" trên biểu mẫu đăng nhập có id="login-form"
document.getElementById("login-form").addEventListener("submit", function(event) {
    // Ngăn hành vi mặc định của biểu mẫu (tránh gửi form và tải lại trang)
    event.preventDefault();

    // Lấy giá trị từ ô nhập tên người dùng (id="login-username"), loại bỏ khoảng trắng đầu/cuối
    const username = document.getElementById("login-username").value.trim();
    // Lấy giá trị từ ô nhập mật khẩu (id="login-password"), loại bỏ khoảng trắng đầu/cuối
    const password = document.getElementById("login-password").value.trim();

    // Lấy thông tin người dùng từ localStorage dựa trên tên người dùng (key là username)
    const storedUser = localStorage.getItem(username);

    // Kiểm tra xem người dùng có tồn tại trong localStorage không
    if (storedUser) {
        // Chuyển đổi chuỗi JSON từ localStorage thành đối tượng JavaScript
        const userData = JSON.parse(storedUser);

        // So sánh mật khẩu nhập vào với mật khẩu lưu trong userData
        if (userData.password === password) {
            // Nếu mật khẩu đúng, lưu tên người dùng vào localStorage với key 'loggedInUser'
            localStorage.setItem('loggedInUser', username);
            // Hiển thị thông báo đăng nhập thành công (id="login-notification")
            document.getElementById("login-notification").style.display = "block";
            // Đặt thời gian chờ 2 giây (2000ms) trước khi chuyển hướng về trang chủ
            setTimeout(() => {
                window.location.href = "index.html";
            }, 2000);
        } else {
            // Nếu mật khẩu sai, hiển thị thông báo lỗi (id="login-error")
            document.getElementById("login-error").style.display = "block";
            // Cập nhật nội dung thông báo lỗi là "Mật khẩu không đúng!"
            document.getElementById("login-error-message").innerText = "Mật khẩu không đúng!";
        }
    } else {
        // Nếu không tìm thấy người dùng trong localStorage, hiển thị thông báo lỗi
        document.getElementById("login-error").style.display = "block";
        // Cập nhật nội dung thông báo lỗi là "Tên người dùng không tồn tại!"
        document.getElementById("login-error-message").innerText = "Tên người dùng không tồn tại!";
    }
});