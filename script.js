document.addEventListener('DOMContentLoaded', function() {
  // This initialization code will only run for any remaining HTML pages
  const categorySlider = document.getElementById('categorySlider');
  const featuredProducts = document.getElementById('featuredProducts');
  
  if (categorySlider) {
    initCategorySlider();
  }
  
  if (featuredProducts) {
    initFeaturedProducts();
  }
});

function initCategorySlider() {
  const categorySlider = document.getElementById('categorySlider');
  
  if (!categorySlider) return;
  
  // Clear existing content
  categorySlider.innerHTML = '';
  
  // Add categories to the slider
  categories.forEach(category => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    
    categoryCard.innerHTML = `
      <div class="category-image">
        <img src="${category.image}" alt="${category.name}">
      </div>
      <div class="category-content">
        <h3>${category.name}</h3>
        <p>${category.description}</p>
      </div>
    `;
    
    // Add event listener to navigate to category page
    categoryCard.addEventListener('click', () => {
      window.location.href = `category-detail.html?id=${category.id}`;
    });
    
    categorySlider.appendChild(categoryCard);
  });
}

function initFeaturedProducts() {
  const featuredProductsContainer = document.getElementById('featuredProducts');
  
  if (!featuredProductsContainer) return;
  
  // Clear existing content
  featuredProductsContainer.innerHTML = '';
  
  // Get first 3 products as featured
  const featuredProducts = products.slice(0, 3);
  
  // Add featured products to the container
  featuredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-content">
        <h3>${product.title}</h3>
        <div class="product-category">${product.category}</div>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      </div>
    `;
    
    // Add event listener to navigate to product detail page
    productCard.addEventListener('click', () => {
      window.location.href = `product-detail.html?id=${product.id}`;
    });
    
    featuredProductsContainer.appendChild(productCard);
  });
}

// Create a simple search function for the search page
function searchProducts(term) {
  if (!term) return products;
  
  term = term.toLowerCase();
  
  return products.filter(product => {
    return (
      product.title.toLowerCase().includes(term) ||
      (product.brand && product.brand.toLowerCase().includes(term)) ||
      product.category.toLowerCase().includes(term) ||
      (product.description && product.description.toLowerCase().includes(term))
    );
  });
}

// Helper function to get URL parameters
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  var results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Format price with correct currency
function formatPrice(price) {
  return '$' + price.toFixed(2);
}
