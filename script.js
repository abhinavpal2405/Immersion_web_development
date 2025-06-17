async function searchProduct() {
  const query = document.getElementById('searchInput').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  const resultBox = document.getElementById('productResults');

  errorMsg.textContent = "";
  resultBox.innerHTML = "";

  if (query === "") {
    errorMsg.textContent = "Search field cannot be empty.";
    return;
  }

  try {
    const response = await fetch('https://dummyjson.com/products/search?q=phone');
    const data = await response.json();

    if (!data.products || data.products.length === 0) {
      resultBox.innerHTML = "<p>No products found.</p>";
      return;
    }

    data.products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";

      card.innerHTML = `
        <img src="${product.thumbnail}" alt="${product.title}">
        <div class="product-title">${product.title}</div>
        <div class="product-price">₹${product.price}</div>
      `;

      resultBox.appendChild(card);
    });
  } catch (err) {
    errorMsg.textContent = "Error fetching products.";
  }
}