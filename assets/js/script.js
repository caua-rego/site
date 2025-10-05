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

    // --- Carrossel Infinito ---
    const track = document.querySelector('.carousel-track');
    if (track) {
        const allProjects = [...projects, ...projects]; // Duplicar para o loop

        allProjects.forEach(proj => {
            const projectElement = document.createElement('div');
            projectElement.className = 'relative w-80 h-56 rounded-xl overflow-hidden shadow-lg group bg-[#21262d] border border-[#30363d]';
            projectElement.innerHTML = `
                <img src="${proj.img}" alt="Projeto ${proj.name}" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105">
                <div class="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                    <h3 class="text-xl font-bold text-white mb-2">${proj.name}</h3>
                    <div class="flex gap-2 mb-4"><span class="${proj.color} text-white text-xs px-2 py-1 rounded">${proj.lang}</span></div>
                    <a href="${proj.url}" target="_blank" class="project-link bg-green-600 hover:bg-green-400 text-white font-semibold px-4 py-2 rounded transition">Ver no GitHub</a>
                </div>
            `;
            track.appendChild(projectElement);
        });
    }

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

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Efeito Máquina de Escrever Avançado ---
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
                typeSpeed = 2000; // Pausa no final da palavra
                isDeleting = true;
                typewriterElement.style.animation = 'blinkCursor 700ms steps(40) infinite normal'; // Começa a piscar
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pausa antes de digitar a próxima palavra
            } else {
                typewriterElement.style.animation = 'none'; // Para de piscar ao digitar/apagar
            }

            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

            setTimeout(type, typeSpeed);
        }

        type();
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
});