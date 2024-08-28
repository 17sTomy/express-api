document.addEventListener("DOMContentLoaded", () => {
  async function fetchProducts() {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      const products = data.payload;

      const productsContainer = document.getElementById("products-container");
      productsContainer.innerHTML = "";

      const productsHTML = products.map(product => `
        <div class="product-card">
          <img src="${product.thumbnails[0] || 'https://via.placeholder.com/250'}" alt="${product.title}">
          <h2>${product.title}</h2>
          <p>${product.description}</p>
          <p class="price">$${product.price}</p>
        </div>
      `).join('');

      productsContainer.innerHTML = productsHTML;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  fetchProducts(); 
});
