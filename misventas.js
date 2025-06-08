document.addEventListener('DOMContentLoaded', function() {
    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const productSections = document.querySelectorAll('.products-section');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and sections
            tabBtns.forEach(b => b.classList.remove('active'));
            productSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding section
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-products`).classList.add('active');
        });
    });
    
    // Modal functionality for buyer details
    const viewBuyerBtns = document.querySelectorAll('.view-buyer-btn');
    const buyerModal = document.getElementById('buyer-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal, .close-btn');
    
    viewBuyerBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // In a real app, you would fetch this data from an API or database
            // For this example, we'll use mock data based on the product
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;
            const buyerName = productCard.querySelector('.buyer-header strong').textContent;
            const saleDate = productCard.querySelector('.sale-date').textContent.replace('Vendido el: ', '');
            
            // Set modal content
            document.getElementById('buyer-name').textContent = buyerName;
            document.getElementById('product-name').textContent = productName;
            document.getElementById('product-price').textContent = productPrice;
            document.getElementById('sale-date').textContent = saleDate;
            
            // Mock buyer details (in a real app, this would come from your data)
            const mockBuyers = {
                "María Fernández": {
                    id: "V-25.456.789",
                    phone: "+58 412-5551234",
                    location: "Caracas, Venezuela",
                    payment: "Transferencia bancaria"
                },
                "Carlos González": {
                    id: "V-20.123.456",
                    phone: "+58 414-5556789",
                    location: "Valencia, Venezuela",
                    payment: "Efectivo"
                }
            };
            
            const buyerData = mockBuyers[buyerName] || {
                id: "V-XX.XXX.XXX",
                phone: "+58 XXX-XXXXXXX",
                location: "Venezuela",
                payment: "No especificado"
            };
            
            document.getElementById('buyer-id').textContent = buyerData.id;
            document.getElementById('buyer-phone').textContent = buyerData.phone;
            document.getElementById('buyer-location').textContent = buyerData.location;
            document.getElementById('payment-method').textContent = buyerData.payment;
            
            // Show modal
            buyerModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            buyerModal.classList.remove('active');
            document.getElementById('new-product-modal').classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // New product modal
    const newSaleBtn = document.querySelector('.new-sale-btn');
    const newProductModal = document.getElementById('new-product-modal');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    if (newSaleBtn) {
        newSaleBtn.addEventListener('click', function() {
            newProductModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            newProductModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
});