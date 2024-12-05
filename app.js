// Sign-Up functionality (for signup.html)
if (document.getElementById('signupForm')) {
  document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('signupUsername').value.trim();  // Trim any extra spaces
    const password = document.getElementById('signupPassword').value.trim();
    const confirmPassword = document.getElementById('signupConfirmPassword').value.trim();

    // Check if passwords match
    if (password !== confirmPassword) {
      document.getElementById('signup-error-message').textContent = 'Passwords do not match!';
      return;
    }

    // Retrieve existing users from localStorage or initialize an empty array
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists (case insensitive)
    if (users.find(user => user.username.toLowerCase() === username.toLowerCase())) {
      document.getElementById('signup-error-message').textContent = 'Username already exists!';
      return;
    }

    // Save new user to localStorage
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));

    // Log the saved users (for debugging purposes)
    console.log('Users saved to localStorage:', users);

    // Redirect to login page
    alert('Sign-up successful! Please log in.');
    window.location.href = 'login.html';  // Ensure the path is correct on GitHub
  });
}

// Login functionality (for login.html)
if (document.getElementById('loginForm')) {
  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('loginUsername').value.trim();  // Trim any extra spaces
    const password = document.getElementById('loginPassword').value.trim();

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user by username and password (case insensitive)
    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);

    // Check if user exists
    if (user) {
      // Save user session data (optional, for persistent session)
      sessionStorage.setItem('loggedInUser', JSON.stringify(user));

      // Redirect to homepage after successful login
      window.location.href = 'index.html';  // Ensure this path is correct
    } else {
      // Show error message if login fails
      document.getElementById('error-message').textContent = 'Invalid username or password';
    }
  });
}

// Check if the user is logged in before showing the homepage (index.html)
if (document.body.id === 'homePage') {
  window.addEventListener('DOMContentLoaded', function() {
    const loggedInUser = sessionStorage.getItem('loggedInUser');

    if (!loggedInUser) {
      // If no logged-in user found, redirect to login page
      window.location.href = 'login.html';  // Ensure the path is correct
    } else {
      // Optionally, you can display the user's username on the page
      const user = JSON.parse(loggedInUser);
      console.log(`Welcome, ${user.username}!`);
    }
  });
}

// Product data for each category
const products = {
  lipsticks: [
    {
      name: "Luxury Matte Lipstick",
      price: "$45",
      image: "https://images.pexels.com/photos/26927322/pexels-photo-26927322.jpeg",
      description: "A luxurious matte finish lipstick that lasts all day.",
      category: "lipsticks"
    },
    {
      name: "Classic Red Lipstick",
      price: "$30",
      image: "https://images.pexels.com/photos/9777328/pexels-photo-9777328.jpeg",
      description: "Classic red lipstick for a timeless, bold look.",
      category: "lipsticks"
    },
    {
      name: "Nude Velvet Lipstick",
      price: "$35",
      image: "https://images.pexels.com/photos/28968492/pexels-photo-28968492.jpeg",
      description: "Velvety nude lipstick that adds a touch of sophistication.",
      category: "lipsticks"
    }
  ],
  eyeshadows: [
    {
      name: "Shimmering Gold Eyeshadow",
      price: "$25",
      image: "https://images.pexels.com/photos/28657307/pexels-photo-28657307.jpeg",
      description: "A shimmering gold eyeshadow perfect for evening looks.",
      category: "eyeshadows"
    },
    {
      name: "Smokey Eye Palette",
      price: "$50",
      image: "https://images.pexels.com/photos/2639947/pexels-photo-2639947.jpeg",
      description: "Smokey eye palette with deep tones for dramatic looks.",
      category: "eyeshadows"
    },
    {
      name: "Bright Pink Eyeshadow",
      price: "$22",
      image: "https://images.pexels.com/photos/28657307/pexels-photo-28657307.jpeg",
      description: "Vibrant pink eyeshadow for a bold statement.",
      category: "eyeshadows"
    }
  ],
  mascaras: [
    {
      name: "Volume Lash Mascara",
      price: "$20",
      image: "https://images.pexels.com/photos/28736957/pexels-photo-28736957.jpeg",
      description: "Lengthening mascara for voluminous lashes.",
      category: "mascaras"
    },
    {
      name: "Waterproof Black Mascara",
      price: "$25",
      image: "https://images.pexels.com/photos/28736957/pexels-photo-28736957.jpeg",
      description: "Waterproof formula that lasts all day.",
      category: "mascaras"
    },
    {
      name: "Lengthening Mascara",
      price: "$28",
      image: "https://images.pexels.com/photos/28736957/pexels-photo-28736957.jpeg",
      description: "Gives you longer, more defined lashes.",
      category: "mascaras"
    }
  ]
};

// Function to display products based on category
function displayProducts(category) {
  const productContainer = document.getElementById('product-display');
  productContainer.innerHTML = "";  // Clear the current display

  // Get the products for the selected category
  const selectedProducts = products[category];

  if (selectedProducts) {
    selectedProducts.forEach(product => {
      // Create a div for each product
      const productDiv = document.createElement('div');
      productDiv.classList.add('product');

      // Insert the product's name, price, and image into the div
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price}</p>
      `;

      // Append the product div to the product container
      productContainer.appendChild(productDiv);
    });
  } else {
    productContainer.innerHTML = "<p>No products available in this category.</p>";
  }
}

// Event listeners for category buttons
const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
  button.addEventListener('click', function() {
    const category = this.getAttribute('data-category');
    displayProducts(category);
  });
});

// Display a default category (e.g., luxury lipsticks) when the page loads
document.addEventListener('DOMContentLoaded', function() {
  displayProducts('lipsticks');
});

  
