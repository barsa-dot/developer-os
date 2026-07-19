/**
 * BARSA OS v2 - Corner-Locked Grid Engine
 * Explicitly forces dot spawns into the absolute corner coordinates.
 */

const PacmanEngine = (() => {
    let arena = null;
    let dotsLayer = null;
    let pacman = null;
    let mouth = null;
    let scoreVal = null;

    const ghosts = [
        { id: 'blinky', el: null, pupilsL: null, pupilsR: null, offset: 35 },
        { id: 'pinky',   el: null, pupilsL: null, pupilsR: null, offset: 70 },
        { id: 'inky',    el: null, pupilsL: null, pupilsR: null, offset: 105 }
    ];

    let pathPoints = [];
    let dots = [];
    
    let pacmanDistance = 0;
    const velocity = 2.0; 
    let score = 0;
    let totalPathLength = 0;
    let mouthCycle = 0;

    let arenaWidth = 0;
    let arenaHeight = 0;
    const pad = 24; // Track alignment constant

    const initialize = () => {
        arena = document.getElementById('game-arena');
        dotsLayer = document.getElementById('dots-layer');
        pacman = document.getElementById('pacman');
        mouth = document.getElementById('pacman-mouth');
        scoreVal = document.getElementById('hud-score');

        ghosts.forEach(g => {
            g.el = document.getElementById(g.id);
            if (g.el) {
                g.pupilsL = g.el.querySelector('.ghost-pupil-l');
                g.pupilsR = g.el.querySelector('.ghost-pupil-r');
            }
        });

        if (!arena || !pacman) return;

        arena.style.overflow = "hidden";
        arenaWidth = arena.getBoundingClientRect().width;
        arenaHeight = arena.getBoundingClientRect().height;

        pacman.style.top = "0px";
        pacman.style.left = "0px";
        ghosts.forEach(g => {
            if (g.el) {
                g.el.style.top = "0px";
                g.el.style.left = "0px";
            }
        });

        calculateWaypoints();
        spawnPelletGrid();
        
        setTimeout(() => {
            requestAnimationFrame(updateLoop);
        }, 1200);
    };

    const calculateWaypoints = () => {
        const w = arenaWidth;
        const h = arenaHeight;

        pathPoints = [
            { x: pad,     y: pad },       
            { x: w - pad, y: pad },       
            { x: w - pad, y: h - pad },   
            { x: pad,     y: h - pad }    
        ];

        totalPathLength = (w - pad * 2) * 2 + (h - pad * 2) * 2;
    };

    const getPointAtDistance = (dist) => {
        let d = dist % totalPathLength;
        if (d < 0) d += totalPathLength;

        const w = arenaWidth;
        const h = arenaHeight;

        const topLen = w - pad * 2;
        const rightLen = h - pad * 2;
        const botLen = w - pad * 2;

        if (d < topLen) {
            return { x: pad + d, y: pad, angle: 0, dirX: 1, dirY: 0 };
        } else if (d < topLen + rightLen) {
            return { x: w - pad, y: pad + (d - topLen), angle: 90, dirX: 0, dirY: 1 };
        } else if (d < topLen + rightLen + botLen) {
            return { x: (w - pad) - (d - topLen - rightLen), y: h - pad, angle: 180, dirX: -1, dirY: 0 };
        } else {
            const upProgress = d - topLen - rightLen - botLen;
            return { x: pad, y: (h - pad) - upProgress, angle: 270, dirX: 0, dirY: -1 };
        }
    };

    const createDotElement = (x, y) => {
        const dotEl = document.createElement('div');
        dotEl.className = 'pellet-dot';
        dotEl.style.position = 'absolute';
        dotEl.style.left = `${x}px`;
        dotEl.style.top = `${y}px`;
        dotEl.style.transform = "translate(-50%, -50%)";
        dotsLayer.appendChild(dotEl);
        return dotEl;
    };

    const spawnPelletGrid = () => {
        dotsLayer.innerHTML = "";
        dots = [];

        const w = arenaWidth;
        const h = arenaHeight;
        const targetSpacing = 28;

        // 1. Manually add anchor dots into the 4 true corners
        const corners = [
            { x: pad,     y: pad },
            { x: w - pad, y: pad },
            { x: w - pad, y: h - pad },
            { x: pad,     y: h - pad }
        ];

        corners.forEach(c => {
            const el = createDotElement(c.x, c.y);
            dots.push({ x: c.x, y: c.y, el: el, eaten: false });
        });

        // 2. Uniformly distribute linear fill segments between the anchors
        const fillTrack = (x1, y1, x2, y2) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const len = Math.sqrt(dx * dx + dy * dy);
            const count = Math.max(0, Math.floor(len / targetSpacing) - 1);
            
            if (count <= 0) return;
            
            const stepX = dx / (count + 1);
            const stepY = dy / (count + 1);

            for (let i = 1; i <= count; i++) {
                const cx = x1 + stepX * i;
                const cy = y1 + stepY * i;
                const el = createDotElement(cx, cy);
                dots.push({ x: cx, y: cy, el: el, eaten: false });
            }
        };

        // Top line fill
        fillTrack(pad, pad, w - pad, pad);
        // Right line fill
        fillTrack(w - pad, pad, w - pad, h - pad);
        // Bottom line fill
        fillTrack(w - pad, h - pad, pad, h - pad);
        // Left line fill
        fillTrack(pad, h - pad, pad, pad);
    };

    const updateLoop = () => {
        pacmanDistance += velocity;
        const pacmanPt = getPointAtDistance(pacmanDistance);

        pacman.style.transform = `translate3d(calc(${pacmanPt.x}px - 50%), calc(${pacmanPt.y}px - 50%), 0) rotate(${pacmanPt.angle}deg)`;

        checkPelletCollision(pacmanPt.x, pacmanPt.y);

        ghosts.forEach(g => {
            if (!g.el) return;
            const ghostPt = getPointAtDistance(pacmanDistance - g.offset);
            
            g.el.style.transform = `translate3d(calc(${ghostPt.x}px - 50%), calc(${ghostPt.y}px - 50%), 0)`;
            
            let lookX = ghostPt.dirX * 3;
            let lookY = ghostPt.dirY * 3;

            if (g.pupilsL && g.pupilsR) {
                g.pupilsL.setAttribute('cx', (35 + lookX).toString());
                g.pupilsL.setAttribute('cy', (55 + lookY).toString());
                g.pupilsR.setAttribute('cx', (65 + lookX).toString());
                g.pupilsR.setAttribute('cy', (55 + lookY).toString());
            }
        });

        mouthCycle += 0.25;
        const mouthAngle = Math.abs(Math.sin(mouthCycle)) * 42;
        if (mouthAngle < 3) {
            mouth.setAttribute('d', 'M50,50 L100,50 A50,50 0 1,0 100,50 Z');
        } else {
            mouth.setAttribute('d', `M50,50 L100,${50 - mouthAngle} A50,50 0 1,0 100,${50 + mouthAngle} Z`);
        }

        requestAnimationFrame(updateLoop);
    };

    const checkPelletCollision = (px, py) => {
        let allEaten = true;

        dots.forEach(d => {
            if (!d.eaten) {
                const dx = d.x - px;
                const dy = d.y - py;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Safe collision threshold for locked paths
                if (distance < 26) { 
                    d.eaten = true;
                    d.el.style.opacity = "0";
                    score += 100;
                    if (scoreVal) scoreVal.innerText = score.toString().padStart(6, '0');
                } else {
                    allEaten = false;
                }
            }
        });

        if (allEaten && dots.length > 0) {
            spawnPelletGrid();
        }
    };

    document.addEventListener('DOMContentLoaded', initialize);
})();