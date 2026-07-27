// =========================================
// BARSA OS — Achievement Unlock Animations
// =========================================

class AchievementPopupEngine {
    unlock(title, description) {
        const frame = document.getElementById("arcade-frame");
        if (!frame) return;

        const banner = document.createElement("div");
        banner.className = "achievement-banner";
        banner.style.cssText = `
            position: absolute; top: 20px; right: 20px;
            background: #000; border: 2px solid #FFFF00; padding: 10px 14px;
            font-family: 'Courier New', monospace; color: #FFFF00;
            box-shadow: 0 0 10px #FFFF00; z-index: 90;
            transition: all 0.5s ease; transform: translateY(-50px); opacity: 0;
        `;
        banner.innerHTML = `
            <div style="font-size: 10px; color: #00FF00;">🏆 ACHIEVEMENT UNLOCKED</div>
            <div style="font-size: 12px; font-weight: bold; color: #FFF;">${title}</div>
            <div style="font-size: 9px; color: #888;">${description}</div>
        `;
        frame.appendChild(banner);

        requestAnimationFrame(() => {
            banner.style.transform = "translateY(0)";
            banner.style.opacity = "1";
        });

        setTimeout(() => {
            banner.style.opacity = "0";
            banner.style.transform = "translateY(-50px)";
            setTimeout(() => banner.remove(), 500);
        }, 3500);
    }
}

window.achievementPopupEngine = new AchievementPopupEngine();