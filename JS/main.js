const translations = {
    en: {
        play: "Play",
        puzzle: "Puzzle",
        learn: "Learn",
        watch: "Watch",
        news: "News",
        social: "Social",
        more: "More",
        leaderboard: "Leaderboard",
        top_players: "Top Players",
        search_players: "Search Players",
        sign_up: "Sign Up",
        log_in: "Log In",
        log_out: "Log Out",
        language: "Language",
        support: "Support",
        login_title: "Log In to Mindx Chess",
        username_or_email: "Username or Email",
        enter_username_or_email: "Enter username or email",
        password: "Password",
        enter_password: "Enter password",
        forgot_password: "Forgot password?",
        logged_in_success: "Logged in successfully!",
        signup_title: "Create Your Account",
        username: "Username",
        choose_username: "Choose a username",
        email: "Email",
        enter_email: "Enter your email",
        create_password: "Create a password",
        already_have_account: "Already have an account? <a href='login.html' data-i18n='log_in'>Log In</a>",
    },
    vi: {
        play: "Chơi",
        puzzle: "Câu đố",
        learn: "Học",
        watch: "Xem",
        news: "Tin tức",
        social: "Xã hội",
        more: "Thêm",
        leaderboard: "Bảng xếp hạng",
        top_players: "Người chơi hàng đầu",
        search_players: "Tìm kiếm người chơi",
        sign_up: "Đăng ký",
        log_in: "Đăng nhập",
        log_out: "Đăng xuất",
        language: "Ngôn ngữ",
        support: "Hỗ trợ",
        login_title: "Đăng nhập vào Mindx Chess",
        username_or_email: "Tên người dùng hoặc Email",
        enter_username_or_email: "Nhập tên người dùng hoặc email",
        password: "Mật khẩu",
        enter_password: "Nhập mật khẩu",
        forgot_password: "Quên mật khẩu?",
        logged_in_success: "Đăng nhập thành công!",
        signup_title: "Tạo tài khoản của bạn",
        username: "Tên người dùng",
        choose_username: "Chọn tên người dùng",
        email: "Email",
        enter_email: "Nhập email của bạn",
        create_password: "Tạo mật khẩu",
        already_have_account: "Đã có tài khoản? <a href='login.html' data-i18n='log_in'>Đăng nhập</a>",
    },
    es: {
        play: "Jugar",
        puzzle: "Puzle",
        learn: "Aprender",
        watch: "Mirar",
        news: "Noticias",
        social: "Social",
        more: "Más",
        leaderboard: "Clasificación",
        top_players: "Mejores Jugadores",
        search_players: "Buscar Jugadores",
        sign_up: "Registrarse",
        log_in: "Iniciar Sesión",
        log_out: "Cerrar Sesión",
        language: "Idioma",
        support: "Soporte",
        login_title: "Iniciar Sesión en Mindx Chess",
        username_or_email: "Nombre de usuario o Email",
        enter_username_or_email: "Ingresa nombre de usuario o email",
        password: "Contraseña",
        enter_password: "Ingresa contraseña",
        forgot_password: "¿Olvidaste tu contraseña?",
        logged_in_success: "¡Sesión iniciada con éxito!",
        signup_title: "Crea Tu Cuenta",
        username: "Nombre de usuario",
        choose_username: "Elige un nombre de usuario",
        email: "Email",
        enter_email: "Ingresa tu email",
        create_password: "Crea una contraseña",
        already_have_account: "¿Ya tienes una cuenta? <a href='login.html' data-i18n='log_in'>Iniciar Sesión</a>",
    },
    fr: {
        play: "Jouer",
        puzzle: "Puzzle",
        learn: "Apprendre",
        watch: "Regarder",
        news: "Nouvelles",
        social: "Social",
        more: "Plus",
        leaderboard: "Classement",
        top_players: "Meilleurs Joueurs",
        search_players: "Rechercher des Joueurs",
        sign_up: "S'inscrire",
        log_in: "Se Connecter",
        log_out: "Se Déconnecter",
        language: "Langue",
        support: "Support",
        login_title: "Se Connecter à Mindx Chess",
        username_or_email: "Nom d'utilisateur ou Email",
        enter_username_or_email: "Entrez nom d'utilisateur ou email",
        password: "Mot de passe",
        enter_password: "Entrez mot de passe",
        forgot_password: "Mot de passe oublié ?",
        logged_in_success: "Connexion réussie !",
        signup_title: "Créez Votre Compte",
        username: "Nom d'utilisateur",
        choose_username: "Choisissez un nom d'utilisateur",
        email: "Email",
        enter_email: "Entrez votre email",
        create_password: "Créez un mot de passe",
        already_have_account: "Vous avez déjà un compte ? <a href='login.html' data-i18n='log_in'>Se Connecter</a>",
    }
};

