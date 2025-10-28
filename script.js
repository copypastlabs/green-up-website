// Smooth scrolling pour les liens de navigation
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

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observer tous les éléments à animer
document.querySelectorAll('.feature-card, .impact-stat, .contact-item').forEach(el => {
    observer.observe(el);
});

// Header qui change au scroll
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animation des chiffres dans la section Impact
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (element.textContent.includes('tonnes')) {
            element.textContent = value.toLocaleString('fr-FR') + ' tonnes';
        } else if (element.textContent.includes('+')) {
            element.textContent = value.toLocaleString('fr-FR') + '+';
        } else {
            element.textContent = value.toLocaleString('fr-FR');
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Observer pour la section Impact
const impactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = document.querySelectorAll('.impact-number');
            numbers[0].textContent = '5,000+';
            numbers[1].textContent = '250 tonnes';
            numbers[2].textContent = '100,000+';
            
            animateValue(numbers[0], 0, 5000, 2000);
            animateValue(numbers[1], 0, 250, 2000);
            animateValue(numbers[2], 0, 100000, 2000);
            
            impactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const impactSection = document.querySelector('.impact');
if (impactSection) {
    impactObserver.observe(impactSection);
}

// Ajouter un effet parallax léger au hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Gestion du clic sur les boutons CTA (à remplacer par vos vrais liens)
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', (e) => {
        // Ici, vous pouvez ajouter le lien vers votre app store
        // window.location.href = 'VOTRE_LIEN_APP_STORE';
        
        // Animation temporaire
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 100);
    });
});

// Menu mobile (hamburger) - optionnel
function createMobileMenu() {
    if (window.innerWidth <= 768) {
        const nav = document.querySelector('.nav');
        const navLinks = document.querySelector('.nav-links');
        
        if (!document.querySelector('.hamburger')) {
            const hamburger = document.createElement('div');
            hamburger.className = 'hamburger';
            hamburger.innerHTML = '<span></span><span></span><span></span>';
            nav.appendChild(hamburger);
            
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }
    }
}

// CSS pour le menu mobile (sera ajouté dynamiquement)
const mobileMenuStyles = `
    .hamburger {
        display: none;
        flex-direction: column;
        cursor: pointer;
        gap: 5px;
    }
    
    .hamburger span {
        width: 25px;
        height: 3px;
        background: var(--text-dark);
        transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .hamburger {
            display: flex;
        }
        
        .nav-links {
            position: fixed;
            top: 80px;
            left: -100%;
            flex-direction: column;
            background: white;
            width: 100%;
            padding: 20px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
            transition: left 0.3s ease;
        }
        
        .nav-links.active {
            left: 0;
            display: flex;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Initialiser le menu mobile
createMobileMenu();
window.addEventListener('resize', createMobileMenu);

// Animation de fade-in pour les éléments
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('🌱 Green\'up website loaded successfully!');
