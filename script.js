
document.addEventListener('DOMContentLoaded', function() {
  // Initialize components
  initNavbar();
  
  const categorySlider = document.getElementById('categorySlider');
  const featuredProducts = document.getElementById('featuredProducts');
  
  if (categorySlider) {
    initCategorySlider();
  }
  
  if (featuredProducts) {
    initFeaturedProducts();
  }
  
  // Check if we're on a specific page by URL and initialize page-specific features
  if (window.location.pathname.includes('product-detail.html')) {
    initProductDetail();
  } else if (window.location.pathname.includes('search.html')) {
    initSearchPage();
  } else if (window.location.pathname.includes('categories.html')) {
    initCategoriesPage();
  }
});

// Navbar handling
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 10) {
      navbar.style.backgroundColor = 'rgba(41, 41, 41, 0.9)';
      navbar.style.backdropFilter = 'blur(10px)';
      navbar.style.padding = '0.75rem 0';
    } else {
      navbar.style.backgroundColor = 'rgb(41, 41, 41)';
      navbar.style.backdropFilter = 'none';
      navbar.style.padding = '1rem 0';
    }
  });
}

// Category Slider
function initCategorySlider() {
  const categorySlider = document.getElementById('categorySlider');
  
  if (!categorySlider) return;
  
  // Clear existing content
  categorySlider.innerHTML = '';
  
  // Define categories
  const categories = [
    {
      id: '1',
      title: 'Accessories',
      image: '/lovable-uploads/197998cf-409e-4bc4-b4a8-44efbd64db4a.png',
      link: 'categories.html?category=accessories'
    },
    {
      id: '2',
      title: 'Dress',
      image: '/lovable-uploads/35f2fd4f-a2aa-4fe4-95a8-fe165c7ac7df.png',
      link: 'categories.html?category=dress'
    },
    {
      id: '3',
      title: 'Kurdish Dresses',
      image: '/lovable-uploads/1db5a679-eae7-4639-abcf-dbe2bbe81c15.png',
      link: 'categories.html?category=kurdish-dresses'
    },
    {
      id: '4',
      title: 'Shoes',
      image: '/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png',
      link: 'categories.html?category=shoes'
    },
    {
      id: '5',
      title: 'Bags',
      image: '/lovable-uploads/209ed3f3-b251-45fe-af6f-cbbac1f1ccf3.png',
      link: 'categories.html?category=bags'
    },
    {
      id: '6',
      title: 'Tops',
      image: '/lovable-uploads/f8e6b2b4-ec0a-4670-91fe-0993320cc78b.png',
      link: 'categories.html?category=tops'
    }
  ];
  
  // Add categories to the slider (limit to 3 for homepage)
  const displayCategories = categories.slice(0, 3);
  
  displayCategories.forEach(category => {
    const categoryCard = document.createElement('div');
    categoryCard.className = 'category-card';
    
    categoryCard.innerHTML = `
      <div class="category-image">
        <img src="${category.image}" alt="${category.title}">
      </div>
      <div class="category-content">
        <h3>${category.title}</h3>
      </div>
    `;
    
    // Add event listener to navigate to category page
    categoryCard.addEventListener('click', () => {
      window.location.href = category.link;
    });
    
    categorySlider.appendChild(categoryCard);
  });
}

// Featured Products
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
        <div class="product-category">${product.category}</div>
        <h3>${product.title}</h3>
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

// Product Detail Page
function initProductDetail() {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  
  if (!productId) {
    window.location.href = 'index.html';
    return;
  }
  
  // Find product by ID
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    window.location.href = 'index.html';
    return;
  }
  
  // Update product details in the DOM
  document.getElementById('productTitle').textContent = product.title;
  document.getElementById('productPrice').textContent = `$${product.price.toFixed(2)}`;
  document.getElementById('productCategory').textContent = product.category;
  document.getElementById('productBrand').textContent = product.brand || 'Unknown';
  document.getElementById('productDescription').textContent = product.description;
  document.getElementById('productImage').src = product.image;
  document.getElementById('productImage').alt = product.title;
  
  // Initialize related products
  initRelatedProducts(product.category, product.id);
}