let currentLanguage = localStorage.getItem('language') || 'en';

function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            if (element.tagName === 'INPUT' && element.hasAttribute('data-i18n-placeholder')) {
                element.placeholder = translations[lang][element.getAttribute('data-i18n-placeholder')];
            } else if (element.innerHTML.includes('<a')) {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

const categoryItems = document.querySelectorAll('.category-item');
const leaderboardTable = document.getElementById('leaderboard-table');
const tbody = leaderboardTable && leaderboardTable.querySelector('tbody');
const categoryTitle = leaderboardTable && leaderboardTable.querySelector('.category-title th');
const tableHeader = leaderboardTable && leaderboardTable.querySelector('#table-header');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');
const playOption = document.querySelector('.play-option');
const newsOption = document.querySelector('.news-option');
const signupBtn = document.querySelector('.signup-btn');
const loginBtn = document.querySelector('.login-btn');
const logoutBtn = document.querySelector('.logout-btn');
const userInfo = document.getElementById('user-info');
const logoutOption = document.getElementById('logout-option');
const languageOption = document.querySelector('.language-option');

const API_URL = 'https://api.chess.com/pub/leaderboards';

let currentPage = 1;
let currentCategory = 'live_blitz';
let playersData = [];
const playersPerPage = 10;

function displayLeaderboard() {
    if (!leaderboardTable || !tbody || !tableHeader) return;

    const start = (currentPage - 1) * playersPerPage;
    const end = Math.min(start + playersPerPage, playersData.length);
    const playersToShow = playersData.slice(start, end);

    leaderboardTable.setAttribute('data-category', currentCategory);

    if (currentCategory === 'tactics' || currentCategory === 'rush' || currentCategory === 'live_threecheck' || currentCategory === 'live_crazyhouse' || currentCategory === 'live_kingofthehill') {
        tableHeader.innerHTML = `
            <th class="rank">#</th>
            <th class="name">Player</th>
            <th class="rating">Rating</th>
        `;
    } else {
        tableHeader.innerHTML = `
            <th class="rank">#</th>
            <th class="name">Player</th>
            <th class="rating">Rating</th>
            <th class="won">Won</th>
            <th class="draw">Draw</th>
            <th class="lost">Lost</th>
        `;
    }

    tbody.innerHTML = '';

    if (playersData.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">No data available</td></tr>';
    } else {
        playersToShow.forEach((player, index) => {
            const rank = start + index + 1;
            const tr = document.createElement('tr');
            if (currentCategory === 'tactics' || currentCategory === 'rush' || currentCategory === 'live_threecheck' || currentCategory === 'live_crazyhouse' || currentCategory === 'live_kingofthehill') {
                tr.innerHTML = `
                    <td class="rank">${rank}</td>
                    <td class="name">
                        <div class="player-name" data-username="${player.username}">
                            <img src="${player.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png'}" alt="Avatar" class="player-avatar">
                            <span class="player-username">${player.username}</span>
                        </div>
                    </td>
                    <td class="rating">${player.score}</td>
                `;
            } else {
                tr.innerHTML = `
                    <td class="rank">${rank}</td>
                    <td class="name">
                        <div class="player-name" data-username="${player.username}">
                            <img src="${player.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png'}" alt="Avatar" class="player-avatar">
                            <span class="player-username">${player.username}</span>
                        </div>
                    </td>
                    <td class="rating">${player.score}</td>
                    <td class="won">${player.win_count || '-'}</td>
                    <td class="draw">${player.draw_count || '-'}</td>
                    <td class="lost">${player.loss_count || '-'}</td>
                `;
            }
            if (rank === 1) tr.classList.add('rank-1');
            if (rank === 2) tr.classList.add('rank-2');
            if (rank === 3) tr.classList.add('rank-3');
            tbody.appendChild(tr);
        });
    }

    const totalPages = Math.ceil(playersData.length / playersPerPage) || 1;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage <= 1;
    nextBtn.disabled = currentPage >= totalPages;

    document.querySelectorAll('.player-name, .player-avatar, .player-username').forEach(element => {
        element.addEventListener('click', (e) => {
            const playerNameDiv = e.target.closest('.player-name');
            if (playerNameDiv) {
                const username = playerNameDiv.dataset.username;
                if (username) {
                    window.location.href = `./profile.html?username=${username}`;
                }
            }
        });
    });
}

async function loadLeaderboard(category) {
    if (!leaderboardTable) return;

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        playersData = data[category] || [];
        currentCategory = category;
        currentPage = 1;

        let titleText = category.replace('live_', '').replace('daily', 'Daily').replace('_', ' ').toUpperCase();
        if (category === 'rush') titleText = 'PUZZLE RUSH';
        else if (category === 'tactics') titleText = 'PUZZLE';
        else if (category === 'live_bughouse') titleText = 'DOUBLES';
        else if (category === 'live_threecheck') titleText = '3 CHECK';
        else if (category === 'live_crazyhouse') titleText = 'CRAZYHOUSE';
        else if (category === 'live_kingofthehill') titleText = 'KING OF THE HILL';
        categoryTitle.textContent = `${titleText} Leaderboard`;

        displayLeaderboard();
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        tbody.innerHTML = '<tr><td colspan="6">Error loading leaderboard</td></tr>';
    }
}

