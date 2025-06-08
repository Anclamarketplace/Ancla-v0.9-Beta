document.addEventListener('DOMContentLoaded', function() {
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const purchaseSections = document.querySelectorAll('.purchases-section');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            tabBtns.forEach(b => b.classList.remove('active'));
            purchaseSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-purchases`).classList.add('active');
        });
    });
    
    // Modal functionality for seller details
    const viewSellerBtns = document.querySelectorAll('.view-seller-btn, .contact-btn');
    const sellerModal = document.getElementById('seller-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-btn');
    const reasonModal = document.getElementById('reason-modal');
    const reasonBtns = document.querySelectorAll('.reason-btn');
    
    viewSellerBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real app, you would fetch this data from an API or database
            // For this example, we'll use mock data based on the product
            const purchaseCard = this.closest('.purchase-card');
            const sellerName = purchaseCard.querySelector('.seller-header strong').textContent;
            
            // Set modal content
            document.getElementById('seller-name').textContent = sellerName;
            
            // Mock seller details (in a real app, this would come from your data)
            const mockSellers = {
                "TechVenezuela": {
                    type: "Tienda verificada",
                    since: "Enero 2021",
                    location: "Caracas, Venezuela",
                    sales: "245",
                    response: "1-2 horas"
                },
                "Carlos Pérez": {
                    type: "Vendedor particular",
                    since: "Marzo 2022",
                    location: "Valencia, Venezuela",
                    sales: "32",
                    response: "3-4 horas"
                },
                "Ana Rodríguez": {
                    type: "Vendedor particular",
                    since: "Noviembre 2021",
                    location: "Maracaibo, Venezuela",
                    sales: "56",
                    response: "2-3 horas"
                },
                "Muebles López": {
                    type: "Tienda verificada",
                    since: "Agosto 2020",
                    location: "Barquisimeto, Venezuela",
                    sales: "189",
                    response: "1-2 horas"
                }
            };
            
            const sellerData = mockSellers[sellerName] || {
                type: "Vendedor",
                since: "No especificado",
                location: "Venezuela",
                sales: "No especificado",
                response: "No especificado"
            };
            
            document.getElementById('seller-type').textContent = sellerData.type;
            document.getElementById('seller-since').textContent = sellerData.since;
            document.getElementById('seller-location').textContent = sellerData.location;
            document.getElementById('seller-sales').textContent = sellerData.sales;
            document.getElementById('seller-response').textContent = sellerData.response;
            
            // Show modal
            sellerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    reasonBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            reasonModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            sellerModal.classList.remove('active');
            reasonModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close modal when clicking outside
    [sellerModal, reasonModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
});