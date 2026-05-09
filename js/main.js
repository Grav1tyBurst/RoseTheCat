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
        // Если элементы не найдены, используем alert как запасной вариант
        alert(message);
    }
}

function closeNotification() {
    const notification = document.getElementById('custom-notification');
    const overlay = document.getElementById('overlay');
    
    if (notification) notification.style.display = 'none';
    if (overlay) overlay.style.display = 'none';
}

// Функция для открытия модального окна с фото (если используется на странице)
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

console.log('main.js загружен — сайт Розы готов к работе! 🐾');

// Анимация появления блоков при скролле
const fadeElements = document.querySelectorAll('.section, .hero, .gallery-main, .page-header, .guestbook-section, .form-area, .entries-log, .counter-wrapper');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Кнопка "Наверх"
const goTopBtn = document.createElement('button');
goTopBtn.className = 'go-top';
goTopBtn.innerHTML = 'Наверх!';
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

// Исправленный IntersectionObserver для блоков
const fadeElements = document.querySelectorAll('.section, .hero, .gallery-main, .page-header, .guestbook-section, .form-area, .entries-log, .counter-wrapper');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Можно observer.unobserve(entry.target) — чтобы не следить за уже показанными
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Выезжающие картинки кошки
// Замените 'cat.png' на имя вашего файла с кошкой (прозрачный фон)
const leftCat = document.createElement('img');
leftCat.className = 'cat-slide left';
leftCat.src = 'images/cat-silhouette.png';  // замените на свою картинку
leftCat.alt = '';
document.body.appendChild(leftCat);

const rightCat = document.createElement('img');
rightCat.className = 'cat-slide right';
rightCat.src = 'images/cat-silhouette.png';  // замените на свою картинку
rightCat.alt = '';
document.body.appendChild(rightCat);

let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(function() {
            const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Левая картинка выезжает при прокрутке 0–40%
            let leftOffset = 0;
            if (scrollPercent <= 0.4) {
                leftOffset = (scrollPercent / 0.4) * 100;
                leftOffset = Math.min(Math.max(leftOffset, 0), 100);
            } else {
                leftOffset = 100;
            }
            leftCat.style.transform = `translateX(${-100 + leftOffset}%)`;
            
            // Правая картинка выезжает при прокрутке 30–100%
            let rightOffset = 0;
            if (scrollPercent > 0.3) {
                rightOffset = ((scrollPercent - 0.3) / 0.7) * 100;
                rightOffset = Math.min(Math.max(rightOffset, 0), 100);
            }
            rightCat.style.transform = `translateX(${100 - rightOffset}%)`;
            
            ticking = false;
        });
        ticking = true;
    }
});

// Для телефонов — чуть уменьшаем чувствительность
if (window.innerWidth <= 768) {
    leftCat.style.width = '70px';
    rightCat.style.width = '70px';
}
