document.addEventListener('DOMContentLoaded', function() {
    // Variables para el formulario de varios pasos
    const formSteps = document.querySelectorAll('.form-step');
    const stepDots = document.querySelectorAll('.step-dot');
    let currentStep = 0;
    
    // Mostrar el primer paso al cargar
    showStep(currentStep);
    
    // Botón Siguiente
    const nextButtons = document.querySelectorAll('.next-btn');
    nextButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                currentStep++;
                showStep(currentStep);
                updateStepDots();
            }
        });
    });
    
    // Botón Atrás
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentStep--;
            showStep(currentStep);
            updateStepDots();
        });
    });
    
    // Función para mostrar el paso actual
    function showStep(stepIndex) {
        formSteps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
    }
    
    // Función para actualizar los puntos de progreso
    function updateStepDots() {
        stepDots.forEach((dot, index) => {
            dot.classList.toggle('active', index <= currentStep);
        });
    }
    
    // Función para validar el paso actual
    function validateStep(stepIndex) {
        let isValid = true;
        
        if (stepIndex === 0) {
            // Validar paso 1: Nombre, Apellido, Cédula
            const firstName = document.getElementById('firstName');
            const lastName = document.getElementById('lastName');
            const idNumber = document.getElementById('idNumber');
            
            if (!firstName.value.trim()) {
                showError(firstName, 'Ingresa tu nombre');
                isValid = false;
            }
            
            if (!lastName.value.trim()) {
                showError(lastName, 'Ingresa tu apellido');
                isValid = false;
            }
            
            if (!idNumber.value.trim()) {
                showError(idNumber, 'Ingresa tu cédula');
                isValid = false;
            } else if (!/^[VEve]\d+$/.test(idNumber.value.trim())) {
                showError(idNumber, 'Formato de cédula inválido');
                isValid = false;
            }
        } else if (stepIndex === 1) {
            // Validar paso 2: Teléfono, Email, Ubicación
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            const location = document.getElementById('location');
            
            if (!phone.value.trim()) {
                showError(phone, 'Ingresa tu teléfono');
                isValid = false;
            } else if (!/^04\d{2}-\d{7}$/.test(phone.value.trim())) {
                showError(phone, 'Formato: 0412-1234567');
                isValid = false;
            }
            
            if (!email.value.trim()) {
                showError(email, 'Ingresa tu email');
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError(email, 'Email inválido');
                isValid = false;
            }
            
            if (!location.value) {
                showError(location, 'Selecciona tu ubicación');
                isValid = false;
            }
        }
        
        return isValid;
    }
    
    // Mostrar/ocultar contraseña
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye-slash');
        });
    });
    
    // Verificación por SMS
    const smsVerifyBtn = document.querySelector('.sms-btn');
    const phoneVerification = document.getElementById('phoneVerification');
    
    if (smsVerifyBtn && phoneVerification) {
        smsVerifyBtn.addEventListener('click', function() {
            const phone = document.getElementById('phone');
            
            if (!phone.value.trim()) {
                showError(phone, 'Ingresa tu teléfono');
                return;
            }
            
            if (!/^04\d{2}-\d{7}$/.test(phone.value.trim())) {
                showError(phone, 'Formato: 0412-1234567');
                return;
            }
            
            // Simular envío de SMS
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                phoneVerification.style.display = 'block';
                phone.readOnly = true;
            }, 1500);
        });
    }
    
    // Verificación por Email
    const emailVerifyBtn = document.querySelector('.email-btn');
    const emailVerification = document.getElementById('emailVerification');
    
    if (emailVerifyBtn && emailVerification) {
        emailVerifyBtn.addEventListener('click', function() {
            const email = document.getElementById('email');
            
            if (!email.value.trim()) {
                showError(email, 'Ingresa tu email');
                return;
            }
            
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                showError(email, 'Email inválido');
                return;
            }
            
            // Simular envío de email
            this.disabled = true;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';
                emailVerification.style.display = 'block';
                email.readOnly = true;
            }, 1500);
        });
    }
    
    // Subida de imágenes de cédula
    const idPhotoInput = document.getElementById('idPhoto');
    const filePreview = document.querySelector('.file-preview');
    
    if (idPhotoInput && filePreview) {
        idPhotoInput.addEventListener('change', function() {
            filePreview.innerHTML = '';
            
            if (this.files && this.files.length > 0) {
                for (let i = 0; i < Math.min(this.files.length, 2); i++) {
                    const file = this.files[i];
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        const previewItem = document.createElement('div');
                        previewItem.className = 'file-preview-item';
                        
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        
                        const removeBtn = document.createElement('span');
                        removeBtn.className = 'remove-btn';
                        removeBtn.innerHTML = '&times;';
                        removeBtn.addEventListener('click', function() {
                            previewItem.remove();
                        });
                        
                        previewItem.appendChild(img);
                        previewItem.appendChild(removeBtn);
                        filePreview.appendChild(previewItem);
                    }
                    
                    reader.readAsDataURL(file);
                }
            }
        });
    }
    
    // Validación de fortaleza de contraseña
    const passwordInput = document.getElementById('password');
    const strengthBars = document.querySelectorAll('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput && strengthBars.length && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            // Longitud mínima
            if (password.length >= 8) strength++;
            
            // Contiene números
            if (/\d/.test(password)) strength++;
            
            // Contiene mayúsculas y minúsculas
            if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
            
            // Contiene caracteres especiales
            if (/[^a-zA-Z0-9]/.test(password)) strength++;
            
            // Actualizar barras de fuerza
            strengthBars.forEach((bar, index) => {
                bar.style.backgroundColor = index < strength ? getStrengthColor(strength) : 'var(--medium-gray)';
            });
            
            // Actualizar texto
            const strengthLabels = ['Débil', 'Moderada', 'Fuerte', 'Muy Fuerte'];
            strengthText.textContent = `Seguridad: ${strengthLabels[strength - 1] || 'Débil'}`;
            strengthText.style.color = getStrengthColor(strength);
        });
    }
    
    // Función para mostrar errores
    function showError(inputElement, message) {
        const inputContainer = inputElement.closest('.input-container');
        if (inputContainer) {
            // Crear o actualizar mensaje de error
            let errorElement = inputContainer.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                inputContainer.parentNode.insertBefore(errorElement, inputContainer.nextSibling);
            }
            
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
    
    // Función para obtener color según fuerza de contraseña
    function getStrengthColor(strength) {
        const colors = ['#FF5252', '#FFC107', '#4CAF50', '#2E7D32'];
        return colors[strength - 1] || '#FF5252';
    }
    
    // Envío del formulario
    const registerForm = document.querySelector('.register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar paso final
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const terms = document.getElementById('terms');
            const filePreviewItems = document.querySelectorAll('.file-preview-item');
            
            let isValid = true;
            
            if (!password.value.trim()) {
                showError(password, 'Ingresa una contraseña');
                isValid = false;
            } else if (password.value.length < 8) {
                showError(password, 'Mínimo 8 caracteres');
                isValid = false;
            }
            
            if (password.value !== confirmPassword.value) {
                showError(confirmPassword, 'Las contraseñas no coinciden');
                isValid = false;
            }
            
            if (filePreviewItems.length < 2) {
                alert('Debes subir ambas caras de tu cédula');
                isValid = false;
            }
            
            if (!terms.checked) {
                alert('Debes aceptar los términos y condiciones');
                isValid = false;
            }
            
            // Simular registro exitoso
            if (isValid) {
                const registerBtn = document.querySelector('.register-btn');
                registerBtn.disabled = true;
                registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registrando...';
                
                setTimeout(() => {
                    registerBtn.innerHTML = '<i class="fas fa-check"></i> ¡Registro exitoso!';
                    // Redirigir después de 1.5 segundos
                    setTimeout(() => {
                        window.location.href = 'paginaprincipal.html';
                    }, 1500);
                }, 2000);
            }
        });
    }
});