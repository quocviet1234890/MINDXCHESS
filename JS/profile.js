document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (!username) {
        console.error('No username provided in URL');
        document.getElementById('player-username').textContent = 'Error: No username provided';
        document.getElementById('stats-grid').innerHTML = '<div class="stat-item">Please provide a username</div>';
        return;
    }

    const loggedInUser = localStorage.getItem('loggedInUser');
    const friendRequests = JSON.parse(localStorage.getItem('friendRequests')) || {};

    // Hàm định dạng thời gian
    const formatTimestamp = (timestamp) => timestamp ? new Date(timestamp).toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }) : 'N/A';
    const formatDate = (timestamp) => timestamp ? new Date(timestamp * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

    // Lấy thông tin người chơi từ Chess.com API
    fetch(`https://api.chess.com/pub/player/${username}`)
        .then(response => {
            if (!response.ok) throw new Error(`Player not found (Status: ${response.status})`);
            return response.json();
        })
        .then(data => {
            document.getElementById('player-avatar').src = data.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png';
            document.getElementById('player-username').textContent = data.username || username;
            document.getElementById('player-title').textContent = data.title || '';
            document.getElementById('player-location').textContent = data.location || 'Unknown';
            document.getElementById('player-joined').textContent = formatDate(data.joined);
            document.getElementById('player-last-online').textContent = formatTimestamp(data.last_online);
            document.getElementById('player-followers').textContent = `${data.followers || 0} Followers`;
            document.getElementById('player-following').textContent = `${data.following || 0} Following`;
        })
        .catch(error => {
            console.error('Error fetching player data:', error);
            document.getElementById('player-username').textContent = 'Error: Player not found';
            document.getElementById('player-avatar').src = 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png';
        });

    // Lấy thống kê người chơi
    fetch(`https://api.chess.com/pub/player/${username}/stats`)
        .then(response => {
            if (!response.ok) throw new Error(`Stats not found (Status: ${response.status})`);
            return response.json();
        })
        .then(stats => {
            const statsGrid = document.getElementById('stats-grid');
            statsGrid.innerHTML = '';
            const statItems = [
                { label: 'Blitz Rating', value: stats.chess_blitz?.last?.rating || '-', record: stats.chess_blitz?.record ? `${stats.chess_blitz.record.win}-${stats.chess_blitz.record.loss}-${stats.chess_blitz.record.draw}` : 'N/A' },
                { label: 'Rapid Rating', value: stats.chess_rapid?.last?.rating || '-', record: stats.chess_rapid?.record ? `${stats.chess_rapid.record.win}-${stats.chess_rapid.record.loss}-${stats.chess_rapid.record.draw}` : 'N/A' },
                { label: 'Bullet Rating', value: stats.chess_bullet?.last?.rating || '-', record: stats.chess_bullet?.record ? `${stats.chess_bullet.record.win}-${stats.chess_bullet.record.loss}-${stats.chess_bullet.record.draw}` : 'N/A' },
                { label: 'Daily Rating', value: stats.chess_daily?.last?.rating || '-', record: stats.chess_daily?.record ? `${stats.chess_daily.record.win}-${stats.chess_daily.record.loss}-${stats.chess_daily.record.draw}` : 'N/A' },
                { label: 'Puzzle Rating', value: stats.tactics?.highest?.rating || '-', record: stats.tactics?.highest?.date ? formatDate(stats.tactics.highest.date) : '' },
            ];
            statItems.forEach(item => {
                const statItem = document.createElement('div');
                statItem.classList.add('stat-item');
                statItem.innerHTML = `
                    <div class="stat-label">${item.label}</div>
                    <div class="stat-value">${item.value}</div>
                    ${item.record ? `<div class="stat-record">${item.label === 'Puzzle Rating' ? 'Highest on' : 'Record:'} ${item.record}</div>` : ''}
                `;
                statsGrid.appendChild(statItem);
            });
        })
        .catch(error => {
            console.error('Error fetching stats:', error);
            document.getElementById('stats-grid').innerHTML = '<div class="stat-item">No stats available</div>';
        });

    // Xử lý nút "Add Friend"
    const addFriendBtn = document.getElementById('add-friend-btn');
    const addFriendText = addFriendBtn.querySelector('span');
    if (loggedInUser && friendRequests[loggedInUser]?.includes(username)) {
        addFriendBtn.classList.add('pending');
        addFriendText.textContent = 'Friend Request Sent';
        addFriendBtn.disabled = true;
    }

    addFriendBtn.addEventListener('click', () => {
        if (!loggedInUser) {
            alert('Please log in to add friends!');
            window.location.href = './login.html';
            return;
        }
        if (loggedInUser === username) {
            alert('You cannot add yourself as a friend!');
            return;
        }
        if (!friendRequests[loggedInUser]) friendRequests[loggedInUser] = [];
        if (!friendRequests[loggedInUser].includes(username)) {
            friendRequests[loggedInUser].push(username);
            localStorage.setItem('friendRequests', JSON.stringify(friendRequests));
            addFriendBtn.classList.add('pending');
            addFriendText.textContent = 'Friend Request Sent';
            addFriendBtn.disabled = true;
            alert(`Friend request sent to ${username}!`);
        }
    });

    // Xử lý nút "Message" với chat giống Facebook
    const messageBtn = document.getElementById('message-btn');
    messageBtn.addEventListener('click', () => {
        if (!loggedInUser) {
            alert('Please log in to send messages!');
            window.location.href = './login.html';
            return;
        }

        const chatBox = document.createElement('div');
        chatBox.classList.add('chat-box');
        chatBox.innerHTML = `
            <div class="chat-header">
                <img src="${document.getElementById('player-avatar').src}" alt="Avatar" class="chat-avatar">
                <span>${username}</span>
                <button class="close-chat">×</button>
            </div>
            <div class="chat-messages" id="chat-messages"></div>
            <div class="chat-input">
                <input type="text" id="message-input" placeholder="Aa">
                <button class="emoji-btn">😊</button>
                <button id="send-message">Send</button>
            </div>
            <div class="emoji-picker" style="display: none;">
                <span class="emoji" data-emoji="😊">😊</span>
                <span class="emoji" data-emoji="👍">👍</span>
                <span class="emoji" data-emoji="❤️">❤️</span>
                <span class="emoji" data-emoji="😂">😂</span>
                <span class="emoji" data-emoji="😢">😢</span>
            </div>
        `;
        document.body.appendChild(chatBox);

        const closeChat = chatBox.querySelector('.close-chat');
        const sendMessageBtn = chatBox.querySelector('#send-message');
        const messageInput = chatBox.querySelector('#message-input');
        const chatMessages = chatBox.querySelector('#chat-messages');
        const emojiBtn = chatBox.querySelector('.emoji-btn');
        const emojiPicker = chatBox.querySelector('.emoji-picker');

        // Đóng chat
        closeChat.addEventListener('click', () => chatBox.remove());

        // Mở/đóng emoji picker
        emojiBtn.addEventListener('click', () => {
            emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'flex' : 'none';
        });

        // Chọn emoji
        emojiPicker.querySelectorAll('.emoji').forEach(emoji => {
            emoji.addEventListener('click', () => {
                messageInput.value += emoji.dataset.emoji;
                emojiPicker.style.display = 'none';
            });
        });

        // Gửi tin nhắn
        function sendMessage() {
            const message = messageInput.value.trim();
            if (!message) return;

            const messages = JSON.parse(localStorage.getItem('messages')) || {};
            const chatId = `${loggedInUser}-${username}`;
            if (!messages[chatId]) messages[chatId] = [];
            const msgId = Date.now();
            messages[chatId].push({ sender: loggedInUser, text: message, timestamp: msgId });
            localStorage.setItem('messages', JSON.stringify(messages));

            appendMessage(message, msgId, 'sent');
            messageInput.value = '';
        }

        sendMessageBtn.addEventListener('click', sendMessage);
        messageInput.addEventListener('keypress', (e) => e.key === 'Enter' && sendMessage());

        // Hiển thị tin nhắn
        function appendMessage(text, msgId, type) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', type);
            messageDiv.dataset.msgId = msgId;
            messageDiv.innerHTML = `
                <p>${text}</p>
                <span>${formatTimestamp(msgId)}</span>
                <div class="message-options">
                    <button class="recall-btn">Recall</button>
                </div>
            `;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Thu hồi tin nhắn
            messageDiv.querySelector('.recall-btn').addEventListener('click', () => {
                const messages = JSON.parse(localStorage.getItem('messages')) || {};
                const chatId = `${loggedInUser}-${username}`;
                messages[chatId] = messages[chatId].filter(msg => msg.timestamp !== parseInt(msgId));
                localStorage.setItem('messages', JSON.stringify(messages));
                messageDiv.innerHTML = '<p class="recalled">Message recalled</p>';
            });
        }

        // Tải tin nhắn cũ
        const messages = JSON.parse(localStorage.getItem('messages')) || {};
        const chatId = `${loggedInUser}-${username}`;
        if (messages[chatId]) {
            messages[chatId].forEach(msg => appendMessage(msg.text, msg.timestamp, msg.sender === loggedInUser ? 'sent' : 'received'));
        }
    });
});