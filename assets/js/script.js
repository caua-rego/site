document.addEventListener('DOMContentLoaded', () => {

    // --- Advanced Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const baseText = "Desenvolvedor ";
        const words = ["de Software", "Back-end", "Front-end"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            typewriterElement.innerHTML = baseText + currentWord.substring(0, charIndex);

            let typeSpeed = isDeleting ? 60 : 120;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
                typewriterElement.style.animation = 'blinkCursor 700ms steps(40) infinite normal'; // Start blinking
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before typing next word
            } else {
                typewriterElement.style.animation = 'none'; // Stop blinking while typing/deleting
            }

            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

            setTimeout(type, typeSpeed);
        }

        type();
    }

    // --- Lightbox Logic (Updated) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (galleryItems.length && lightbox && lightboxImg && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target.classList.contains('project-link')) {
                    return;
                }
                const imgSrc = item.querySelector('img').src;
                lightboxImg.src = imgSrc;
                lightbox.style.display = 'flex';
                document.body.classList.add('lightbox-open');
            });
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

    // --- Intelligent Navigation Logic ---
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

    // --- Scroll Reveal Animation Logic ---
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
});