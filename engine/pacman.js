/**
 * BARSA OS v2 - Pacman System Engine
 * Controls rendering loop coordinates, chomping animation logic, and pixel data trail rendering.
 */

const PacmanEngine = (() => {
    let container = null;
    let sprite = null;
    let mouth = null;
    let trailContainer = null;
    
    let positionX = -40;
    let velocity = 2.5;
    let direction = 1; // 1 = Right, -1 = Left
    let isMoving = false;
    let animationFrameId = null;
    let mouthCycle = 0;

    const initialize = () => {
        container = document.querySelector('.arcade-lane');
        sprite = document.getElementById('pacman');
        mouth = document.getElementById('pacman-mouth');
        trailContainer = document.getElementById('pacman-trail');

        if (!sprite || !container) return;
        
        // Wait for OS cabinet layout display animations to finish before launching
        setTimeout(() => {
            isMoving = true;
            renderLoop();
        }, 1000);
    };

    const renderLoop = () => {
        if (!isMoving) return;

        const containerWidth = container.offsetWidth;

        // Advance visual positions
        positionX += velocity * direction;
        sprite.style.left = `${positionX}px`;

        // Handle structural boundary bounces
        if (direction === 1 && positionX >= (containerWidth - 25)) {
            direction = -1;
            sprite.style.transform = "translateY(-50%) scaleX(-1)";
        } else if (direction === -1 && positionX <= 0) {
            direction = 1;
            sprite.style.transform = "translateY(-50%) scaleX(1)";
        }

        // Animated chomping logic via direct SVG attribute manipulation
        mouthCycle += 0.2;
        const mouthAngle = Math.abs(Math.sin(mouthCycle)) * 30;
        
        if (mouthAngle < 1) {
            mouth.setAttribute('d', 'M50,50 L100,50 A50,50 0 1,0 100,50 Z');
        } else {
            mouth.setAttribute('d', `M50,50 L100,${50 - mouthAngle} A50,50 0 1,0 100,${50 + mouthAngle} Z`);
        }

        // Leave tracking particle trail footprint arrays
        if (Math.random() < 0.15) {
            spawnTrailParticle(positionX + 11);
        }

        animationFrameId = requestAnimationFrame(renderLoop);
    };

    const spawnTrailParticle = (x) => {
        const p = document.createElement('div');
        p.className = 'trail-particle';
        p.style.left = `${x}px`;
        trailContainer.appendChild(p);

        // Natively garbage collect particle DOM strings post-fade
        setTimeout(() => { p.remove(); }, 400);
    };

    const pause = () => { isMoving = false; cancelAnimationFrame(animationFrameId); };
    const resume = () => { if (!isMoving) { isMoving = true; renderLoop(); } };

    document.addEventListener('DOMContentLoaded', initialize);

    return { pause, resume };
})();