// This js file is to apply cart functionalities

// Your users should be able to:

// Add to Cart Functionality:
// Implement functionality to add items to the shopping cart. The cart should dynamically
// update based on the quantity of items added by the user.

// Cart Management:
// Users should be able to view the cart, displaying all items added along with their quantity
// and price. The cart must also allow users to remove items from it.


// Variables for cart and product
let cartCount = 0;
let productQuantity = 0;
let cartItems = [];

// Get product price dynamically from the DOM
const productPriceElement = document.querySelector('.text-3xl.font-bold'); // Adjust this selector to your actual price span
const productPrice = parseFloat(productPriceElement.textContent.replace('$', ''));

// DOM Elements
const quantityDisplay = document.querySelector('.quantity-display');
const incrementButton = document.querySelector('.increment');
const decrementButton = document.querySelector('.decrement');
const addToCartButton = document.querySelector('.add-to-cart');
const cartCountDisplay = document.getElementById('cartCount');
const cartPopup = document.getElementById('cartPopup');
const cartIcon = document.getElementById('cartIcon'); // This is the cart icon element
const cartItemsContainer = document.getElementById('cartItems');
const emptyCartMessage = document.getElementById('emptyCart');
const checkoutButton = document.getElementById('checkoutButton');
const checkoutContainer = document.getElementById('checkoutContainer');
const closeCart = document.getElementById('closeCart');

// Function to increase the product quantity
incrementButton.addEventListener('click', () => {
  productQuantity++;
  updateQuantityDisplay();
});

// Function to decrease the product quantity
decrementButton.addEventListener('click', () => {
  if (productQuantity > 0) {
    productQuantity--;
    updateQuantityDisplay();
  }
});

// Function to update the quantity display on the page
function updateQuantityDisplay() {
  quantityDisplay.textContent = productQuantity;
}

// Function to add items to the cart
addToCartButton.addEventListener('click', () => {
  if (productQuantity > 0) {
    const totalPrice = productPrice * productQuantity;
    
    // Update cart item
    const cartItem = {
      name: 'Fall Limited Edition Sneakers',
      quantity: productQuantity,
      price: totalPrice
    };
    cartItems.push(cartItem);
    cartCount += productQuantity;
    
    updateCartCountDisplay();
    updateCartPopup();
    
    // Reset quantity after adding to cart
    productQuantity = 0;
    updateQuantityDisplay();
  } else {
    alert('Please select a quantity before adding to cart.');
  }
});

// Function to update the cart count display
function updateCartCountDisplay() {
  if (cartCount > 0) {
    cartCountDisplay.textContent = cartCount;
    cartCountDisplay.classList.remove('hidden'); // Show the cart count
  } else {
    cartCountDisplay.classList.add('hidden'); // Hide the cart count if empty
  }
}

// Function to update the cart popup content
function updateCartPopup() {
  cartItemsContainer.innerHTML = ''; // Clear previous items
  
  cartItems.forEach((item, index) => {
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('flex', 'justify-between', 'items-center', 'mb-2');
    
    cartItemElement.innerHTML = `
      <div>
        <p>${item.name}</p>
        <p>$${productPrice} x ${item.quantity} <strong>$${item.price}</strong></p>
      </div>
      <button class="remove-item" data-index="${index}"><i class="fa fa-trash-o"></i></button>
    `;
    
    cartItemsContainer.appendChild(cartItemElement);
  });

  if (cartItems.length > 0) {
    emptyCartMessage.classList.add('hidden');
    cartItemsContainer.classList.remove('hidden');
    checkoutContainer.classList.remove('hidden');
  } else {
    emptyCartMessage.classList.remove('hidden');
    cartItemsContainer.classList.add('hidden');
    checkoutContainer.classList.add('hidden');
  }

  // Add event listeners to remove items
  const removeItemButtons = document.querySelectorAll('.remove-item');
  removeItemButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // Use closest to ensure we get the button element even if the icon is clicked
      const buttonElement = e.target.closest('.remove-item');
      const index = buttonElement.getAttribute('data-index');
      removeCartItem(index);
    });
  });
}

// Function to remove an item from the cart
function removeCartItem(index) {
  cartCount -= cartItems[index].quantity;
  cartItems.splice(index, 1);
  
  updateCartCountDisplay();
  
  if (cartItems.length === 0) {
    emptyCartMessage.classList.remove('hidden');
    cartItemsContainer.classList.add('hidden');
    checkoutContainer.classList.add('hidden');
  } else {
    updateCartPopup();
  }
}

// Toggle cart popup visibility
cartIcon.addEventListener('click', () => {
  cartPopup.classList.toggle('hidden');
});

// Close cart popup
closeCart.addEventListener('click', () => {
  cartPopup.classList.add('hidden');
});
