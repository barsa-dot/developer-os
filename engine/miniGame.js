// =========================================
// BARSA OS — Hidden Arcade Mini-Game
// =========================================

class MiniGameEngine {
    launch() {
        console.log("[MiniGameEngine] Launching secret arcade mini-game...");
        const arena = document.getElementById("arcade-arena");
        if (!arena) return;

        const overlay = document.createElement("div");
        overlay.id = "minigame-overlay";
        overlay.style.cssText = `
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.95); z-index: 100;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            font-family: 'Press Start 2P', monospace; color: #00FF00;
        `;
        overlay.innerHTML = `
            <h3>INVADERS DODGER</h3>
            <p style="font-size: 10px; color: #aaa;">DODGE THE RED DOTS WITH ARROW KEYS</p>
            <div id="mg-canvas" style="width: 200px; height: 150px; border: 2px solid #00FF00; position: relative; overflow: hidden;"></div>
            <button id="close-mg" style="margin-top: 10px; background: #FF0000; color: #fff; border: none; padding: 6px 12px; cursor: pointer;">EXIT</button>
        `;
        arena.appendChild(overlay);

        document.getElementById("close-mg").onclick = () => overlay.remove();
    }
}

window.miniGameEngine = new MiniGameEngine();