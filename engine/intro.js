/**
 * BARSA OS v2 - Cinematic Stage Scene Manager Transitions Controller
 */

const IntroController = (() => {
    const STAGES = {
        BLACK_SCREEN: 'black',
        INSERT_COIN: 'coin',
        CRT_POWER: 'power',
        ARCADE_RUN: 'arcade',
        LOGO_TRANSITION: 'logo',
        OS_DASHBOARD: 'dashboard'
    };

    let monitorNode = null;
    let coinAudio = null;

    const init = () => {
        monitorNode = document.getElementById('monitor-screen');
        coinAudio = document.getElementById('snd-beep');
        
        // Scene 1 Phase: Anticipation
        setTimeout(() => {
            transitionToInsertCoin();
        }, 1000);
    };

    const transitionToInsertCoin = () => {
        monitorNode.classList.remove('black-screen');
        document.getElementById('scene-insert-coin').classList.remove('hidden');
        
        // Listen for user interaction anchor triggers
        window.addEventListener('keydown', handleCoinTrigger);
        document.getElementById('scene-insert-coin').addEventListener('click', handleCoinTrigger);
    };

    const handleCoinTrigger = (e) => {
        if (e.type === 'keydown' && e.key !== 'Enter') return;
        
        window.removeEventListener('keydown', handleCoinTrigger);
        document.getElementById('scene-insert-coin').removeEventListener('click', handleCoinTrigger);
        
        if(coinAudio) coinAudio.play().catch(()=>{});
        
        // Scene 3 Sequence: CRT Power Flash
        document.getElementById('scene-insert-coin').classList.add('hidden');
        monitorNode.classList.add('crt-power-on');
        
        setTimeout(() => {
            transitionToArcadeMode();
        }, 1500);
    };

    const transitionToArcadeMode = () => {
        document.getElementById('scene-arcade').classList.remove('hidden');
        window.dispatchEvent(new CustomEvent('startArcadeCinematic'));
        window.addEventListener('arcadeLapComplete', transitionToLogoFormation);
    };

    const transitionToLogoFormation = () => {
        document.getElementById('scene-arcade').classList.add('hidden');
        document.getElementById('scene-logo').classList.remove('hidden');
        
        setTimeout(() => {
            transitionToDashboardWorkspace();
        }, 2800);
    };

    const transitionToDashboardWorkspace = () => {
        document.getElementById('scene-logo').classList.add('hidden');
        document.getElementById('scene-dashboard').classList.remove('hidden');
        
        // Dispatch initialization sequences downstream to GitHub and UI subsystems
        window.dispatchEvent(new CustomEvent('dashboardReady'));
    };

    document.addEventListener('DOMContentLoaded', init);
})();