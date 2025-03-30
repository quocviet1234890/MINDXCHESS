document.addEventListener('DOMContentLoaded', () => {
    // Lấy username từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    // Kiểm tra nếu không có username
    if (!username) {
        console.error('No username provided in URL');
        document.getElementById('player-username').textContent = 'Error: No username provided';
        document.getElementById('stats-grid').innerHTML = '<div class="stat-item">Please provide a username</div>';
        return;
    }

    // Hàm định dạng thời gian
    const formatTimestamp = (timestamp) => {
        return timestamp ? new Date(timestamp * 1000).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : 'N/A';
    };

    // Hàm định dạng ngày
    const formatDate = (timestamp) => {
        return timestamp ? new Date(timestamp * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
    };

    // Lấy thông tin người chơi từ Chess.com API
    fetch(`https://api.chess.com/pub/player/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Player not found (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(data => {
            // Điền thông tin cơ bản
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
            document.getElementById('player-location').textContent = 'N/A';
            document.getElementById('player-joined').textContent = 'N/A';
            document.getElementById('player-last-online').textContent = 'N/A';
            document.getElementById('player-followers').textContent = 'N/A';
            document.getElementById('player-following').textContent = 'N/A';
        });

    // Lấy thống kê của người chơi
    fetch(`https://api.chess.com/pub/player/${username}/stats`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Stats not found (Status: ${response.status})`);
            }
            return response.json();
        })
        .then(stats => {
            const statsGrid = document.getElementById('stats-grid');
            statsGrid.innerHTML = ''; // Xóa nội dung cũ

            // Danh sách thống kê
            const statItems = [
                { 
                    label: 'Blitz Rating', 
                    value: stats.chess_blitz?.last?.rating || '-', 
                    record: stats.chess_blitz?.record ? `${stats.chess_blitz.record.win}-${stats.chess_blitz.record.loss}-${stats.chess_blitz.record.draw}` : 'N/A' 
                },
                { 
                    label: 'Rapid Rating', 
                    value: stats.chess_rapid?.last?.rating || '-', 
                    record: stats.chess_rapid?.record ? `${stats.chess_rapid.record.win}-${stats.chess_rapid.record.loss}-${stats.chess_rapid.record.draw}` : 'N/A' 
                },
                { 
                    label: 'Bullet Rating', 
                    value: stats.chess_bullet?.last?.rating || '-', 
                    record: stats.chess_bullet?.record ? `${stats.chess_bullet.record.win}-${stats.chess_bullet.record.loss}-${stats.chess_bullet.record.draw}` : 'N/A' 
                },
                { 
                    label: 'Daily Rating', 
                    value: stats.chess_daily?.last?.rating || '-', 
                    record: stats.chess_daily?.record ? `${stats.chess_daily.record.win}-${stats.chess_daily.record.loss}-${stats.chess_daily.record.draw}` : 'N/A' 
                },
                { 
                    label: 'Puzzle Rating', 
                    value: stats.tactics?.highest?.rating || '-', 
                    record: stats.tactics?.highest?.date ? formatDate(stats.tactics.highest.date) : '' 
                },
            ];

            // Hiển thị từng mục thống kê
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
            const statsGrid = document.getElementById('stats-grid');
            statsGrid.innerHTML = '<div class="stat-item">No stats available</div>';
        });

    // Xử lý nút "Add Friend"
    document.getElementById('add-friend-btn').addEventListener('click', () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Please log in to add friends!');
            window.location.href = 'login.html';
        } else {
            alert(`Friend request sent to ${username}! (This is a placeholder)`);
            // TODO: Thêm logic thực tế để gửi yêu cầu kết bạn nếu có backend
        }
    });

    // Xử lý nút "Message"
    document.getElementById('message-btn').addEventListener('click', () => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            alert('Please log in to send messages!');
            window.location.href = 'login.html';
        } else {
            alert(`Opening message to ${username}! (This is a placeholder)`);
            // TODO: Thêm logic mở chat nếu có hệ thống chat
        }
    });
});