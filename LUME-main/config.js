// =========== CONFIGURAÇÕES DO PROJETO LUME ===========

const LUME_CONFIG = {
    // Configurações gerais
    app: {
        name: 'LUME',
        version: '1.0.0',
        description: 'Your digital sanctuary for mental well-being',
        tagline: 'Breathe. Focus. Move forward.'
    },

    // Configurações de cores
    colors: {
        primary: '#9F7AEA',
        primaryDark: '#8B5CF6',
        secondary: '#2f855a',
        secondaryDark: '#276749',
        background: '#FBF3E4',
        text: '#2d3748',
        textLight: '#4a5568',
        textMuted: '#a0aec0',
        white: '#ffffff',
        border: '#e2e8f0'
    },

    // Configurações de tipografia
    typography: {
        primaryFont: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        displayFont: 'Playfair Display, Georgia, "Times New Roman", serif',
        baseSize: '16px',
        lineHeight: 1.6
    },

    // Configurações de animação
    animation: {
        duration: {
            fast: '0.2s',
            normal: '0.3s',
            slow: '0.5s'
        },
        easing: 'ease-in-out',
        carouselSpeed: '20s'
    },

    // Configurações de breakpoints
    breakpoints: {
        mobile: '480px',
        tablet: '768px',
        laptop: '1024px',
        desktop: '1200px'
    },

    // Configurações de performance
    performance: {
        lazyLoading: true,
        intersectionObserver: true,
        debounceDelay: 100,
        throttleDelay: 200
    },

    // Configurações de acessibilidade
    accessibility: {
        skipLinkText: 'Skip to main content',
        focusOutline: '2px solid #9F7AEA',
        focusOffset: '2px',
        reducedMotion: true
    },

    // Configurações de SEO
    seo: {
        title: 'LUME - Your Digital Sanctuary for Mental Well-being',
        description: 'LUME - Your digital sanctuary for mental well-being. Therapeutic paths, guided meditations, and a personalized emotional journal.',
        keywords: 'mental well-being, meditation, therapeutic paths, emotional journal, mental health',
        author: 'LUME',
        ogType: 'website'
    },

    // Configurações de redes sociais
    social: {
        facebook: '#',
        instagram: '#',
        twitter: '#',
        linkedin: '#',
        youtube: '#'
    },

    // Configurações de navegação
    navigation: {
        links: [
            { text: 'THERAPEUTIC PATHS', href: '#', ariaLabel: 'Therapeutic paths' },
            { text: 'MEDITATION', href: '#', ariaLabel: 'Guided meditations' },
            { text: 'EMOTIONAL JOURNAL', href: '#', ariaLabel: 'Emotional journal' },
            { text: 'PERSONALIZED PATHS', href: '#', ariaLabel: 'Personalized paths' }
        ]
    },

    // Configurações de conteúdo
    content: {
        sections: {
            hero: {
                title: 'Breathe. Focus.',
                subtitle: 'Move forward.',
                description: 'Your digital sanctuary for mental well-being'
            },
            about: {
                title: 'Who we are?',
                content: 'Modern life is fast-paced and, at times, overwhelming...'
            },
            services: {
                title: 'What we do?',
                items: [
                    {
                        title: 'Therapeutic paths',
                        description: 'Follow audio-guided journeys and interactive exercises...'
                    },
                    {
                        title: 'Guided meditations',
                        description: 'Find calm pauses in your day...'
                    },
                    {
                        title: 'Emotional Journal',
                        description: 'A safe space to record and understand your feelings...'
                    },
                    {
                        title: 'Personalized paths',
                        description: 'Based on your journal entries, LUME suggests content...'
                    }
                ]
            },
            testimonials: {
                title: 'Who is LUME for?',
                subtitle: 'What Our Users Says?',
                items: [
                    {
                        text: 'The Emotional Journal changed how I process my feelings...',
                        author: 'Mariana V., Lawyer'
                    },
                    {
                        text: 'I could never truly meditate until I found the Guided Paths...',
                        author: 'Lucas P., Developer'
                    }
                ]
            },
            cta: {
                title: 'Ready to breathe?',
                description: 'Sign up and start your journey to mental well-being.',
                buttonText: 'Sign In'
            }
        }
    },

    // Configurações de analytics
    analytics: {
        enabled: false,
        trackingId: '', // Google Analytics ID
        events: {
            buttonClick: true,
            formSubmit: true,
            pageView: true,
            scrollDepth: true
        }
    },

    // Configurações de cache
    cache: {
        enabled: true,
        version: '1.0.0',
        maxAge: 86400 // 24 horas em segundos
    },

    // Configurações de API (futuro)
    api: {
        baseUrl: '',
        endpoints: {
            auth: '/auth',
            users: '/users',
            content: '/content',
            analytics: '/analytics'
        },
        timeout: 10000
    },

    // Configurações de desenvolvimento
    development: {
        debug: false,
        logLevel: 'info',
        hotReload: false
    }
};

// Exportar configuração para uso global
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LUME_CONFIG;
} else if (typeof window !== 'undefined') {
    window.LUME_CONFIG = LUME_CONFIG;
}

// Função utilitária para acessar configurações
function getConfig(path) {
    return path.split('.').reduce((obj, key) => obj && obj[key], LUME_CONFIG);
}

// Função para validar configurações
function validateConfig() {
    const required = ['app.name', 'colors.primary', 'typography.primaryFont'];
    const missing = required.filter(key => !getConfig(key));
    
    if (missing.length > 0) {
        console.warn('Configurações obrigatórias ausentes:', missing);
        return false;
    }
    
    return true;
}

// Validar configurações ao carregar
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', function() {
        if (LUME_CONFIG.development.debug) {
            console.log('LUME Config carregada:', LUME_CONFIG);
        }
        validateConfig();
    });
}
