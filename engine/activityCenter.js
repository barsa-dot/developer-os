// =========================================
// BARSA OS — Activity Center
// =========================================

class ActivityCenter {
    async render(username = "github") {
        const widget = document.getElementById("widget-activity");
        if (!widget) return;

        const events = await window.githubEngine.getEvents(username) || [];

        let feedHtml = `<h4 style="color:#00FFFF; margin:0 0 8px 0;">> ACTIVITY FEED</h4><ul style="list-style:none; padding:0; margin:0; font-size:11px;">`;

        if (events.length > 0) {
            events.forEach(evt => {
                feedHtml += `<li style="margin-bottom:6px; border-bottom:1px solid #333; padding-bottom:4px;">
                    <span style="color:#FFB8FF;">[${evt.type.replace("Event", "")}]</span> 
                    ${evt.repo ? evt.repo.name : 'Repository update'}
                </li>`;
            });
        } else {
            feedHtml += `<li style="color:#888;">> Push event: main @ reva-campus-tokens</li>
                         <li style="color:#888;">> Commit: feat: implement arcade audio engine</li>`;
        }

        feedHtml += `</ul>`;
        widget.innerHTML = feedHtml;
    }
}

window.activityCenter = new ActivityCenter();