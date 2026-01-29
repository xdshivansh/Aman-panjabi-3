
// Menu Data
const MENU_DATA = [
    {
        category: "Starters",
        items: [
            { id: 1, name: "Paneer Tikka", price: "₹240", desc: "Classic marinated cottage cheese cubes grilled to perfection." },
            { id: 2, name: "Veg Manchurian Dry", price: "₹180", desc: "Crispy veg balls tossed in spicy chinese sauces." },
            { id: 3, name: "Tandoori Soya Chaap", price: "₹220", desc: "Protein rich soya chunks with smokey tandoor flavors." },
            { id: 4, name: "Hara Bhara Kebab", price: "₹200", desc: "Healthy spinach and pea patties with indian spices." }
        ]
    },
    {
        category: "Main Course",
        items: [
            { id: 5, name: "Paneer Butter Masala", price: "₹280", desc: "Creamy tomato based gravy with soft paneer cubes." },
            { id: 6, name: "Dal Makhani", price: "₹220", desc: "Black lentils slow cooked overnight with butter and cream." },
            { id: 7, name: "Kadai Paneer", price: "₹260", desc: "Spicy paneer tossed with bell peppers and fresh ground spices." },
            { id: 8, name: "Chole Masala", price: "₹180", desc: "Traditional punjabi chickpeas in tangy spice mix." }
        ]
    },
    {
        category: "Breads",
        items: [
            { id: 9, name: "Butter Naan", price: "₹45", desc: "Leavened oven baked flatbread with rich butter." },
            { id: 10, name: "Garlic Naan", price: "₹55", desc: "Naan infused with roasted garlic and butter." },
            { id: 11, name: "Tandoori Roti", price: "₹20", desc: "Whole wheat bread baked in traditional clay oven." },
            { id: 12, name: "Missi Roti", price: "₹40", desc: "Gram flour bread with onions and green chillies." }
        ]
    },
    {
        category: "Beverages",
        items: [
            { id: 13, name: "Sweet Lassi", price: "₹80", desc: "Creamy punjabi yogurt drink with saffron and nuts." },
            { id: 14, name: "Masala Chaas", price: "₹50", desc: "Spiced buttermilk to aid digestion." },
            { id: 15, name: "Cold Coffee", price: "₹100", desc: "Refreshing chilled coffee with vanilla scoop." }
        ]
    }
];

// Cart State
let cart = [];

// Initialize Menu
function initMenu() {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = '';

    MENU_DATA.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = 'menu-category';
        
        let itemsHtml = cat.items.map(item => `
            <div class="menu-item-card">
                <div class="item-header">
                    <h4>${item.name}</h4>
                    <span class="price">${item.price}</span>
                </div>
                <p class="item-desc">${item.desc}</p>
                <button class="add-btn" onclick="addToCart(${item.id})">Add to Order</button>
            </div>
        `).join('');

        catDiv.innerHTML = `
            <h3>${cat.category}</h3>
            <div class="category-items">
                ${itemsHtml}
            </div>
        `;
        menuContainer.appendChild(catDiv);
    });
}

// Cart Functions
function addToCart(id) {
    const allItems = MENU_DATA.flatMap(c => c.items);
    const item = allItems.find(i => i.id === id);
    
    const existing = cart.find(i => i.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    
    updateCartUI();
    showCartBadgeAnimation();
}

function removeFromCart(id) {
    const item = cart.find(i => i.id === id);
    if (item.qty > 1) {
        item.qty--;
    } else {
        cart = cart.filter(i => i.id !== id);
    }
    updateCartUI();
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    
    const totalQty = cart.reduce((acc, curr) => acc + curr.qty, 0);
    cartCount.innerText = totalQty;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <i data-lucide="shopping-bag" size="48"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        lucide.createIcons();
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <strong>${item.name}</strong>
                <span>${item.price}</span>
            </div>
            <div class="cart-item-controls">
                <button onclick="removeFromCart(${item.id})">-</button>
                <span>${item.qty}</span>
                <button onclick="addToCart(${item.id})">+</button>
            </div>
        </div>
    `).join('');
}

function sendWhatsAppOrder() {
    if (cart.length === 0) {
        alert("Your order is empty!");
        return;
    }

    const orderLines = cart.map(i => `- ${i.name} (x${i.qty})`).join('%0A');
    const message = `Hello Aman Panjabi Restaurant!%0AI would like to place an order:%0A%0A${orderLines}%0A%0APlease confirm.`;
    const whatsappUrl = `https://wa.me/9588812154?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}

// UI Helpers
function toggleCart() {
    document.getElementById('cart-sidebar').classList.toggle('active');
}

function toggleMobileMenu() {
    document.getElementById('mobile-menu').classList.toggle('active');
}

function showCartBadgeAnimation() {
    const badge = document.getElementById('cart-count');
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => badge.style.transform = 'scale(1)', 200);
}

// Scroll effects
window.addEventListener('scroll', () => {
    const header = document.getElementById('navbar');
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initMenu();
    
    // Smooth revealing on scroll
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-header, .about-flex, .gallery-grid, .contact-card').forEach(el => {
        observer.observe(el);
    });
});
