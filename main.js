// Lấy các phần tử DOM cần thiết
const categoryItems = document.querySelectorAll('.category-item');
const leaderboardTable = document.getElementById('leaderboard-table');
const tbody = leaderboardTable.querySelector('tbody');
const categoryTitle = leaderboardTable.querySelector('.category-title th');

// API endpoint
const API_URL = 'https://api.chess.com/pub/leaderboards';

// Hàm lấy dữ liệu từ API và hiển thị
async function fetchLeaderboard(category) {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Lấy dữ liệu từ category tương ứng (ví dụ: live_blitz, live_bullet, v.v.)
        const players = data[category] || [];
        
        // Xóa dữ liệu cũ trong bảng
        tbody.innerHTML = '';

        // Cập nhật tiêu đề bảng
        categoryTitle.textContent = `${category.replace('live_', '').replace('daily_', '').replace('_', ' ').toUpperCase()} Leaderboard`;

        // Hiển thị tối đa 10 người chơi (giống chess.com)
        players.slice(0, 10).forEach((player, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="rank">${index + 1}</td>
                <td class="name">
                    <div class="player-name">
                        <img src="${player.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png'}" alt="Avatar" class="player-avatar">
                        ${player.username}
                    </div>
                </td>
                <td class="rating">${player.score}</td>
                <td class="won">${player.win_count}</td>
                <td class="draw">${player.draw_count}</td>
                <td class="lost">${player.loss_count}</td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        tbody.innerHTML = '<tr><td colspan="6">Error loading leaderboard</td></tr>';
    }
}

// Xử lý sự kiện khi chọn category
categoryItems.forEach(item => {
    item.addEventListener('click', () => {
        // Xóa class 'active' khỏi tất cả các item
        categoryItems.forEach(i => i.classList.remove('active'));
        // Thêm class 'active' cho item được chọn
        item.classList.add('active');

        // Lấy loại category từ data-type
        const category = item.getAttribute('data-type');
        fetchLeaderboard(category);
    });
});

// Tải leaderboard mặc định (Blitz) khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    fetchLeaderboard('live_blitz');
});