// Related Products for Product Detail Page
function initRelatedProducts(category, currentProductId) {
  const relatedProductsContainer = document.getElementById('relatedProducts');
  
  if (!relatedProductsContainer) return;
  
  // Clear existing content
  relatedProductsContainer.innerHTML = '';
  
  // Find related products by category, excluding current product
  const relatedProducts = products
    .filter(p => p.category === category && p.id !== currentProductId)
    .slice(0, 3);
  
  if (relatedProducts.length === 0) {
    relatedProductsContainer.innerHTML = '<p>No related products found.</p>';
    return;
  }
  
  // Add related products to the container
  relatedProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h3>${product.title}</h3>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      </div>
    `;
    
    // Add event listener to navigate to product detail page
    productCard.addEventListener('click', () => {
      window.location.href = `product-detail.html?id=${product.id}`;
    });
    
    relatedProductsContainer.appendChild(productCard);
  });
}

// Search Page
function initSearchPage() {
  const searchInput = document.getElementById('searchInput');
  const searchResults = document.getElementById('searchResults');
  const searchForm = document.getElementById('searchForm');
  
  if (!searchInput || !searchResults || !searchForm) return;
  
  // Get search term from URL if it exists
  const urlParams = new URLSearchParams(window.location.search);
  const searchTerm = urlParams.get('q') || '';
  
  // Set search input value to the term from URL
  searchInput.value = searchTerm;
  
  // Handle search form submission
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const term = searchInput.value.trim();
    
    // Update URL with search term
    if (term) {
      window.history.pushState({}, '', `search.html?q=${encodeURIComponent(term)}`);
    } else {
      window.history.pushState({}, '', 'search.html');
    }
    
    // Perform search
    performSearch(term);
  });
  
  // Perform initial search if there's a term in the URL
  if (searchTerm) {
    performSearch(searchTerm);
  }
}

// Perform search and display results
function performSearch(term) {
  const searchResults = document.getElementById('searchResults');
  
  if (!searchResults) return;
  
  // Clear existing results
  searchResults.innerHTML = '';
  
  // If no search term, show all products
  const results = term ? searchProducts(term) : products;
  
  if (results.length === 0) {
    searchResults.innerHTML = '<p class="no-results">No products found matching your search.</p>';
    return;
  }
  
  // Create product cards for search results
  results.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    
    productCard.innerHTML = `
      <div class="product-image">
        <img src="${product.image}" alt="${product.title}">
      </div>
      <div class="product-content">
        <div class="product-category">${product.category}</div>
        <h3>${product.title}</h3>
        <div class="product-price">$${product.price.toFixed(2)}</div>
      </div>
    `;
    
    // Add event listener to navigate to product detail page
    productCard.addEventListener('click', () => {
      window.location.href = `product-detail.html?id=${product.id}`;
    });
    
    searchResults.appendChild(productCard);
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

// Categories Page
function initCategoriesPage() {
  const categoriesContainer = document.getElementById('categoriesContainer');
  const categoryTabButtons = document.querySelectorAll('.category-tab');
  
  if (!categoriesContainer) return;
  
  // Get category from URL if it exists
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  // Define all categories
  const categories = [
    {
      id: '1',
      title: 'Accessories',
      image: '/lovable-uploads/197998cf-409e-4bc4-b4a8-44efbd64db4a.png',
      link: 'categories.html?category=accessories'
    },
    {
      id: '2',
      title: 'Dress',
      image: '/lovable-uploads/35f2fd4f-a2aa-4fe4-95a8-fe165c7ac7df.png',
      link: 'categories.html?category=dress'
    },
    {
      id: '3',
      title: 'Kurdish Dresses',
      image: '/lovable-uploads/1db5a679-eae7-4639-abcf-dbe2bbe81c15.png',
      link: 'categories.html?category=kurdish-dresses'
    },
    {
      id: '4',
      title: 'Shoes',
      image: '/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png',
      link: 'categories.html?category=shoes'
    },
    {
      id: '5',
      title: 'Bags',
      image: '/lovable-uploads/209ed3f3-b251-45fe-af6f-cbbac1f1ccf3.png',
      link: 'categories.html?category=bags'
    },
    {
      id: '6',
      title: 'Tops',
      image: '/lovable-uploads/f8e6b2b4-ec0a-4670-91fe-0993320cc78b.png',
      link: 'categories.html?category=tops'
    },
    {
      id: '7',
      title: 'Trousers',
      image: '/lovable-uploads/14135fb0-35e2-4127-9013-74bd241d6182.png',
      link: 'categories.html?category=trousers'
    },
    {
      id: '8',
      title: 'Jackets',
      image: '/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png',
      link: 'categories.html?category=jackets'
    }
  ];
  
  // Set up tab button event listeners
  if (categoryTabButtons) {
    categoryTabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        categoryTabButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter categories based on tab
        const filter = this.dataset.filter;
        displayCategories(filter);
      });
    });
  }
  
  // Display categories based on filter
  function displayCategories(filter) {
    categoriesContainer.innerHTML = '';
    
    let filteredCategories = categories;
    
    if (filter === 'clothing') {
      filteredCategories = categories.filter(c => 
        ['Dress', 'Tops', 'Trousers', 'Jackets'].includes(c.title)
      );
    } else if (filter === 'accessories') {
      filteredCategories = categories.filter(c => 
        ['Accessories', 'Shoes', 'Bags'].includes(c.title)
      );
    } else if (filter === 'kurdish') {
      filteredCategories = categories.filter(c => 
        c.title.includes('Kurdish')
      );
    }
    
    // Create category cards
    filteredCategories.forEach(category => {
      const categoryCard = document.createElement('div');
      categoryCard.className = 'category-card';
      
      categoryCard.innerHTML = `
        <div class="category-image">
          <img src="${category.image}" alt="${category.title}">
        </div>
        <div class="category-content">
          <h3>${category.title}</h3>
        </div>
      `;
      
      // Add event listener to navigate to category detail page
      categoryCard.addEventListener('click', () => {
        window.location.href = category.link;
      });
      
      categoriesContainer.appendChild(categoryCard);
    });
  }
  
  // Initialize with first tab active or selected category
  if (categoryParam) {
    // Find button that matches the category param
    const matchingButton = Array.from(categoryTabButtons).find(button => {
      const filter = button.dataset.filter;
      if (filter === 'all') return false;
      
      if (filter === 'clothing' && 
          ['dress', 'tops', 'trousers', 'jackets'].includes(categoryParam)) {
        return true;
      }
      
      if (filter === 'accessories' && 
          ['accessories', 'shoes', 'bags'].includes(categoryParam)) {
        return true;
      }
      
      if (filter === 'kurdish' && 
          categoryParam.includes('kurdish')) {
        return true;
      }
      
      return false;
    });
    
    if (matchingButton) {
      matchingButton.click();
    } else {
      // Default to 'all' if no match
      const allButton = document.querySelector('[data-filter="all"]');
      if (allButton) allButton.click();
    }
  } else {
    // Default to 'all' if no category in URL
    const allButton = document.querySelector('[data-filter="all"]');
    if (allButton) allButton.click();
  }
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
