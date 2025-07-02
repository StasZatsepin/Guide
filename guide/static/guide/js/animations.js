// Анимации для проекта Gandalf Guide
document.addEventListener('DOMContentLoaded', function() {
    
    // Анимация элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами для анимации при скролле
    const scrollElements = document.querySelectorAll('h1, h2, h3, p, ul li, .img1, .img2');
    scrollElements.forEach((el, index) => {
        el.classList.add('scroll-animate');
        el.style.setProperty('--animation-order', index);
        observer.observe(el);
    });

    // Анимация для навигационных элементов
    const navItems = document.querySelectorAll('.navbar-nav .nav-item');
    navItems.forEach((item, index) => {
        item.style.setProperty('--animation-order', index);
    });

    // Плавная анимация для ссылок
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Анимация для изображений при загрузке
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Интерактивная анимация для декоративных элементов
    const decorativeElements = document.querySelectorAll('.body-staff, .body-hat');
    decorativeElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    });

    // Анимация для кнопок
    const buttons = document.querySelectorAll('.btn, .btn-primary');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Создаем эффект пульсации при клике
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Анимация для текста при наведении
    const textElements = document.querySelectorAll('p, li');
    textElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // Эффект параллакса для фона
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.body-staff, .body-hat');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Анимация для заголовков при скролле
    const headers = document.querySelectorAll('h1, h2, h3');
    headers.forEach(header => {
        header.addEventListener('mouseenter', function() {
            this.style.animation = 'glow 1s ease-in-out';
        });
        
        header.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Анимация для списков
    const listItems = document.querySelectorAll('ul li');
    listItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Эффект мерцания для золотых элементов
    const goldElements = document.querySelectorAll('.fst-italic, h1');
    goldElements.forEach(element => {
        setInterval(() => {
            element.style.textShadow = '0 0 8px var(--gandalf-gold)';
            setTimeout(() => {
                element.style.textShadow = '0 0 20px var(--gandalf-gold), 0 0 30px var(--gandalf-gold)';
            }, 100);
        }, 3000);
    });

    // Анимация для основного контейнера
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
        mainContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.01)';
        });
        
        mainContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    }

    // Добавляем CSS для ripple эффекта
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(212, 175, 55, 0.3);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .btn, .btn-primary {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);

    // Анимация загрузки страницы
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 1s ease-in-out';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    console.log('🎭 Анимации Gandalf Guide загружены!');
}); 