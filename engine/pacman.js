/**
 * BARSA OS v2 - Complete Path Trajectory Loop Routing Engine
 */

const PacmanEngine = (() => {
    const TRACK_PAD = 24;
    const COLLISION_RADIUS = 22;
    const VELOCITY_STEP = 2.4;

    let state = {
        w: 0, h: 0, totalLen: 0, distance: 0, mouth: 0,
        pellets: [], isLive: false, lapDispatched: false
    };

    let DOM = { arena: null, layer: null, pacman: null, mouth: null, score: null };
    let wakaAudio = null;

    const ghosts = [
        { id: 'blinky', el: null, offset: 40, dx: 1, dy: 0 },
        { id: 'pinky',   el: null, offset: 80, dx: 1, dy: 0 },
        { id: 'inky',    el: null, offset: 120, dx: 1, dy: 0 }
    ];

    const init = () => {
        wakaAudio = document.getElementById('snd-waka');
        window.addEventListener('startArcadeCinematic', bootSimulationEngine);
    };

    const bootSimulationEngine = () => {
        cacheDOM();
        configureDimensions();
        buildPelletGrid();
        state.isLive = true;
        if(wakaAudio) wakaAudio.play().catch(()=>{});
        requestAnimationFrame(runtimeLoop);
    };

    const cacheDOM = () => {
        DOM.arena = document.getElementById('game-arena');
        DOM.layer = document.getElementById('dots-layer');
        DOM.pacman = document.getElementById('pacman');
        DOM.mouth = document.getElementById('pacman-mouth');
        DOM.score = document.getElementById('hud-score');
        ghosts.forEach(g => g.el = document.getElementById(g.id));
    };

    const configureDimensions = () => {
        state.w = DOM.arena.getBoundingClientRect().width;
        state.h = DOM.arena.getBoundingClientRect().height;
        state.totalLen = (state.w - TRACK_PAD * 2) * 2 + (state.h - TRACK_PAD * 2) * 2;
    };

    const getTrajectoryPoint = (dist) => {
        let d = dist % state.totalLen;
        if (d < 0) d += state.totalLen;

        const w = state.w; const h = state.h; const p = TRACK_PAD;
        const top = w - p * 2; const right = h - p * 2; const bot = w - p * 2;

        if (d < top) {
            return { x: p + d, y: p, deg: 0, kx: 1, ky: 0 };
        } else if (d < top + right) {
            return { x: w - p, y: p + (d - top), deg: 90, kx: 0, ky: 1 };
        } else if (d < top + right + bot) {
            return { x: (w - p) - (d - top - right), y: h - p, deg: 180, kx: -1, ky: 0 };
        } else {
            return { x: p, y: (h - p) - (d - top - right - bot), deg: 270, kx: 0, ky: -1 };
        }
    };

    const buildPelletGrid = () => {
        DOM.layer.innerHTML = "";
        state.pellets = [];
        const p = TRACK_PAD;
        let idCount = 0;

        const corners = [{x:p, y:p}, {x:state.w-p, y:p}, {x:state.w-p, y:state.h-p}, {x:p, y:state.h-p}];
        corners.forEach(c => {
            const el = document.createElement('div');
            el.className = 'pellet-dot';
            el.style.left = `${c.x}px`; el.style.top = `${c.y}px`;
            el.style.transform = 'translate(-50%, -50%)';
            DOM.layer.appendChild(el);
            state.pellets.push({ x: c.x, y: c.y, node: el, eaten: false });
        });

        const fill = (x1, y1, x2, y2) => {
            const len = Math.sqrt((x2-x1)**2 + (y2-y1)**2);
            const count = Math.floor(len / 28) - 1;
            for(let i=1; i<=count; i++) {
                const cx = x1 + ((x2-x1)/(count+1))*i;
                const cy = y1 + ((y2-y1)/(count+1))*i;
                const el = document.createElement('div');
                el.className = 'pellet-dot';
                el.style.left = `${cx}px`; el.style.top = `${cy}px`;
                el.style.transform = 'translate(-50%, -50%)';
                DOM.layer.appendChild(el);
                state.pellets.push({ x: cx, y: cy, node: el, eaten: false });
            }
        };
        fill(p, p, state.w-p, p); fill(state.w-p, p, state.w-p, state.h-p);
        fill(state.w-p, state.h-p, p, state.h-p); fill(p, state.h-p, p, p);
    };

    const runtimeLoop = () => {
        if (!state.isLive) return;

        state.distance += VELOCITY_STEP;
        const pt = getTrajectoryPoint(state.distance);

        DOM.pacman.style.transform = `translate3d(calc(${pt.x}px - 50%), calc(${pt.y}px - 50%), 0) rotate(${pt.deg}deg)`;

        // Handle structural collisions
        state.pellets.forEach(pellet => {
            if (pellet.eaten) return;
            if (Math.sqrt((pellet.x - pt.x)**2 + (pellet.y - pt.y)**2) < COLLISION_RADIUS) {
                pellet.eaten = true;
                pellet.node.classList.add('eaten');
                let curScore = parseInt(DOM.score.innerText) + 100;
                DOM.score.innerText = curScore.toString().padStart(6, '0');
            }
        });

        // Loop execution positions for standard ghost actors
        ghosts.forEach(g => {
            if (!g.el) return;
            const gPt = getTrajectoryPoint(state.distance - g.offset);
            g.el.style.transform = `translate3d(calc(${gPt.x}px - 50%), calc(${gPt.y}px - 50%), 0)`;
        });

        // Mouth configurations cycle animations
        state.mouth += 0.22;
        const angle = Math.abs(Math.sin(state.mouth)) * 40;
        DOM.mouth.setAttribute('d', angle < 4 ? 'M50,50 L100,50 A50,50 0 1,0 100,50 Z' : `M50,50 L100,${50 - angle} A50,50 0 1,0 100,${50 + angle} Z`);

        // Frame validation route tracking complete evaluation lap
        if (state.distance >= state.totalLen && !state.lapDispatched) {
            state.lapDispatched = true;
            state.isLive = false;
            if(wakaAudio) { wakaAudio.pause(); wakaAudio.currentTime = 0; }
            window.dispatchEvent(new CustomEvent('arcadeLapComplete'));
            return;
        }

        requestAnimationFrame(runtimeLoop);
    };

    document.addEventListener('DOMContentLoaded', init);
})();