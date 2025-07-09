// Swiper Slider
const swiper = new Swiper('.swiper-container', {
  loop: true,
  autoplay: { delay: 3000 },
  pagination: { el: '.swiper-pagination', clickable: true }
});

// Load Products
async function loadProducts() {
  const response = await fetch('/api/products');
  const products = await response.json();
  displayProducts(products);
}

// Display Products
function displayProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = products.map(product => `
    <div class="product">
      <img src="assets/images/${product.image || 'default.jpg'}" alt="${product.name}" loading="lazy">
      <h3>${product.name}</h3>
      <p>Brand: ${product.brand}</p>
      <p>$${product.price}</p>
      <p>Stock: ${product.stock}</p>
      <button onclick="addToCart(${product.id})" ${product.stock === 0 ? 'disabled' : ''}>Add to Cart</button>
    </div>
  `).join('');
}

// Search
function searchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  fetch('/api/products')
    .then(res => res.json())
    .then(products => {
      const filtered = products.filter(p => p.name.toLowerCase().includes(query));
      displayProducts(filtered);
    });
}

// Filter by Brand and Category
function filterProducts() {
  const brand = document.getElementById('brandFilter').value;
  const category = document.getElementById('categoryFilter').value;
  fetch('/api/products')
    .then(res => res.json())
    .then(products => {
      let filtered = products;
      if (brand) filtered = filtered.filter(p => p.brand === brand);
      if (category) filtered = filtered.filter(p => p.category === category);
      displayProducts(filtered);
    });
}

// Add to Cart
function addToCart(id) {
  alert(`Product ${id} added to cart!`);
}

loadProducts();
