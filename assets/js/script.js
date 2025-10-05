document.addEventListener('DOMContentLoaded', () => {

    // --- Configurações ---
    const projects = [
        { name: 'RUBY-STUDIES', img: 'https://picsum.photos/seed/ruby/600/400', lang: 'Ruby', color: 'bg-red-600', url: 'https://github.com/caua-rego/RUBY-STUDIES' },
        { name: 'AQUATECH', img: 'https://picsum.photos/seed/aquatech/600/400', lang: 'JavaScript', color: 'bg-blue-600', url: 'https://github.com/caua-rego/AQUATECH' },
        { name: 'MINIMALIST-CAUA-REGO-WEBSITE', img: 'https://picsum.photos/seed/minimalist/600/400', lang: 'JavaScript', color: 'bg-blue-600', url: 'https://github.com/caua-rego/MINIMALIST-CAUA-REGO-WEBSITE' },
        { name: 'BACKUP-AUTOMATION-LINUX', img: 'https://picsum.photos/seed/linux/600/400', lang: 'Shell', color: 'bg-gray-700', url: 'https://github.com/caua-rego/BACKUP-AUTOMATION-LINUX' },
        { name: 'APIFLASK', img: 'https://picsum.photos/seed/api/600/400', lang: 'Python', color: 'bg-purple-600', url: 'https://github.com/caua-rego/APIFLASK' },
        { name: 'BANK-AUREA', img: 'https://picsum.photos/seed/bank/600/400', lang: 'Python', color: 'bg-purple-600', url: 'https://github.com/caua-rego/BANK-AUREA' },
    ];

    // --- Carrossel Infinito (melhorado: lazy-loading, rel=noopener) ---
    const track = document.querySelector('.carousel-track');
    // list to collect images created for the carousel so we can observe them
    const imagesToObserve = [];
    // intersection observer to swap placeholder src to real src/srcset
    const imgObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                const dataSrcset = img.getAttribute('data-srcset');
                if (dataSrc) img.src = dataSrc;
                if (dataSrcset) img.srcset = dataSrcset;
                img.classList.remove('lazy-img');
                img.classList.add('loaded');
                obs.unobserve(img);
            }
        });
    }, { rootMargin: '200px 0px', threshold: 0.01 });
    if (track) {
        const allProjects = [...projects, ...projects]; // duplicar para o loop infinito

        allProjects.forEach(proj => {
            const projectElement = document.createElement('div');
            projectElement.className = 'relative w-80 h-56 rounded-xl overflow-hidden shadow-lg group bg-[#21262d] border border-[#30363d]';

            const img = document.createElement('img');
            // seed based on project name for consistent picsum images
            const seed = encodeURIComponent(proj.name.toLowerCase().replace(/\s+/g, '-'));
            // low-res blurred placeholder (quick to fetch)
            const placeholder = `https://picsum.photos/seed/${seed}/40/28?blur=10`;
            const fullSrc = `https://picsum.photos/seed/${seed}/600/400`;
            const fullSrcset = `https://picsum.photos/seed/${seed}/400/267 400w, ${fullSrc} 600w, https://picsum.photos/seed/${seed}/900/600 900w`;

            img.src = placeholder; // start with tiny blurred image
            img.setAttribute('data-src', fullSrc);
            img.setAttribute('data-srcset', fullSrcset);
            img.sizes = `(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 320px`;
            img.alt = `Projeto ${proj.name}`;
            img.className = 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 lazy-img';
            img.loading = 'lazy';
            img.decoding = 'async';
            img.width = 600;
            img.height = 400;

            // when full image loads remove blur class
            img.addEventListener('load', () => {
                // if this load event is for the full image, remove blur
                if (!img.classList.contains('lazy-img')) return; // already swapped
                // if src equals placeholder, don't remove yet
                if (img.src && img.src.indexOf('blur=10') !== -1) return;
                img.classList.remove('lazy-img');
                img.classList.add('loaded');
            });

            // add to observe list for lazy loading
            imagesToObserve.push(img);

            const overlay = document.createElement('div');
            overlay.className = 'absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300';

            const title = document.createElement('h3');
            title.className = 'text-xl font-bold text-white mb-2';
            title.textContent = proj.name;

            const langWrap = document.createElement('div');
            langWrap.className = 'flex gap-2 mb-4';
            const langTag = document.createElement('span');
            langTag.className = `${proj.color} text-white text-xs px-2 py-1 rounded`;
            langTag.textContent = proj.lang;
            langWrap.appendChild(langTag);

            const link = document.createElement('a');
            link.href = proj.url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'project-link bg-green-600 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded transition';
            link.textContent = 'Ver no GitHub';

            overlay.appendChild(title);
            overlay.appendChild(langWrap);
            overlay.appendChild(link);

            projectElement.appendChild(img);
            projectElement.appendChild(overlay);

            track.appendChild(projectElement);
        });
        // after appending all items, observe the images for lazy loading
        imagesToObserve.forEach(img => imgObserver.observe(img));

        // --- Accessible carousel controls (prev/next, keyboard, pause on hover/focus) ---
        const prevBtn = document.querySelector('.carousel-prev');
        const nextBtn = document.querySelector('.carousel-next');

        // helper to get card width including gap
        function scrollByCard(direction = 1) {
                // find an actual project card (not the .carousel-inner wrapper)
                const inner = track.querySelector('.carousel-inner');
                let firstCard = null;
                if (inner) {
                    firstCard = inner.querySelector('div');
                } else {
                    // direct children of track (may include text nodes); select element nodes only
                    firstCard = Array.from(track.children).find(c => c.nodeType === 1 && !c.classList.contains('carousel-inner'));
                }
                if (!firstCard) return;
                const gap = parseInt(getComputedStyle(track).gap) || 32;
                const cardWidth = firstCard.offsetWidth + gap;
                // If the track is using transform-based animation (inner exists), attempt to scroll the wrapper
                if (inner) {
                    // animate the inner by adjusting scrollLeft of the track as a fallback (will be no-op if no overflow)
                    // but still perform smooth scroll attempt to keep behavior consistent
                    track.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
                    return;
                }
                track.scrollBy({ left: cardWidth * direction, behavior: 'smooth' });
        }

        if (prevBtn) prevBtn.addEventListener('click', () => scrollByCard(-1));
        if (nextBtn) nextBtn.addEventListener('click', () => scrollByCard(1));

        // keyboard navigation
        track.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); scrollByCard(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); scrollByCard(-1); }
        });

        // pause auto interactions when hovering or focusing
        // Use a central setter if available (defined later), otherwise fall back to dataset
        const pauseTargets = [track, prevBtn, nextBtn];
        pauseTargets.forEach(el => {
            if (!el) return;
            el.addEventListener('focusin', () => { if (window.__carouselSetPaused) window.__carouselSetPaused(true); else track.dataset.paused = 'true'; });
            el.addEventListener('focusout', () => { if (window.__carouselSetPaused) window.__carouselSetPaused(false); else track.dataset.paused = 'false'; });
            el.addEventListener('mouseenter', () => { if (window.__carouselSetPaused) window.__carouselSetPaused(true); else track.dataset.paused = 'true'; });
            el.addEventListener('mouseleave', () => { if (window.__carouselSetPaused) window.__carouselSetPaused(false); else track.dataset.paused = 'false'; });
        });

        // --- Auto-scroll / continuous animation for carousel (paused on hover/focus/visibility) ---
        // Use a duplicated item list (we appended projects twice) so we can loop seamlessly.
        (function enableAutoScroll() {
            // compute speed by viewport to feel natural on mobile/desktop
            function computeSpeed() {
                if (window.matchMedia('(max-width: 480px)').matches) return 12; // mobile
                if (window.matchMedia('(max-width: 1024px)').matches) return 20; // tablet
                return 36; // desktop
            }
            let speed = computeSpeed();
            window.addEventListener('resize', () => { speed = computeSpeed(); });
            let rafId = null;
            let lastTime = null;
            let accumulated = 0; // sub-pixel accumulator

            function shouldRun() {
                // only run if there's overflow (content wider than container)
                return track.scrollWidth > track.clientWidth * 1.05;
            }

            function step(now) {
                if (!lastTime) lastTime = now;
                const delta = (now - lastTime) / 1000; // seconds
                lastTime = now;

                // respect pause state and visibility
                if (track.dataset.paused === 'true' || document.hidden) {
                    // don't advance but keep timing anchored
                    rafId = requestAnimationFrame(step);
                    return;
                }

                if (!shouldRun()) {
                    rafId = requestAnimationFrame(step);
                    return;
                }

                // advance scroll (use accumulator for sub-pixel precision)
                try {
                    // small sinusoidal variance to avoid perfectly linear motion
                    const sway = Math.sin(now / 1000) * 0.02; // -0.02 .. 0.02
                    const px = (speed * (1 + sway)) * delta;
                    accumulated += px;
                    const intPx = Math.trunc(accumulated);
                    if (intPx !== 0) {
                        // perform immediate scroll for smooth continuous animation
                        track.scrollLeft += intPx;
                        accumulated -= intPx;
                    }
                } catch (e) {
                    // fail-safe
                }

                // loop seamlessly when we reach half the scroll (because items duplicated)
                const half = track.scrollWidth / 2;
                if (track.scrollLeft >= half) {
                    track.scrollLeft -= half;
                }

                rafId = requestAnimationFrame(step);
            }

            // start when user is ready
            function start() {
                if (rafId) return;
                lastTime = null;
                rafId = requestAnimationFrame(step);
            }

            function stop() {
                if (rafId) cancelAnimationFrame(rafId);
                rafId = null;
            }

            // Pause auto-scroll while user interacts via touch/scroll (use debounced setter)
            track.addEventListener('pointerdown', () => { setPaused(true); });
            track.addEventListener('pointerup', () => { setPaused(false); });
            track.addEventListener('wheel', () => { setPaused(true); clearTimeout(track._wheelTimeout); track._wheelTimeout = setTimeout(() => { setPaused(false); }, 800); });

            // visibility handling
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    // let the loop keep running but it will early-return when hidden
                } else {
                    // resume
                    lastTime = null;
                }
            });

            // Timered pause helper to avoid abrupt stop/start on quick mouse moves
            let pauseTimeout = null;
            function setPaused(paused) {
                // debounce short toggles: if turning pause off, allow small delay to avoid flicker
                if (pauseTimeout) clearTimeout(pauseTimeout);
                if (!paused) {
                    pauseTimeout = setTimeout(() => {
                        track.dataset.paused = 'false';
                        pauseTimeout = null;
                    }, 120);
                } else {
                    track.dataset.paused = 'true';
                }
            }
            // expose helper for other handlers
            window.__carouselSetPaused = setPaused;

            // start auto-scroll
            // determine whether we should animate via scrollLeft or via transform
            let useTransform = false;
            let inner = null;
            function ensureInner() {
                if (inner) return;
                // wrap existing children in an inner container so we can translate it
                inner = document.createElement('div');
                inner.className = 'carousel-inner';
                // move children into inner
                while (track.firstChild) {
                    inner.appendChild(track.firstChild);
                }
                track.appendChild(inner);
            }

            function recomputeMode() {
                // if content is not wider enough to cause overflow, use transform animation
                useTransform = track.scrollWidth <= track.clientWidth * 1.02;
                if (useTransform) ensureInner();
            }

            // compute initial mode and on resize
            recomputeMode();
            window.addEventListener('resize', recomputeMode);

            start();
        })();
    }

    // Observe any existing lazy images in the page (featured cards, header logo, etc.)
    const existingLazy = document.querySelectorAll('img.lazy-img');
    existingLazy.forEach(img => imgObserver.observe(img));

    // --- Animação de Clique nos Botões ---
    const animatedButtons = document.querySelectorAll('.animated-button');
    animatedButtons.forEach(button => {
        button.addEventListener('mousedown', () => {
            button.classList.add('scale-95');
        });
        button.addEventListener('mouseup', () => {
            button.classList.remove('scale-95');
        });
        button.addEventListener('mouseleave', () => {
            button.classList.remove('scale-95');
        });
    });

    // --- Mobile Menu Toggle (melhor acessibilidade + estado 'open') ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        // inicializa atributos
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');

        // focus trap variables
        let previousFocused = null;
        let trapHandler = null;

        const getFocusable = (container) => {
            const focusableSelectors = ['a[href]', 'button:not([disabled])', 'input:not([disabled])', 'textarea:not([disabled])', 'select:not([disabled])', '[tabindex]:not([tabindex="-1"])'];
            return Array.from(container.querySelectorAll(focusableSelectors.join(','))).filter(el => el.offsetParent !== null);
        };

        const openMenu = () => {
            previousFocused = document.activeElement;
            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.add('open');
            mobileMenu.setAttribute('aria-hidden', 'false');
            mobileMenuButton.setAttribute('aria-expanded', 'true');

            // focus first element inside menu
            const focusable = getFocusable(mobileMenu);
            if (focusable.length) {
                focusable[0].focus();
            } else {
                // if no focusable, focus the menu for keyboard users
                mobileMenu.setAttribute('tabindex', '-1');
                mobileMenu.focus();
            }

            // trap Tab inside menu
            trapHandler = (e) => {
                if (e.key !== 'Tab') return;
                const nodes = getFocusable(mobileMenu);
                if (nodes.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = nodes[0];
                const last = nodes[nodes.length - 1];
                if (e.shiftKey) {
                    if (document.activeElement === first) {
                        e.preventDefault();
                        last.focus();
                    }
                } else {
                    if (document.activeElement === last) {
                        e.preventDefault();
                        first.focus();
                    }
                }
            };

            document.addEventListener('keydown', trapHandler);
        };

        const closeMenu = () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('open');
            mobileMenu.setAttribute('aria-hidden', 'true');
            mobileMenuButton.setAttribute('aria-expanded', 'false');

            if (trapHandler) {
                document.removeEventListener('keydown', trapHandler);
                trapHandler = null;
            }

            // restore previous focus
            if (previousFocused && previousFocused.focus) {
                previousFocused.focus();
            }
        };

        mobileMenuButton.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            if (isHidden) {
                openMenu();
            } else {
                closeMenu();
            }
        });

        // ensure ESC also closes and restores focus (already handled globally but ensure we call closeMenu)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                closeMenu();
            }
        });
    }

    // --- Efeito Máquina de Escrever Avançado ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        // use an explicit cursor element for reliable control
        let cursor = document.createElement('span');
        cursor.className = 'tw-cursor';
        typewriterElement.appendChild(cursor);

        const baseText = "Desenvolvedor ";
        const words = ["de Software", "Back-end", "Front-end"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingTimer = null;

        function schedule(nextMs) {
            if (typingTimer) clearTimeout(typingTimer);
            typingTimer = setTimeout(run, nextMs);
        }

        function run() {
            // if carousel paused, delay typing to keep in sync
            if (track && track.dataset && track.dataset.paused === 'true') {
                schedule(250);
                return;
            }
            if (document.hidden) {
                schedule(500);
                return;
            }

            const currentWord = words[wordIndex];
            // set text content but keep cursor as last child
            typewriterElement.childNodes.forEach(n => { if (n !== cursor) typewriterElement.removeChild(n); });
            const textNode = document.createTextNode(baseText + currentWord.substring(0, charIndex));
            typewriterElement.insertBefore(textNode, cursor);

            let typeSpeed = isDeleting ? 60 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // pause before next word
            }

            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            schedule(typeSpeed);
        }

        schedule(500);
    }

    // --- Lógica do Lightbox ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg && lightboxClose) {
        document.body.addEventListener('click', (e) => {
            if (e.target.closest('.group') && !e.target.closest('.project-link')) {
                const imgSrc = e.target.closest('.group').querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                document.body.classList.add('lightbox-open');
            }
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.body.classList.remove('lightbox-open');
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // --- Lógica de Navegação Inteligente ---
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('header nav a');

    if (sections.length && navLinks.length) {
        const navObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.55
        };

        const navObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const link = document.querySelector(`header nav a[href="#${entry.target.id}"]`);
                    navLinks.forEach(l => l.classList.remove('active'));
                    if (link) {
                        link.classList.add('active');
                    }
                }
            });
        };

        const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);
        sections.forEach(section => navObserver.observe(section));
    }

    // --- Lógica de Animação de Rolagem ---
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length) {
        const revealObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const revealObserverCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        };

        const revealObserver = new IntersectionObserver(revealObserverCallback, revealObserverOptions);
        revealElements.forEach(element => revealObserver.observe(element));
    }

    // --- Atualizar Email de Contato ---
    const contactEmailLink = document.querySelector('#contact a[href^="mailto:"]');
    const footerEmailLink = document.querySelector('footer a[href^="mailto:"]');

    if (contactEmailLink && footerEmailLink) {
        contactEmailLink.href = footerEmailLink.href;
    }

    // --- Smooth scroll on nav click + nav click animation + close mobile menu ---
    const internalNavLinks = document.querySelectorAll('header a[href^="#"], #mobile-menu a[href^="#"]');

    internalNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // allow opening external or mailto links normally
            const href = link.getAttribute('href');
            if (!href || !href.startsWith('#')) return;

            e.preventDefault();
            const targetId = href.slice(1);
            const targetEl = document.getElementById(targetId);

            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // small visual feedback on the clicked link
                link.classList.add('nav-click-anim');
                setTimeout(() => link.classList.remove('nav-click-anim'), 700);
            }

            // If mobile menu is open, close it after clicking a link and update aria
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
                mobileMenu.setAttribute('aria-hidden', 'true');
                if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // --- Keyboard: ESC to close lightbox or mobile menu ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            // close lightbox if open
            if (lightbox && lightbox.style.display === 'flex') {
                lightbox.style.display = 'none';
                document.body.classList.remove('lightbox-open');
            }

            // close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('open');
                mobileMenu.setAttribute('aria-hidden', 'true');
                if (mobileMenuButton) mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        }
    });

});