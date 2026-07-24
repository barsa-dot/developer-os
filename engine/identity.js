// =========================================
// BARSA OS — Identity Discovery Module
// =========================================

class IdentityModule {
    constructor() {
        this.profile = {
            username: "Developer",
            bio: "First-Year College Student & Full-Stack Developer",
            avatarUrl: "https://github.com/identicons/user.png"
        };
    }

    async discover(username = "github") {
        console.log("[IdentityModule] Discovering identity at /identity...");
        try {
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (res.ok) {
                const data = await res.json();
                this.profile = {
                    username: data.login,
                    bio: data.bio || "Full-Stack Web & Systems Developer",
                    avatarUrl: data.avatar_url
                };
            }
        } catch (e) {
            console.warn("[IdentityModule] Network offline. Using local identity preset.");
        }

        this.render();
    }

    render() {
        const terminal = document.getElementById("boot-text");
        if (!terminal) return;

        terminal.innerHTML += `\n> [IDENTITY FOUND]: @${this.profile.username}\n`;
        terminal.innerHTML += `> BIO: ${this.profile.bio}\n`;
    }
}

window.identityModule = new IdentityModule();