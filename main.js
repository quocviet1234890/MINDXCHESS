// main.js
const blitzTableBody = document.querySelector('#blitz-leaderboard tbody');
const viewFullBtn = document.getElementById('view-full-btn');
let isFullView = false;

function loadLeaderboard(limit) {
    fetch('https://api.chess.com/pub/leaderboards')
        .then(response => response.json())
        .then(data => {
            const blitzData = data.live_blitz.slice(0, limit); // 10 hoặc 50 người
            blitzTableBody.innerHTML = '';
            blitzData.forEach(player => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td class="rank">${player.rank}</td>
                    <td class="name">
                        <div class="player-name">
                            ${player.avatar ? `<img src="${player.avatar}" alt="Avatar" class="player-avatar">` : ''}
                            <span>${player.username}</span>
                            ${player.title ? `<img src="https://www.chess.com/bundles/web/images/flair/${player.title.toLowerCase()}.svg" alt="${player.title}" class="flair-icon">` : ''}
                        </div>
                    </td>
                    <td class="rating">${player.score}</td>
                `;
                blitzTableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching leaderboard:', error));
}

// Mặc định load 10 người
loadLeaderboard(10);

viewFullBtn.addEventListener('click', function() {
    if (!isFullView) {
        loadLeaderboard(50); // Load 50 người
        viewFullBtn.textContent = 'View Top 10';
        isFullView = true;
    } else {
        loadLeaderboard(10); // Quay lại 10 người
        viewFullBtn.textContent = 'View Full Leaderboard';
        isFullView = false;
    }
});