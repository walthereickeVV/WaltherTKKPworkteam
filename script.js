// Кастомный курсор
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// 3D-эффект наклона карточек (при движении мыши)
const cards = document.querySelectorAll('.vacancy-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
});

// Анимированные счётчики
const counters = document.querySelectorAll('.stat-number');
const animateNumbers = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        let current = 0;
        const increment = target / 50;
        const update = () => {
            current += increment;
            if (current < target) {
                counter.innerText = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                counter.innerText = target;
            }
        };
        update();
    });
};

// Запускаем, когда элемент в видимости
const heroStats = document.querySelector('.hero-stats');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            observer.disconnect();
        }
    });
});
if (heroStats) observer.observe(heroStats);

// Прогресс-бар анимация
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
if (progressFill) {
    setTimeout(() => {
        progressFill.style.width = '86%';
    }, 500);
}

// Модалка форма
const modal = document.getElementById('contactModal');
const openBtn = document.getElementById('openFormBtn');
const closeBtn = document.getElementById('closeModalBtn');

function openModal() {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

if (openBtn) openBtn.addEventListener('click', openModal);
if (closeBtn) closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// ESC закрывает модалку
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        closeModal();
    }
});

// Отправка формы (имитация в Telegram/консоль)
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('nameInput').value.trim();
        const phone = document.getElementById('phoneInput').value.trim();
        const job = document.getElementById('jobSelect').value;
        const agree = document.getElementById('agreeCheck').checked;
        
        if (!name || !phone || !agree) {
            alert('Пожалуйста, заполните все поля и согласитесь на обработку данных.');
            return;
        }
        
        // Имитация отправки в Telegram (в реальности заменить на fetch)
        const message = `Новая заявка!\nИмя: ${name}\nТелефон: ${phone}\nДолжность: ${job}`;
        console.log('🔨 Отправлено в Telegram (демо):', message);
        alert('✅ Заявка принята! Мы перезвоним вам в течение 10 минут.');
        closeModal();
        form.reset();
    });
}

// Кнопки "Выбрать" на карточках вакансий
const cardBtns = document.querySelectorAll('.card-btn');
cardBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const job = btn.getAttribute('data-job');
        const jobSelect = document.getElementById('jobSelect');
        if (jobSelect) {
            for (let i = 0; i < jobSelect.options.length; i++) {
                if (jobSelect.options[i].text === job || jobSelect.options[i].value === job) {
                    jobSelect.selectedIndex = i;
                    break;
                }
            }
        }
        openModal();
    });
});

// Мобильное меню (просто демо)
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.right = '20px';
            navLinks.style.background = '#1a2a3a';
            navLinks.style.padding = '20px';
            navLinks.style.borderRadius = '24px';
            navLinks.style.gap = '15px';
        }
    });
}

console.log('🏗️ PROFSTROY — второй сайт готов! Стройка нового поколения.');