function initializeSidebar() {
    const signupOption = document.getElementById('signup-option');
    const loginOption = document.getElementById('login-option');
    const logoutOption = document.getElementById('logout-option');
    const userInfo = document.getElementById('user-info');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');

    if (!signupOption || !loginOption || !logoutOption || !userInfo || !userAvatar || !userName) {
        console.error('Sidebar elements missing:', {
            signupOption: !!signupOption,
            loginOption: !!loginOption,
            logoutOption: !!logoutOption,
            userInfo: !!userInfo,
            userAvatar: !!userAvatar,
            userName: !!userName
        });
        return;
    }

    userInfo.style.display = 'none';
    signupOption.style.display = 'block';
    loginOption.style.display = 'block';
    logoutOption.style.display = 'none';
    userAvatar.src = 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png';
    userName.textContent = 'Guest';
}

function updateSidebar() {
    console.log("sc");
    const signupOption = document.getElementById('signup-option');
    const loginOption = document.getElementById('login-option');
    const logoutOption = document.getElementById('logout-option');
    const userInfo = document.getElementById('user-info');
    const userAvatar = document.getElementById('user-avatar');
    const userName = document.getElementById('user-name');

    if (!signupOption || !loginOption || !logoutOption || !userInfo || !userAvatar || !userName) {
        console.error('Sidebar elements missing:', {
            signupOption: !!signupOption,
            loginOption: !!loginOption,
            logoutOption: !!logoutOption,
            userInfo: !!userInfo,
            userAvatar: !!userAvatar,
            userName: !!userName
        });
        return;
    }

    if (!firebase || !firebase.auth) {
        console.error('Firebase is not initialized. Ensure firebase-config.js is loaded correctly.');
        initializeSidebar();
        return;
    }

    firebase.auth().onAuthStateChanged((user) => {
        console.log('Auth state changed:', user ? 'User logged in' : 'No user logged in', user);
        if (user) {
            try {
                userAvatar.src = user.photoURL || 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHBg0NBwgREBAJDQoNCwoKDRUIEQ8KFxEiFhURExMYKCgsGBolGxMTITEhJSk3Oi4uFx8zOD8sNygtLisBCgoKDQ0NDg0NDi0dHxkrKysrKystKysrKysrLS0rKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAM0A0QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgUBBAYDB//EADQQAQACAgECAgcHAwUBAAAAAAABAgMRBAUhMUESIjJRcXKRFUJTYZKisTShwRMzUoHhJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQEBAQAAAAAAAAAAAAAAAAABESH/2gAMAwEAAhEDEQA/APoGLFjw4q0w1itcda1rSsejEVjyTBpkAAAAAAAAAAAAAAAAAAAAAAAAAFABAAAAAAAAAAAAAAAAAAAAAAAAAAUAEAAAAAAAAAAAAAAAAAAAAAAAAABQAQAAAAAAA8QGxg4XJz+xTt/yt6sLHp3Ta1iL543M94pPhC0iIiO0JauKanRrzHr5Ij4R6SU9F7ds/wC3/wBW4auKHL0rkUj1NW/KJ7tK+O+O2r11MeUurePI42LkV1kj4W84NTHMDY5nFtxcup8J71t74a6oAAAAAAAAACgAgAAAAAA3+k8aM2f0rx2p3+Nmg6HpWOMfDr29vvKUjcARoAAABr87jxyMExMd4jdZ/NzUxMT38uzrXOdTxxj5ltR7XeFiVqgKgAAAAAAAKACAAAAAADqcFYrirEeUVhyzq6Tuka90JViQCKAAAAKXrldZaT762j6LpT9en18f5Rf/AAsSqoBUAAAAAAABQAQAAAAAAdNwrxk4tJ99e7mVv0Xkbiccz4d6pVi2ARQAAABRdayelytR9yP3LrLeuPHNreFYmZcxnyWy5bWn707WJUAFQAAAAAAAFABAAAAAABLFkthyRak96ztEB03E5FOTii1Z+aPdL3cvxuRk42T0sc/GPKarvi9RwZ49afRn3W9WEsWVuhExMdhFCfB55c2LDG8l4j4yqOd1OckTXB2jwm3nKjPVuZF5/wBPHPaJ9aY85VgKyAAAAAAAAACgAgAAAAAAPbFxORm/28c/HybVOkcifamI/cauK8Wn2Nf8aPpJ9i3/ABo/SbDFfTkZqexkmPhKc8zlTHfNb6t37Fv+NH6T7Fv+NH6U2HVZa1rT60/VhafYt/xo/SfYt/xo/SuwVYs56NliO2SPp6Lwy9N5WOO1d/L6xpjTEr0vSdXrrXlKIgAAAAAAAKACAAANrgcO3Kyd/Zr7Ug8+LxMvJtqkdvO0+ELrjdNwYe8x6Ux528G1ix0xU9HHGohNLVw1qOwCKAAAAAAAA882HHmrrJTfxVPM6Vakelx53Ed5pPiuhdHJTExPePDxiRe9Q4Fc9ZtjjVo+kqK0TWdTHeO0xKy6yAAAAACgAgAD04+G2fLFax4z3/KrpcGKuHHFaR7MfVXdGwxXHOSY729WPlWe0qxLZtHZtFZ2bY2bBI2js2CWzaOzYJbNo7Ngls2js2DO2do7NgltU9Y4ka/1aR88R/K02jetb0mLR2tFon4LODlh6cnFOHPas/dn9rzVkAAAFABAiNz2Hpxo3npE+dqx/cHQ8ekY8Nax92unojvszuUVkY2xsEhHZsEhHZsEhjZsGRHZsEhHbOwZEdmwSGNsbBU9ax6zVtH362if+lcuOsxE4Kz7p1/ZTrEAAABQAQevE/qsfz0/l5PTi/1NPmr/ACDotm0RFS2bRAS2bRAS2bRAS2bRAS2bRAS2bRAS2bRAS2bRAafV5/8Alj56/wASp1v1b+nj5q/5VCxAAAAXH//Z';
                userName.textContent = user.displayName || user.email.split('@')[0];
                userInfo.style.display = 'flex';
                signupOption.style.display = 'none';
                loginOption.style.display = 'none';
                logoutOption.style.display = 'block';
            } catch (error) {
                console.error('Error updating sidebar:', error);
                initializeSidebar();
            }
        } else {
            console.log("1111")
            userInfo.style.display = 'none';
            signupOption.style.display = 'block';
            loginOption.style.display = 'block';
            logoutOption.style.display = 'none';
            userAvatar.src = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwcHBg0NBwgREBAJDQoNCwoKDRUIEQ8KFxEiFhURExMYKCgsGBolGxMTITEhJSk3Oi4uFx8zOD8sNygtLisBCgoKDQ0NDg0NDi0dHxkrKysrKystKysrKysrLS0rKysrKystKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAM0A0QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgUBBAYDB//EADQQAQACAgECAgcHAwUBAAAAAAABAgMRBAUhMUESIjJRcXKRFUJTYZKisTShwRMzUoHhJP/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABcRAQEBAQAAAAAAAAAAAAAAAAABESH/2gAMAwEAAhEDEQA/APoGLFjw4q0w1itcda1rSsejEVjyTBpkAAAAAAAAAAAAAAAAAAAAAAAAAFABAAAAAAAAAAAAAAAAAAAAAAAAAAUAEAAAAAAAAAAAAAAAAAAAAAAAAABQAQAAAAAAA8QGxg4XJz+xTt/yt6sLHp3Ta1iL543M94pPhC0iIiO0JauKanRrzHr5Ij4R6SU9F7ds/wC3/wBW4auKHL0rkUj1NW/KJ7tK+O+O2r11MeUurePI42LkV1kj4W84NTHMDY5nFtxcup8J71t74a6oAAAAAAAAACgAgAAAAAA3+k8aM2f0rx2p3+Nmg6HpWOMfDr29vvKUjcARoAAABr87jxyMExMd4jdZ/NzUxMT38uzrXOdTxxj5ltR7XeFiVqgKgAAAAAAAKACAAAAAADqcFYrirEeUVhyzq6Tuka90JViQCKAAAAKXrldZaT762j6LpT9en18f5Rf/AAsSqoBUAAAAAAABQAQAAAAAAdNwrxk4tJ99e7mVv0Xkbiccz4d6pVi2ARQAAABRdayelytR9yP3LrLeuPHNreFYmZcxnyWy5bWn707WJUAFQAAAAAAAFABAAAAAABLFkthyRak96ztEB03E5FOTii1Z+aPdL3cvxuRk42T0sc/GPKarvi9RwZ49afRn3W9WEsWVuhExMdhFCfB55c2LDG8l4j4yqOd1OckTXB2jwm3nKjPVuZF5/wBPHPaJ9aY85VgKyAAAAAAAAACgAgAAAAAAPbFxORm/28c/HybVOkcifamI/cauK8Wn2Nf8aPpJ9i3/ABo/SbDFfTkZqexkmPhKc8zlTHfNb6t37Fv+NH6T7Fv+NH6U2HVZa1rT60/VhafYt/xo/SfYt/xo/SuwVYs56NliO2SPp6Lwy9N5WOO1d/L6xpjTEr0vSdXrrXlKIgAAAAAAAKACAAANrgcO3Kyd/Zr7Ug8+LxMvJtqkdvO0+ELrjdNwYe8x6Ux528G1ix0xU9HHGohNLVw1qOwCKAAAAAAAA882HHmrrJTfxVPM6Vakelx53Ed5pPiuhdHJTExPePDxiRe9Q4Fc9ZtjjVo+kqK0TWdTHeO0xKy6yAAAAACgAgAD04+G2fLFax4z3/KrpcGKuHHFaR7MfVXdGwxXHOSY729WPlWe0qxLZtHZtFZ2bY2bBI2js2CWzaOzYJbNo7Ngls2js2DO2do7NgltU9Y4ka/1aR88R/K02jetb0mLR2tFon4LODlh6cnFOHPas/dn9rzVkAAAFABAiNz2Hpxo3npE+dqx/cHQ8ekY8Nax92unojvszuUVkY2xsEhHZsEhHZsEhjZsGRHZsEhHbOwZEdmwSGNsbBU9ax6zVtH362if+lcuOsxE4Kz7p1/ZTrEAAABQAQevE/qsfz0/l5PTi/1NPmr/ACDotm0RFS2bRAS2bRAS2bRAS2bRAS2bRAS2bRAS2bRAS2bRAafV5/8Alj56/wASp1v1b+nj5q/5VCxAAAAXH//Z';
            userName.textContent = 'Guest';
        }
    }, (error) => {
        console.error('Auth state change error:', error);
        initializeSidebar();
    });
}

