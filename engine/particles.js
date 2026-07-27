// =========================================
// BARSA OS — Particle FX Engine
// =========================================

class ParticleEngine {
    spawnSparks(x, y, count = 8, color = "#FFFF00") {
        const arena = document.getElementById("arcade-arena");
        if (!arena) return;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement("div");
            particle.className = "spark-particle";
            particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 50;
                box-shadow: 0 0 6px ${color};
                transition: transform 0.4s ease-out, opacity 0.4s ease-out;
            `;
            arena.appendChild(particle);

            const angle = Math.random() * Math.PI * 2;
            const dist = 15 + Math.random() * 25;
            const dx = Math.cos(angle) * dist;
            const dy = Math.sin(angle) * dist;

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${dx}px, ${dy}px) scale(0)`;
                particle.style.opacity = "0";
            });

            setTimeout(() => particle.remove(), 400);
        }
    }
}

window.particleEngine = new ParticleEngine();