// Lấy các phần tử DOM
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

// API leaderboard
const API_URL = 'https://api.chess.com/pub/leaderboards';

let currentPage = 1;
let currentCategory = 'live_blitz';
let playersData = [];
const playersPerPage = 10;

// Hàm hiển thị bảng xếp hạng
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
        tbody.innerHTML = '<tr><td colspan="6">Không hiện data</td></tr>';
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

    // Thêm sự kiện nhấp chuột vào avatar và tên người chơi
    document.querySelectorAll('.player-name, .player-avatar, .player-username').forEach(element => {
        element.addEventListener('click', (e) => {
            const playerNameDiv = e.target.closest('.player-name');
            if (playerNameDiv) {
                const username = playerNameDiv.dataset.username;
                if (username) {
                    window.location.href = `profile.html?username=${username}`;
                } else {
                    console.error('Username not found in data-username attribute');
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
        if (category === 'rush') {
            titleText = 'PUZZLE RUSH';
        } else if (category === 'tactics') {
            titleText = 'PUZZLE';
        } else if (category === 'live_bughouse') {
            titleText = 'DOUBLES';
        } else if (category === 'live_threecheck') {
            titleText = '3 CHECK';
        } else if (category === 'live_crazyhouse') {
            titleText = 'CRAZYHOUSE';
        } else if (category === 'live_kingofthehill') {
            titleText = 'KING OF THE HILL';
        }
        categoryTitle.textContent = `${titleText} Leaderboard`;

        displayLeaderboard();
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        tbody.innerHTML = '<tr><td colspan="6">Error loading leaderboard</td></tr>';
    }
}

// Sự kiện click vào category
if (categoryItems.length > 0) {
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const category = item.getAttribute('data-type');
            loadLeaderboard(category);
        });
    });
}

// Nút phân trang
if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayLeaderboard();
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(playersData.length / playersPerPage) || 1;
        if (currentPage < totalPages) {
            currentPage++;
            displayLeaderboard();
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (playOption) {
        playOption.addEventListener('click', (e) => {
            e.preventDefault();
            playOption.classList.toggle('active');
            if (newsOption) newsOption.classList.remove('active');
            e.stopPropagation();
        });
    }

    if (newsOption) {
        newsOption.addEventListener('click', (e) => {
            e.preventDefault();
            newsOption.classList.toggle('active');
            if (playOption) playOption.classList.remove('active');
            e.stopPropagation();
        });
    }

    document.addEventListener('click', (e) => {
        const subSidebar = document.querySelector('.sub-sidebar');
        const isClickInsidePlay = playOption && playOption.contains(e.target);
        const isClickInsideNews = newsOption && newsOption.contains(e.target);
        const isClickInsideSubSidebar = subSidebar && subSidebar.contains(e.target);

        if (!isClickInsidePlay && !isClickInsideNews && !isClickInsideSubSidebar) {
            if (playOption) playOption.classList.remove('active');
            if (newsOption) newsOption.classList.remove('active');
        }
    });

    const subSidebars = document.querySelectorAll('.sub-sidebar');
    subSidebars.forEach(sub => {
        sub.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    if (leaderboardTable) {
        loadLeaderboard('live_blitz');
    }
});