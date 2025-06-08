document.addEventListener('DOMContentLoaded', function() {
    // Toggle password visibility
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
            this.classList.toggle('fa-eye');
        });
    }
    
    // Efecto de carga animada para los inputs
    const inputs = document.querySelectorAll('.form-group');
    inputs.forEach((input, index) => {
        input.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Validación básica del formulario
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();
            
            if (!email) {
                showError('email', 'Por favor ingresa tu correo o teléfono');
                return;
            }
            
            if (!password) {
                showError('password', 'Por favor ingresa tu contraseña');
                return;
            }
            
            // Simulación de envío exitoso
            const loginBtn = document.querySelector('.login-btn');
            if (loginBtn) {
                loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>  Iniciando sesión...';
                loginBtn.disabled = true;
                
                // Simular retraso de red
                setTimeout(() => {
                    loginBtn.innerHTML = '<i class="fas fa-check"></i>  ¡Bienvenido!';
                    
                    // Redirigir después de 1 segundo
                    setTimeout(() => {
                        window.location.href = 'paginaprincipal.html'; // Cambiar por tu URL real
                    }, 1000);
                }, 1500);
            }
        });
    }
    
    function showError(inputId, message) {
        const inputContainer = document.getElementById(inputId).closest('.input-container');
        if (inputContainer) {
            // Crear elemento de error si no existe
            let errorElement = inputContainer.querySelector('.error-message');
            if (!errorElement) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                inputContainer.parentNode.insertBefore(errorElement, inputContainer.nextSibling);
            }
            
            // Estilizar el error
            errorElement.textContent = message;
            errorElement.style.color = 'var(--error-color)';
            errorElement.style.fontSize = '12px';
            errorElement.style.marginTop = '5px';
            
            // Animación de error
            inputContainer.style.borderColor = 'var(--error-color)';
            inputContainer.style.animation = 'shake 0.5s';
            
            setTimeout(() => {
                inputContainer.style.animation = '';
            }, 500);
        }
    }
    
    // Efecto hover para botones sociales
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});