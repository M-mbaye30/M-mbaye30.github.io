// Navigation mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fermer le menu mobile lors du clic sur un lien
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

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

// Navbar transparente au scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Animation des éléments au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer tous les éléments avec animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .expertise-card, .project-card, .contact-item, .timeline-item, .stat-item, .certification-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// LOGIQUE POUR LA SECTION STATISTIQUES
document.addEventListener('DOMContentLoaded', () => {
    // Animation des compteurs statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = stat.textContent;
            
            // Vérifier si c'est un nombre (pour les compteurs animés)
            if (target.includes('+') && !target.includes('septembre')) {
                const number = parseInt(target.replace('+', ''));
                animateCounter(stat, number, target.replace(/\d+/, ''));
            }
        });
    };
    
    // Observer pour déclencher l'animation au scroll
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target); // Animation une seule fois
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Fonction d'animation des compteurs
function animateCounter(element, target, suffix = '+') {
    let current = 0;
    const increment = target / 60; // Animation sur ~1 seconde (60fps)
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current) + suffix;
        
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        }
    }, 16);
}

// GESTION DU TOOLTIP DIPLÔMES (amélioration pour mobile)
document.addEventListener('DOMContentLoaded', () => {
    const diplomaStat = document.getElementById('diploma-stat');
    const tooltip = document.querySelector('.diploma-tooltip');
    
    if (diplomaStat && tooltip) {
        // Pour les appareils tactiles
        let isTooltipVisible = false;
        
        diplomaStat.addEventListener('click', (e) => {
            // Sur mobile, gérer le clic pour afficher/masquer le tooltip
            if (window.innerWidth <= 768) {
                e.preventDefault();
                isTooltipVisible = !isTooltipVisible;
                
                if (isTooltipVisible) {
                    tooltip.style.opacity = '1';
                    tooltip.style.visibility = 'visible';
                } else {
                    tooltip.style.opacity = '0';
                    tooltip.style.visibility = 'hidden';
                }
            }
        });
        
        // Fermer le tooltip en cliquant ailleurs sur mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && !diplomaStat.contains(e.target)) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
                isTooltipVisible = false;
            }
        });
        
        // Gestion responsive du tooltip
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                tooltip.style.opacity = '';
                tooltip.style.visibility = '';
                isTooltipVisible = false;
            }
        });
    }
});

// ANIMATION SPÉCIALE POUR LES CARTES DE CERTIFICATION
document.addEventListener('DOMContentLoaded', () => {
    const certificationCards = document.querySelectorAll('.certification-card');
    
    certificationCards.forEach((card, index) => {
        // Délai d'animation échelonné
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-cert');
    });
});

// Gestion des modales vidéo
const modal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeBtn = document.querySelector('.close');

// Fonction pour ouvrir la modale vidéo
function openVideoModal(videoId) {
    // Ici vous pouvez définir les chemins vers vos vidéos
    const videoSources = {
        'video1': 'videos/ner-demo.mp4',
        'video2': 'videos/rag-demo.mp4',
        'video3': 'videos/datalake-demo.mp4',
        'video4': 'videos/veille-demo.mp4',
        'video5': 'videos/sentiment-demo.mp4'
    };
    
    const videoSrc = videoSources[videoId];
    if (videoSrc) {
        modalVideo.src = videoSrc;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    } else {
        // Si pas de vidéo, afficher un message
        alert('Vidéo de démonstration bientôt disponible !');
    }
}

// Fermer la modale
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
        document.body.style.overflow = 'auto';
    });
}

// Fermer la modale en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.src = '';
        document.body.style.overflow = 'auto';
    }
});

// Animation du texte de la hero section
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'opacity 1s ease, transform 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
});

// Effet de parallaxe léger pour la hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const statsSection = document.querySelector('.stats-section');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Parallaxe léger pour la section stats aussi
    if (statsSection) {
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsSection.style.transform = `translateY(${scrolled * 0.1}px)`;
        }
    }
});

// GESTION AVANCÉE DES STATISTIQUES
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats-section');
    
    if (statsSection) {
        // Effet de particules flottantes (optionnel)
        createFloatingParticles();
        
        // Animation d'entrée des statistiques
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.style.animationDelay = `${index * 0.2}s`;
            item.classList.add('slide-in-bottom');
        });
    }
});

// Fonction pour créer des particules flottantes (effet visuel)
function createFloatingParticles() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: float ${5 + Math.random() * 5}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 5}s;
        `;
        statsSection.appendChild(particle);
    }
}

// Gestion des formulaires de contact (si vous en ajoutez)
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Exemple d'affichage d'un message de succès
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Message envoyé avec succès !';
    successMessage.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10b981;
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// GESTION AMÉLIORÉE DES LIENS DE NAVIGATION
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Mise à jour de la navigation active au scroll
    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});

// Gestion du thème sombre (optionnel)
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
}

// Charger le thème sauvegardé
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
});

// Gestion des liens externes
document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// Preloader (optionnel)
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Gestion des erreurs d'images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        console.warn('Image non trouvée:', this.src);
    });
});

// Animation des skill tags avec délai
document.addEventListener('DOMContentLoaded', () => {
    const skillTags = document.querySelectorAll('.skill-tag, .project-tech span, .card-tech span');
    skillTags.forEach((tag, index) => {
        tag.style.animationDelay = `${index * 0.05}s`;
        tag.classList.add('fade-in');
    });
});

// PERFORMANCE: Optimisation du scroll
let isScrolling = false;
window.addEventListener('scroll', () => {
    if (!isScrolling) {
        window.requestAnimationFrame(() => {
            // Code d'optimisation du scroll ici
            isScrolling = false;
        });
        isScrolling = true;
    }
});

// Ajout de styles CSS pour les nouvelles animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInBottom {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
    }
    
    .fade-in {
        animation: fadeIn 0.6s ease forwards;
    }
    
    .fade-in-cert {
        animation: slideInBottom 0.8s ease forwards;
    }
    
    .slide-in-bottom {
        animation: slideInBottom 0.6s ease forwards;
    }
    
    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    .floating-particle {
        pointer-events: none;
        z-index: 1;
    }
`;

document.head.appendChild(style);
