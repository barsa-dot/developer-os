// =========================================
// BARSA OS — Activity Center
// =========================================

class ActivityCenter {
    async render(username = "barsa-dot") {
        const widget = document.getElementById("widget-activity");
        if (!widget) return;

        const events = await window.githubEngine.getEvents(username) || [];

        let feedHtml = `<h4 style="color:#00FFFF; margin:0 0 8px 0;">> ACTIVITY FEED</h4><ul style="list-style:none; padding:0; margin:0; font-size:11px;">`;

        if (events.length > 0) {
            events.slice(0, 4).forEach(evt => {
                const type = evt.type.replace("Event", "");
                const repo = evt.repo ? evt.repo.name : "repository";
                feedHtml += `<li style="margin-bottom:6px; border-bottom:1px solid #222; padding-bottom:4px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                    <span style="color:#FFB8FF;">[${type}]</span> ${repo}
                </li>`;
            });
        } else {
            feedHtml += `
                <li style="color:#888; margin-bottom:4px;">> [Push] main @ reva-campus-tokens</li>
                <li style="color:#888; margin-bottom:4px;">> [Commit] feat: implement arcade audio engine</li>
                <li style="color:#888;">> [Push] main @ vedic-ai-backend</li>
            `;
        }

        feedHtml += `</ul>`;
        widget.innerHTML = feedHtml;
    }
}

window.activityCenter = new ActivityCenter();