import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD2MSTcDGHiom_SdRgjQuAkoLmeWCtjywg",
    authDomain: "mindx-a8b1a.firebaseapp.com",
    projectId: "mindx-a8b1a",
    storageBucket: "mindx-a8b1a.firebasestorage.app",
    messagingSenderId: "374588426457",
    appId: "1:374588426457:web:7693a5f3fb3fca8f5116c8",
    measurementId: "G-H0H95FFWWF"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };