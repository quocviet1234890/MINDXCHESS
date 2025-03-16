const tableBody = document.querySelector('#leaderboard-table tbody');
const viewFullBtn = document.getElementById('view-full-btn');
const categoryItems = document.querySelectorAll('.category-item');
const categoryTitle = document.querySelector('#leaderboard-table .category-title th');
let isFullView = false;
let currentCategory = 'live_blitz';

function loadLeaderboard(category, limit) {
    fetch('https://api.chess.com/pub/leaderboards')
        .then(response => response.json())
        .then(data => {
            const categoryData = data[category] || [];
            const slicedData = categoryData.slice(0, limit);
            tableBody.innerHTML = '';
            slicedData.forEach(player => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="rank">${player.rank}</td>
                    <td class="name">
                        <div class="player-name">
                            ${player.avatar ? `<img src="${player.avatar}" alt="Avatar" class="player-avatar">` : ''}
                            <span>${player.username}</span>
                        </div>
                    </td>
                    <td class="rating">${player.score}</td>
                `;
                tableBody.appendChild(row);
            });
            const categoryName = category.replace('live_', '').replace('daily_', '').replace('tactics', 'Puzzle').replace('rush', 'Puzzle Rush').replace('battle', 'Puzzle Battle').replace('3check', '3 Check').replace('kingofthehill', 'King of the Hill');
            categoryTitle.textContent = `${categoryName.charAt(0).toUpperCase() + categoryName.slice(1)} Leaderboard`;
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
}

loadLeaderboard(currentCategory, 10);

categoryItems.forEach(item => {
    item.addEventListener('click', function() {
        categoryItems.forEach(i => i.classList.remove('active'));
        this.classList.add('active');
        currentCategory = this.getAttribute('data-type');
        isFullView = false;
        viewFullBtn.textContent = 'View Full Leaderboard';
        loadLeaderboard(currentCategory, 10);
    });
});

viewFullBtn.addEventListener('click', function() {
    if (!isFullView) {
        loadLeaderboard(currentCategory, 50);
        viewFullBtn.textContent = 'View Top 10';
        isFullView = true;
    } else {
        loadLeaderboard(currentCategory, 10);
        viewFullBtn.textContent = 'View Full Leaderboard';
        isFullView = false;
    }
});