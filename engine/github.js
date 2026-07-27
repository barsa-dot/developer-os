// =========================================
// BARSA OS — Live GitHub Data Engine
// =========================================

class GitHubEngine {
    constructor() {
        this.baseUrl = "https://api.github.com";
        this.cache = new Map();
        this.ttl = 300000; // 5-minute cache
        
        // -------------------------------------------------------------
        // YOUR GITHUB PROFILE CONFIGURATION
        // -------------------------------------------------------------
        this.username = "barsa-dot";
        this.profileUrl = "https://github.com/barsa-dot";
    }

    async fetchWithCache(endpoint) {
        const now = Date.now();
        if (this.cache.has(endpoint)) {
            const cached = this.cache.get(endpoint);
            if (now - cached.timestamp < this.ttl) {
                return cached.data;
            }
        }

        try {
            const res = await fetch(`${this.baseUrl}${endpoint}`);
            if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
            const data = await res.json();
            this.cache.set(endpoint, { timestamp: now, data });
            return data;
        } catch (err) {
            console.warn(`[GitHubEngine] Fetch failed for ${endpoint}:`, err);
            return null;
        }
    }

    // Uses your configured username by default if none is provided
    async getUser(username = this.username) {
        return await this.fetchWithCache(`/users/${username}`);
    }

    async getRepos(username = this.username) {
        return await this.fetchWithCache(`/users/${username}/repos?sort=updated&per_page=6`);
    }

    async getEvents(username = this.username) {
        return await this.fetchWithCache(`/users/${username}/events?per_page=5`);
    }
}

window.githubEngine = new GitHubEngine();