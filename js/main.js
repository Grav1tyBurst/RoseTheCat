function showNotification(message) {
    const notification = document.getElementById('custom-notification');
    const messageEl = document.getElementById('notification-message');
    const overlay = document.getElementById('overlay');
    
    if (notification && messageEl && overlay) {
        messageEl.innerText = message;
        notification.style.display = 'block';
        overlay.style.display = 'block';
    } else {
        alert(message);
    }
}

function closeNotification() {
    const notification = document.getElementById('custom-notification');
    const overlay = document.getElementById('overlay');
    if (notification) notification.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
}

document.querySelectorAll('.nav-link[data-section]').forEach(link => {
    link.addEventListener('click', function(e) {
        const sectionId = this.getAttribute('data-section');
        if (sectionId === 'pet') {
            window.location.href = 'pet.html';
        } else {
            const target = document.getElementById(sectionId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    });
});

function openModal(imgSrc, modalId = 'imageModal', imgId = 'modalImg') {
    const modal = document.getElementById(modalId);
    const modalImg = document.getElementById(imgId);
    if (modal && modalImg) {
        modal.style.display = 'block';
        modalImg.src = imgSrc;
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId = 'imageModal') {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        closeNotification();
    }
});

document.addEventListener('click', function(e) {
    const overlay = document.getElementById('overlay');
    if (e.target === overlay) {
        closeNotification();
    }
});

// ========== АНИМАЦИЯ БЛОКОВ (СЛЕВА И СПРАВА) ==========
const fadeElements = document.querySelectorAll('.section, .hero, .gallery-main, .page-header, .guestbook-section, .form-area, .entries-log, .counter-wrapper, .paw-divider, .features-block, .closing-block, .footer-signature');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, { threshold: 0.15 });

fadeElements.forEach((el, index) => {
    const direction = index % 2 === 0 ? 'left' : 'right';
    el.classList.add('fade-in', `fade-${direction}`);
    observer.observe(el);
});

// ========== КНОПКА НАВЕРХ ==========
const goTopBtn = document.createElement('button');
goTopBtn.className = 'go-top';
goTopBtn.innerHTML = 'Вверх';
goTopBtn.setAttribute('aria-label', 'Наверх');
document.body.appendChild(goTopBtn);

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        goTopBtn.classList.add('show');
    } else {
        goTopBtn.classList.remove('show');
    }
});

goTopBtn.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== ВЫЕЗЖАЮЩИЕ СИЛУЭТЫ ==========
const leftCat = document.createElement('img');
leftCat.className = 'cat-slide left';
leftCat.src = 'images/cat-silhouette.png';
leftCat.alt = '';
leftCat.style.width = '100px';
document.body.appendChild(leftCat);

const rightCat = document.createElement('img');
rightCat.className = 'cat-slide right';
rightCat.src = 'images/cat-silhouette.png';
rightCat.alt = '';
rightCat.style.width = '100px';
document.body.appendChild(rightCat);

let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            let leftOffset = scrollPercent <= 0.4 ? (scrollPercent / 0.4) * 100 : 100;
            leftOffset = Math.min(Math.max(leftOffset, 0), 100);
            leftCat.style.transform = `translateX(${-100 + leftOffset}%)`;
            
            let rightOffset = scrollPercent > 0.3 ? ((scrollPercent - 0.3) / 0.7) * 100 : 0;
            rightOffset = Math.min(Math.max(rightOffset, 0), 100);
            rightCat.style.transform = `translateX(${100 - rightOffset}%)`;
            
            ticking = false;
        });
        ticking = true;
    }
});

// ========== КАРУСЕЛЬ ФАКТОВ ==========
setTimeout(() => {
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
}, 100);

