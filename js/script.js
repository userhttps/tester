// Configuração inicial quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initTypeWriter();
    initScrollEffects();
    initParticles();
    initNavigation();
    initBackToTop();
    initCounterAnimation();
    initLoadingScreen();
    initIntersectionObserver();
    initCustomCursor();
    
    console.log('STUDIO MV - Site carregado com sucesso!');
});

// Efeito de digitação para o slogan
function initTypeWriter() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;
    
    const text = tagline.textContent;
    tagline.textContent = '';
    
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            tagline.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    // Inicia a animação após um breve delay
    setTimeout(typeWriter, 500);
}

// Efeitos de scroll
function initScrollEffects() {
    // Removemos o parallax problemático e usamos background fixo
    
    // Ativar links de navegação baseado na scroll position
    window.addEventListener('scroll', highlightNavLink);
}

// Criar partículas animadas
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamanho aleatório entre 2px e 5px
        const size = Math.random() * 3 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posição horizontal aleatória
        particle.style.left = `${Math.random() * 100}%`;
        
        // Atraso aleatório na animação
        particle.style.animationDelay = `${Math.random() * 15}s`;
        
        // Duração aleatória da animação
        const duration = 15 + Math.random() * 10;
        particle.style.animationDuration = `${duration}s`;
        
        // Opacidade aleatória
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        
        particlesContainer.appendChild(particle);
    }
}

// Navegação responsiva
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animação do ícone hamburger
            const spans = this.querySelectorAll('span');
            if (navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
}

// Botão Voltar ao Topo
function initBackToTop() {
    const backToTopButton = document.getElementById('back-to-top');
    
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animação de contadores
function initCounterAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-count'));
                const duration = 2000; // 2 segundos
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                statNumber.classList.add('animated');
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        statNumber.textContent = target;
                        clearInterval(timer);
                    } else {
                        statNumber.textContent = Math.floor(current);
                    }
                }, 16);
                
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        observer.observe(stat);
    });
}

// Tela de carregamento
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        // Simular tempo de carregamento (remover em produção)
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            
            // Remover completamente após a animação
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1500);
    }
}

// Observer para animações de entrada
function initIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    // Observar elementos para animação
    document.querySelectorAll('.profile-card, .link-card, .about-section, .testimonials-section, .contact-section, .cta-section').forEach(el => {
        observer.observe(el);
    });
}

// Destacar link de navegação ativo
function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Cursor personalizado
function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'custom-cursor-follower';
    document.body.appendChild(cursorFollower);
    
    // Apenas para desktop
    if (window.innerWidth > 480) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        // Efeito ao passar sobre elementos interativos
        const interactiveElements = document.querySelectorAll('a, button, .link-card, .social-link');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.background = 'rgba(255, 51, 102, 0.8)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.2)';
                cursorFollower.style.borderColor = 'rgba(255, 51, 102, 0.5)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.background = 'rgba(255, 51, 102, 0.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.borderColor = 'rgba(255, 51, 102, 0.3)';
            });
        });
    }
}

// Efeito de clique nos cards
document.addEventListener('DOMContentLoaded', function() {
    const linkCards = document.querySelectorAll('.link-card');
    linkCards.forEach(card => {
        card.addEventListener('click', function() {
            // Efeito de clique visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Prevenir comportamento padrão de links vazios
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});

// Otimização de performance - Lazy loading para imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}