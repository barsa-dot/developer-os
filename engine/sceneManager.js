// ===============================
// BARSA OS — Scene Manager
// ===============================

class SceneManager {
    constructor() {
        this.scenes = new Map();
        this.currentScene = null;
        this.currentSceneName = null;
    }

    /**
     * Register a scene instance under a unique identifier
     * @param {string} name 
     * @param {Object} sceneInstance - Object implementing enter() and optionally exit()
     */
    register(name, sceneInstance) {
        if (this.scenes.has(name)) {
            console.warn(`[SceneManager] Scene "${name}" is already registered. Overwriting.`);
        }
        this.scenes.set(name, sceneInstance);
    }

    /**
     * Transition to a registered scene
     * @param {string} name 
     * @param {Object} [data] - Optional payload passed to the next scene
     */
    async switchTo(name, data = {}) {
        if (!this.scenes.has(name)) {
            console.error(`[SceneManager] Cannot switch to unregistered scene: "${name}"`);
            return;
        }

        // 1. Exit current active scene
        if (this.currentScene && typeof this.currentScene.exit === "function") {
            await this.currentScene.exit();
        }

        // 2. Set active scene
        this.currentScene = this.scenes.get(name);
        this.currentSceneName = name;

        // 3. Enter new scene
        if (typeof this.currentScene.enter === "function") {
            await this.currentScene.enter(data);
        }
    }

    /**
     * Get the currently active scene identifier
     */
    getCurrentSceneName() {
        return this.currentSceneName;
    }
}

// Global Export
window.sceneManager = new SceneManager();