// ========== ЗАКРЫТИЕ ФОТО СВАЙПОМ ВНИЗ НА ТЕЛЕФОНЕ ==========
function addSwipeToClose(modalId, imgId, closeFunction) {
    const modal = document.getElementById(modalId);
    const modalImg = document.getElementById(imgId);
    
    if (!modal || !modalImg) return;
    
    let touchStartY = 0;
    let touchStartX = 0;
    let isSwiping = false;
    
    modalImg.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
        isSwiping = true;
    }, { passive: true });
    
    modalImg.addEventListener('touchmove', function(e) {
        if (!isSwiping) return;
        
        const currentY = e.touches[0].clientY;
        const deltaY = currentY - touchStartY;
        const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
        
        // Если движение вниз и не горизонтальное (не переключение фото)
        if (deltaY > 50 && deltaX < 50) {
            e.preventDefault();
            closeFunction();
            isSwiping = false;
        }
    });
    
    modalImg.addEventListener('touchend', function() {
        isSwiping = false;
    });
}

// Навешиваем свайп на модальные окна
if (window.innerWidth <= 768) {
    setTimeout(() => {
        addSwipeToClose('imageModal', 'imageModalImg', closeImageModal);
        addSwipeToClose('modal', 'modalImg', closeModal);
    }, 100);
}

// ========== ЗАКРЫТИЕ ФОТО СВАЙПОМ ВНИЗ НА ТЕЛЕФОНЕ ==========
if ('ontouchstart' in window) {  // только для устройств с касанием
    function addSwipeToClose(modalId, imgId, closeFunction) {
        const modal = document.getElementById(modalId);
        const modalImg = document.getElementById(imgId);
        
        if (!modal || !modalImg) return;
        
        let touchStartY = 0;
        let touchStartX = 0;
        let isSwiping = false;
        
        modalImg.addEventListener('touchstart', function(e) {
            touchStartY = e.touches[0].clientY;
            touchStartX = e.touches[0].clientX;
            isSwiping = true;
        }, { passive: true });
        
        modalImg.addEventListener('touchmove', function(e) {
            if (!isSwiping) return;
            
            const currentY = e.touches[0].clientY;
            const deltaY = currentY - touchStartY;
            const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
            
            // Если свайп вниз и не горизонтальный
            if (deltaY > 50 && deltaX < 50) {
                e.preventDefault();
                closeFunction();
                isSwiping = false;
            }
        });
        
        modalImg.addEventListener('touchend', function() {
            isSwiping = false;
        });
    }
    
    // Добавляем свайп после загрузки страницы
    setTimeout(() => {
        addSwipeToClose('imageModal', 'imageModalImg', function() {
            if (typeof closeImageModal === 'function') closeImageModal();
        });
        addSwipeToClose('modal', 'modalImg', function() {
            if (typeof closeModal === 'function') closeModal();
        });
    }, 100);
}

// ========== ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА НА ПК ПО КЛИКУ ВНЕ ФОТО ==========
function addCloseOnClickOutside(modalId, modalImgId, closeFunction) {
    const modal = document.getElementById(modalId);
    const modalImg = document.getElementById(modalImgId);
    
    if (!modal) return;
    
    modal.addEventListener('click', function(e) {
        // Если кликнули по фону (самому modal)
        if (e.target === modal) {
            closeFunction();
        }
    });
    
    // Чтобы клик по фото не закрывал окно (если хотите закрывать — уберите этот блок)
    if (modalImg) {
        modalImg.addEventListener('click', function(e) {
            e.stopPropagation();
            // Если хотите закрывать и по фото — раскомментируйте следующую строку:
            // closeFunction();
        });
    }
}

// Добавляем для ПК (где нет касаний)
if (!('ontouchstart' in window)) {
    setTimeout(() => {
        addCloseOnClickOutside('imageModal', 'imageModalImg', function() {
            if (typeof closeImageModal === 'function') closeImageModal();
        });
        addCloseOnClickOutside('modal', 'modalImg', function() {
            if (typeof closeModal === 'function') closeModal();
        });
    }, 100);
}

console.log('main.js загружен — сайт Розы готов к работе! 🐾');
