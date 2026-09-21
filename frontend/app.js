const apiUrl = 'http://127.0.0.1:8000/api/';

// Fetch products from Django and render them
async function loadProducts() {
    try {
        const response = await fetch(`${apiUrl}products/`);
        const products = await response.json();
        const container = document.getElementById('product-container');
        
        container.innerHTML = ''; // Clear container

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Trigger the load when the page opens
loadProducts();

// Fetch the current cart and update the navbar text
async function updateCartCount() {
    try {
        const response = await fetch(`${apiUrl}cart/`);
        const cartItems = await response.json();
        
        // Sum up the total quantity of all items in the cart
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        document.getElementById('cart-status').innerText = `Cart: ${totalItems} items`;
    } catch (error) {
        console.error('Error fetching cart:', error);
    }
}

// Send a POST request to Django to add a product
async function addToCart(productId) {
    try {
        const response = await fetch(`${apiUrl}cart/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ product_id: productId })
        });
        
        if (response.ok) {
            // Refresh the cart counter after a successful add
            updateCartCount();
        } else {
            console.error('Failed to add item to cart');
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
    }
}

// Call this when the page first loads to get the initial cart count
updateCartCount();

// Send a POST request to process the order
async function processCheckout() {
    try {
        const response = await fetch(`${apiUrl}checkout/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        
        if (response.ok) {
            alert("Order processed successfully! Your cart is now empty.");
            updateCartCount(); // This will reset the counter to 0
        } else {
            alert("Cart is already empty.");
        }
    } catch (error) {
        console.error('Error during checkout:', error);
    }
}