// =========== FUNCIONALIDADES PRINCIPAIS ===========

// Aguarda o DOM estar completamente carregado
document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeScrollAnimations();
    initializeSmoothScrolling();
    initializeAccessibility();
    initializeCarouselControls();
    initializePerformanceOptimizations();
    initializeAuthSystem();
});

// =========== MENU MOBILE ===========
function initializeMobileMenu() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    if (!hamburgerBtn || !mobileMenu) return;

    hamburgerBtn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle menu
        this.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-hidden', isExpanded);
        
        // Animar ícone do hamburguer
        this.classList.toggle('active');
        
        // Prevenir scroll do body quando menu está aberto
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });

    // Fechar menu ao clicar em um link
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            hamburgerBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!hamburgerBtn.contains(event.target) && !mobileMenu.contains(event.target)) {
            hamburgerBtn.setAttribute('aria-expanded', 'false');
            mobileMenu.classList.remove('active');
            mobileMenu.setAttribute('aria-hidden', 'true');
            hamburgerBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// =========== ANIMAÇÕES DE SCROLL ===========
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Adicionar classe fade-in aos elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll('.about-section, .services-section, .testimonials-section, .cta-section');
    
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });
}

// =========== SCROLL SUAVE ===========
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =========== MELHORIAS DE ACESSIBILIDADE ===========
function initializeAccessibility() {
    // Navegação por teclado melhorada
    document.addEventListener('keydown', function(e) {
        // ESC para fechar menu mobile
        if (e.key === 'Escape') {
            const mobileMenu = document.querySelector('.mobile-menu');
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                hamburgerBtn.click();
            }
        }
    });

    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #9F7AEA;
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Adicionar ID ao main
    const main = document.querySelector('main');
    if (main) {
        main.id = 'main-content';
    }
}

// =========== CONTROLES DO CARROSSEL ===========
function initializeCarouselControls() {
    const carousel = document.querySelector('.image-carousel');
    if (!carousel) return;

    // NUNCA pausar no hover: removidos listeners de mouseenter/mouseleave

    // Pausar carrossel quando não está visível (performance)
    const carouselObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });

    carouselObserver.observe(carousel);
}

// =========== OTIMIZAÇÕES DE PERFORMANCE ===========
function initializePerformanceOptimizations() {
    // Lazy loading para imagens
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Força o carregamento
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Debounce para eventos de scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        
        scrollTimeout = setTimeout(function() {
            // Executar ações que dependem do scroll aqui
            updateHeaderOnScroll();
        }, 100);
    });
}

// =========== HEADER DINÂMICO ===========
function updateHeaderOnScroll() {
    const header = document.querySelector('.header');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// =========== UTILITÁRIOS ===========

// Função para debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Função para throttle
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// =========== DETECÇÃO DE RECURSOS ===========
function checkBrowserSupport() {
    const features = {
        intersectionObserver: 'IntersectionObserver' in window,
        smoothScroll: 'scrollBehavior' in document.documentElement.style,
        cssVariables: CSS.supports('--custom-property', 'value'),
        backdropFilter: CSS.supports('backdrop-filter', 'blur(10px)')
    };

    // Fallbacks para navegadores mais antigos
    if (!features.cssVariables) {
        console.warn('CSS Variables não suportadas - usando fallbacks');
    }

    if (!features.intersectionObserver) {
        console.warn('Intersection Observer não suportado - animações podem não funcionar');
    }

    return features;
}

// =========== ANALYTICS E MONITORAMENTO ===========
function initializeAnalytics() {
    // Track de cliques em botões importantes
    const importantButtons = document.querySelectorAll('.btn-signin, .btn-login');
    
    importantButtons.forEach(button => {
        button.addEventListener('click', function() {
            // You can add Google Analytics or similar tracking here
            console.log('Button clicked:', this.textContent);
        });
    });

    // Track de tempo na página
    let startTime = Date.now();
    window.addEventListener('beforeunload', function() {
        const timeSpent = Date.now() - startTime;
        console.log('Time on page:', Math.round(timeSpent / 1000), 'seconds');
    });
}

// =========== INICIALIZAÇÃO FINAL ===========
// Executar verificações e inicializações adicionais
window.addEventListener('load', function() {
    checkBrowserSupport();
    initializeAnalytics();
    
    // Remover classe de loading se existir
    document.body.classList.remove('loading');
    
    console.log('LUME - Site loaded successfully!');
});

// =========== TRATAMENTO DE ERROS ===========
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can send errors to a monitoring service here
});

