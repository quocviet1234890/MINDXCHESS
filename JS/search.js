document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-player');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    const logo = document.querySelector('.sidebar-logo');

    async function searchPlayers(query) {
        try {
            const response = await fetch(`https://api.chess.com/pub/titled/GM`);
            if (!response.ok) {
                throw new Error('API request failed');
            }
            const gmData = await response.json();
            const gms = gmData.players || [];

            const filteredPlayers = gms.filter(player => player.toLowerCase().includes(query.toLowerCase()));

            searchResults.innerHTML = '';

            if (filteredPlayers.length === 0) {
                searchResults.innerHTML = '<p>No players found.</p>';
            } else {
                filteredPlayers.forEach(player => {
                    const playerDiv = document.createElement('div');
                    playerDiv.classList.add('search-result-item');
                    playerDiv.innerHTML = `
                        <img src="https://www.chess.com/bundles/web/images/noavatar_l.84a92436.png" alt="${player} Avatar" class="search-result-avatar">
                        <span class="search-result-username">${player}</span>
                    `;
                    playerDiv.addEventListener('click', () => {
                        window.location.href = `profile.html?username=${player}`;
                    });
                    searchResults.appendChild(playerDiv);
                });
                searchResults.classList.add('active');
            }
        } catch (error) {
            console.error('Error fetching players:', error);
            searchResults.innerHTML = '<p>Error loading players.</p>';
            searchResults.classList.add('active');
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query) {
                searchPlayers(query);
            }
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const query = searchInput.value.trim();
                if (query) {
                    searchPlayers(query);
                }
            }
        });

        searchInput.addEventListener('input', () => {
            if (!searchInput.value.trim()) {
                searchResults.innerHTML = '';
                searchResults.classList.remove('active');
            }
        });
    }

    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = './index.html';
        });
    }
});