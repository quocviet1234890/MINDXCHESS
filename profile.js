const translations = {
    en: {
        location_na: "N/A",
        last_online_na: "N/A",
        joined_na: "N/A",
        followers_na: "N/A",
        following_na: "N/A",
        add_friend: "Add Friend",
        message: "Message",
        stats: "Stats",
        blitz: "Blitz",
        rapid: "Rapid",
        bullet: "Bullet",
        tactics: "Tactics",
        win: "Win",
        loss: "Loss",
        draw: "Draw",
        type_message: "Type a message...",
        send: "Send",
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
        active_now: "Active now",
        active: "Active",
        ago: "ago",
        added_friend: "Added",
        as_friend: "as a friend!",
        already_friend: "is already your friend!"
    },
    vi: {
        location_na: "Không có",
        last_online_na: "Không có",
        joined_na: "Không có",
        followers_na: "Không có",
        following_na: "Không có",
        add_friend: "Thêm bạn",
        message: "Tin nhắn",
        stats: "Thống kê",
        blitz: "Cờ chớp",
        rapid: "Cờ nhanh",
        bullet: "Cờ đạn",
        tactics: "Chiến thuật",
        win: "Thắng",
        loss: "Thua",
        draw: "Hòa",
        type_message: "Nhập tin nhắn...",
        send: "Gửi",
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
        active_now: "Đang hoạt động",
        active: "Hoạt động",
        ago: "trước",
        added_friend: "Đã thêm",
        as_friend: "làm bạn!",
        already_friend: "đã là bạn của bạn!"
    },
    es: {
        location_na: "N/A",
        last_online_na: "N/A",
        joined_na: "N/A",
        followers_na: "N/A",
        following_na: "N/A",
        add_friend: "Agregar Amigo",
        message: "Mensaje",
        stats: "Estadísticas",
        blitz: "Blitz",
        rapid: "Rápido",
        bullet: "Bala",
        tactics: "Tácticas",
        win: "Ganar",
        loss: "Perder",
        draw: "Empate",
        type_message: "Escribe un mensaje...",
        send: "Enviar",
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
        active_now: "Activo ahora",
        active: "Activo",
        ago: "hace",
        added_friend: "Añadido",
        as_friend: "como amigo!",
        already_friend: "¡ya es tu amigo!"
    },
    fr: {
        location_na: "N/A",
        last_online_na: "N/A",
        joined_na: "N/A",
        followers_na: "N/A",
        following_na: "N/A",
        add_friend: "Ajouter un Ami",
        message: "Message",
        stats: "Statistiques",
        blitz: "Blitz",
        rapid: "Rapide",
        bullet: "Balle",
        tactics: "Tactiques",
        win: "Gagner",
        loss: "Perdre",
        draw: "Nul",
        type_message: "Tapez un message...",
        send: "Envoyer",
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
        active_now: "Actif maintenant",
        active: "Actif",
        ago: "il y a",
        added_friend: "Ajouté",
        as_friend: "comme ami !",
        already_friend: "est déjà votre ami !"
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
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

function timeConverter(UNIX_timestamp) {
    const a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const year = a.getFullYear();
    const month = months[a.getMonth()];
    const date = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes().toString().padStart(2, '0');
    return `${date} ${month} ${year}, ${hour}:${min}`;
}

function getLastOnlineText(lastOnline) {
    const now = Date.now();
    const diff = now - (lastOnline * 1000);
    if (diff < 5 * 60 * 1000) return translations[currentLanguage]['active_now'];
    const minutes = Math.floor(diff / (60 * 1000));
    if (minutes < 60) return `${translations[currentLanguage]['active']} ${minutes}m ${translations[currentLanguage]['ago']}`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${translations[currentLanguage]['active']} ${hours}h ${translations[currentLanguage]['ago']}`;
    return timeConverter(lastOnline);
}

function updateSidebar() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userInfo = document.getElementById('user-info');
    const signupOption = document.getElementById('signup-option');
    const loginOption = document.getElementById('login-option');
    const logoutOption = document.getElementById('logout-option');

    if (user) {
        document.getElementById('user-avatar').src = user.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png';
        document.getElementById('user-name').textContent = user.username;
        userInfo.style.display = 'flex';
        signupOption.style.display = 'none';
        loginOption.style.display = 'none';
        logoutOption.style.display = 'block';
    } else {
        userInfo.style.display = 'none';
        signupOption.style.display = 'block';
        loginOption.style.display = 'block';
        logoutOption.style.display = 'none';
    }
}

function displayStats(statsData) {
    const statsGrid = document.getElementById('stats-grid');
    statsGrid.innerHTML = '';

    const modes = [
        { key: 'chess_blitz', label: 'blitz' },
        { key: 'chess_rapid', label: 'rapid' },
        { key: 'chess_bullet', label: 'bullet' },
        { key: 'tactics', label: 'tactics' }
    ];

    modes.forEach(mode => {
        const stats = statsData[mode.key];
        if (stats && (stats.last || stats.highest)) {
            const item = document.createElement('div');
            item.classList.add('stat-item');

            const rating = stats.last ? stats.last.rating : '-';
            const record = stats.record || {};

            item.innerHTML = `
                <span class="stat-label" data-i18n="${mode.label}">${translations[currentLanguage][mode.label]}</span>
                <span class="stat-value">${rating}</span>
                <div class="stat-record">
                    <span>${translations[currentLanguage]['win']}: ${record.win || 0}</span>
                    <span>${translations[currentLanguage]['loss']}: ${record.loss || 0}</span>
                    <span>${translations[currentLanguage]['draw']}: ${record.draw || 0}</span>
                </div>
            `;
            statsGrid.appendChild(item);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    changeLanguage(currentLanguage);

    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!username) {
        document.querySelector('.profile-container').innerHTML = '<p>No username provided.</p>';
        return;
    }

    fetch(`https://api.chess.com/pub/player/${username}`)
        .then(response => {
            if (!response.ok) throw new Error('Player not found');
            return response.json();
        })
        .then(data => {
            document.getElementById('player-username').textContent = data.username || username;
            document.getElementById('player-avatar').src = data.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png';
            document.getElementById('player-location').textContent = data.country ? data.country.split('/').pop() : translations[currentLanguage]['location_na'];
            document.getElementById('player-last-online').textContent = data.last_online ? timeConverter(data.last_online) : translations[currentLanguage]['last_online_na'];
            document.getElementById('player-joined').textContent = data.joined ? timeConverter(data.joined) : translations[currentLanguage]['joined_na'];
            document.getElementById('player-followers').textContent = data.followers || translations[currentLanguage]['followers_na'];
            document.getElementById('player-following').textContent = data.following || translations[currentLanguage]['following_na'];
            document.getElementById('player-title').textContent = data.title || '';
            if (data.title) document.getElementById('player-title').classList.add('title-box');

            document.getElementById('chat-username').textContent = data.username || username;
            document.getElementById('chat-avatar').src = data.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png';
            const lastOnline = data.last_online || 0;
            document.getElementById('chat-last-online').textContent = getLastOnlineText(lastOnline);
            const onlineStatus = (Date.now() - (lastOnline * 1000)) < 5 * 60 * 1000;
            document.getElementById('chat-status').classList.toggle('online', onlineStatus);
            document.getElementById('chat-status').classList.toggle('offline', !onlineStatus);
        })
        .catch(error => {
            console.error('Error fetching player data:', error);
            document.querySelector('.profile-container').innerHTML = '<p>Error loading player data.</p>';
        });

    fetch(`https://api.chess.com/pub/player/${username}/stats`)
        .then(response => {
            if (!response.ok) throw new Error('Stats not found');
            return response.json();
        })
        .then(data => {
            displayStats(data);
        })
        .catch(error => {
            console.error('Error fetching stats data:', error);
            document.getElementById('stats-grid').innerHTML = '<p>No stats available.</p>';
        });

    const playOption = document.querySelector('.play-option');
    const newsOption = document.querySelector('.news-option');
    const languageOption = document.querySelector('.language-option');
    const logoutBtn = document.querySelector('.logout-btn');

    if (playOption) {
        playOption.addEventListener('click', (e) => {
            e.preventDefault();
            playOption.classList.toggle('active');
            newsOption?.classList.remove('active');
            languageOption?.classList.remove('active');
            e.stopPropagation();
        });
    }

    if (newsOption) {
        newsOption.addEventListener('click', (e) => {
            e.preventDefault();
            newsOption.classList.toggle('active');
            playOption?.classList.remove('active');
            languageOption?.classList.remove('active');
            e.stopPropagation();
        });
    }

    if (languageOption) {
        languageOption.addEventListener('click', (e) => {
            e.preventDefault();
            languageOption.classList.toggle('active');
            playOption?.classList.remove('active');
            newsOption?.classList.remove('active');
            e.stopPropagation();
        });
    }

    document.addEventListener('click', (e) => {
        const subSidebar = document.querySelector('.sub-sidebar.active');
        if (!subSidebar) return;
        const isClickInside = playOption?.contains(e.target) || newsOption?.contains(e.target) || languageOption?.contains(e.target) || subSidebar.contains(e.target);
        if (!isClickInside) {
            playOption?.classList.remove('active');
            newsOption?.classList.remove('active');
            languageOption?.classList.remove('active');
        }
    });

    document.querySelectorAll('.language-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const lang = item.getAttribute('data-lang');
            changeLanguage(lang);
            languageOption?.classList.remove('active');
            e.stopPropagation();
        });
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('currentUser');
            updateSidebar();
            window.location.href = 'index.html';
        });
    }

    const messageBtn = document.getElementById('message-btn');
    const chatBox = document.getElementById('chat-box');
    const closeChat = document.getElementById('close-chat');
    const minimizeChat = document.getElementById('minimize-chat');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendMessageBtn = document.getElementById('send-message-btn');

    if (messageBtn && chatBox) {
        messageBtn.addEventListener('click', () => {
            if (!currentUser) window.location.href = 'login.html';
            else chatBox.style.display = 'flex';
        });
    }

    if (closeChat && chatBox) {
        closeChat.addEventListener('click', () => chatBox.style.display = 'none');
    }

    if (minimizeChat && chatBox) {
        minimizeChat.addEventListener('click', () => {
            const isMinimized = chatMessages.style.display === 'none';
            chatMessages.style.display = isMinimized ? 'block' : 'none';
            chatBox.style.height = isMinimized ? '400px' : '40px';
            chatBox.querySelector('.chat-input-area').style.display = isMinimized ? 'flex' : 'none';
        });
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('chat-message', 'sent');
            messageElement.innerHTML = `<span>${message}</span>`;
            chatMessages.appendChild(messageElement);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            chatInput.value = '';
        }
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
    }

    if (sendMessageBtn) {
        sendMessageBtn.addEventListener('click', sendMessage);
    }

    const addFriendBtn = document.getElementById('add-friend-btn');
    if (addFriendBtn) {
        addFriendBtn.addEventListener('click', () => {
            if (!currentUser) window.location.href = 'login.html';
            else {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                const userIndex = users.findIndex(u => u.username === currentUser.username);
                if (userIndex === -1) return;
                if (!users[userIndex].friends.includes(username)) {
                    users[userIndex].friends.push(username);
                    localStorage.setItem('users', JSON.stringify(users));
                    localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
                    alert(`${translations[currentLanguage]['added_friend']} ${username} ${translations[currentLanguage]['as_friend']}`);
                } else {
                    alert(`${username} ${translations[currentLanguage]['already_friend']}`);
                }
            }
        });
    }

    updateSidebar();
});