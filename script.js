document.addEventListener("DOMContentLoaded", () => {

  const moons = document.querySelectorAll(".moon");

  const centerImage = document.getElementById("center-image");
  const centerTitle = document.getElementById("center-title");
  const centerArtist = document.getElementById("center-artist");

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalArtist = document.getElementById("modal-artist");
  const closeModal = document.getElementById("close-modal");

  const moonRing = document.getElementById("moonRing");

  if (!moons.length || !centerImage) return;

  /* ======================================
     HOVER + CLICK INTERACTIONS
  ====================================== */

  moons.forEach((moon) => {

    // 🌙 HOVER
    moon.addEventListener("mouseenter", () => {
      const img = moon.dataset.image;
      const title = moon.dataset.title;
      const artist = moon.dataset.artist;

      centerImage.src = img;
      centerImage.style.opacity = "1";

      centerTitle.textContent = title;
      centerArtist.textContent = artist;

      centerTitle.style.opacity = "1";
      centerArtist.style.opacity = "1";

      // ✅ UPDATED: force upright
      centerImage.parentElement.style.transform =
        "translate(-50%, -50%) scale(1) rotate(0deg)";
    });

    moon.addEventListener("mouseleave", () => {
      centerImage.style.opacity = "0";
      centerTitle.style.opacity = "0";
      centerArtist.style.opacity = "0";

      // ✅ UPDATED: force upright
      centerImage.parentElement.style.transform =
        "translate(-50%, -50%) scale(0.85) rotate(0deg)";
    });

    // 🌙 CLICK → OPEN MODAL
    moon.addEventListener("click", () => {
      if (!modal) return;

      modal.style.display = "flex";

      modalImg.src = moon.dataset.image;
      modalTitle.textContent = moon.dataset.title;
      modalArtist.textContent = moon.dataset.artist;
    });

  });


  /* ======================================
     REAL LUNAR PHASE CALCULATION
  ====================================== */

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

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

});