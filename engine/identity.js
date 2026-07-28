// =========================================
// BARSA OS — Identity & Bio Store
// =========================================

class IdentityStore {
    constructor() {
        this.profile = {
            name: "BARSA",
            title: "First-Year Student & Full-Stack Developer",
            bio: "Building full-stack apps, low-level system experiments, and conversational AI.",
            skills: ["JavaScript", "React", "FastAPI", "C", "Python"],
            socials: {
                github: "https://github.com/barsa-dot"
            }
        };
    }

    getProfile() {
        return this.profile;
    }
}

window.identityStore = new IdentityStore();