document.addEventListener('DOMContentLoaded', function() {
    const moons = document.querySelectorAll('.moon');
    const centerImage = document.getElementById('center-image');

    // Function to calculate current moon phase day (1-30)
    function getCurrentMoonPhaseDay() {
        // Known new moon date: January 29, 2024
        const knownNewMoon = new Date(2024, 0, 29);
        const today = new Date();
        
        // Calculate days since known new moon
        const millisecondsPerDay = 1000 * 60 * 60 * 24;
        const daysSinceNewMoon = Math.floor((today - knownNewMoon) / millisecondsPerDay);
        
        // Lunar cycle is approximately 29.53 days
        const lunarCycle = 29.53;
        const phaseDay = Math.floor((daysSinceNewMoon % lunarCycle) + 1);
        
        return phaseDay > 30 ? 30 : phaseDay;
    }

    // Apply highlight to current moon phase
    function highlightCurrentMoonPhase() {
        const phaseDay = getCurrentMoonPhaseDay();
        const currentMoon = document.querySelector(`.moon:nth-child(${phaseDay})`);
        
        if (currentMoon) {
            // Remove highlight from all moons
            moons.forEach(moon => moon.classList.remove('current-phase'));
            // Add highlight to current phase
            currentMoon.classList.add('current-phase');
        }
    }

    // Highlight current moon phase on load
    highlightCurrentMoonPhase();

    moons.forEach(moon => {
        moon.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            centerImage.src = imageSrc;
            centerImage.style.display = 'block';
        });
    });

    // Close the center image when clicking on it
    centerImage.addEventListener('click', function() {
        this.style.display = 'none';
        this.src = '';
    });
});
