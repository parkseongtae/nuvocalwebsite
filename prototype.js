const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks');
const railViewport = document.getElementById('programRail');
const prevRailButton = document.querySelector('[data-rail-dir="-1"]');
const nextRailButton = document.querySelector('[data-rail-dir="1"]');
const yearNode = document.getElementById('currentYear');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('is-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

const scrollRailByAmount = (direction) => {
    if (!railViewport) return;
    const amount = Math.min(railViewport.clientWidth * 0.9, 420);
    railViewport.scrollBy({
        left: amount * direction,
        behavior: 'smooth',
    });
};

prevRailButton?.addEventListener('click', () => scrollRailByAmount(-1));
nextRailButton?.addEventListener('click', () => scrollRailByAmount(1));

if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
}
