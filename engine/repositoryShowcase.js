// =========================================
// BARSA OS — Repository Showcase System
// =========================================

class RepositoryShowcase {
    async render(username = "github") {
        const widget = document.getElementById("widget-repos");
        if (!widget) return;

        const repos = await window.githubEngine.getRepos(username) || [
            { name: "reva-campus-tokens", language: "JavaScript", stargazers_count: 4 },
            { name: "vedic-ai-backend", language: "Python", stargazers_count: 12 },
            { name: "barsa-os", language: "JavaScript", stargazers_count: 18 }
        ];

        let html = `<h4 style="color:#FFB852; margin:0 0 8px 0;">> PINNED REPOSITORIES</h4><div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">`;

        repos.slice(0, 4).forEach(repo => {
            html += `
                <div style="border:1px solid #444; background:rgba(255,255,255,0.05); padding:6px; border-radius:3px; font-size:11px;">
                    <div style="color:#FFFF00; font-weight:bold; text-overflow:ellipsis; overflow:hidden;">${repo.name}</div>
                    <div style="display:flex; justify-content:space-between; margin-top:4px; color:#888;">
                        <span>${repo.language || 'Code'}</span>
                        <span>★ ${repo.stargazers_count}</span>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        widget.innerHTML = html;
    }
}

window.repositoryShowcase = new RepositoryShowcase();