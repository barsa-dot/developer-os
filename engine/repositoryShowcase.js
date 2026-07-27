// =========================================
// BARSA OS — Repository Showcase System
// =========================================

class RepositoryShowcase {
    async render(username = "barsa-dot") {
        const widget = document.getElementById("widget-repos");
        if (!widget) return;

        // Fetch live repositories for barsa-dot
        const repos = await window.githubEngine.getRepos(username);

        let html = `<h4 style="color:#FFB852; margin:0 0 10px 0;">> PINNED REPOSITORIES</h4>`;

        if (repos && repos.length > 0) {
            html += `<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">`;
            repos.slice(0, 4).forEach(repo => {
                html += `
                    <div onclick="window.open('${repo.html_url}', '_blank')" 
                         style="border:1px solid #333; background:rgba(255,255,255,0.05); padding:8px; border-radius:4px; font-size:11px; cursor:pointer;">
                        <div style="color:#FFFF00; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${repo.name}</div>
                        <div style="color:#aaa; font-size:10px; margin:4px 0; height:24px; overflow:hidden; text-overflow:ellipsis;">
                            ${repo.description || "No description provided."}
                        </div>
                        <div style="display:flex; justify-content:space-between; color:#888; font-size:10px;">
                            <span style="color:#00FF00;">${repo.language || 'Code'}</span>
                            <span>★ ${repo.stargazers_count}</span>
                        </div>
                    </div>
                `;
            });
            html += `</div>`;
        } else {
            // Fallback showcase cards if offline or initial load
            html += `
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
                    <div style="border:1px solid #333; background:rgba(255,255,255,0.05); padding:8px; border-radius:4px;">
                        <div style="color:#FFFF00; font-weight:bold;">reva-campus-tokens</div>
                        <div style="color:#00FF00; font-size:10px; margin-top:4px;">JavaScript</div>
                    </div>
                    <div style="border:1px solid #333; background:rgba(255,255,255,0.05); padding:8px; border-radius:4px;">
                        <div style="color:#FFFF00; font-weight:bold;">vedic-ai-backend</div>
                        <div style="color:#00FF00; font-size:10px; margin-top:4px;">Python / FastAPI</div>
                    </div>
                </div>
            `;
        }

        widget.innerHTML = html;
    }
}

window.repositoryShowcase = new RepositoryShowcase();