// =========== SERVICE WORKER (OPCIONAL) ===========
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('Service Worker registered:', registration);
            })
            .catch(function(error) {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// =========== SISTEMA DE AUTENTICAÇÃO ===========
function initializeAuthSystem() {
    // Elementos do DOM
    const loginBtn = document.getElementById('loginBtn');
    const signInBtn = document.getElementById('signInBtn');
    const navButtons = document.getElementById('navButtons');
    const userProfile = document.getElementById('userProfile');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Modais
    const loginModal = document.getElementById('loginModal');
    const signInModal = document.getElementById('signInModal');
    const closeLoginModal = document.getElementById('closeLoginModal');
    const closeModal = document.getElementById('closeModal');
    
    // Formulários
    const loginForm = document.getElementById('loginForm');
    const signInForm = document.getElementById('signInForm');
    const loginMessage = document.getElementById('loginMessage');
    const formMessage = document.getElementById('formMessage');

    // Verificar se usuário já está logado
    checkUserSession();

    // Event Listeners - Login
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openLoginModal();
        });
    }

    // Event Listeners - SignIn
    if (signInBtn) {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSignInModal();
        });
    }

    // Event Listeners - Perfil
    if (userProfile) {
        userProfile.addEventListener('click', function(e) {
            e.preventDefault();
            showUserMenu();
        });
    }

    // Event Listener - Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleLogout();
        });
    }

    // Fechar modais
    if (closeLoginModal) {
        closeLoginModal.addEventListener('click', closeLoginModalHandler);
    }
    if (closeModal) {
        closeModal.addEventListener('click', closeSignInModalHandler);
    }

    // Fechar modais ao clicar fora
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) closeLoginModalHandler();
    });
    signInModal.addEventListener('click', function(e) {
        if (e.target === signInModal) closeSignInModalHandler();
    });

    // Fechar modais com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (loginModal.classList.contains('active')) closeLoginModalHandler();
            if (signInModal.classList.contains('active')) closeSignInModalHandler();
        }
    });

    // Submeter formulários
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    if (signInForm) {
        signInForm.addEventListener('submit', handleSignIn);
    }

    // Funções do Login Modal
    function openLoginModal() {
        loginModal.classList.add('active');
        loginModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.getElementById('loginEmail').focus();
        }, 100);
    }

    function closeLoginModalHandler() {
        loginModal.classList.remove('active');
        loginModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        loginForm.reset();
        hideLoginMessage();
    }

    // Funções do SignIn Modal (mantidas do código anterior)
    function openSignInModal() {
        signInModal.classList.add('active');
        signInModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => {
            document.getElementById('email').focus();
        }, 100);
    }

    function closeSignInModalHandler() {
        signInModal.classList.remove('active');
        signInModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
        signInForm.reset();
        hideSignInMessage();
    }

    // Funções de mensagem
    function showLoginMessage(message, type) {
        loginMessage.textContent = message;
        loginMessage.className = `form-message ${type}`;
    }

    function hideLoginMessage() {
        loginMessage.className = 'form-message';
        loginMessage.textContent = '';
    }

    function showSignInMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;
    }

    function hideSignInMessage() {
        formMessage.className = 'form-message';
        formMessage.textContent = '';
    }

    // Mostrar perfil do usuário logado
    function showUserProfile(user) {
        // Esconde apenas os botões de login/signin
        loginBtn.style.display = 'none';
        signInBtn.style.display = 'none';
        // Mostra o perfil
        userProfile.style.display = 'flex';
        userName.textContent = user.email.split('@')[0]; // Mostra só a parte antes do @
    }

    // Mostrar botões de autenticação
    function showAuthButtons() {
        // Mostra os botões de login/signin
        loginBtn.style.display = 'inline-block';
        signInBtn.style.display = 'inline-block';
        // Esconde o perfil
        userProfile.style.display = 'none';
    }

    // Verificar sessão do usuário
    function checkUserSession() {
        const currentUser = localStorage.getItem('lume_user');
        if (currentUser) {
            const user = JSON.parse(currentUser);
            showUserProfile(user);
        } else {
            showAuthButtons();
        }
    }

    // Handle Login
    async function handleLogin(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const submitButton = e.target.querySelector('.btn-submit');

        // Validações básicas
        if (!email || !password) {
            showLoginMessage('Please fill in all fields', 'error');
            return;
        }

        // Desabilitar botão durante processamento
        submitButton.disabled = true;
        submitButton.textContent = 'Logging in...';

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                showLoginMessage('Login successful! Redirecting...', 'success');
                
                // Salvar sessão
                localStorage.setItem('lume_user', JSON.stringify(data.user));
                
                setTimeout(() => {
                    closeLoginModalHandler();
                    showUserProfile(data.user);
                }, 1500);
            } else {
                showLoginMessage(data.error || 'Invalid credentials', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            showLoginMessage('Connection error. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Login';
        }
    }

    // Handle SignIn (mantida do código anterior)
    async function handleSignIn(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const submitButton = e.target.querySelector('.btn-submit');

        // Validações básicas
        if (!email || !password || !confirmPassword) {
            showSignInMessage('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showSignInMessage('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            showSignInMessage('Password must be at least 6 characters', 'error');
            return;
        }

        // Desabilitar botão durante processamento
        submitButton.disabled = true;
        submitButton.textContent = 'Creating account...';

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const data = await response.json();

            if (response.ok) {
                showSignInMessage('Account created successfully! Redirecting...', 'success');
                setTimeout(() => {
                    closeSignInModalHandler();
                    console.log('User registered:', data);
                }, 2000);
            } else {
                showSignInMessage(data.error || 'Error creating account', 'error');
            }
        } catch (error) {
            console.error('Registration error:', error);
            showSignInMessage('Connection error. Please try again.', 'error');
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Sign In';
        }
    }

    // Menu do usuário (logout)
    function handleLogout() {
        if (confirm('Do you want to logout?')) {
            localStorage.removeItem('lume_user');
            showAuthButtons();
            console.log('User logged out');
        }
    }
}
