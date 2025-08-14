// ===== NAVEGACIÓN SUAVE =====
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===== CAMBIO DE FONDO DEL HEADER AL HACER SCROLL =====
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// ===== ANIMACIONES AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos del menú para animaciones
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});

// ===== MENÚ MÓVIL =====
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('mobile-open');
        });

        // Cerrar menú móvil al hacer clic en un enlace
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('mobile-open');
            });
        });

        // Cerrar menú móvil al hacer clic fuera de él
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
            }
        });
    }
});

// ===== EFECTOS ADICIONALES =====
// Efecto parallax suave para la sección hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// ===== ANIMACIÓN DE CONTADOR PARA PRECIOS =====
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const currentValue = Math.floor(progress * (end - start) + start);
        element.innerHTML = `₡${currentValue.toLocaleString()}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observar precios para animarlos cuando entren en viewport
const priceObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const priceText = entry.target.textContent;
            const priceNumber = parseInt(priceText.replace(/[₡,]/g, ''));
            entry.target.dataset.animated = 'true';
            animateValue(entry.target, 0, priceNumber, 1000);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.price').forEach(price => {
        priceObserver.observe(price);
    });
});

// ===== LOADING EFFECT PARA IMÁGENES =====
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.menu-item img');
    
    images.forEach(img => {
        // Agregar clase de loading
        img.classList.add('loading');
        
        // Cuando la imagen cargue completamente
        img.addEventListener('load', function() {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
        
        // Si la imagen ya está cargada (cache)
        if (img.complete) {
            img.classList.remove('loading');
            img.classList.add('loaded');
        }
    });
});

// ===== SCROLL TO TOP FUNCTIONALITY =====
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background: #ff6b35;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/ocultar botón según scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top al hacer clic
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Crear el botón cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', createScrollToTopButton);

// ===== VALIDACIÓN DE FORMULARIOS (si se agregan en el futuro) =====
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    return isValid;
}

// ===== CONSOLE LOG PARA DEBUGGING =====
console.log('🍗 Pollos el Minero - JavaScript cargado correctamente');
console.log('📱 Para soporte: https://wa.me/50683149916');