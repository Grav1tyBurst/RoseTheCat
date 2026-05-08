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