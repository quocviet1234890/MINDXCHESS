import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { auth } from "./firebase-config.js";

const form = document.getElementById("login-form");
const errorNotification = document.getElementById("login-error");
const successNotification = document.getElementById("login-notification");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Đăng nhập thành công:", user.email);

            successNotification.style.display = "block";
            errorNotification.style.display = "none";

            window.location.href = "index.html";
        })
        .catch((error) => {
            console.error("Lỗi đăng nhập:", error.message);

            successNotification.style.display = "none";
            errorNotification.style.display = "block";
        });
});
