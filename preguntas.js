document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad para expandir/colapsar preguntas
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            faqItem.classList.toggle('active');
            
            // Cerrar otras preguntas abiertas (opcional)
            /*
            if (faqItem.classList.contains('active')) {
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem && item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });
            }
            */
        });
    });
    
    // Funcionalidad de búsqueda
    const searchInput = document.querySelector('.search-faq input');
    const searchButton = document.querySelector('.search-faq button');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        if (searchTerm.trim() === '') {
            // Mostrar todas las preguntas si la búsqueda está vacía
            document.querySelectorAll('.faq-item').forEach(item => {
                item.style.display = '';
            });
            return;
        }
        
        let foundResults = false;
        
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question h3').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = '';
                item.classList.add('active'); // Expandir las preguntas encontradas
                foundResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Mostrar mensaje si no hay resultados (opcional)
        /*
        if (!foundResults) {
            alert('No se encontraron resultados para tu búsqueda.');
        }
        */
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Opcional: Abrir pregunta específica desde URL
    const urlParams = new URLSearchParams(window.location.search);
    const questionId = urlParams.get('question');
    
    if (questionId) {
        const targetQuestion = document.getElementById(questionId);
        if (targetQuestion) {
            targetQuestion.classList.add('active');
            targetQuestion.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});