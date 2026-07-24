// =========================================
// BARSA OS — Repository Discovery Module
// =========================================

class RepositoryModule {
    constructor() {
        this.repos = [
            { name: "reva-campus-tokens", lang: "JavaScript", stars: 4, desc: "Token tracking system for campus" },
            { name: "vedic-ai-backend", lang: "Python/FastAPI", stars: 12, desc: "Conversational AI API platform" },
            { name: "barsa-os", lang: "JavaScript/HTML", stars: 18, desc: "Arcade-themed developer portfolio OS" }
        ];
    }

    async fetchRepos(username = "github") {
        console.log("[RepositoryModule] Scanning /repositories...");
        try {
            const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`);
            if (res.ok) {
                const data = await res.json();
                this.repos = data.map(r => ({
                    name: r.name,
                    lang: r.language || "Web",
                    stars: r.stargazers_count,
                    desc: r.description || "No description provided"
                }));
            }
        } catch (e) {
            console.warn("[RepositoryModule] Network offline. Using local repository cache.");
        }

        this.render();
    }

    render() {
        const terminal = document.getElementById("boot-text");
        if (!terminal) return;

        terminal.innerHTML += `\n> [FEATURED REPOSITORIES DETECTED]:\n`;
        this.repos.forEach(repo => {
            terminal.innerHTML += `  * ${repo.name} [${repo.lang}] ★${repo.stars} - ${repo.desc}\n`;
        });
    }
}

window.repositoryModule = new RepositoryModule();