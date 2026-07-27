// =========================================
// BARSA OS — Engine Performance Optimizer
// =========================================

class EngineOptimizer {
    constructor() {
        this.frameThrottle = false;
    }

    throttle(callback) {
        if (this.frameThrottle) return;
        this.frameThrottle = true;
        requestAnimationFrame(() => {
            callback();
            this.frameThrottle = false;
        });
    }

    batchDOMUpdate(element, content) {
        if (!element) return;
        this.throttle(() => {
            element.innerHTML = content;
        });
    }
}

window.engineOptimizer = new EngineOptimizer();