document.addEventListener('DOMContentLoaded', function() {

    const favButtons = document.querySelectorAll('.fav-btn');
    favButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            if (this.classList.contains('active')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
            }
        });
    });
    
    // Toggle Categories Sidebar
    const mobileCategoryToggleBtn = document.querySelector('.mobile-category-toggle-btn');
    const categoriesSidebar = document.querySelector('.categories-sidebar');
    const sidebarBackdrop = document.querySelector('.sidebar-backdrop');

    if (mobileCategoryToggleBtn && categoriesSidebar && sidebarBackdrop) {
        mobileCategoryToggleBtn.addEventListener('click', function() {
            categoriesSidebar.classList.add('active');
            sidebarBackdrop.classList.add('active');
        });

        sidebarBackdrop.addEventListener('click', function() {
            categoriesSidebar.classList.remove('active');
            sidebarBackdrop.classList.remove('active');
        });
    }

    // Toggle Filter Panel
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const exploreFilters = document.querySelector('.explore-filters');
    const filterBackdrop = document.querySelector('.filter-backdrop');
    const closeFilterBtn = document.querySelector('.close-filter-btn');

    if (filterToggleBtn && exploreFilters && filterBackdrop && closeFilterBtn) {
        filterToggleBtn.addEventListener('click', function() {
            exploreFilters.classList.add('filters-active');
            filterBackdrop.classList.add('active');
        });

        closeFilterBtn.addEventListener('click', function() {
            exploreFilters.classList.remove('filters-active');
            filterBackdrop.classList.remove('active');
        });

        filterBackdrop.addEventListener('click', function() {
            exploreFilters.classList.remove('filters-active');
            filterBackdrop.classList.remove('active');
        });
    }
    
    // Smooth scroll for categories, adjusted for IDs
    document.querySelectorAll('.categories-list a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') { 
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                    // Close sidebar after clicking a category
                    if (categoriesSidebar.classList.contains('active')) {
                        categoriesSidebar.classList.remove('active');
                        sidebarBackdrop.classList.remove('active');
                    }
                }
            }
        });
    });
});