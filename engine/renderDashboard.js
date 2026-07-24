// =========================================
// BARSA OS — Live Dashboard Renderer
// =========================================

class DashboardRenderer {
    async renderProfile(username = "github") {
        const widget = document.getElementById("widget-profile");
        if (!widget) return;

        const data = await window.githubEngine.getUser(username) || {
            login: username,
            followers: 24,
            public_repos: 12,
            bio: "First-Year Student & Developer"
        };

        widget.innerHTML = `
            <div class="profile-card">
                <h3 style="color:#FFFF00; margin:0 0 8px 0;">> @${data.login}</h3>
                <p style="font-size:12px; color:#aaa; margin:0 0 10px 0;">${data.bio}</p>
                <div style="font-size:12px; display:flex; gap:12px;">
                    <span>REPOS: <b style="color:#00FF00">${data.public_repos}</b></span>
                    <span>FOLLOWERS: <b style="color:#00FFFF">${data.followers}</b></span>
                </div>
                <div style="margin-top:12px; font-size:11px;">
                    <span style="background:#2121ff; padding:2px 6px; border-radius:3px;">JS/TS</span>
                    <span style="background:#2121ff; padding:2px 6px; border-radius:3px;">Python</span>
                    <span style="background:#2121ff; padding:2px 6px; border-radius:3px;">C++</span>
                </div>
            </div>
        `;
    }
}

window.dashboardRenderer = new DashboardRenderer();