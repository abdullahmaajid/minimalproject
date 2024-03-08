document.addEventListener('DOMContentLoaded', function() {
    let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.querySelector('.cart-content');
    const totalPaymentElement = document.getElementById('totalPayment');
    const checkoutSelectedButton = document.getElementById('checkoutSelected');

    cartContent.innerHTML = '';

    if (cartItems.length === 0) {
        cartContent.innerHTML = '<p>Your shopping cart is empty.</p>';
        checkoutSelectedButton.disabled = true; // Menonaktifkan tombol checkout jika keranjang kosong
    } else {
        // Function to display items in the cart
        function displayCartItems() {
            cartContent.innerHTML = '';
            let totalPayment = 0; // Initialize total payment

            cartItems.forEach(cartItem => {
                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <h3>${cartItem.name}</h3>
                    <p>Price: $${cartItem.price}</p>
                    <label for="quantity-${cartItem.id}">Quantity:</label>
                    <input type="number" id="quantity-${cartItem.id}" name="quantity" value="${cartItem.quantity}" min="1">
                    <button class="remove-from-cart" data-id="${cartItem.id}">Remove</button>
                `;
                cartContent.appendChild(cartItemElement);

                const removeFromCartButton = cartItemElement.querySelector('.remove-from-cart');
                removeFromCartButton.addEventListener('click', function() {
                    removeFromCart(cartItem.id);
                });

                const quantityInput = cartItemElement.querySelector(`#quantity-${cartItem.id}`);
                quantityInput.addEventListener('change', function() {
                    updateQuantity(cartItem.id, parseInt(quantityInput.value));
                });

                // Add item price multiplied by its quantity to total payment
                totalPayment += cartItem.price * cartItem.quantity;
            });

            // Update total payment display
            totalPaymentElement.textContent = `$${totalPayment.toFixed(2)}`;
        }

        // Function to remove item from cart
        function removeFromCart(itemId) {
            cartItems = cartItems.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCartItems();

            // Periksa apakah keranjang kosong setelah menghapus item
            if (cartItems.length === 0) {
                cartContent.innerHTML = '<p>Your shopping cart is empty.</p>';
                checkoutSelectedButton.disabled = true; // Menonaktifkan tombol checkout jika keranjang kosong
            }
        }

        // Function to update quantity of item in cart
        function updateQuantity(itemId, newQuantity) {
            cartItems.forEach(item => {
                if (item.id === itemId) {
                    item.quantity = newQuantity;
                }
            });
            localStorage.setItem('cart', JSON.stringify(cartItems));
            displayCartItems();
        }

        // Display items in the cart
        displayCartItems();
    }

    // Function for checkout process
    function checkout() {
        // Calculate total payment from cart items
        let totalPayment = 0;
        cartItems.forEach(item => {
            totalPayment += item.price * item.quantity;
        });

        // Proceed with the checkout
        alert(`You are checking out. Total Payment: $${totalPayment.toFixed(2)}`);
    }

    // Add event listener to checkout button
    checkoutSelectedButton.addEventListener('click', checkout);
});
