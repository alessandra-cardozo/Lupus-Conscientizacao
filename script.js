document.addEventListener('DOMContentLoaded', () => {
    // 1. Menu Responsivo (Hambúrguer)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        // Adiciona um evento de clique ao botão hambúrguer
        hamburger.addEventListener('click', () => {
            // Alterna a classe 'active' para mostrar/esconder o menu de navegação
            navLinks.classList.toggle('active');
            // Alterna a classe 'active' para animar o ícone do hambúrguer
            hamburger.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um link (útil em dispositivos móveis)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Verifica se a largura da janela é menor ou igual a 768px (típico para mobile/tablet)
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    } else {
        console.error("Elementos .hamburger ou .nav-links não encontrados. Verifique o HTML.");
    }

    // 2. Animação de Scroll Suave para as Seções
    // Seleciona todos os links que começam com '#' (links de âncora)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão do link (rolagem instantânea)

            const targetId = this.getAttribute('href'); // Obtém o ID do alvo (ex: #sobre)
            const targetElement = document.querySelector(targetId); // Encontra o elemento alvo no DOM

            if (targetElement) {
                // Calcula o offset do cabeçalho fixo para que o conteúdo não fique escondido atrás dele
                const headerOffset = document.querySelector('header').offsetHeight;
                // Posição do elemento em relação ao topo do documento
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                // Posição final com o offset do cabeçalho e um pequeno padding extra
                const offsetPosition = elementPosition - headerOffset - 20;

                // Rola a página suavemente até a posição calculada
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 3. Validação Básica de Formulário e Mensagens Customizadas (substitui alert())
    const contactForm = document.querySelector('.contact-form');
    const messageModal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    const closeButton = document.querySelector('.close-button');

    // Função para mostrar a mensagem customizada
    function showMessage(message, type) {
        modalMessage.textContent = message;
        messageModal.style.display = 'flex'; // Exibe o modal (usando flex para centralizar)
        // Adiciona classes para estilização de sucesso/erro
        messageModal.querySelector('.modal-content').classList.remove('success', 'error');
        if (type) {
            messageModal.querySelector('.modal-content').classList.add(type);
        }
    }

    // Função para esconder a mensagem customizada
    function hideMessage() {
        messageModal.style.display = 'none'; // Esconde o modal
    }

    // Evento de clique no botão de fechar do modal
    if (closeButton) {
        closeButton.addEventListener('click', hideMessage);
    }

    // Fecha o modal se o usuário clicar fora do conteúdo do modal
    if (messageModal) {
        window.addEventListener('click', (event) => {
            if (event.target === messageModal) {
                hideMessage();
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Previne o envio padrão do formulário

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (name === '' || email === '' || message === '') {
                showMessage('Por favor, preencha todos os campos do formulário.', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showMessage('Por favor, insira um email válido.', 'error');
                return;
            }

            // Se tudo estiver OK, aqui você enviaria os dados para um backend.
            // Por enquanto, apenas uma mensagem de sucesso.
            showMessage('Mensagem enviada com sucesso! Em breve entraremos em contato.', 'success');

            // Opcional: Limpar o formulário após o envio
            contactForm.reset();
        });
    } else {
        console.warn("Formulário de contato não encontrado.");
    }

    // Função auxiliar para validar formato de email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    // 4. Efeito de Aparecer ao Scroll (Intersection Observer API)
    // Seleciona todos os elementos que terão o efeito de "fade-in"
    const fadeInElements = document.querySelectorAll('.content-section, .symptom-item, .resource-item, .contact-form');

    // Opções para o Intersection Observer
    const observerOptions = {
        root: null, // O viewport é o elemento raiz
        rootMargin: '0px',
        threshold: 0.1 // O callback será executado quando 10% do elemento estiver visível
    };

    // Cria uma nova instância do Intersection Observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o elemento está visível, adiciona a classe 'fade-in'
                entry.target.classList.add('fade-in');
                // Para de observar o elemento para que a animação não se repita
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Adiciona a classe 'fade-in-on-scroll' e observa cada elemento
    fadeInElements.forEach(el => {
        el.classList.add('fade-in-on-scroll'); // Classe inicial para estilização de opacidade 0
        observer.observe(el);
    });
});
