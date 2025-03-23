function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes().toString().padStart(2, '0');
    var sec = a.getSeconds().toString().padStart(2, '0');
    var time = `${date} ${month} ${year} ${hour}:${min}:${sec}`;
    return time;
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (!username) {
        document.querySelector('.profile-container').innerHTML = '<p>No username provided.</p>';
        return;
    }

    // Lấy thông tin người chơi
    fetch(`https://api.chess.com/pub/player/${username}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('player-username').textContent = data.username || username;
            document.getElementById('player-avatar').src = data.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png';
            document.getElementById('player-location').textContent = data.country ? data.country.split('/').pop() : 'N/A'; // Lấy tên quốc gia từ URL
            document.getElementById('player-last-online').textContent = data.last_online ? timeConverter(data.last_online) : 'N/A';
            document.getElementById('player-joined').textContent = data.joined ? timeConverter(data.joined) : 'N/A';
        })
        .catch(error => {
            console.error('Error fetching player data:', error);
            document.querySelector('.profile-container').innerHTML = '<p>Error loading player data.</p>';
        });

    // Lấy thống kê người chơi
    fetch(`https://api.chess.com/pub/player/${username}/stats`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('blitz-rating').textContent = data.chess_blitz?.last?.rating || '-';
            document.getElementById('blitz-record').textContent = data.chess_blitz?.record ? `${data.chess_blitz.record.win}-${data.chess_blitz.record.loss}-${data.chess_blitz.record.draw}` : '-';
            document.getElementById('rapid-rating').textContent = data.chess_rapid?.last?.rating || '-';
            document.getElementById('rapid-record').textContent = data.chess_rapid?.record ? `${data.chess_rapid.record.win}-${data.chess_rapid.record.loss}-${data.chess_rapid.record.draw}` : '-';
            document.getElementById('bullet-rating').textContent = data.chess_bullet?.last?.rating || '-';
            document.getElementById('bullet-record').textContent = data.chess_bullet?.record ? `${data.chess_bullet.record.win}-${data.chess_bullet.record.loss}-${data.chess_bullet.record.draw}` : '-';
            document.getElementById('puzzle-rating').textContent = data.tactics?.highest?.rating || '-';
        })
        .catch(error => {
            console.error('Error fetching stats data:', error);
        });
});