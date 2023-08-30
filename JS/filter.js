const filterBtns = document.querySelectorAll('[data-filter-btn]');
const allCards = document.querySelectorAll("[data-product-card]");
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(otherBtn => {
            if (otherBtn != btn)
                otherBtn.classList.remove('filter-active')
        })
        btn.classList.add('filter-active')
        const target = btn.dataset.filterBtn;
        allCards.forEach(card => {
            if (target == 'all') {
                card.style.display = "block";
            }
            else {
                card.style.display = "none";
                if (target == card.dataset.productCard)
                    card.style.display = "block";
            }
        });
    });
});
