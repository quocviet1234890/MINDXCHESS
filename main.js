// Lấy các phần tử DOM cần thiết
const categoryItems = document.querySelectorAll('.category-item');
const leaderboardTable = document.getElementById('leaderboard-table');
const tbody = leaderboardTable.querySelector('tbody');
const categoryTitle = leaderboardTable.querySelector('.category-title th');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageInfo = document.getElementById('page-info');

// API endpoint
const API_URL = 'https://api.chess.com/pub/leaderboards';

// Biến toàn cục để theo dõi trang hiện tại và dữ liệu
let currentPage = 1;
let currentCategory = 'live_blitz';
let playersData = [];
const playersPerPage = 10;

// Hàm hiển thị dữ liệu cho trang hiện tại
function displayLeaderboard() {
    const start = (currentPage - 1) * playersPerPage;
    const end = start + playersPerPage;
    const playersToShow = playersData.slice(start, end);

    // Xóa dữ liệu cũ trong bảng
    tbody.innerHTML = '';

    // Hiển thị người chơi cho trang hiện tại
    playersToShow.forEach((player, index) => {
        const tr = document.createElement('tr');
        const globalRank = start + index + 1; // Xếp hạng toàn cục
        tr.innerHTML = `
            <td class="rank">${globalRank}</td>
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

    // Cập nhật thông tin trang
    pageInfo.textContent = `Page ${currentPage}`;

    // Cập nhật trạng thái nút
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= playersData.length;
}

// Hàm lấy dữ liệu từ API
async function fetchLeaderboard(category) {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        // Lấy dữ liệu từ category tương ứng
        playersData = data[category] || [];
        currentCategory = category;
        currentPage = 1;

        // Cập nhật tiêu đề bảng
        categoryTitle.textContent = `${category.replace('live_', '').replace('daily_', '').replace('_', ' ').toUpperCase()} Leaderboard`;

        // Hiển thị dữ liệu cho trang đầu tiên
        displayLeaderboard();
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

// Xử lý nút phân trang
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayLeaderboard();
    }
});

nextBtn.addEventListener('click', () => {
    if ((currentPage * playersPerPage) < playersData.length) {
        currentPage++;
        displayLeaderboard();
    }
});

// Tải leaderboard mặc định (Blitz) khi trang được tải
document.addEventListener('DOMContentLoaded', () => {
    fetchLeaderboard('live_blitz');
});