// =========================================
// BARSA OS — Live Dashboard Renderer
// =========================================

class DashboardRenderer {
    async renderProfile(username = "barsa-dot") {
        const widget = document.getElementById("widget-profile");
        if (!widget) return;

        // Fetch live user data for barsa-dot
        const data = await window.githubEngine.getUser(username) || {
            login: "barsa-dot",
            followers: 0,
            public_repos: 0,
            bio: "First-Year Student & Full-Stack Developer"
        };

        widget.innerHTML = `
            <div class="profile-card">
                <h3 style="color:#FFFF00; margin:0 0 8px 0;">> @${data.login}</h3>
                <p style="font-size:12px; color:#aaa; margin:0 0 10px 0;">${data.bio || "Full-Stack Developer"}</p>
                <div style="font-size:12px; display:flex; gap:12px;">
                    <span>REPOS: <b style="color:#00FF00">${data.public_repos}</b></span>
                    <span>FOLLOWERS: <b style="color:#00FFFF">${data.followers}</b></span>
                </div>
                <div style="margin-top:12px; font-size:11px; display:flex; gap:6px;">
                    <span style="background:#2121ff; padding:2px 6px; border-radius:3px; color:#fff;">JavaScript</span>
                    <span style="background:#2121ff; padding:2px 6px; border-radius:3px; color:#fff;">FastAPI</span>
                    <span style="background:#2121ff; padding:2px 6px; border-radius:3px; color:#fff;">C</span>
                    <span style="background:#2121ff; padding:2px 6px; border-radius:3px; color:#fff;">Python</span>
                </div>
            </div>
        `;
    }
}

window.dashboardRenderer = new DashboardRenderer();