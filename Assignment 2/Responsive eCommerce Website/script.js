document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search');
    const categoryFilter = document.getElementById('category-filter');
    const cart = document.getElementById('cart');
    const cartItems = document.getElementById('cart-items');
    const checkoutButton = document.getElementById('checkout');

    const apiUrl = 'https://fakestoreapi.com/products';
    let products = [];
    let cartData = [];

    // Fetch product data from mock API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        })
        .catch(error => console.error('Error fetching products:', error));

    // Display products
    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h2>${product.title}</h2>
                <p>$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            `;
            productList.appendChild(productCard);
        });
        attachCartEventListeners();
    }

    // Search functionality
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => 
            product.title.toLowerCase().includes(searchTerm)
        );
        displayProducts(filteredProducts);
    });

    // Filter functionality
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        const filteredProducts = products.filter(product => 
            selectedCategory === '' || product.category === selectedCategory
        );
        displayProducts(filteredProducts);
    });

    // Shopping Cart functionality
    function attachCartEventListeners() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                const product = products.find(p => p.id == productId);
                addToCart(product);
            });
        });
    }

    function addToCart(product) {
        cartData.push(product);
        updateCart();
        showCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        cartData.forEach(product => {
            const cartItem = document.createElement('li');
            cartItem.innerHTML = `
                ${product.title} - $${product.price}
                <button class="remove-item" data-id="${product.id}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
        });
        attachCartItemEventListeners();
    }

    function attachCartItemEventListeners() {
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-id');
                removeFromCart(productId);
            });
        });
    }

    function removeFromCart(productId) {
        cartData = cartData.filter(product => product.id != productId);
        updateCart();
        if (cartData.length === 0) {
            hideCart();
        }
    }

    function showCart() {
        cart.style.display = 'block';
    }

    function hideCart() {
        cart.style.display = 'none';
    }

    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout...');
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const bannerList = document.querySelector('.banner-list');
    const items = document.querySelectorAll('.banner-list li');
    const itemCount = items.length;
    const prevButton = document.querySelector('.control_prev');
    const nextButton = document.querySelector('.control_next');
    let currentIndex = 0;

    function showItem(index) {
        bannerList.style.transform = `translateX(-${index * 100}%)`;
    }

    function prevItem() {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : itemCount - 1;
        showItem(currentIndex);
    }

    function nextItem() {
        currentIndex = (currentIndex + 1) % itemCount;
        showItem(currentIndex);
    }

    prevButton.addEventListener('click', prevItem);
    nextButton.addEventListener('click', nextItem);

    setInterval(nextItem, 3000); // Change image every 3 seconds
});

