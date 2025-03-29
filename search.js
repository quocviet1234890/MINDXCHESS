const titles = ['GM', 'WGM', 'IM', 'WIM', 'FM', 'WFM', 'NM', 'WNM', 'CM', 'WCM'];
let allPlayers = [];

async function loadAllPlayers() {
    const fetchPromises = titles.map(title => 
        fetch(`https://api.chess.com/pub/titled/${title}`)
            .then(response => response.json())
            .then(data => data.players.map(username => ({ username, title })))
    );
    const results = await Promise.all(fetchPromises);
    allPlayers = results.flat();
}

function displaySearchResults(query) {
    const searchResults = document.getElementById('search-results');
    searchResults.innerHTML = '';
    searchResults.classList.add('active');

    const filteredPlayers = allPlayers.filter(player => 
        player.username.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10); // Giới hạn 10 kết quả

    if (filteredPlayers.length === 0) {
        searchResults.innerHTML = '<p>No players found.</p>';
        return;
    }

    filteredPlayers.forEach(player => {
        fetch(`https://api.chess.com/pub/player/${player.username}`)
            .then(response => response.json())
            .then(data => {
                const div = document.createElement('div');
                div.classList.add('search-result-item');
                div.innerHTML = `
                    <img src="${data.avatar || 'https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png'}" alt="Avatar" class="search-result-avatar">
                    <span class="search-result-username">${player.username}</span>
                    <span class="search-result-title">${player.title}</span>
                `;
                div.addEventListener('click', () => {
                    window.location.href = `profile.html?username=${player.username}`;
                });
                searchResults.appendChild(div);
            });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadAllPlayers();

    const searchInput = document.getElementById('search-player');
    const searchResults = document.getElementById('search-results');

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim();
        if (query.length >= 2) {
            displaySearchResults(query);
        } else {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
        }
    });

    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
        }
    });
});