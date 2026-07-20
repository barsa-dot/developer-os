/**
 * BARSA OS v2 - Layout Deck Cards Hydration Rendering Pipeline
 */

const UILayoutController = (() => {
    let cardsDeck = null;
    let languageContainer = null;

    const init = () => {
        cardsDeck = document.getElementById('repos-deck');
        languageContainer = document.getElementById('language-bars-container');

        window.addEventListener('populateRepositoryCards', renderCards);
        window.addEventListener('renderLanguageMetrics', renderLanguages);
    };

    const renderCards = (e) => {
        if(!cardsDeck) return;
        cardsDeck.innerHTML = "";
        const repos = e.detail.repos || [];

        repos.forEach((repo, idx) => {
            const card = document.createElement('div');
            card.className = "repo-card card-slide-in";
            card.style.animationDelay = `${idx * 60}ms`;

            card.innerHTML = `
                <div>
                    <div class="card-title">${repo.name}</div>
                    <div class="card-desc">${repo.description || "No public data description compiled inside metadata records."}</div>
                </div>
                <div class="card-stats">
                    <span>★ ${repo.stargazers_count || 0}</span>
                    <span>𐕣 ${repo.forks_count || 0}</span>
                    <span style="color: #33ff33; margin-left: auto;">${repo.language || "Docs"}</span>
                </div>
            `;
            cardsDeck.appendChild(card);
        });
    };

    const renderLanguages = (e) => {
        if(!languageContainer) return;
        languageContainer.innerHTML = "";
        const repos = e.detail.repos || [];
        
        const counts = {};
        repos.forEach(r => { if(r.language) counts[r.language] = (counts[r.language] || 0) + 1; });

        const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;

        Object.keys(counts).forEach(lang => {
            const pct = Math.round((counts[lang] / total) * 100);
            const row = document.createElement('div');
            row.className = "lang-bar-row";
            row.innerHTML = `
                <div style="display:flex; justify-content:space-between;">
                    <span>${lang.toUpperCase()}</span><span>${pct}%</span>
                </div>
                <div class="lang-bar-track">
                    <div class="lang-bar-fill" style="width: ${pct}%"></div>
                </div>
            `;
            languageContainer.appendChild(row);
        });
    };

    document.addEventListener('DOMContentLoaded', init);
})();