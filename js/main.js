// Уведомления для главной страницы (с кнопкой "Мяу")
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

// Функция для открытия модального окна с фото
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

// Закрытие по ESC
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

// Закрытие по клику на фон (overlay для уведомлений)
document.addEventListener('click', function(e) {
    const overlay = document.getElementById('overlay');
    if (e.target === overlay) {
        closeNotification();
    }
});

// ========== АНИМАЦИЯ БЛОКОВ ПРИ СКРОЛЛЕ ==========
const fadeElements = document.querySelectorAll('.section, .hero, .gallery-main, .page-header, .guestbook-section, .form-area, .entries-log, .counter-wrapper, .paw-divider, .features-block, .closing-block');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -30px 0px" });

fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// ========== КНОПКА "НАВЕРХ" ==========
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
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== ВЫЕЗЖАЮЩИЕ ЛАПКИ (без картинок) ==========
const leftPaw = document.createElement('div');
leftPaw.className = 'cat-slide left';
leftPaw.innerHTML = '🐾';
leftPaw.style.fontSize = '5rem';
leftPaw.style.opacity = '0.2';
leftPaw.style.fontFamily = 'monospace';
document.body.appendChild(leftPaw);

const rightPaw = document.createElement('div');
rightPaw.className = 'cat-slide right';
rightPaw.innerHTML = '🐾';
rightPaw.style.fontSize = '5rem';
rightPaw.style.opacity = '0.2';
rightPaw.style.fontFamily = 'monospace';
document.body.appendChild(rightPaw);

let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Левая лапка выезжает при прокрутке 0–40%
            let leftOffset = 0;
            if (scrollPercent <= 0.4) {
                leftOffset = (scrollPercent / 0.4) * 100;
                leftOffset = Math.min(Math.max(leftOffset, 0), 100);
            } else {
                leftOffset = 100;
            }
            leftPaw.style.transform = `translateX(${-100 + leftOffset}%)`;
            
            // Правая лапка выезжает при прокрутке 30–100%
            let rightOffset = 0;
            if (scrollPercent > 0.3) {
                rightOffset = ((scrollPercent - 0.3) / 0.7) * 100;
                rightOffset = Math.min(Math.max(rightOffset, 0), 100);
            }
            rightPaw.style.transform = `translateX(${100 - rightOffset}%)`;
            
            ticking = false;
        });
        ticking = true;
    }
});

console.log('main.js загружен — сайт Розы готов к работе! 🐾');
