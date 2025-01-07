// Sample product data with categories
const products = [
    {
        id: 1,
        name: 'MacBook Pro 16"',
        price: 1999.99,
        category: 'laptops',
        brand: 'apple',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 2,
        name: 'iPhone 15 Pro',
        price: 999.99,
        category: 'smartphones',
        brand: 'apple',
        image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 3,
        name: 'iPad Air',
        price: 599.99,
        category: 'tablets',
        brand: 'apple',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 4,
        name: 'AirPods Pro',
        price: 249.99,
        category: 'accessories',
        brand: 'apple',
        image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 5,
        name: 'Samsung Galaxy S24',
        price: 899.99,
        category: 'smartphones',
        brand: 'samsung',
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80'
    },
    {
        id: 6,
        name: 'Dell XPS 15',
        price: 1799.99,
        category: 'laptops',
        brand: 'dell',
        image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80'
    }
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const searchInput = document.getElementById('searchInput');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
const brandCheckboxes = document.querySelectorAll('input[name="brand"]');

// Render products
function renderProducts(productsToRender) {
    productGrid.innerHTML = productsToRender.map(product => `
        <div class="product-card" data-category="${product.category}" data-brand="${product.brand}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Filter products
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const maxPrice = parseInt(priceRange.value);
    const selectedCategories = Array.from(categoryCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    const selectedBrands = Array.from(brandCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesPrice = product.price <= maxPrice;
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

        return matchesSearch && matchesPrice && matchesCategory && matchesBrand;
    });

    renderProducts(filteredProducts);
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        alert(`Added ${product.name} to cart`);
    }
}

// Event listeners
searchInput.addEventListener('input', filterProducts);
priceRange.addEventListener('input', (e) => {
    priceValue.textContent = `$${e.target.value}`;
    filterProducts();
});
categoryCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));
brandCheckboxes.forEach(cb => cb.addEventListener('change', filterProducts));

// Initial render
renderProducts(products);