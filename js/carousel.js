// Карусель фактов
function initCarousel() {
    const factCards = document.querySelectorAll('.fact-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');

    if (factCards.length === 0) return;

    let currentFact = 0;
    const totalFacts = factCards.length;

    function showFact(index) {
        factCards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        factCards[index].classList.add('active');
        dots[index].classList.add('active');
        currentFact = index;
    }

    function nextFact() {
        let newIndex = currentFact + 1;
        if (newIndex >= totalFacts) newIndex = 0;
        showFact(newIndex);
    }

    function prevFact() {
        let newIndex = currentFact - 1;
        if (newIndex < 0) newIndex = totalFacts - 1;
        showFact(newIndex);
    }

    if (prevBtn) prevBtn.addEventListener('click', prevFact);
    if (nextBtn) nextBtn.addEventListener('click', nextFact);

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showFact(index));
    });

    // Свайпы на телефоне
    const carousel = document.querySelector('.facts-carousel');
    if (carousel) {
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) nextFact();
            if (touchEndX > touchStartX + 50) prevFact();
        });
    }
}

// Запускаем карусель после загрузки страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
} else {
    initCarousel();
}
