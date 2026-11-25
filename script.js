document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('readingProgress');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const animateCounter = (el) => {
            const target = parseInt(el.dataset.target, 10);
            const prefix = el.dataset.prefix || '';
            const suffix = el.dataset.suffix || '';

            if (prefersReducedMotion) {
                el.textContent = `${prefix}${target}${suffix}`;
                return;
            }

            const duration = 1300;
            const start = performance.now();

            const step = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = `${prefix}${Math.round(target * ease)}${suffix}`;
                if (progress < 1) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);
        };

        const statsObserver = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        statNumbers.forEach(num => statsObserver.observe(num));
    }

    
    const heroOrbit = document.querySelector('.device-orbit');
    if (heroOrbit && !prefersReducedMotion) {
        heroOrbit.addEventListener('mousemove', (e) => {
            const rect = heroOrbit.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            heroOrbit.style.transform = `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
        });

        heroOrbit.addEventListener('mouseleave', () => {
            heroOrbit.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    
    if (!prefersReducedMotion) {
        document.querySelectorAll('.btn-primary').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = (e.clientX - rect.left - rect.width / 2) * 0.18;
                const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
                btn.style.transform = `translate(${x}px, ${y}px)`;
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    }

    
    const formLector = document.getElementById('formLector');
    const formFeedback = document.getElementById('formFeedback');
    if (formLector && formFeedback) {
        formLector.addEventListener('submit', (e) => {
            e.preventDefault();
            formFeedback.style.display = 'block';
            formLector.reset();
        });
    }

    
    const heroSection = document.querySelector('.hero');
    if (heroSection && !prefersReducedMotion) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            heroSection.style.setProperty('--mouse-x', `${x}px`);
            heroSection.style.setProperty('--mouse-y', `${y}px`);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('readingProgress');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

    
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });
    }

    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroEyebrow = document.querySelector('.hero .eyebrow');
    const heroLead = document.querySelector('.hero-lead');
    const heroActions = document.querySelector('.hero-actions');
    const heroVisual = document.querySelector('.hero-visual');
    const folioItems = document.querySelectorAll('.folio-item');

    if (heroTitle && !prefersReducedMotion) {
       
        [heroEyebrow, heroLead, heroActions, heroVisual].forEach(el => {
            if (el) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(18px)';
                el.style.transition = 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1), transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)';
            }
        });

        folioItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = 'opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1), transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)';
        });

        const linea1 = 'PILAR DANIEL';
        const linea2 = 'I GUBERT';
        const textoSubtitulo = heroSubtitle ? heroSubtitle.textContent.trim() : '';

        heroTitle.innerHTML = '<span id="typeLine1"></span><br><span class="italic-accent" id="typeLine2"></span><span id="typeCursor" style="font-weight:300; color:#1d63b8;">|</span>';
        if (heroSubtitle) {
            heroSubtitle.textContent = '';
            heroSubtitle.style.minHeight = '1.4em';
        }

        const span1 = document.getElementById('typeLine1');
        const span2 = document.getElementById('typeLine2');
        const cursor = document.getElementById('typeCursor');

        const blinkInterval = setInterval(() => {
            if (cursor) cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 420);

        let i = 0, j = 0, k = 0;

        const mostrarElemento = (el) => {
            if (el) {
                el.style.opacity = '1';
                el.style.transform = 'translate(0, 0)';
            }
        };

        
        setTimeout(() => {
            mostrarElemento(heroEyebrow);
            setTimeout(escribirLinea1, 200);
        }, 350);

        const escribirLinea1 = () => {
            if (i < linea1.length) {
                span1.textContent += linea1.charAt(i++);
                setTimeout(escribirLinea1, 55);
            } else {
                setTimeout(escribirLinea2, 120);
            }
        };

     
        const escribirLinea2 = () => {
            if (j < linea2.length) {
                span2.textContent += linea2.charAt(j++);
                setTimeout(escribirLinea2, 60);
            } else {
                setTimeout(escribirSubtitulo, 180);
            }
        };

       
        const escribirSubtitulo = () => {
            if (heroSubtitle && k < textoSubtitulo.length) {
                heroSubtitle.textContent += textoSubtitulo.charAt(k++);
                setTimeout(escribirSubtitulo, 26);
            } else {
                
                setTimeout(() => {
                    clearInterval(blinkInterval);
                    if (cursor) cursor.style.display = 'none';
                }, 500);

                mostrarElemento(heroLead);

                setTimeout(() => {
                    mostrarElemento(heroActions);
                }, 180);

                setTimeout(() => {
                    mostrarElemento(heroVisual);
                    folioItems.forEach((item, index) => {
                        setTimeout(() => {
                            mostrarElemento(item);
                        }, 160 * (index + 1));
                    });
                }, 320);
            }
        };
    }