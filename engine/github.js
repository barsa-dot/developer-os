/**
 * BARSA OS v2 - Live Cloud Sync Integration Layer (GitHub API Framework)
 */

const GitHubSyncCore = (() => {
    // Falls back seamlessly to mock profiles if standard developer API limits trip
    const TARGET_ACCOUNT = "octocat"; 

    const init = () => {
        window.addEventListener('dashboardReady', triggerCloudSyncPipeline);
    };

    const triggerCloudSyncPipeline = async () => {
        const syncLabel = document.getElementById('sync-status');
        try {
            const userRes = await fetch(`https://api.github.com/users/${TARGET_ACCOUNT}`);
            if(!userRes.ok) throw new Error("API Limit");
            const userData = await userRes.json();
            
            const repoRes = await fetch(`https://api.github.com/users/${TARGET_ACCOUNT}/repos?sort=updated&per_page=6`);
            const repoData = await repoRes.json();

            hydrateUIMetadata(userData, repoData);
            if(syncLabel) syncLabel.innerHTML = `✓ System Live Cloud Sync Complete. Verified: ${repoData.length} records inside frame index nodes.`;
        } catch (err) {
            console.warn("GitHub API fallback processing active.", err);
            generateMockFallbackData();
        }
    };

    const hydrateUIMetadata = (user, repos) => {
        document.getElementById('github-avatar').src = user.avatar_url || "";
        document.getElementById('github-name').innerText = (user.name || user.login).toUpperCase();
        document.getElementById('github-bio').innerText = user.bio || "Full-Stack Software Architecture Engineer Profile Node.";
        document.getElementById('hud-repo-count').innerText = (user.public_repos || repos.length).toString().padStart(2, '0');
        document.getElementById('hud-streak').innerText = "28 DAYS";

        // Dispatch items downstream to layout renderer components
        window.dispatchEvent(new CustomEvent('renderLanguageMetrics', { detail: { repos: repos } }));
        window.dispatchEvent(new CustomEvent('populateRepositoryCards', { detail: { repos: repos } }));
    };

    const generateMockFallbackData = () => {
        const mockUser = {
            avatar_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80",
            name: "BARSA DEVELOPER",
            bio: "First-year student developer building robust distributed systems.",
            public_repos: 18
        };
        const mockRepos = [
            { name: "vedic-ai-backend", description: "FastAPI context parsing server providing daily metrics.", stargazers_count: 14, forks_count: 2, language: "Python" },
            { name: "reva-campus-tokens", description: "Public repository ledger orchestration pipeline.", stargazers_count: 8, forks_count: 1, language: "JavaScript" },
            { name: "jewelry-ecommerce-shop", description: "Full-stack client system developed for upcoming hackathons.", stargazers_count: 23, forks_count: 5, language: "TypeScript" }
        ];
        hydrateUIMetadata(mockUser, mockRepos);
    };

    document.addEventListener('DOMContentLoaded', init);
})();