function showLoginNotification() {
    const notification = document.getElementById('login-notification');
    if (notification) {
        notification.style.display = 'flex';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initializeSidebar();

    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');
    const logo = document.querySelector('#sidebar-logo');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
                sidebar.classList.remove('active');
            }
        });
    }

    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = './index.html';
        });
    }
    
    changeLanguage(currentLanguage);

    if (playOption) {
        playOption.addEventListener('click', (e) => {
            e.preventDefault();
            playOption.classList.toggle('active');
            if (newsOption) newsOption.classList.remove('active');
            if (languageOption) languageOption.classList.remove('active');
            e.stopPropagation();
        });

        const leaderboardLink = document.querySelector('.leaderboard-text');
        if (leaderboardLink) {
            leaderboardLink.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = leaderboardLink.getAttribute('href');
            });
        }
    }

    if (newsOption) {
        newsOption.addEventListener('click', (e) => {
            e.preventDefault();
            newsOption.classList.toggle('active');
            if (playOption) playOption.classList.remove('active');
            if (languageOption) languageOption.classList.remove('active');
            e.stopPropagation();
        });
    }

    if (languageOption) {
        languageOption.addEventListener('click', (e) => {
            e.preventDefault();
            languageOption.classList.toggle('active');
            if (playOption) playOption.classList.remove('active');
            if (newsOption) newsOption.classList.remove('active');
            e.stopPropagation();
        });

        const languageItems = document.querySelectorAll('.language-item');
        languageItems.forEach(item => {
            item.addEventListener('click', (e) => {
                const lang = item.getAttribute('data-lang');
                changeLanguage(lang);
                e.stopPropagation();
            });
        });
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', (e) => {
            window.location.href = './signup.html';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            window.location.href = './login.html';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            console.log('Logout button clicked');
            firebase.auth().signOut().then(() => {
                console.log('User signed out successfully');
                updateSidebar();
                window.location.href = './index.html';
            }).catch(error => {
                console.error('Error signing out:', error);
            });
        });
    }

    document.addEventListener('click', (e) => {
        const subSidebar = document.querySelector('.sub-sidebar');
        const isClickInsidePlay = playOption && playOption.contains(e.target);
        const isClickInsideNews = newsOption && newsOption.contains(e.target);
        const isClickInsideLanguage = languageOption && languageOption.contains(e.target);
        const isClickInsideSubSidebar = subSidebar && subSidebar.contains(e.target);

        if (!isClickInsidePlay && !isClickInsideNews && !isClickInsideLanguage && !isClickInsideSubSidebar) {
            if (playOption) playOption.classList.remove('active');
            if (newsOption) newsOption.classList.remove('active');
            if (languageOption) languageOption.classList.remove('active');
        }
    });

    updateSidebar();

    if (categoryItems.length > 0) {
        categoryItems.forEach(item => {
            item.addEventListener('click', () => {
                categoryItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                const category = item.getAttribute('data-type');
                loadLeaderboard(category);
            });
        });
        loadLeaderboard(currentCategory);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayLeaderboard();
            }
        });

        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(playersData.length / playersPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                displayLeaderboard();
            }
        });
    }
});