document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle - Versión corregida
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    const authButtons = document.querySelector('.auth-buttons'); // Elemento de botones de autenticación

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Evita la propagación del evento

            // Alternar clases para mostrar/ocultar menú y botones de autenticación
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            authButtons.classList.toggle('active');

            // Cambiar ícono del botón
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden'; // Bloquear scroll

                // Asegurar que mainNav y authButtons se muestren y posicionen correctamente
                mainNav.style.zIndex = '99'; // Asegura que el menú esté por encima
                authButtons.style.zIndex = '98'; // Asegura que los botones estén debajo del menú pero encima del resto del contenido

                // Calcular la posición top de authButtons dinámicamente
                // mainNav.offsetHeight se actualiza después de que mainNav.classList.toggle('active') aplica el transform
                const headerHeight = document.querySelector('.main-header').offsetHeight; // Altura del header
                // Calcular la altura real del mainNav cuando está 'active'
                // Una forma más robusta es obtener la altura de mainNav después de que se ha "abierto"
                // y luego posicionar authButtons.
                // Como mainNav es `position: fixed; top: 70px;` y usa `transform`, su `offsetHeight` reflejará su contenido.
                const mainNavHeight = mainNav.offsetHeight;
                authButtons.style.top = `${headerHeight + mainNavHeight + 10}px`; // 10px de margen entre nav y botones
                authButtons.style.position = 'fixed'; // Asegura que sigan la misma lógica de fixed positioning
                authButtons.style.left = '0';
                authButtons.style.width = '100%';


            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = ''; // Restaurar scroll

                // Restaurar estilos al cerrar el menú
                mainNav.style.zIndex = ''; // Restablecer z-index
                authButtons.style.zIndex = ''; // Restablecer z-index
                authButtons.style.top = ''; // Restablecer top para que CSS controle
                authButtons.style.position = ''; // Restablecer posición para que CSS controle
                authButtons.style.left = '';
                authButtons.style.width = '';
            }
        });
    }

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') &&
            !e.target.closest('.main-nav') &&
            !e.target.closest('.mobile-menu-btn')) {

            mobileMenuBtn.classList.remove('active');
            mainNav.classList.remove('active');
            authButtons.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            document.body.style.overflow = '';

            // Restaurar estilos al cerrar el menú (duplicado para seguridad)
            mainNav.style.zIndex = '';
            authButtons.style.zIndex = '';
            authButtons.style.top = '';
            authButtons.style.position = '';
            authButtons.style.left = '';
            authButtons.style.width = '';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });

                // Cerrar menú móvil si está abierto después de hacer clic en un enlace de ancla
                if (mainNav.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    mainNav.classList.remove('active');
                    authButtons.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    document.body.style.overflow = '';

                    // Restaurar estilos al cerrar el menú (duplicado para seguridad)
                    mainNav.style.zIndex = '';
                    authButtons.style.zIndex = '';
                    authButtons.style.top = '';
                    authButtons.style.position = '';
                    authButtons.style.left = '';
                    authButtons.style.width = '';
                }
            }
        });
    });

    // Animation on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.animate__animated');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                const animation = element.getAttribute('data-animation');
                element.classList.add(animation);
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run on page load
});
